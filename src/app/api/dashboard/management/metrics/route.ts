import { NextRequest } from "next/server";
import { subDays } from "date-fns";
import { getUserFromCookie } from "@/app/libs/auth";
import * as api from "@/app/libs/apiResponse";
import prisma from "@/lib/prisma";

const RANGE_LOOKUP = {
  "7d": 7,
  "30d": 30,
  "90d": 90,
} as const;

type RangeKey = keyof typeof RANGE_LOOKUP;

type DistributionSummary = {
  confirmed: number;
  rescheduled: number;
  canceled: number;
};

export type ManagementMetricsResponse = {
  summary: {
    appointmentVolume: number;
    revenue: number;
    revenueRunRate: number;
    activeProfessionals: number;
    averageRating: number | null;
  };
  distribution: DistributionSummary;
  range: RangeKey;
  rangeDays: number;
};

export async function GET(req: NextRequest) {
  const user = await getUserFromCookie();
  if (!user) return api.unauthorized();

  const companyId = user.companyId;
  if (!companyId) {
    return api.badRequest("Informe a empresa para acessar o dashboard");
  }

  const { searchParams } = new URL(req.url);
  const requestedRange = (searchParams.get("range") ?? "30d") as RangeKey;
  const range: RangeKey =
    requestedRange in RANGE_LOOKUP ? requestedRange : "30d";
  const rangeDays = RANGE_LOOKUP[range];
  const now = new Date();
  const startDate = subDays(now, rangeDays);

  const appointments = await prisma.appointment.findMany({
    where: {
      companyId,
      startTime: {
        gte: startDate,
        lte: now,
      },
    },
    select: {
      professionalId: true,
      paidAmount: true,
      price: true,
      status: true,
    },
  });

  const appointmentVolume = appointments.length;
  const uniqueProfessionals = new Set(
    appointments.map((apt) => apt.professionalId),
  );
  const activeProfessionals = uniqueProfessionals.size;

  const revenue = appointments.reduce((acc, apt) => {
    const value =
      typeof apt.paidAmount === "number" ? apt.paidAmount : apt.price;
    if (typeof value === "number") return acc + value;
    return acc;
  }, 0);

  const revenueRunRate = rangeDays > 0 ? revenue / rangeDays : revenue;

  const distribution = appointments.reduce<DistributionSummary>(
    (acc, apt) => {
      if (apt.status === "CONFIRMED" || apt.status === "COMPLETED") {
        acc.confirmed += 1;
      }
      if (apt.status === "PENDING") {
        acc.rescheduled += 1;
      }
      if (apt.status === "CANCELED") {
        acc.canceled += 1;
      }
      return acc;
    },
    { confirmed: 0, rescheduled: 0, canceled: 0 },
  );

  const ratingAggregate = await prisma.pageTestimonial.aggregate({
    _avg: {
      rating: true,
    },
    where: {
      companyPage: {
        companyId,
      },
    },
  });

  const averageRating = ratingAggregate._avg.rating ?? null;

  return api.ok<ManagementMetricsResponse>({
    summary: {
      appointmentVolume,
      revenue,
      revenueRunRate,
      activeProfessionals,
      averageRating,
    },
    distribution,
    range,
    rangeDays,
  });
}
