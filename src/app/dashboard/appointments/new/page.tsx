"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import useSession from "@/hooks/useSession";
import { SiteHeader } from "@/components/site-header";
import { toast } from "sonner";
import { SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  generateSlots,
  WorkingHour as SlotWorkingHour,
  AvailableSlot,
} from "@/lib/slotGeneration";
import { UIAppointment } from "@/lib/appointments";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

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

interface Client {
  id: string;
  name: string;
  email?: string;
  phone?: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

// WorkingHour shape coming from the backend (API) — will be mapped to the slotGeneration shape
interface WorkingHourFromApi {
  id: string;
  dayOfWeek: number;
  // backend returns openTime/closeTime
  openTime: string; // e.g. "08:00"
  closeTime: string; // e.g. "17:00"
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
  // clients state is intentionally omitted; we use server-side search and keep created client in selection
  const [searchResults, setSearchResults] = useState<Client[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [clientQuery, setClientQuery] = useState("");
  const [creatingClient, setCreatingClient] = useState(false);
  const [newClientName, setNewClientName] = useState("");
  const [newClientEmail, setNewClientEmail] = useState("");
  const [newClientPhone, setNewClientPhone] = useState("");
  // store date as a Date object
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  
  // Recurrence fields
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrenceRule, setRecurrenceRule] = useState<"WEEKLY" | "BIWEEKLY" | "MONTHLY">("WEEKLY");
  const [recurrenceEndDate, setRecurrenceEndDate] = useState<Date | undefined>();

  // Data
  const [services, setServices] = useState<Service[]>([]);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [datesWithSlots, setDatesWithSlots] = useState<Set<string>>(new Set());

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

  // server-side live search for clients (paginated)
  const searchClients = useCallback(
    async (q: string, page = 1) => {
      if (!user?.companyId) return;
      try {
        const res = await fetch(
          `/api/clients?companyId=${user.companyId}&q=${encodeURIComponent(
            q
          )}&page=${page}&pageSize=10`
        );
        if (res.ok) {
          const payload = await res.json();
          // payload is ApiEnvelope: { success: true, data: ... }
          const body = payload?.data ?? payload;

          // body may be either an array OR an object { data: clients[], total, page }
          let clientsArr: Client[] = [];
          if (Array.isArray(body)) {
            clientsArr = body as Client[];
          } else if (Array.isArray(body?.data)) {
            clientsArr = body.data as Client[];
          }

          setSearchResults(clientsArr);
          // open dropdown whenever there's a query (even if there are no results)
          // so the user can create a new client when nothing matches
          setDropdownOpen(q.trim().length > 0);
        } else {
          setSearchResults([]);
          setDropdownOpen(false);
        }
      } catch (err) {
        console.error("Erro ao buscar clientes:", err);
        setSearchResults([]);
      }
    },
    [user?.companyId]
  );

  const searchDebounceRef = useRef<number | null>(null);

  useEffect(() => {
    if (user?.companyId) {
      loadServices();
      // don't auto-load all clients; we will perform live search when user types
    }
  }, [user?.companyId, loadServices]);

  // Pré-carregar disponibilidade de datas (próximos 60 dias)
  const preloadDatesAvailability = useCallback(async () => {
    if (!selectedService || !user?.companyId) return;

    const datesSet = new Set<string>();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Verifica os próximos 60 dias
    for (let i = 0; i < 60; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() + i);
      const dateStr = format(checkDate, "yyyy-MM-dd");

      try {
        // Buscar horários de trabalho
        const whRes = await fetch(
          `/api/working-hours?companyId=${user.companyId}`
        );
        if (!whRes.ok) continue;
        const whData = await whRes.json();
        const workingHours = whData?.data || [];

        // Buscar agendamentos
        const from = new Date(checkDate);
        from.setHours(0, 0, 0, 0);
        const to = new Date(checkDate);
        to.setHours(23, 59, 59, 999);

        const apptRes = await fetch(
          `/api/appointments?companyId=${user.companyId}&from=${from.toISOString()}&to=${to.toISOString()}`
        );
        if (!apptRes.ok) continue;
        const apptData = await apptRes.json();
        const allAppointments = apptData?.data || [];

        // Mapear appointments para formato UIAppointment
        const appointments = allAppointments.map((appt: any) => ({
          ...appt,
          date: appt.startTime,
        }));

        // Gerar slots para verificar disponibilidade
        const slots = generateSlots(
          checkDate,
          workingHours,
          selectedService.duration,
          appointments
        );

        // Se houver pelo menos um slot disponível, adiciona a data
        if (slots.some((slot) => slot.available)) {
          datesSet.add(dateStr);
        }
      } catch (err) {
        console.error(`Erro ao verificar disponibilidade para ${dateStr}:`, err);
      }
    }

    setDatesWithSlots(datesSet);
  }, [selectedService, user?.companyId]);

