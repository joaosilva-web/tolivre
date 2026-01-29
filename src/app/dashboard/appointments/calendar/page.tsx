"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react";
import useSession from "@/hooks/useSession";
import { WeeklyCalendar } from "@/components/weekly-calendar";
import { addWeeks, startOfWeek, endOfWeek, format } from "date-fns";
import { ptBR } from "date-fns/locale";

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

interface Professional {
  id: string;
  name: string;
}

export default function WeeklyCalendarPage() {
  const { user } = useSession();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);
  const [selectedProfessional, setSelectedProfessional] =
    useState<string>("all");

  const anchoredDate = useMemo(
    () => addWeeks(new Date(), currentWeekOffset),
    [currentWeekOffset],
  );

  const currentWeekStart = useMemo(
    () => startOfWeek(anchoredDate, { weekStartsOn: 0 }),
    [anchoredDate],
  );
  const currentWeekEnd = useMemo(
    () => endOfWeek(anchoredDate, { weekStartsOn: 0 }),
    [anchoredDate],
  );

  // Load professionals
  useEffect(() => {
    const loadProfessionals = async () => {
      if (!user?.companyId) return;

      try {
        const res = await fetch(
          `/api/professional-service?companyId=${user.companyId}`,
        );
        if (res.ok) {
          const data = await res.json();
          // Extract unique professionals
          const uniqueProfessionals = Array.from(
            new Map(
              data.data.map((ps: any) => [ps.professional.id, ps.professional]),
            ).values(),
          ) as Professional[];
          setProfessionals(uniqueProfessionals);

          // Auto-select current user if they are a professional
          if (user.id && uniqueProfessionals.some((p) => p.id === user.id)) {
            setSelectedProfessional(user.id);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar profissionais:", error);
      }
    };

    loadProfessionals();
  }, [user?.companyId, user?.id]);

  // Load appointments for current week
  const loadAppointments = useCallback(async () => {
    if (!user?.companyId) return;

    setLoading(true);
    try {
      const params = new URLSearchParams({
        companyId: user.companyId,
        fromDatetime: currentWeekStart.toISOString(),
        toDatetime: currentWeekEnd.toISOString(),
      });

      if (selectedProfessional && selectedProfessional !== "all") {
        params.append("professionalId", selectedProfessional);
      }

      const res = await fetch(`/api/appointments?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setAppointments(data.data || []);
      }
    } catch (error) {
      console.error("Erro ao carregar agendamentos:", error);
    } finally {
      setLoading(false);
    }
  }, [user?.companyId, currentWeekStart, currentWeekEnd, selectedProfessional]);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  const handleReschedule = async (
    appointmentId: string,
    newStartTime: Date,
  ) => {
    try {
      const res = await fetch(`/api/appointments/${appointmentId}/reschedule`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          newStartTime: newStartTime.toISOString(),
        }),
      });

      if (res.ok) {
        // Reload appointments to show the updated time
        loadAppointments();
      } else {
        const data = await res.json();
        alert(data.error || "Erro ao reagendar");
      }
    } catch (error) {
      console.error("Erro ao reagendar:", error);
      alert("Erro ao reagendar");
    }
  };

  const handlePreviousWeek = () => {
    setCurrentWeekOffset((prev) => prev - 1);
  };

  const handleNextWeek = () => {
    setCurrentWeekOffset((prev) => prev + 1);
  };

  const handleToday = () => {
    setCurrentWeekOffset(0);
  };

  return (
    <SidebarInset>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-6 w-6" />
              <h1 className="text-2xl font-bold">Agenda Semanal</h1>
            </div>
          </div>

          {/* Controls */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePreviousWeek}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleToday}>
                    Hoje
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleNextWeek}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <CardTitle className="ml-2">
                    {format(currentWeekStart, "dd MMM", { locale: ptBR })} -{" "}
                    {format(currentWeekEnd, "dd MMM yyyy", { locale: ptBR })}
                  </CardTitle>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Profissional:
                  </span>
                  <Select
                    value={selectedProfessional}
                    onValueChange={setSelectedProfessional}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      {professionals.map((prof) => (
                        <SelectItem key={prof.id} value={prof.id}>
                          {prof.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : (
                <WeeklyCalendar
                  appointments={appointments}
                  weekStart={currentWeekStart}
                  onReschedule={handleReschedule}
                />
              )}
            </CardContent>
          </Card>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>💡 Dica:</strong> Arraste e solte os agendamentos para
              reagendá-los rapidamente. Clique em um agendamento para ver mais
              detalhes.
            </p>
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}
