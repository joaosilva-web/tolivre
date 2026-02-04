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
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="bg-card border-b py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <button
            onClick={() => router.push(`/${appointment.company.slug}`)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md transition-all hover:opacity-80 cursor-pointer"
            style={{ color: appointment.company.primaryColor }}
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
          <h1 className="text-2xl font-bold">
            {appointment.company.nomeFantasia}
          </h1>
          <div className="w-24" /> {/* Spacer */}
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">
              Escolha a Data e Horário
            </h2>
            <p className="text-muted-foreground">
              Selecione uma nova data e horário para seu atendimento
            </p>
          </div>

          {/* Dados atuais do agendamento */}
          <div className="bg-card border rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Agendamento Atual</h3>
            <div className="space-y-2 text-sm">
              <p>
                📅{" "}
                {format(
                  new Date(appointment.startTime),
                  "dd/MM/yyyy 'às' HH:mm",
                  { locale: ptBR },
                )}
              </p>
              <p>💼 {appointment.service.name}</p>
              <p>👤 {appointment.professional.name}</p>
            </div>
          </div>

          {/* Seleção de nova data e horário */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                Selecione a Data
              </h3>
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
                  primaryColor={appointment.company.primaryColor}
                  accentColor={appointment.company.accentColor}
                />
              </div>
            </div>

            <div className="bg-card border rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Horários Disponíveis</h3>
              {!selectedDate ? (
                <p className="text-muted-foreground text-center py-8">
                  Selecione uma data para ver os horários disponíveis
                </p>
              ) : loadingSlots ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : !hasAvailableSlots ? (
                <p className="text-muted-foreground text-center py-8">
                  Nenhum horário disponível nesta data
                </p>
              ) : (
                <div className="grid grid-cols-3 gap-2 max-h-96 overflow-y-auto">
                  {availableSlots
                    .filter((slot) => slot.available)
                    .map((slot) => (
                      <button
                        key={slot.time}
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-3 px-4 rounded-lg border font-semibold transition-all hover:shadow-lg cursor-pointer ${
                          selectedSlot?.time === slot.time
                            ? "text-white"
                            : "bg-card"
                        }`}
                        style={{
                          backgroundColor:
                            selectedSlot?.time === slot.time
                              ? appointment.company.primaryColor
                              : undefined,
                        }}
                      >
                        {slot.time}
                      </button>
                    ))}
                </div>
              )}
            </div>
          </div>

          {/* Botão de confirmar */}
          {selectedSlot && selectedDate && (
            <div className="bg-card border rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Confirmação</h3>
              <div
                className="p-4 rounded-lg mb-4"
                style={{
                  backgroundColor: `${appointment.company.primaryColor}15`,
                }}
              >
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
              <button
                onClick={handleReschedule}
                disabled={rescheduling}
                className="w-full py-4 px-6 rounded-lg text-white font-bold text-lg transition-all hover:opacity-90 disabled:opacity-50"
                style={{
                  backgroundColor: appointment.company.primaryColor,
                }}
              >
                {rescheduling ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Reagendando...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Confirmar Reagendamento
                  </span>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
