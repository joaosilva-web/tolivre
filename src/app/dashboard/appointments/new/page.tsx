"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import useSession from "@/hooks/useSession";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Loader2,
  ArrowLeft,
  ArrowRight,
  CalendarIcon,
  Clock,
  User,
  Scissors,
} from "lucide-react";
import { generateSlots, WorkingHour as SlotWorkingHour, AvailableSlot } from "@/lib/slotGeneration";
import { UIAppointment } from "@/lib/appointments";

interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
}

interface Professional {
  id: string;
  name: string;
}

interface ProfessionalService {
  id: string;
  professionalId: string;
  serviceId: string;
  professional: Professional;
  service: Service;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

// WorkingHour shape coming from the backend (API) — will be mapped to the slotGeneration shape
interface WorkingHourFromApi {
  id: string;
  dayOfWeek: number;
  startTime: string; // e.g. "08:00"
  endTime: string; // e.g. "17:00"
  companyId: string;
}

interface Appointment {
  id: string;
  startTime: string;
  endTime: string;
  clientName: string;
  serviceId: string;
  professionalId: string;
  companyId: string;
}

const STEPS = [
  { id: 1, title: "Serviço", description: "Selecione o serviço desejado" },
  { id: 2, title: "Cliente", description: "Informações do cliente" },
  { id: 3, title: "Data", description: "Escolha a data do agendamento" },
  { id: 4, title: "Horário", description: "Selecione o horário disponível" },
];

export default function NewAppointmentPage() {
  const router = useRouter();
  const { user } = useSession();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form data
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [clientName, setClientName] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");

  // Data
  const [services, setServices] = useState<Service[]>([]);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);

  const loadServices = useCallback(async () => {
    if (!user?.companyId) return;

    try {
      const res = await fetch(`/api/services?companyId=${user.companyId}`);
      if (res.ok) {
        const data = await res.json();
        setServices(data.data);
      }
    } catch (error) {
      console.error("Erro ao carregar serviços:", error);
    }
  }, [user?.companyId]);

  useEffect(() => {
    if (user?.companyId) {
      loadServices();
    }
  }, [user?.companyId, loadServices]);

  const loadAvailableSlots = async (date: Date) => {
    if (!user?.companyId) return;

    setLoading(true);
    try {
      // Buscar horários de trabalho da empresa (com param date)
      const workingHoursRes = await fetch(
        `/api/working-hours?companyId=${user.companyId}&date=${date
          .toISOString()
          .split("T")[0]}`
      );
      if (!workingHoursRes.ok) {
        throw new Error("Erro ao buscar horários de trabalho");
      }

      const workingHoursApi: WorkingHourFromApi[] = (
        await workingHoursRes.json()
      ).data;

      // Mapear para o formato esperado por generateSlots (openTime/closeTime)
      const workingHours: SlotWorkingHour[] = workingHoursApi.map((wh) => ({
        dayOfWeek: wh.dayOfWeek,
        openTime: wh.startTime,
        closeTime: wh.endTime,
      }));

      // Buscar agendamentos existentes para a data selecionada (intervalo)
      const from = date.toISOString().split("T")[0];
      const to = from;
      const appointmentsRes = await fetch(
        `/api/appointments?companyId=${user.companyId}&from=${from}&to=${to}`
      );
      if (!appointmentsRes.ok) {
        throw new Error("Erro ao buscar agendamentos existentes");
      }

      const existingAppointmentsApi: Appointment[] = (
        await appointmentsRes.json()
      ).data;

      // Mapear para UIAppointment[] esperado por generateSlots
      const existingAppointments: UIAppointment[] = existingAppointmentsApi.map(
        (a) => ({
          id: a.id,
          clientName: a.clientName || "",
          service: a.serviceId || "",
          serviceId: a.serviceId,
          professionalId: a.professionalId,
          professionalName: undefined,
          price: 0,
          date: a.startTime,
          status: undefined as unknown as UIAppointment["status"],
        })
      );

      const duration = selectedService?.duration || 30;

      const slots: AvailableSlot[] = generateSlots(
        date,
        workingHours,
        duration,
        existingAppointments
      );

      // Convert AvailableSlot to TimeSlot shape used by this component
      const uiSlots: TimeSlot[] = slots.map((s) => ({
        time: s.time,
        available: s.available,
      }));

      setAvailableSlots(uiSlots);
    } catch (error) {
      console.error("Erro ao carregar horários:", error);
      setAvailableSlots([]);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    handleNext();
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date && selectedService) {
      loadAvailableSlots(date);
    }
    handleNext();
  };

