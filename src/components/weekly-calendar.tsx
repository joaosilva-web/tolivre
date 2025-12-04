"use client";

import { useState, useEffect, useCallback } from "react";
import { format, startOfWeek, addDays, isSameDay, addWeeks, subWeeks } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import {
  DndContext,
  DragOverlay,
} from "@dnd-kit/core";
import { AppointmentCard } from "./appointment-card";
import { TimeSlot } from "./time-slot";

interface Appointment {
  id: string;
  startTime: string;
  endTime: string;
  clientName: string;
  serviceName: string;
  status: string;
  professionalId: string;
}

interface WeeklyCalendarProps {
  appointments: Appointment[];
  professionalId: string;
  onReschedule: (appointmentId: string, newStartTime: string) => Promise<void>;
}

export function WeeklyCalendar({ appointments, professionalId, onReschedule }: WeeklyCalendarProps) {
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { locale: ptBR }));
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isRescheduling, setIsRescheduling] = useState(false);

  // Gerar slots de horário (8h às 20h com intervalos de 30min)
  const timeSlots = [];
  for (let hour = 8; hour < 20; hour++) {
    timeSlots.push(`${hour.toString().padStart(2, "0")}:00`);
    timeSlots.push(`${hour.toString().padStart(2, "0")}:30`);
  }

  // Gerar dias da semana
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeek, i));

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    const appointmentId = active.id as string;
    const droppedOn = over.id as string; // formato: "day-YYYY-MM-DD-time-HH:mm"

    if (droppedOn.startsWith("day-")) {
      const parts = droppedOn.split("-");
      const dateStr = `${parts[1]}-${parts[2]}-${parts[3]}`; // YYYY-MM-DD
      const timeStr = `${parts[5]}:${parts[6]}`; // HH:mm

      const newStartTime = new Date(`${dateStr}T${timeStr}:00`).toISOString();

      setIsRescheduling(true);
      try {
        await onReschedule(appointmentId, newStartTime);
      } catch (error) {
        console.error("Erro ao reagendar:", error);
      } finally {
        setIsRescheduling(false);
      }
    }

    setActiveId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const getAppointmentsForDayAndTime = (day: Date, time: string) => {
    return appointments.filter((apt) => {
      const aptDate = new Date(apt.startTime);
      const aptTime = format(aptDate, "HH:mm");
      return isSameDay(aptDate, day) && aptTime === time;
    });
  };

  const activeAppointment = activeId
    ? appointments.find((apt) => apt.id === activeId)
    : null;

  return (
    <Card className="p-6">
      {/* Header com navegação de semana */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5" />
          <h2 className="text-xl font-semibold">
            {format(currentWeek, "dd MMM", { locale: ptBR })} -{" "}
            {format(addDays(currentWeek, 6), "dd MMM yyyy", { locale: ptBR })}
          </h2>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentWeek(subWeeks(currentWeek, 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentWeek(startOfWeek(new Date(), { locale: ptBR }))}
          >
            Hoje
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Grid do calendário */}
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div className="overflow-x-auto">
          <div className="grid grid-cols-8 gap-px bg-gray-200 border rounded-lg min-w-[1000px]">
            {/* Header com dias da semana */}
            <div className="bg-gray-50 p-2 font-semibold text-sm text-center">
              Horário
            </div>
            {weekDays.map((day) => (
              <div
                key={day.toISOString()}
                className={`bg-gray-50 p-2 font-semibold text-sm text-center ${
                  isSameDay(day, new Date()) ? "bg-blue-50 text-blue-600" : ""
                }`}
              >
                <div>{format(day, "EEE", { locale: ptBR })}</div>
                <div className="text-lg">{format(day, "dd")}</div>
              </div>
            ))}

            {/* Grid de horários */}
            {timeSlots.map((time) => (
              <>
                {/* Coluna de horário */}
                <div
                  key={`time-${time}`}
                  className="bg-white p-2 text-xs text-gray-600 text-right border-r"
                >
                  {time}
                </div>

                {/* Células para cada dia */}
                {weekDays.map((day) => {
                  const dayAppointments = getAppointmentsForDayAndTime(day, time);
                  const slotId = `day-${format(day, "yyyy-MM-dd")}-time-${time}`;

                  return (
                    <TimeSlot
                      key={slotId}
                      id={slotId}
                      appointments={dayAppointments}
                      isActive={isRescheduling}
                    />
                  );
                })}
              </>
            ))}
          </div>
        </div>

        {/* Overlay durante drag */}
        <DragOverlay>
          {activeAppointment ? (
            <AppointmentCard appointment={activeAppointment} isDragging />
          ) : null}
        </DragOverlay>
      </DndContext>
    </Card>
  );
}
