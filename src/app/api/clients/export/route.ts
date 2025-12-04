import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import * as api from "@/app/libs/apiResponse";
import { getUserFromCookie } from "@/app/libs/auth";
import { format } from "date-fns";

// GET - Exportar clientes em CSV
export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromCookie();
    if (!user) {
      return api.unauthorized();
    }

    if (!user.companyId) {
      return api.badRequest("Usuário não possui empresa vinculada");
    }

    const clients = await prisma.client.findMany({
      where: {
        companyId: user.companyId,
      },
      include: {
        _count: {
          select: {
            appointments: true,
          },
        },
        appointments: {
          select: {
            id: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: "asc",
          },
          take: 1,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Gerar CSV
    const csvHeaders = [
      "Nome",
      "Email",
      "Telefone",
      "Data Cadastro",
      "Total de Agendamentos",
      "Primeiro Agendamento",
    ].join(",");

    const csvRows = clients.map((client) => {
      const nome = client.name;
      const email = client.email || "";
      const telefone = client.phone || "";
      const dataCadastro = format(new Date(client.createdAt), "dd/MM/yyyy");
      const totalAgendamentos = client._count.appointments;
      const primeiroAgendamento =
        client.appointments.length > 0
          ? format(new Date(client.appointments[0].createdAt), "dd/MM/yyyy")
          : "Nenhum";

      return [
        nome,
        email,
        telefone,
        dataCadastro,
        totalAgendamentos.toString(),
        primeiroAgendamento,
      ]
        .map((field) => `"${field}"`)
        .join(",");
    });

    const csv = [csvHeaders, ...csvRows].join("\n");

    // Adicionar BOM para suporte UTF-8 no Excel
    const bom = "\uFEFF";
    const csvWithBom = bom + csv;

    return new Response(csvWithBom, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="clientes_${format(
          new Date(),
          "yyyy-MM-dd"
        )}.csv"`,
      },
    });
  } catch (err) {
    console.error("[GET /api/clients/export] Error:", err);
    return api.serverError("Erro ao exportar clientes");
  }
}
