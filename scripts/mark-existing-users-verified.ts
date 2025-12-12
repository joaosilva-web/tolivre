// Script para marcar usuários existentes como verificados
// Rodar com: npx tsx scripts/mark-existing-users-verified.ts

import prisma from "../src/lib/prisma";

async function main() {
  console.log("Marcando usuários existentes como verificados...");

  const result = await prisma.user.updateMany({
    where: {
      emailVerified: false,
    },
    data: {
      emailVerified: true,
      verificationToken: null,
      verificationSentAt: null,
    },
  });

  console.log(`✅ ${result.count} usuários marcados como verificados`);
}

main()
  .catch((e) => {
    console.error("❌ Erro:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
