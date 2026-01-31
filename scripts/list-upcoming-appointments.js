#!/usr/bin/env node
/*
 Simple diagnostic script to list upcoming appointments from the DB.
 Usage:
  NODE_ENV=production DATABASE_URL=... node scripts/list-upcoming-appointments.js --hoursBefore=3 --windowMinutes=30 --limit=50 [--companyId=abc]
*/
const parseArgs = () => {
  const args = {};
  for (const a of process.argv.slice(2)) {
    const m = a.match(/^--([^=]+)=?(.*)$/);
    if (m) args[m[1]] = m[2] || true;
  }
  return args;
};

const args = parseArgs();
const hoursBefore = Number(args.hoursBefore || process.env.APPOINTMENT_REMINDER_HOURS_BEFORE || 3);
const windowMinutes = Number(args.windowMinutes || process.env.APPOINTMENT_REMINDER_WINDOW_MINUTES || 30);
const limit = Number(args.limit || process.env.APPOINTMENT_REMINDER_BATCH_SIZE || 50);
const companyId = args.companyId || null;

async function main(){
  // reuse project's prisma client
  const prisma = require('../src/lib/prisma').default;

  const now = new Date();
  const windowStart = new Date(now.getTime() + hoursBefore * 60 * 60 * 1000);
  const windowEnd = new Date(windowStart.getTime() + windowMinutes * 60 * 1000);

  console.log('Now:        ', now.toISOString());
  console.log('WindowStart:', windowStart.toISOString());
  console.log('WindowEnd:  ', windowEnd.toISOString());
  console.log('Limit:', limit, 'CompanyId filter:', companyId || 'none');

  const where = {
    startTime: { gte: windowStart, lt: windowEnd },
    status: { in: ['PENDING','CONFIRMED'] },
    reminderSentAt: null,
    client: { phone: { not: null } },
  };
  if (companyId) where.companyId = companyId;

  const items = await prisma.appointment.findMany({
    where,
    include: {
      client: true,
      professional: { select: { name: true } },
      service: { select: { name: true } },
      company: { select: { nomeFantasia: true, contrato: true, subscription: { select: { status: true, plan: true } } } },
    },
    take: limit,
    orderBy: { startTime: 'asc' },
  });

  console.log('Found', items.length, 'appointments:');
  for (const a of items) {
    console.log('---');
    console.log('id:', a.id);
    console.log('startTime:', a.startTime.toISOString());
    console.log('status:', a.status, 'reminderSentAt:', a.reminderSentAt);
    console.log('company:', a.company?.nomeFantasia, 'companyId:', a.companyId);
    console.log('company.subscription.status:', a.company?.subscription?.status);
    console.log('client.phone:', a.client?.phone);
    console.log('service:', a.service?.name, 'professional:', a.professional?.name);
    console.log('clientName:', a.clientName || a.client?.name);
  }

  await prisma.$disconnect();
}

main().catch((e)=>{ console.error(e); process.exit(1); });
