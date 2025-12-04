"use client";

import { useDraggable } from "@dnd-kit/core";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User } from "lucide-react";
import { format } from "date-fns";

interface Appointment {
  id: string;
  startTime: string;
  endTime: string;
  clientName: string;
  serviceName: string;
  status: string;
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

  const statusColors = {
    PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
    CONFIRMED: "bg-blue-100 text-blue-800 border-blue-200",
    COMPLETED: "bg-green-100 text-green-800 border-green-200",
    CANCELED: "bg-gray-100 text-gray-800 border-gray-200",
  };

  const statusLabels = {
    PENDING: "Pendente",
    CONFIRMED: "Confirmado",
    COMPLETED: "Concluído",
    CANCELED: "Cancelado",
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        p-2 cursor-grab active:cursor-grabbing
        ${statusColors[appointment.status as keyof typeof statusColors] || "bg-gray-100"}
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
            {format(new Date(appointment.endTime), "HH:mm")}
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs">
          <User className="h-3 w-3" />
          <span className="font-medium truncate">{appointment.clientName}</span>
        </div>
        <p className="text-xs text-gray-600 truncate">{appointment.serviceName}</p>
        <Badge variant="outline" className="text-[10px] px-1 py-0">
          {statusLabels[appointment.status as keyof typeof statusLabels]}
        </Badge>
      </div>
    </Card>
  );
}
