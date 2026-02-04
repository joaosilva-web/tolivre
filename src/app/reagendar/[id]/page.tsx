"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Calendar as CalendarIcon,
  Clock,
  ArrowLeft,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  generateSlots,
  WorkingHour,
  AvailableSlot,
} from "@/lib/slotGeneration";
import { UIAppointment } from "@/lib/appointments";

interface AppointmentData {
  id: string;
  clientName: string;
  clientPhone: string | null;
  startTime: string;
  endTime: string;
  status: string;
  service: {
    id: string;
    name: string;
    duration: number;
    price: number;
  };
  professional: {
    id: string;
    name: string;
  };
  company: {
    id: string;
    slug: string;
    nomeFantasia: string;
    primaryColor: string;
    accentColor: string;
  };
}

export default function ReschedulePage() {
  const params = useParams();
  const router = useRouter();
  const appointmentId = params.id as string;

  const [appointment, setAppointment] = useState<AppointmentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedSlot, setSelectedSlot] = useState<AvailableSlot | null>(null);

  const [workingHours, setWorkingHours] = useState<WorkingHour[]>([]);
  const [existingAppointments, setExistingAppointments] = useState<
    UIAppointment[]
  >([]);
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [datesWithSlots, setDatesWithSlots] = useState<Set<string>>(new Set());

  const [rescheduling, setRescheduling] = useState(false);
  const [success, setSuccess] = useState(false);

  // Matcher para habilitar apenas datas com slots disponíveis
  const dateIsAvailable = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return datesWithSlots.has(dateStr);
  };

  useEffect(() => {
    loadAppointmentData();
  }, [appointmentId]);

  useEffect(() => {
    if (appointment && selectedDate) {
      loadAvailableSlots();
    }
  }, [appointment, selectedDate]);

  const loadAppointmentData = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `/api/appointments/${appointmentId}/reschedule-data`,
      );
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || "Erro ao carregar dados do agendamento");
      }

      setAppointment(json.data.appointment);
      setWorkingHours(json.data.workingHours);
      setExistingAppointments(json.data.existingAppointments);

      console.log("🔍 [RESCHEDULE] Working hours:", json.data.workingHours);
      console.log(
        "🔍 [RESCHEDULE] Existing appointments:",
        json.data.existingAppointments,
      );

      // Pre-calcular datas com slots disponíveis para os próximos 30 dias
      const slotsMap = new Set<string>();
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      console.log(
        "🔍 [RESCHEDULE] Calculando slots para próximos 30 dias, starting from:",
        today.toISOString(),
      );

      // Criar mapa de durações dos serviços dos appointments existentes
      const serviceDurationMap: Record<string, number> = {};
      json.data.existingAppointments.forEach((appt: any) => {
        if (appt.service?.id && appt.service?.duration) {
          serviceDurationMap[appt.service.id] = appt.service.duration;
        }
      });

      for (let i = 0; i < 30; i++) {
        const checkDate = new Date(today);
        checkDate.setDate(today.getDate() + i);

        const slots = generateSlots(
          checkDate,
          json.data.workingHours,
          json.data.appointment.service.duration,
          json.data.existingAppointments,
          serviceDurationMap,
        );

        const availableSlots = slots.filter((slot) => slot.available);
        const dateStr = checkDate.toISOString().split("T")[0];

        if (availableSlots.length > 0) {
          console.log(
            `✅ [RESCHEDULE] ${dateStr}: ${availableSlots.length} slots disponíveis`,
          );
          slotsMap.add(dateStr);
        } else {
          console.log(
            `❌ [RESCHEDULE] ${dateStr}: sem slots (total: ${slots.length})`,
          );
        }
      }

      console.log("🔍 [RESCHEDULE] Datas habilitadas:", Array.from(slotsMap));
      setDatesWithSlots(slotsMap);
    } catch (err: any) {
      console.error("Error loading appointment:", err);
      setError(err.message || "Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  };

  const loadAvailableSlots = async () => {
    if (!selectedDate || !appointment) return;

    try {
      setLoadingSlots(true);

      // Criar mapa de durações dos serviços
      const serviceDurationMap: Record<string, number> = {};
      existingAppointments.forEach((appt: any) => {
        if (appt.service?.id && appt.service?.duration) {
          serviceDurationMap[appt.service.id] = appt.service.duration;
        }
      });

      const slots = generateSlots(
        selectedDate,
        workingHours,
        appointment.service.duration,
        existingAppointments.filter(
          // Excluir o agendamento atual da lista de conflitos
          (apt) => apt.id !== appointment.id,
        ),
        serviceDurationMap,
      );

      setAvailableSlots(slots);
    } catch (err) {
      console.error("Error loading slots:", err);
      toast.error("Erro ao carregar horários");
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleReschedule = async () => {
    if (!selectedSlot || !appointment || !selectedDate) return;

    try {
      setRescheduling(true);

      // Calcular startTime e endTime baseado no slot selecionado
      const [hours, minutes] = selectedSlot.time.split(":").map(Number);
      const startTime = new Date(selectedDate);
      startTime.setHours(hours, minutes, 0, 0);

      const endTime = new Date(startTime);
      endTime.setMinutes(endTime.getMinutes() + appointment.service.duration);

      const res = await fetch(`/api/appointments/${appointmentId}/reschedule`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          newStartTime: startTime.toISOString(),
          newEndTime: endTime.toISOString(),
        }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || "Erro ao reagendar");
      }

      setSuccess(true);
      toast.success("Agendamento reagendado com sucesso!");

      setTimeout(() => {
        router.push(`/${appointment.company.slug}`);
      }, 3000);
    } catch (err: any) {
      console.error("Error rescheduling:", err);
      toast.error(err.message || "Erro ao reagendar");
    } finally {
      setRescheduling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (error || !appointment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4">
            Agendamento não encontrado
          </h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button onClick={() => router.push("/")}>Voltar ao início</Button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted">
        <div className="text-center max-w-md p-8">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Reagendamento Confirmado!</h1>
          <p className="text-muted-foreground mb-2">
            Seu agendamento foi reagendado para:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-6">
            <p className="font-semibold">
              {selectedDate && selectedSlot
                ? format(
                    (() => {
                      const [hours, minutes] = selectedSlot.time
                        .split(":")
                        .map(Number);
                      const date = new Date(selectedDate);
                      date.setHours(hours, minutes, 0, 0);
                      return date;
                    })(),
                    "dd/MM/yyyy 'às' HH:mm",
                    { locale: ptBR },
                  )
                : ""}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {appointment.service.name} com {appointment.professional.name}
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            Você receberá uma confirmação por WhatsApp
          </p>
        </div>
      </div>
    );
  }

  const hasAvailableSlots = availableSlots.some((slot) => slot.available);

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-background to-muted"
      style={
        {
          "--primary": appointment.company.primaryColor,
          "--accent": appointment.company.accentColor,
        } as React.CSSProperties
      }
    >
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => router.push(`/${appointment.company.slug}`)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        <div className="bg-card rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold mb-2">Reagendar Atendimento</h1>
          <p className="text-muted-foreground mb-6">
            Escolha uma nova data e horário para seu atendimento
          </p>

          {/* Dados atuais do agendamento */}
          <div className="bg-muted p-4 rounded-lg mb-6">
            <p className="text-sm font-semibold mb-2">Agendamento Atual:</p>
            <p className="text-sm">
              📅{" "}
              {format(
                new Date(appointment.startTime),
                "dd/MM/yyyy 'às' HH:mm",
                { locale: ptBR },
              )}
            </p>
            <p className="text-sm">💼 {appointment.service.name}</p>
            <p className="text-sm">👤 {appointment.professional.name}</p>
          </div>

          {/* Seleção de nova data */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                Escolha uma nova data
              </h2>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  locale={ptBR}
                  disabled={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    if (date < today) return true;

                    const dateStr = date.toISOString().split("T")[0];
                    return !datesWithSlots.has(dateStr);
                  }}
                  className="rounded-md border"
                />
              </div>
            </div>

            {/* Seleção de horário */}
            {selectedDate && (
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Escolha um horário
                </h2>

                {loadingSlots ? (
                  <div className="text-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-primary" />
                    <p className="text-sm text-muted-foreground">
                      Carregando horários...
                    </p>
                  </div>
                ) : !hasAvailableSlots ? (
                  <div className="text-center py-8 bg-muted rounded-lg">
                    <p className="text-muted-foreground">
                      Não há horários disponíveis para esta data
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-3">
                    {availableSlots
                      .filter((slot) => slot.available)
                      .map((slot, idx) => (
                        <Button
                          key={idx}
                          variant={
                            selectedSlot === slot ? "default" : "outline"
                          }
                          onClick={() => setSelectedSlot(slot)}
                          className="w-full"
                        >
                          {slot.time}
                        </Button>
                      ))}
                  </div>
                )}
              </div>
            )}

            {/* Botão de confirmar */}
            {selectedSlot && selectedDate && (
              <div className="pt-4 border-t">
                <div className="bg-primary/10 p-4 rounded-lg mb-4">
                  <p className="text-sm font-semibold mb-1">Novo horário:</p>
                  <p className="text-lg font-bold">
                    {format(
                      (() => {
                        const [hours, minutes] = selectedSlot.time
                          .split(":")
                          .map(Number);
                        const date = new Date(selectedDate);
                        date.setHours(hours, minutes, 0, 0);
                        return date;
                      })(),
                      "dd/MM/yyyy 'às' HH:mm",
                      { locale: ptBR },
                    )}
                  </p>
                </div>
                <Button
                  onClick={handleReschedule}
                  disabled={rescheduling}
                  className="w-full"
                  size="lg"
                >
                  {rescheduling ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Reagendando...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Confirmar Reagendamento
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
