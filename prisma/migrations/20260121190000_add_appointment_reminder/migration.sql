-- Add reminder tracking to appointments
ALTER TABLE "Appointment" ADD COLUMN "reminderSentAt" TIMESTAMPTZ;
CREATE INDEX IF NOT EXISTS "Appointment_startTime_idx" ON "Appointment"("startTime");
CREATE INDEX IF NOT EXISTS "Appointment_reminderSentAt_idx" ON "Appointment"("reminderSentAt");
