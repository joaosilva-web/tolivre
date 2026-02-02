export function parseDayRange(from: string, to: string) {
  // Interpret incoming date strings `YYYY-MM-DD` as UTC dates.
  // This ensures we query appointments for the correct day regardless of server timezone.
  // Example: "2026-02-02" should query from 2026-02-02T00:00:00Z to 2026-02-02T23:59:59Z
  function parseUTC(dateStr: string) {
    const [y, m, d] = dateStr.split("-").map(Number);
    // new Date(Date.UTC(...)) constructs UTC midnight
    const dt = new Date(Date.UTC(y, (m || 1) - 1, d || 1));
    return dt;
  }

  const fromDate = parseUTC(from);
  fromDate.setUTCHours(0, 0, 0, 0);
  const toDate = parseUTC(to);
  toDate.setUTCHours(23, 59, 59, 999);
  return { fromDate, toDate };
}

export function buildAppointmentWhere(
  companyId: string,
  from: string,
  to: string
) {
  const { fromDate, toDate } = parseDayRange(from, to);
  return {
    companyId,
    startTime: { gte: fromDate, lte: toDate },
  } as const;
}

// named exports only to satisfy linting/compile rules
