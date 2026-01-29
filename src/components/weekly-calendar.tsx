"use client";

import { useState, useEffect, useCallback } from "react";
import { format, addDays, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  DndContext,
  DragOverlay,
} from "@dnd-kit/core";
import { AppointmentCard } from "./appointment-card";
import { TimeSlot } from "./time-slot";

interface Appointment {
  id: string;
  startTime: string;
  clientName: string;
  service: {
    name: string;
    duration: number;
  };
  professional: {
    id: string;
    name: string;
  };
}

interface WeeklyCalendarProps {
  appointments: Appointment[];
  weekStart: Date;
  onReschedule: (appointmentId: string, newStartTime: Date) => Promise<void>;
}

export function WeeklyCalendar({ appointments, weekStart, onReschedule }: WeeklyCalendarProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isRescheduling, setIsRescheduling] = useState(false);

  // Gerar slots de horário (8h às 20h com intervalos de 30min)
  const timeSlots = [];
  for (let hour = 8; hour < 20; hour++) {
    timeSlots.push(`${hour.toString().padStart(2, "0")}:00`);
    timeSlots.push(`${hour.toString().padStart(2, "0")}:30`);
  }

  // Gerar dias da semana
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

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
      // Remove o prefixo "day-" e separa a data e hora
      const withoutPrefix = droppedOn.substring(4); // remove "day-"
      const timeIndex = withoutPrefix.indexOf("-time-");
      
      if (timeIndex === -1) {
        console.error("Formato de ID inválido:", droppedOn);
        setActiveId(null);
        return;
      }
      
      const dateStr = withoutPrefix.substring(0, timeIndex); // YYYY-MM-DD
      const timeStr = withoutPrefix.substring(timeIndex + 6); // HH:mm (remove "-time-")

      const newStartTime = new Date(`${dateStr}T${timeStr}:00`);
      
      // Validar se a data é válida
      if (isNaN(newStartTime.getTime())) {
        console.error("Data inválida criada:", { dateStr, timeStr, droppedOn });
        setActiveId(null);
        return;
      }

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
    <div>
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
    </div>
  );
}
