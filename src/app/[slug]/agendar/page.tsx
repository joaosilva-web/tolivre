"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Mail,
  Phone,
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

interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
}

interface Professional {
  id: string;
  name: string;
  services: Array<{
    service: Service;
  }>;
}

interface CompanyData {
  id: string;
  slug: string;
  title: string;
  logo?: string | null;
  primaryColor: string;
  accentColor: string;
  companyId: string;
  services: Service[];
  professionals: Professional[];
}

interface Client {
  id: string;
  name: string;
  email?: string;
  phone?: string;
}

export default function PublicBookingPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [data, setData] = useState<CompanyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Wizard state
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedProfessional, setSelectedProfessional] =
    useState<Professional | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedSlot, setSelectedSlot] = useState<AvailableSlot | null>(null);

  // Client info
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [isEditingClientInfo, setIsEditingClientInfo] = useState(false);

  // Available slots
  const [workingHours, setWorkingHours] = useState<WorkingHour[]>([]);
  const [existingAppointments, setExistingAppointments] = useState<
    UIAppointment[]
  >([]);
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [datesWithSlots, setDatesWithSlots] = useState<Set<string>>(new Set());

  // Booking
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    loadPageData();
    loadClientDataFromStorage();
  }, [slug]);

  // Carregar dados do cliente salvos no localStorage
  const loadClientDataFromStorage = () => {
    try {
      const savedClientData = localStorage.getItem("tolivre_client_data");
      if (savedClientData) {
        const clientData = JSON.parse(savedClientData);
        setClientName(clientData.name || "");
        setClientEmail(clientData.email || "");
        // Aplicar máscara ao carregar do localStorage
        if (clientData.phone) {
          setClientPhone(formatPhoneNumber(clientData.phone));
        }
        // Se tem dados salvos, não iniciar em modo de edição
        setIsEditingClientInfo(false);
      } else {
        // Se não tem dados salvos, iniciar em modo de edição
        setIsEditingClientInfo(true);
      }
    } catch (err) {
      console.error("Erro ao carregar dados do cliente:", err);
      setIsEditingClientInfo(true);
    }
  };

  // Formatar número de telefone com máscara +55 (99) 99999-9999
  const formatPhoneNumber = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, "");

    // Adiciona a máscara
    if (numbers.length === 0) return "";
    if (numbers.length <= 2) return `+${numbers}`;
    if (numbers.length <= 4)
      return `+${numbers.slice(0, 2)} (${numbers.slice(2)}`;
    if (numbers.length <= 9)
      return `+${numbers.slice(0, 2)} (${numbers.slice(2, 4)}) ${numbers.slice(4)}`;
    if (numbers.length <= 13) {
      return `+${numbers.slice(0, 2)} (${numbers.slice(2, 4)}) ${numbers.slice(4, 9)}-${numbers.slice(9)}`;
    }
    // Limita a 13 dígitos (+55 + DDD + 9 dígitos)
    return `+${numbers.slice(0, 2)} (${numbers.slice(2, 4)}) ${numbers.slice(4, 9)}-${numbers.slice(9, 13)}`;
  };

  // Handler para mudança de telefone com máscara
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setClientPhone(formatted);
  };

  // Salvar dados do cliente no localStorage
  const saveClientDataToStorage = () => {
    try {
      const clientData = {
        name: clientName.trim(),
        email: clientEmail.trim(),
        phone: clientPhone.replace(/\D/g, ""), // Salvar apenas números
      };
      localStorage.setItem("tolivre_client_data", JSON.stringify(clientData));
    } catch (err) {
      console.error("Erro ao salvar dados do cliente:", err);
    }
  };

  useEffect(() => {
    if (selectedDate && selectedProfessional && selectedService) {
      loadAvailableSlots();
    }
  }, [selectedDate, selectedProfessional, selectedService]);

  // Verificar disponibilidade de datas para os próximos 60 dias quando profissional e serviço são selecionados
  useEffect(() => {
    if (selectedProfessional && selectedService && data) {
      preloadDatesAvailability();
    }
  }, [selectedProfessional, selectedService, data]);

  // Atualizar favicon e título quando os dados carregarem
  useEffect(() => {
    if (data?.logo) {
      // Atualizar favicon
      const link =
        (document.querySelector("link[rel*='icon']") as HTMLLinkElement) ||
        document.createElement("link");
      link.type = "image/x-icon";
      link.rel = "icon";
      link.href = data.logo;
      document.getElementsByTagName("head")[0].appendChild(link);
    }

    if (data?.title) {
      // Atualizar título da página
      document.title = `Agendar - ${data.title}`;
    }

    // Cleanup: restaurar favicon e título originais ao desmontar
    return () => {
      const link = document.querySelector(
        "link[rel*='icon']",
      ) as HTMLLinkElement;
      if (link) {
        link.href = "/favicon.ico";
      }
      document.title = "ToLivre";
    };
  }, [data?.logo, data?.title]);

  const loadPageData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/public/page/${slug}`);
      if (res.ok) {
        const result = await res.json();
        setData(result.data);
      } else {
        setError("Página não encontrada");
      }
    } catch (err) {
      console.error("Erro ao carregar página:", err);
      setError("Erro ao carregar página");
    } finally {
      setLoading(false);
    }
  };

  const loadAvailableSlots = async () => {
    if (!selectedDate || !selectedProfessional || !selectedService || !data)
      return;

    try {
      setLoadingSlots(true);

      // Buscar horários de trabalho
      const whRes = await fetch(
        `/api/working-hours?companyId=${data.companyId}`,
      );
      if (whRes.ok) {
        const whData = await whRes.json();
        setWorkingHours(whData.data || []);

        // Buscar agendamentos existentes na data
        const dateStr = format(selectedDate, "yyyy-MM-dd");
        const apptRes = await fetch(
          `/api/appointments?companyId=${data.companyId}&from=${dateStr}&to=${dateStr}`,
        );

        let appointments: UIAppointment[] = [];
        if (apptRes.ok) {
          const apptData = await apptRes.json();
          const allAppointments = apptData.data || [];
          // Filtrar apenas appointments do profissional selecionado e mapear para UIAppointment
          appointments = allAppointments
            .filter(
              (appt: any) => appt.professionalId === selectedProfessional.id,
            )
            .map((appt: any) => ({
              ...appt,
              date: appt.startTime, // generateSlots espera o campo 'date'
              service: appt.service?.name || appt.serviceId || "",
            }));
        }

        setExistingAppointments(appointments);

        // Gerar slots disponíveis
        const slots = generateSlots(
          selectedDate,
          whData.data || [],
          selectedService.duration,
          appointments,
        );

        setAvailableSlots(slots);
      }
    } catch (err) {
      console.error("Erro ao carregar slots:", err);
    } finally {
      setLoadingSlots(false);
    }
  };

  const preloadDatesAvailability = async () => {
    if (!selectedProfessional || !selectedService || !data) return;

    try {
      // Buscar horários de trabalho
      const whRes = await fetch(
        `/api/working-hours?companyId=${data.companyId}`,
      );
      if (!whRes.ok) return;

      const whData = await whRes.json();
      const workHours = whData.data || [];

      if (workHours.length === 0) return;

      const datesSet = new Set<string>();
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Verificar próximos 60 dias
      for (let i = 0; i < 60; i++) {
        const checkDate = new Date(today);
        checkDate.setDate(today.getDate() + i);
        const dayIndex = checkDate.getDay();

        // Verificar se há working hours para este dia da semana
        const hasWorkingHours = workHours.some(
          (wh: WorkingHour) => wh.dayOfWeek === dayIndex,
        );

        if (hasWorkingHours) {
          // Buscar agendamentos para esta data
          const dateStr = format(checkDate, "yyyy-MM-dd");
          try {
            const apptRes = await fetch(
              `/api/appointments?companyId=${data.companyId}&from=${dateStr}&to=${dateStr}`,
            );

            let appointments: UIAppointment[] = [];
            if (apptRes.ok) {
              const apptData = await apptRes.json();
              const allAppointments = apptData.data || [];
              // Filtrar apenas appointments do profissional selecionado e mapear para UIAppointment
              appointments = allAppointments
                .filter(
                  (appt: any) =>
                    appt.professionalId === selectedProfessional.id,
                )
                .map((appt: any) => ({
                  ...appt,
                  date: appt.startTime, // generateSlots espera o campo 'date'
                  service: appt.service?.name || appt.serviceId || "",
                }));
            }

            // Gerar slots para verificar se há disponibilidade
            const slots = generateSlots(
              checkDate,
              workHours,
              selectedService.duration,
              appointments,
            );

            // Se houver pelo menos um slot disponível, adicionar ao set
            if (slots.some((slot) => slot.available)) {
              datesSet.add(dateStr);
            }
          } catch (err) {
            console.error(
              `Erro ao verificar disponibilidade para ${dateStr}:`,
              err,
            );
          }
        }
      }

      setDatesWithSlots(datesSet);
    } catch (err) {
      console.error("Erro ao pré-carregar disponibilidade:", err);
    }
  };

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    // Filtrar profissionais que oferecem este serviço
    const professionalsWithService =
      data?.professionals.filter((prof) =>
        prof.services.some((s) => s.service.id === service.id),
      ) || [];

    // Se só houver um profissional, selecionar automaticamente
    if (professionalsWithService.length === 1) {
      setSelectedProfessional(professionalsWithService[0]);
    }

    setCurrentStep(2);
  };

  const handleProfessionalSelect = (professional: Professional) => {
    setSelectedProfessional(professional);
    setCurrentStep(3);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slot: AvailableSlot) => {
    setSelectedSlot(slot);
    setCurrentStep(4);
  };

  const handleBooking = async () => {
    if (
      !selectedService ||
      !selectedProfessional ||
      !selectedDate ||
      !selectedSlot ||
      !data
    ) {
      return;
    }

    if (!clientName.trim()) {
      toast.error("Por favor, informe seu nome");
      return;
    }

    try {
      setBookingLoading(true);

      // Salvar dados do cliente no localStorage para próximas visitas
      saveClientDataToStorage();

      // Construir data/hora do agendamento
      const [hours, minutes] = selectedSlot.time.split(":").map(Number);
      const appointmentDate = new Date(selectedDate);
      appointmentDate.setHours(hours, minutes, 0, 0);

      const payload = {
        companyId: data.companyId,
        professionalId: selectedProfessional.id,
        serviceId: selectedService.id,
        clientName: clientName.trim(),
        clientEmail: clientEmail.trim() || undefined,
        clientPhone: clientPhone.replace(/\D/g, "") || undefined, // Enviar apenas números
        startTime: appointmentDate.toISOString(),
      };

      const res = await fetch("/api/appointments/public", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setBookingSuccess(true);
        setCurrentStep(5);
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Erro ao criar agendamento");
      }
    } catch (err) {
      console.error("Erro ao criar agendamento:", err);
      toast.error("Erro ao criar agendamento. Tente novamente.");
    } finally {
      setBookingLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold mb-4">Página não encontrada</h1>
          <p className="text-muted-foreground mb-6">
            A página que você está procurando não existe.
          </p>
          <Button onClick={() => router.push("/")}>Voltar ao início</Button>
        </div>
      </div>
    );
  }

  const availableProfessionals = selectedService
    ? data.professionals.filter((prof) =>
        prof.services.some((s) => s.service.id === selectedService.id),
      )
    : data.professionals;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="bg-card border-b py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <button
            onClick={() => {
              if (currentStep > 1 && !bookingSuccess) {
                setCurrentStep(currentStep - 1);
              } else {
                router.push(`/${slug}`);
              }
            }}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md transition-all hover:opacity-80 cursor-pointer"
            style={{ color: data.primaryColor }}
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
          <h1 className="text-2xl font-bold">{data.title}</h1>
          <div className="w-24" /> {/* Spacer */}
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Progress Steps */}
        {!bookingSuccess && (
          <div className="mb-12">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                      step <= currentStep
                        ? "text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                    style={{
                      backgroundColor:
                        step <= currentStep ? data.primaryColor : undefined,
                    }}
                  >
                    {step}
                  </div>
                  {step < 4 && (
                    <div
                      className={`h-1 w-16 mx-2 transition-all ${
                        step < currentStep ? "" : "bg-muted"
                      }`}
                      style={{
                        backgroundColor:
                          step < currentStep ? data.primaryColor : undefined,
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-muted-foreground">Serviço</span>
              <span className="text-xs text-muted-foreground">
                Profissional
              </span>
              <span className="text-xs text-muted-foreground">Data</span>
              <span className="text-xs text-muted-foreground">Confirmar</span>
            </div>
          </div>
        )}

        {/* Step 1: Selecionar Serviço */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center mb-8">
              Escolha o Serviço
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceSelect(service)}
                  className="bg-card border rounded-xl p-6 text-left hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{formatDuration(service.duration)}</span>
                    </div>
                    <div
                      className="text-xl font-bold"
                      style={{ color: data.primaryColor }}
                    >
                      {formatPrice(service.price)}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Selecionar Profissional */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center mb-8">
              Escolha o Profissional
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableProfessionals.map((professional) => (
                <button
                  key={professional.id}
                  onClick={() => handleProfessionalSelect(professional)}
                  className="bg-card border rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <div
                    className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-2xl"
                    style={{ backgroundColor: data.primaryColor }}
                  >
                    {professional.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .substring(0, 2)
                      .toUpperCase()}
                  </div>
                  <h3 className="text-xl font-bold">{professional.name}</h3>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Selecionar Data e Horário */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center mb-8">
              Escolha a Data e Horário
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-card border rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Selecione a Data</h3>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={(date) => {
                    // Desabilitar datas passadas
                    if (date < new Date(new Date().setHours(0, 0, 0, 0))) {
                      return true;
                    }

                    // Desabilitar datas sem horários disponíveis
                    const dateStr = format(date, "yyyy-MM-dd");
                    return !datesWithSlots.has(dateStr);
                  }}
                  locale={ptBR}
                  className="rounded-md border"
                  primaryColor={data.primaryColor}
                  accentColor={data.accentColor}
                />
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
                ) : availableSlots.filter((slot) => slot.available).length ===
                  0 ? (
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
                          onClick={() => handleSlotSelect(slot)}
                          className={`py-3 px-4 rounded-lg border font-semibold transition-all hover:shadow-lg cursor-pointer ${
                            selectedSlot?.time === slot.time
                              ? "text-white"
                              : "bg-card"
                          }`}
                          style={{
                            backgroundColor:
                              selectedSlot?.time === slot.time
                                ? data.primaryColor
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
          </div>
        )}

        {/* Step 4: Informações do Cliente */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center mb-8">
              Confirme seus Dados
            </h2>
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Resumo do Agendamento */}
              <div className="bg-card border rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">
                  Resumo do Agendamento
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle
                      className="w-5 h-5"
                      style={{ color: data.primaryColor }}
                    />
                    <span>
                      <strong>Serviço:</strong> {selectedService?.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <User
                      className="w-5 h-5"
                      style={{ color: data.primaryColor }}
                    />
                    <span>
                      <strong>Profissional:</strong>{" "}
                      {selectedProfessional?.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CalendarIcon
                      className="w-5 h-5"
                      style={{ color: data.primaryColor }}
                    />
                    <span>
                      <strong>Data:</strong>{" "}
                      {selectedDate &&
                        format(selectedDate, "dd/MM/yyyy", { locale: ptBR })}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock
                      className="w-5 h-5"
                      style={{ color: data.primaryColor }}
                    />
                    <span>
                      <strong>Horário:</strong> {selectedSlot?.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 pt-3 border-t">
                    <span
                      className="text-xl font-bold"
                      style={{ color: data.primaryColor }}
                    >
                      Total: {formatPrice(selectedService?.price || 0)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Formulário de Dados */}
              <div className="bg-card border rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Suas Informações</h3>

                {!isEditingClientInfo && clientName ? (
                  // Modo visualização - mostra mensagem de boas-vindas
                  <div className="space-y-4">
                    <p className="text-lg mb-4">
                      É bom te ver novamente,{" "}
                      <span
                        className="font-bold"
                        style={{ color: data.primaryColor }}
                      >
                        {clientName}
                      </span>
                      ! 👋
                    </p>

                    <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span>
                          <strong>Nome:</strong> {clientName}
                        </span>
                      </div>
                      {clientEmail && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span>
                            <strong>E-mail:</strong> {clientEmail}
                          </span>
                        </div>
                      )}
                      {clientPhone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span>
                            <strong>Telefone:</strong> {clientPhone}
                          </span>
                        </div>
                      )}
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsEditingClientInfo(true)}
                      className="w-full mt-4"
                    >
                      Alterar informações
                    </Button>
                  </div>
                ) : (
                  // Modo edição - mostra formulário
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Nome completo *
                      </label>
                      <input
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Seu nome"
                        className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2"
                        style={{ borderColor: data.primaryColor }}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        E-mail (opcional)
                      </label>
                      <input
                        type="email"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="seu@email.com"
                        className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Telefone *
                      </label>
                      <input
                        type="tel"
                        value={clientPhone}
                        onChange={handlePhoneChange}
                        placeholder="+55 (00) 00000-0000"
                        className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2"
                        required
                      />
                    </div>
                  </div>
                )}
              </div>

              <Button
                size="lg"
                onClick={handleBooking}
                disabled={
                  bookingLoading || !clientName.trim() || !clientPhone.trim()
                }
                className="w-full text-lg py-6 hover:opacity-90 transition-opacity text-white inline-flex items-center justify-center rounded-md font-medium cursor-pointer"
                style={{
                  backgroundColor: data.primaryColor,
                  borderColor: data.primaryColor,
                }}
              >
                {bookingLoading ? (
                  <>
                    <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                    Confirmando...
                  </>
                ) : (
                  <>
                    Confirmar Agendamento
                    <CheckCircle className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Step 5: Sucesso */}
        {bookingSuccess && currentStep === 5 && (
          <div className="text-center max-w-2xl mx-auto">
            <div
              className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{ backgroundColor: `${data.primaryColor}20` }}
            >
              <CheckCircle
                className="w-12 h-12"
                style={{ color: data.primaryColor }}
              />
            </div>
            <h2 className="text-4xl font-bold mb-4">Agendamento Confirmado!</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Seu agendamento foi realizado com sucesso. Você receberá uma
              confirmação em breve.
            </p>
            <div className="bg-card border rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">
                Detalhes do Agendamento
              </h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <CheckCircle
                    className="w-5 h-5"
                    style={{ color: data.primaryColor }}
                  />
                  <span>
                    <strong>Serviço:</strong> {selectedService?.name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <User
                    className="w-5 h-5"
                    style={{ color: data.primaryColor }}
                  />
                  <span>
                    <strong>Profissional:</strong> {selectedProfessional?.name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CalendarIcon
                    className="w-5 h-5"
                    style={{ color: data.primaryColor }}
                  />
                  <span>
                    <strong>Data:</strong>{" "}
                    {selectedDate &&
                      format(selectedDate, "dd/MM/yyyy", { locale: ptBR })}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock
                    className="w-5 h-5"
                    style={{ color: data.primaryColor }}
                  />
                  <span>
                    <strong>Horário:</strong> {selectedSlot?.time}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => router.push(`/${slug}`)}
                className="hover:opacity-90 transition-opacity text-white inline-flex items-center justify-center rounded-md font-medium cursor-pointer"
                style={{
                  backgroundColor: data.primaryColor,
                  borderColor: data.primaryColor,
                }}
              >
                Voltar para a Página Inicial
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  setCurrentStep(1);
                  setSelectedService(null);
                  setSelectedProfessional(null);
                  setSelectedDate(undefined);
                  setSelectedSlot(null);
                  setClientName("");
                  setClientEmail("");
                  setClientPhone("");
                  setBookingSuccess(false);
                }}
              >
                Fazer Outro Agendamento
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
