"use client";

import { useDroppable } from "@dnd-kit/core";
import { AppointmentCard } from "./appointment-card";

interface Appointment {
  id: string;
  startTime: string;
  clientName: string;
  service: {
    name: string;
    duration: number;
  };
}

interface TimeSlotProps {
  id: string;
  appointments: Appointment[];
  isActive: boolean;
}

export function TimeSlot({ id, appointments, isActive }: TimeSlotProps) {
  const { isOver, setNodeRef } = useDroppable({
    id,
    disabled: isActive,
  });

  return (
    <div
      ref={setNodeRef}
      className={`
        bg-white p-1 min-h-[60px] border-b border-r
        transition-colors
        ${isOver ? "bg-blue-50 ring-2 ring-blue-400" : ""}
        ${appointments.length > 0 ? "bg-gray-50" : ""}
      `}
    >
      <div className="space-y-1">
        {appointments.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </div>
    </div>
  );
}
