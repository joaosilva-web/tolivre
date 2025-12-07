import { getUserFromCookie } from "@/app/libs/auth";
import * as api from "@/app/libs/apiResponse";
import prisma from "@/lib/prisma";

export async function GET() {
  const user = await getUserFromCookie();
  if (!user) return api.unauthorized();

  // Buscar informações completas do usuário incluindo photoUrl
  const fullUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      companyId: true,
      photoUrl: true,
    },
  });

  if (!fullUser) return api.unauthorized();

  return api.ok({ user: fullUser });
}
