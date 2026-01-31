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

/*
 Accept NEXT_PUBLIC_APP_URL either as 'tolivre.app' or 'https://tolivre.app'.
 Normalize to a base URL without trailing slash, then append the route.
*/
node - <<'NODEJS'

const raw = process.env.NEXT_PUBLIC_APP_URL || '';
let base;
if (/^https?:\/\//i.test(raw)) {
  base = raw.replace(/\/+$/,'');
} else {
  base = `https://${raw.replace(/\/+$/,'')}`;
}
const url = `${base}/api/cron/appointment-reminders`;
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
