import { hashPassword } from "@/app/libs/hash";
import prisma from "@/lib/prisma";
import { Role } from "@/app/libs/auth";

const email = process.env.MANAGEMENT_ADMIN_EMAIL || "admin@tolivre.local";
const password = process.env.MANAGEMENT_ADMIN_PASSWORD ?? "";
const name = process.env.MANAGEMENT_ADMIN_NAME || "TôLivre Admin";
const requestedCompanyId = process.env.MANAGEMENT_ADMIN_COMPANY_ID;
const role = (process.env.MANAGEMENT_ADMIN_ROLE as Role) || "MANAGER";
const companyName =
  process.env.MANAGEMENT_ADMIN_COMPANY_NAME || "TôLivre Admin";

if (!password) {
  console.error(
    "Please set MANAGEMENT_ADMIN_PASSWORD before running this script.",
  );
  process.exit(1);
}

const DEFAULT_COMPANY_PHONE = "11999999999";

async function ensureCompany() {
  if (requestedCompanyId) {
    const existing = await prisma.company.findUnique({
      where: { id: requestedCompanyId },
    });

    if (!existing) {
      throw new Error(`Company ${requestedCompanyId} not found`);
    }

    await prisma.subscription.upsert({
      where: { companyId: existing.id },
      update: {
        status: "ACTIVE",
        plan: "BUSINESS",
        currentPeriodStart: new Date(),
        updatedAt: new Date(),
      },
      create: {
        companyId: existing.id,
        plan: "BUSINESS",
        status: "ACTIVE",
        currentPeriodStart: new Date(),
      },
    });

    const updated = await prisma.company.update({
      where: { id: existing.id },
      data: {
        subscriptionStatus: "ACTIVE",
        telefone: existing.telefone || DEFAULT_COMPANY_PHONE,
        nomeFantasia: existing.nomeFantasia || companyName,
      },
    });

    return updated;
  }

  const cnpjCpf = String(Date.now()).padEnd(14, "0").slice(0, 14);

  const company = await prisma.company.create({
    data: {
      nomeFantasia: companyName,
      razaoSocial: companyName,
      cnpjCpf,
      telefone: DEFAULT_COMPANY_PHONE,
      email: "admin@tolivre.local",
      subscriptionStatus: "ACTIVE",
      whatsappEnabled: true,
    },
  });

  await prisma.subscription.create({
    data: {
      companyId: company.id,
      plan: "BUSINESS",
      status: "ACTIVE",
      currentPeriodStart: new Date(),
    },
  });

  return company;
}

async function main() {
  const hashedPassword = await hashPassword(password);
  const company = await ensureCompany();
  const user = await prisma.user.upsert({
    where: { email },
    update: {
      name,
      role,
      companyId: company.id,
      password: hashedPassword,
      emailVerified: true,
      updatedAt: new Date(),
    },
    create: {
      name,
      email,
      password: hashedPassword,
      role,
      companyId: company.id,
      emailVerified: true,
      verificationToken: null,
    },
  });

  console.log("Management admin ready:", {
    email: user.email,
    role: user.role,
    companyId: user.companyId,
    name: user.name,
  });

  if (user.companyId) {
    console.log(`Linked to company ${user.companyId}`);
  }

  console.log("Use the password you supplied to log in.");
}

main()
  .catch((error) => {
    console.error("Failed to create management admin:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