  // Pré-carregar disponibilidade de datas quando serviço é selecionado
  useEffect(() => {
    if (selectedService && user?.companyId) {
      preloadDatesAvailability();
    }
  }, [selectedService, user?.companyId, preloadDatesAvailability]);

  const loadAvailableSlots = async (date: Date) => {
    if (!user?.companyId) return;

    setLoading(true);
    try {
      // Build local YYYY-MM-DD string from the provided date (avoid UTC shift)
      const pad = (n: number) => String(n).padStart(2, "0");
      const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
        date.getDate()
      )}`;

      // Buscar horários de trabalho da empresa (com param date)
      const workingHoursRes = await fetch(
        `/api/working-hours?companyId=${user.companyId}&date=${dateStr}`
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
        openTime: wh.openTime,
        closeTime: wh.closeTime,
      }));

      // Buscar agendamentos existentes para a data selecionada (intervalo)
      const from = dateStr;
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
          professionalName:
            undefined as unknown as UIAppointment["professionalName"],
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
    if (date) {
      handleNext();
    }
  };

  const handleCreateAppointment = async () => {
    if (
      !user?.companyId ||
      !selectedService ||
      !selectedDate ||
      !selectedTime ||
      // allow creating a new client inline: either an existing clientName or a newClientName is required
      !(clientName || newClientName)
    ) {
      return;
    }

    setLoading(true);
    try {
      // If the user chose to create a new client inline but didn't press the "Criar Cliente" button,
      // create it here before creating the appointment. This makes the flow more resilient.
      let resolvedClientId =
        selectedClientId && selectedClientId !== "__new"
          ? selectedClientId
          : undefined;

      if (selectedClientId === "__new" && newClientName.trim()) {
        setCreatingClient(true);
        try {
          const createRes = await fetch("/api/clients", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              companyId: user.companyId,
              name: newClientName,
              email: newClientEmail || undefined,
              phone: newClientPhone || undefined,
            }),
          });
          if (createRes.ok) {
            const createdPayload = await createRes.json();
            const createdClient = createdPayload.data || createdPayload;
            resolvedClientId = createdClient.id;
            setSelectedClientId(createdClient.id);
            setClientName(createdClient.name);
            setNewClientName("");
            setNewClientEmail("");
            setNewClientPhone("");
          } else {
            const err = await createRes.json().catch(() => null);
            // If creating the client failed, stop and show error
            alert(err?.error || "Erro ao criar cliente");
            setCreatingClient(false);
            return;
          }
        } catch (err) {
          console.error("Erro ao criar cliente (inline):", err);
          alert("Erro ao criar cliente");
          setCreatingClient(false);
          return;
        } finally {
          setCreatingClient(false);
        }
      }

      // Build start Date in local time from Date object + selectedTime to avoid UTC day-shift
      if (!selectedDate) {
        toast.error("Selecione uma data");
        return;
      }
      const [hours, minutes] = selectedTime.split(":").map(Number);
      const startDateTime = new Date(selectedDate);
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

      // Use recurring API if recurrence is enabled
      const apiUrl = isRecurring ? "/api/appointments/recurring" : "/api/appointments";
      
      const payload: any = {
        companyId: user.companyId,
        professionalId: availableProfessional.professionalId,
        clientName,
        clientId: resolvedClientId,
        serviceId: selectedService.id,
        startTime: startDateTime.toISOString(),
      };

      // Add recurrence fields if enabled
      if (isRecurring && recurrenceEndDate) {
        // Set end date to end of day
        const endDate = new Date(recurrenceEndDate);
        endDate.setHours(23, 59, 59, 999);
        payload.recurrenceRule = recurrenceRule;
        payload.recurrenceEndDate = endDate.toISOString();
      }

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        const message = isRecurring 
          ? `${data.data.totalCreated || 1} agendamentos criados com sucesso!`
          : "Agendamento criado com sucesso!";
        toast.success(message);
        router.push("/dashboard");
      } else {
        const data = await res.json();
        toast.error(data.error || "Erro ao criar agendamento");
      }
    } catch (error) {
      console.error("Erro ao criar agendamento:", error);
      toast.error("Erro ao criar agendamento");
    } finally {
      setLoading(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedService !== null;
      case 2:
        // if creating a new client inline, validate newClientName; otherwise validate clientName
        if (selectedClientId === "__new")
          return newClientName.trim().length > 0;
        return clientName.trim().length > 0;
      case 3:
        return selectedDate !== undefined;
      case 4:
        if (!selectedTime) return false;
        if (isRecurring && !recurrenceEndDate) return false;
        return true;
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
          <div className="w-full mx-auto">
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
                      <Label htmlFor="existingClient">Procurar Cliente</Label>
                      <div className="relative">
                        <Input
                          id="existingClient"
                          placeholder="Pesquisar por nome ou email..."
                          value={clientQuery}
                          onChange={(e) => {
                            const q = e.target.value;
                            setClientQuery(q);
                            // update visible name while typing
                            setClientName(q);
                            setSelectedClientId(null);
                            if (searchDebounceRef.current)
                              window.clearTimeout(searchDebounceRef.current);
                            searchDebounceRef.current = window.setTimeout(
                              () => {
                                if (!q || q.trim().length === 0) {
                                  setSearchResults([]);
                                  setDropdownOpen(false);
                                  return;
                                }
                                searchClients(q, 1);
                                setFocusedIndex(-1);
                              },
                              250
                            ) as unknown as number;
                          }}
                          onKeyDown={(e) => {
                            if (!dropdownOpen) return;
                            if (e.key === "ArrowDown") {
                              e.preventDefault();
                              setFocusedIndex((fi) =>
                                Math.min(fi + 1, searchResults.length - 1)
                              );
                            } else if (e.key === "ArrowUp") {
                              e.preventDefault();
                              setFocusedIndex((fi) => Math.max(fi - 1, 0));
                            } else if (e.key === "Enter") {
                              if (
                                focusedIndex >= 0 &&
                                searchResults[focusedIndex]
                              ) {
                                const c = searchResults[focusedIndex];
                                setSelectedClientId(c.id);
                                setClientName(c.name);
                                setClientQuery("");
                                setDropdownOpen(false);
                                setSearchResults([]);
                              }
                            } else if (e.key === "Escape") {
                              setDropdownOpen(false);
                            }
                          }}
                        />

                        {dropdownOpen && (
                          <div
                            role="listbox"
                            aria-labelledby="existingClient"
                            className="absolute z-20 left-0 right-0 bg-popover border rounded mt-1 max-h-56 overflow-auto"
                          >
                            {searchResults.length > 0 ? (
                              searchResults.map((c, idx) => {
                                const isFocused = idx === focusedIndex;
                                const q = clientQuery;
                                const highlight = (text: string) => {
                                  if (!q) return text;
                                  const idx = text
                                    .toLowerCase()
                                    .indexOf(q.toLowerCase());
                                  if (idx === -1) return text;
                                  const before = text.slice(0, idx);
                                  const match = text.slice(idx, idx + q.length);
                                  const after = text.slice(idx + q.length);
                                  return (
                                    <>
                                      {before}
                                      <span className="bg-yellow-100 text-yellow-900 px-0.5">
                                        {match}
                                      </span>
                                      {after}
                                    </>
                                  );
                                };

                                return (
                                  <button
                                    key={c.id}
                                    role="option"
                                    aria-selected={isFocused}
                                    className={`w-full text-left px-3 py-2 hover:bg-muted-foreground/5 flex flex-col ${
                                      isFocused ? "bg-muted-foreground/5" : ""
                                    }`}
                                    onMouseEnter={() => setFocusedIndex(idx)}
                                    onClick={() => {
                                      setSelectedClientId(c.id);
                                      setClientName(c.name);
                                      setClientQuery("");
                                      setDropdownOpen(false);
                                      setSearchResults([]);
                                    }}
                                  >
                                    <div className="font-medium">
                                      {highlight(c.name)}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                      {highlight(c.email || "")}
                                    </div>
                                  </button>
                                );
                              })
                            ) : (
                              <div className="px-3 py-2 text-sm text-muted-foreground">
                                Nenhum cliente encontrado
                              </div>
                            )}

                            <div className="px-3 py-2 border-t">
                              <button
                                className="text-sm text-primary"
                                onClick={() => {
                                  setSelectedClientId("__new");
                                  setClientQuery("");
                                  setDropdownOpen(false);
                                }}
                              >
                                Criar novo cliente
                              </button>
                            </div>
                          </div>
                        )}

                        {selectedClientId && selectedClientId !== "__new" && (
                          <div className="mt-2 text-sm text-muted-foreground">
                            Cliente selecionado: {clientName}
                            <a
                              className="ml-2 text-primary underline"
                              href={`/dashboard/clients/${selectedClientId}`}
                            >
                              Ver cliente
                            </a>
                          </div>
                        )}
                      </div>
                    </div>

                    {selectedClientId === "__new" || creatingClient ? (
                      <div className="p-2 border rounded space-y-2">
                        <Label htmlFor="newClientName">Nome *</Label>
                        <Input
                          id="newClientName"
                          value={newClientName}
                          onChange={(e) => setNewClientName(e.target.value)}
                          placeholder="Nome do cliente"
                        />
                        <Label htmlFor="newClientEmail">Email</Label>
                        <Input
                          id="newClientEmail"
                          value={newClientEmail}
                          onChange={(e) => setNewClientEmail(e.target.value)}
                          placeholder="email@exemplo.com"
                        />
                        <Label htmlFor="newClientPhone">Telefone</Label>
                        <Input
                          id="newClientPhone"
                          value={newClientPhone}
                          onChange={(e) => setNewClientPhone(e.target.value)}
                          placeholder="(00) 00000-0000"
                        />
                        <div className="flex gap-2 mt-2">
                          <Button
                            onClick={async () => {
                              if (!user?.companyId) return;
                              if (!newClientName.trim()) {
                                toast.error("Nome do cliente é obrigatório");
                                return;
                              }
                              setCreatingClient(true);
                              try {
                                const res = await fetch("/api/clients", {
                                  method: "POST",
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                  body: JSON.stringify({
                                    companyId: user.companyId,
                                    name: newClientName,
                                    email: newClientEmail || undefined,
                                    phone: newClientPhone || undefined,
                                  }),
                                });
                                if (res.ok) {
                                  const created = await res.json();
                                  const client = created.data || created;
                                  setSelectedClientId(client.id);
                                  setClientName(client.name);
                                  setNewClientName("");
                                  setNewClientEmail("");
                                  setNewClientPhone("");
                                } else {
                                  const err = await res
                                    .json()
                                    .catch(() => null);
                                  toast.error(err?.error || "Erro ao criar cliente");
                                }
                              } catch (err) {
                                console.error(err);
                                toast.error("Erro ao criar cliente");
                              } finally {
                                setCreatingClient(false);
                              }
                            }}
                          >
                            Criar Cliente
                          </Button>

                          <Button
                            variant="outline"
                            onClick={() => {
                              setSelectedClientId(null);
                              setCreatingClient(false);
                            }}
                          >
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    ) : null}
                    {!(selectedClientId === "__new" || creatingClient) && (
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
                    )}
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
                    <div className="flex flex-col items-center">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleDateSelect}
                        locale={ptBR}
                        disabled={(date) => {
                          // Desabilita datas passadas
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          if (date < today) return true;
                          
                          // Desabilita datas sem horários disponíveis
                          const dateStr = format(date, "yyyy-MM-dd");
                          return !datesWithSlots.has(dateStr);
                        }}
                        className="rounded-md border"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 4 && (
              <Card className="w-full">
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
                  
                  {/* Recurrence Options */}
                  {selectedTime && (
                    <div className="mt-6 space-y-4 border-t pt-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="recurring"
                          checked={isRecurring}
                          onChange={(e) => setIsRecurring(e.target.checked)}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <Label htmlFor="recurring" className="cursor-pointer">
                          Agendamento recorrente
                        </Label>
                      </div>
                      
                      {isRecurring && (
                        <div className="space-y-4 pl-6">
                          <div>
                            <Label htmlFor="recurrenceRule">Frequência</Label>
                            <select
                              id="recurrenceRule"
                              value={recurrenceRule}
                              onChange={(e) => setRecurrenceRule(e.target.value as any)}
                              className="w-full mt-1 rounded-md border border-gray-300 p-2"
                            >
                              <option value="WEEKLY">Semanal</option>
                              <option value="BIWEEKLY">Quinzenal</option>
                              <option value="MONTHLY">Mensal</option>
                            </select>
                          </div>
                          
                          <div className="flex flex-col items-center">
                            <Label className="mb-2">Repetir até</Label>
                            <Calendar
                              mode="single"
                              selected={recurrenceEndDate}
                              onSelect={setRecurrenceEndDate}
                              locale={ptBR}
                              disabled={(date) => {
                                // Desabilita datas antes da data selecionada
                                if (!selectedDate) return true;
                                const minDate = new Date(selectedDate);
                                minDate.setHours(0, 0, 0, 0);
                                return date < minDate;
                              }}
                              className="rounded-md border"
                            />
                          </div>
                          
                          <p className="text-sm text-gray-600">
                            {recurrenceRule === "WEEKLY" && "O agendamento será repetido toda semana"}
                            {recurrenceRule === "BIWEEKLY" && "O agendamento será repetido a cada 2 semanas"}
                            {recurrenceRule === "MONTHLY" && "O agendamento será repetido todo mês"}
                            {recurrenceEndDate && ` até ${recurrenceEndDate.toLocaleDateString("pt-BR")}`}
                          </p>
                        </div>
                      )}
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
