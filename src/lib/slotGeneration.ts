import { UIAppointment } from "./appointments";

export interface WorkingHour {
  dayOfWeek: number;
  openTime: string; // "HH:mm"
  closeTime: string; // "HH:mm"
}

export interface WorkingHourException {
  date: Date | string;
  type: "BLOCKED" | "CUSTOM" | "HOLIDAY";
  openTime?: string;
  closeTime?: string;
}

export interface AvailableSlot {
  time: string; // "HH:mm"
  available: boolean;
}

/**
 * Generate available slots for a given date, working hours, service duration and existing appointments.
 * - selectedDate: Date object representing the day to generate slots for
 * - workingHours: list of WorkingHour (server shape)
 * - durationMinutes: service duration in minutes
 * - existingAppointments: UIAppointments with full ISO date strings
 * - exceptions: list of WorkingHourException for the selected date
 */
export function generateSlots(
  selectedDate: Date,
  workingHours: WorkingHour[],
  durationMinutes: number,
  existingAppointments: UIAppointment[],
  serviceDurationMap?: Record<string, number>,
  exceptions?: WorkingHourException[],
  debug: boolean = false,
): AvailableSlot[] {
  console.log("🔍 [SLOT DEBUG] Iniciando geração de slots");
  console.log("🔍 [SLOT DEBUG] Data selecionada:", selectedDate);
  console.log(
    "🔍 [SLOT DEBUG] Appointments existentes:",
    existingAppointments.length,
  );
  console.log(
    "🔍 [SLOT DEBUG] Detalhes dos appointments:",
    existingAppointments,
  );

  const slots: AvailableSlot[] = [];
  const dayIndex = selectedDate.getDay();

  // Verificar se há exceção para este dia
  const dayException = exceptions?.find((exc) => {
    const excDate = new Date(exc.date);
    return (
      excDate.getFullYear() === selectedDate.getFullYear() &&
      excDate.getMonth() === selectedDate.getMonth() &&
      excDate.getDate() === selectedDate.getDate()
    );
  });

  // Se dia está bloqueado ou é feriado, retornar vazio
  if (
    dayException &&
    (dayException.type === "BLOCKED" || dayException.type === "HOLIDAY")
  ) {
    return slots;
  }

  // Se há exceção CUSTOM, usar horários customizados
  let effectiveWorkingHours: WorkingHour[];
  if (
    dayException &&
    dayException.type === "CUSTOM" &&
    dayException.openTime &&
    dayException.closeTime
  ) {
    effectiveWorkingHours = [
      {
        dayOfWeek: dayIndex,
        openTime: dayException.openTime,
        closeTime: dayException.closeTime,
      },
    ];
  } else {
    effectiveWorkingHours = workingHours.filter(
      (wh) => wh?.dayOfWeek === dayIndex,
    );
  }

  if (effectiveWorkingHours.length === 0) return slots;

  effectiveWorkingHours.forEach((wh) => {
    const [startHour, startMinute] = wh.openTime.split(":").map(Number);
    const [endHour, endMinute] = wh.closeTime.split(":").map(Number);

    const start = new Date(selectedDate);
    start.setHours(startHour, startMinute, 0, 0);

    const end = new Date(selectedDate);
    end.setHours(endHour, endMinute, 0, 0);

    const current = new Date(start);

    while (current.getTime() + durationMinutes * 60_000 <= end.getTime()) {
      const timeStr = current.toTimeString().slice(0, 5);

      const isOccupied = existingAppointments.some((appt) => {
        // appt.date is expected to be full ISO string (UTC or with timezone)
        const apptStart = new Date(appt.date);
        // determine appointment duration: prefer map value, fall back to provided duration
        const apptDuration = Number(
          (appt.serviceId && serviceDurationMap?.[appt.serviceId]) ??
            durationMinutes,
        );
        const apptEnd = new Date(apptStart);
        apptEnd.setMinutes(apptEnd.getMinutes() + apptDuration);

        const overlap = !(
          current.getTime() + durationMinutes * 60_000 <= apptStart.getTime() ||
          current.getTime() >= apptEnd.getTime()
        );

        if (debug) {
          // print a compact debug line for each potential overlap

          console.log(
            `[slotGeneration] slot=${timeStr} slotMs=${current.getTime()} appt=${
              appt.id
            } apptDate=${
              appt.date
            } apptStartMs=${apptStart.getTime()} apptEndMs=${apptEnd.getTime()} overlap=${overlap}`,
          );
        }

        return overlap;
      });

      slots.push({ time: timeStr, available: !isOccupied });
      current.setMinutes(current.getMinutes() + durationMinutes);
    }
  });

  return slots;
}

export default generateSlots;