  const handleCreateAppointment = async () => {
    if (
      !user?.companyId ||
      !selectedService ||
      !selectedDate ||
      !selectedTime ||
      !clientName
    ) {
      return;
    }

    setLoading(true);
    try {
      const startDateTime = new Date(selectedDate);
      const [hours, minutes] = selectedTime.split(":").map(Number);
      startDateTime.setHours(hours, minutes, 0, 0);

      const endDateTime = new Date(startDateTime);
      endDateTime.setMinutes(
        endDateTime.getMinutes() + selectedService.duration
      );

      // Encontrar um profissional disponível para este serviço
      const professionalServiceRes = await fetch(
        `/api/professional-service?companyId=${user.companyId}`
      );
      if (!professionalServiceRes.ok) {
        throw new Error("Erro ao buscar profissionais para o serviço");
      }

      const professionalServices: ProfessionalService[] = (
        await professionalServiceRes.json()
      ).data;
      const availableProfessional = professionalServices.find(
        (ps) => ps.serviceId === selectedService.id
      );

      if (!availableProfessional) {
        throw new Error("Nenhum profissional disponível para este serviço");
      }

      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyId: user.companyId,
          professionalId: availableProfessional.professionalId,
          clientName,
          serviceId: selectedService.id,
          startTime: startDateTime.toISOString(),
        }),
      });

      if (res.ok) {
        router.push("/dashboard");
      } else {
        const data = await res.json();
        alert(data.error || "Erro ao criar agendamento");
      }
    } catch (error) {
      console.error("Erro ao criar agendamento:", error);
      alert("Erro ao criar agendamento");
    } finally {
      setLoading(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedService !== null;
      case 2:
        return clientName.trim().length > 0;
      case 3:
        return selectedDate !== undefined;
      case 4:
        return selectedTime !== "";
      default:
        return false;
    }
  };

  return (
    <SidebarInset>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Novo Agendamento</h1>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            {STEPS.map((step) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    step.id <= currentStep
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-muted-foreground/30 text-muted-foreground"
                  }`}
                >
                  {step.id}
                </div>
                <div className="ml-2 hidden sm:block">
                  <div
                    className={`text-sm font-medium ${
                      step.id <= currentStep
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {step.description}
                  </div>
                </div>
                {step.id < STEPS.length && (
                  <div
                    className={`w-12 h-0.5 mx-4 ${
                      step.id < currentStep
                        ? "bg-primary"
                        : "bg-muted-foreground/30"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="max-w-2xl mx-auto">
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scissors className="h-5 w-5" />
                    Selecione o Serviço
                  </CardTitle>
                  <CardDescription>
                    Escolha qual serviço deseja agendar
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map((service) => (
                      <Card
                        key={service.id}
                        className={`cursor-pointer transition-colors ${
                          selectedService?.id === service.id
                            ? "border-primary bg-primary/5"
                            : "hover:border-primary/50"
                        }`}
                        onClick={() => handleServiceSelect(service)}
                      >
                        <CardContent className="p-4">
                          <h3 className="font-medium">{service.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            R$ {service.price.toFixed(2)} • {service.duration}{" "}
                            min
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                    {services.length === 0 && (
                      <div className="col-span-full text-center py-8 text-muted-foreground">
                        Nenhum serviço disponível
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Informações do Cliente
                  </CardTitle>
                  <CardDescription>Digite o nome do cliente</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="clientName">Nome do Cliente *</Label>
                      <Input
                        id="clientName"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Digite o nome completo"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    Selecione a Data
                  </CardTitle>
                  <CardDescription>
                    Escolha a data desejada para o agendamento
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="appointmentDate">
                        Data do Agendamento *
                      </Label>
                      <Input
                        id="appointmentDate"
                        type="date"
                        value={
                          selectedDate
                            ? selectedDate.toISOString().split("T")[0]
                            : ""
                        }
                        onChange={(e) => {
                          const date = e.target.value
                            ? new Date(e.target.value)
                            : undefined;
                          handleDateSelect(date);
                        }}
                        min={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Selecione o Horário
                  </CardTitle>
                  <CardDescription>
                    Escolha um horário disponível
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                  ) : (
                    <div className="grid grid-cols-4 gap-2">
                      {availableSlots.map((slot) => (
                        <Button
                          key={slot.time}
                          variant={
                            selectedTime === slot.time ? "default" : "outline"
                          }
                          disabled={!slot.available}
                          onClick={() => setSelectedTime(slot.time)}
                          className="text-sm"
                        >
                          {slot.time}
                        </Button>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between max-w-2xl mx-auto w-full">
            <Button
              variant="outline"
              onClick={currentStep === 1 ? () => router.back() : handlePrevious}
              disabled={loading}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {currentStep === 1 ? "Voltar" : "Anterior"}
            </Button>

            {currentStep < STEPS.length ? (
              <Button onClick={handleNext} disabled={!canProceed() || loading}>
                Próximo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleCreateAppointment}
                disabled={!canProceed() || loading}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Criar Agendamento
              </Button>
            )}
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}
