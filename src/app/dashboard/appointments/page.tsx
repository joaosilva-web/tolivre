"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Plus, Calendar, Clock, User, Download, Filter, X } from "lucide-react";
import useSession from "@/hooks/useSession";
import { gsap } from "gsap";

interface Appointment {
  id: string;
  startTime: string;
  clientName: string;
  client?: { id: string; name: string } | null;
  service: {
    name: string;
    price: number;
    duration: number;
  };
  professional: {
    name: string;
  };
}

export default function AppointmentsPage() {
  const { user } = useSession();
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filtros
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [professionals, setProfessionals] = useState<{ id: string; name: string }[]>([]);
  const [professionalFilter, setProfessionalFilter] = useState("all");

  const handleExportCSV = async () => {
    try {
      setExporting(true);
      const res = await fetch("/api/appointments/export");
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `agendamentos_${new Date().toISOString().split("T")[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error("Erro ao exportar:", error);
    } finally {
      setExporting(false);
    }
  };

  const loadAppointments = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      
      if (user?.companyId) {
        params.append("companyId", user.companyId);
      }
      
      // Filtro de data
      if (startDate) {
        params.append("fromDatetime", new Date(startDate).toISOString());
      } else {
        params.append("fromDatetime", new Date().toISOString());
      }
      
      if (endDate) {
        params.append("toDatetime", new Date(endDate + "T23:59:59").toISOString());
      }
      
      // Filtro de profissional
      if (professionalFilter && professionalFilter !== "all") {
        params.append("professionalId", professionalFilter);
      }
      
      const res = await fetch(`/api/appointments?${params.toString()}`);
      if (res.ok) {
        const payload = await res.json();
        let all = payload?.data ?? payload ?? [];
        
        // Filtro de status (client-side por enquanto)
        if (statusFilter && statusFilter !== "all") {
          all = all.filter((apt: Appointment & { status?: string }) => apt.status === statusFilter);
        }
        
        setAppointments(all as Appointment[]);
      }
    } catch (error) {
      console.error("Erro ao carregar agendamentos:", error);
    } finally {
      setLoading(false);
    }
  }, [user?.companyId, startDate, endDate, statusFilter, professionalFilter]);

  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadProfessionals = async () => {
      if (!user?.companyId) return;
      try {
        const res = await fetch(`/api/company/${user.companyId}/professionals`);
        if (res.ok) {
          const data = await res.json();
          setProfessionals(data.data || []);
        }
      } catch (err) {
        console.error("Erro ao carregar profissionais:", err);
      }
    };

    if (user?.companyId) {
      loadProfessionals();
      loadAppointments();
    }
  }, [user?.companyId, loadAppointments]);

  // Animations
  useEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      // Animate header
      gsap.from(headerRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: "power2.out",
      });

      // Animate cards
      const cards =
        cardsContainerRef.current?.querySelectorAll(".appointment-card");
      if (cards && cards.length > 0) {
        gsap.from(cards, {
          opacity: 0,
          y: 30,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.2,
          ease: "power2.out",
        });
      }
    });

    return () => ctx.revert();
  }, [loading, appointments]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </div>
      </SidebarInset>
    );
  }

  return (
    <SidebarInset>
      <SiteHeader />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div ref={headerRef} className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Agendamentos</h1>
              <p className="text-muted-foreground">
                Gerencie os agendamentos da sua empresa
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="mr-2 h-4 w-4" />
                Filtros
              </Button>
              <Button variant="outline" onClick={handleExportCSV} disabled={exporting}>
                {exporting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Download className="mr-2 h-4 w-4" />
                )}
                Exportar CSV
              </Button>
              <Button onClick={() => router.push("/dashboard/appointments/new")}>
                <Plus className="mr-2 h-4 w-4" />
                Novo Agendamento
              </Button>
            </div>
          </div>

          {showFilters && (
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Data Início</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">Data Fim</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="professional">Profissional</Label>
                    <Select value={professionalFilter} onValueChange={setProfessionalFilter}>
                      <SelectTrigger id="professional">
                        <SelectValue placeholder="Todos" />
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
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Todos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="PENDING">Pendente</SelectItem>
                        <SelectItem value="CONFIRMED">Confirmado</SelectItem>
                        <SelectItem value="COMPLETED">Concluído</SelectItem>
                        <SelectItem value="CANCELED">Cancelado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button onClick={() => {
                    setLoading(true);
                    loadAppointments();
                  }}>
                    Aplicar Filtros
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setStartDate("");
                      setEndDate("");
                      setStatusFilter("all");
                      setProfessionalFilter("all");
                      setLoading(true);
                      setTimeout(() => loadAppointments(), 100);
                    }}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Limpar Filtros
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div ref={cardsContainerRef} className="space-y-6">
          {appointments.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Nenhum agendamento encontrado
                </h3>
                <p className="text-muted-foreground text-center mb-4">
                  Comece criando seu primeiro agendamento para um cliente.
                </p>
                <Button
                  onClick={() => router.push("/dashboard/appointments/new")}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Criar Primeiro Agendamento
                </Button>
              </CardContent>
            </Card>
          ) : (
            // Group appointments by local date label (pt-BR)
            (() => {
              const groups: { date: string; items: Appointment[] }[] = [];
              appointments.forEach((appointment) => {
                const dateLabel = formatDate(appointment.startTime);
                let g = groups.find((x) => x.date === dateLabel);
                if (!g) {
                  g = { date: dateLabel, items: [] };
                  groups.push(g);
                }
                g.items.push(appointment);
              });

              return groups.map((g) => (
                <div key={g.date}>
                  <h2 className="text-lg font-semibold mb-2">{g.date}</h2>
                  <div className="grid gap-4">
                    {g.items.map((appointment) => (
                      <Card key={appointment.id} className="appointment-card">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">{g.date}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>{formatTime(appointment.startTime)}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                {appointment.client?.id ? (
                                  <a
                                    className="text-primary underline"
                                    href={`/dashboard/clients/${appointment.client.id}`}
                                  >
                                    {appointment.client.name}
                                  </a>
                                ) : (
                                  <span>{appointment.clientName}</span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <Badge variant="outline">
                                {appointment.service.name}
                              </Badge>
                              <Badge variant="secondary">
                                {appointment.professional.name}
                              </Badge>
                              <span className="font-medium">
                                R$ {appointment.service.price.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ));
            })()
          )}
        </div>
      </div>
    </SidebarInset>
  );
}
