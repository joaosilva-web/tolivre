# Tasks

- [x] Remove the WhatsApp input from `src/app/dashboard/company/page-settings/page.tsx` so owners can no longer stash their own number for public notifications; add a short helper note explaining that confirmations run through the official TôLivre channel.
- [x] Update `src/app/dashboard/onboarding/page.tsx` so step 4 simply highlights that the official TôLivre WhatsApp is used (no skip/config flows) and always routes back to the dashboard after finishing.
- [x] Simplify `src/app/dashboard/integrations/page.tsx` to clarify that WhatsApp messages are sent via TôLivre’s official number and remove the “connect your phone” UX entirely.
- [x] Design the new TôLivre management dashboard shell (`/dashboard/management` or similar) that surfaces all relevant metrics (appointments volume, revenue run rate, active professionals, average rating) and a CTA to open the WhatsApp communication panel.
- [x] Implement the UI/UX for that dashboard: cards, charts, timeline filters, KPI rows, and contextual help explaining how the official WhatsApp channel will deliver notifications for users.
- [x] Build or reuse backend APIs (Prisma/Next) that aggregate the required metrics per `companyId` and expose them to the dashboard page; ensure all queries include `companyId` and apply advisory locking or caching as needed.
- [x] Connect the dashboard to the official WhatsApp channel so admins can trigger or preview outbound messages (confirmations, reminders, alerts) directly from the UI, calling the centralized notification API instead of connecting a personal number.
  - QR/polling flow now lives on the management dashboard and the preview action calls `/api/dashboard/management/uazapi/send`.
- [x] Add WhatsApp instance management actions (disconnect/delete) to the management dashboard and route them to the Uazapi endpoints.
- [x] Wire the dashboard entry into the sidebar (replacing the removed integrations link) and ensure navigation guards, localization, and analytics tracking know about the new route.
- [x] Create a management admin account.
  - Provision an OWNER or MANAGER user (via Prisma seed or API) who can log in and reach `/dashboard/management`; store the credentials securely for QA validation. Credentials: admin-test@tolivre.local / Test#1234 (company cmky3dzcb00009dhwaalh09ka, active business plan).
