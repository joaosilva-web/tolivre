"use client";

import { useDraggable } from "@dnd-kit/core";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User } from "lucide-react";
import { format } from "date-fns";

interface Appointment {
  id: string;
  startTime: string;
  clientName: string;
  service: {
    name: string;
    duration: number;
  };
}

interface AppointmentCardProps {
  appointment: Appointment;
  isDragging?: boolean;
}

export function AppointmentCard({ appointment, isDragging }: AppointmentCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: appointment.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  // Calculate end time based on duration
  const endTime = new Date(new Date(appointment.startTime).getTime() + appointment.service.duration * 60000);

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        p-2 cursor-grab active:cursor-grabbing
        bg-blue-100 text-blue-800 border-blue-200
        ${isDragging ? "opacity-50 shadow-lg" : ""}
        hover:shadow-md transition-shadow
        border-l-4
      `}
    >
      <div className="space-y-1">
        <div className="flex items-center gap-1 text-xs">
          <Clock className="h-3 w-3" />
          <span className="font-medium">
            {format(new Date(appointment.startTime), "HH:mm")} -{" "}
            {format(endTime, "HH:mm")}
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs">
          <User className="h-3 w-3" />
          <span className="font-medium truncate">{appointment.clientName}</span>
        </div>
        <p className="text-xs text-gray-600 truncate">{appointment.service.name}</p>
        <p className="text-[10px] text-gray-500">{appointment.service.duration} min</p>
      </div>
    </Card>
  );
}
