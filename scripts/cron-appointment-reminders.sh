#!/bin/sh
set -e

if [ -z "$NEXT_PUBLIC_APP_URL" ]; then
  echo "NEXT_PUBLIC_APP_URL not set" >&2
  exit 1
fi
if [ -z "$REMINDER_CRON_TOKEN" ]; then
  echo "REMINDER_CRON_TOKEN not set" >&2
  exit 1
fi

node - <<'NODEJS'
const url = `https://${process.env.NEXT_PUBLIC_APP_URL}/api/cron/appointment-reminders`;
const token = process.env.REMINDER_CRON_TOKEN;
(async ()=>{
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({})
    });
    const text = await res.text();
    if (!res.ok) {
      console.error('Request failed', res.status, text);
      process.exit(1);
    }
    console.log('OK', text);
  } catch (err) {
    console.error('Error', err);
    process.exit(1);
  }
})();
NODEJS
