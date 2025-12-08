"use client";

import { useState, useEffect, useRef } from "react";
import useSession from "@/hooks/useSession";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, Calendar, Users, Clock, TrendingUp } from "lucide-react";
import { gsap } from "gsap";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Appointment {
  id: string;
  startTime: string;
  endTime: string;
  status: string;
  client: { name: string; email: string };
  professional: { name: string };
  service: { name: string; price: number };
}

interface RevenueData {
  date: string;
  revenue: number;
  appointments: number;
}

interface PopularService {
  name: string;
  count: number;
  revenue: number;
}

export default function Page() {
  const { user, loading, refresh } = useSession();
  const [creating, setCreating] = useState(false);
  const [formData, setFormData] = useState({
    nomeFantasia: "",
    razaoSocial: "",
    cnpjCpf: "",
    endereco: "",
    telefone: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [cnpjError, setCnpjError] = useState("");
  const [exportingAppointments, setExportingAppointments] = useState(false);
  const [exportingClients, setExportingClients] = useState(false);
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [popularServices, setPopularServices] = useState<PopularService[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  // Refs for animations
  const cardsRef = useRef<HTMLDivElement>(null);
  const revenueRef = useRef<HTMLDivElement>(null);
  const appointmentsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  // Fetch dashboard data
  useEffect(() => {
    if (!user?.companyId || loading) return;

    const fetchDashboardData = async () => {
      setLoadingData(true);
      try {
        // Fetch upcoming appointments
        const now = new Date().toISOString();
        const appointmentsRes = await fetch(
          `/api/appointments?companyId=${user.companyId}&status=CONFIRMED&fromDatetime=${now}&limit=5`
        );
        if (appointmentsRes.ok) {
          const appointmentsData = await appointmentsRes.json();
          setUpcomingAppointments(appointmentsData.data || appointmentsData || []);
        }

        // Fetch revenue data (last 30 days)
        const revenueRes = await fetch("/api/stats/revenue");
        if (revenueRes.ok) {
          const revenueData = await revenueRes.json();
          setRevenueData(revenueData.data || []);
        }

        // Fetch popular services
        const servicesRes = await fetch("/api/stats/popular-services");
        if (servicesRes.ok) {
          const servicesData = await servicesRes.json();
          setPopularServices(servicesData.data || []);
        }
      } catch (err) {
        console.error("Erro ao carregar dados do dashboard:", err);
      } finally {
        setLoadingData(false);
      }
    };

    fetchDashboardData();
  }, [user?.companyId, loading]);

  // Animations for dashboard elements
  useEffect(() => {
    if (!user?.companyId || loading || loadingData) return;

    const ctx = gsap.context(() => {
      // Animate cards entrance
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power2.out",
      });

      // Animate revenue section
      gsap.from(revenueRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.7,
        delay: 0.2,
        ease: "power2.out",
      });

      // Animate appointments list
      gsap.from(appointmentsRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out",
      });

      // Animate services table
      gsap.from(servicesRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: 0.4,
        ease: "power2.out",
      });
    });

    return () => ctx.revert();
  }, [user?.companyId, loading, loadingData]);

  if (loading) {
    return (
      <SidebarInset>
        <SiteHeader />
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </SidebarInset>
    );
  }

  if (!user?.companyId) {
    const handleCreateCompany = async (e: React.FormEvent) => {
      e.preventDefault();
      setCreating(true);
      setError("");
      setCnpjError("");

      try {
        const res = await fetch("/api/company", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          await refresh(); // Atualiza a sessão
        } else {
          const data = await res.json();
          const errorMsg = data.error || "Erro ao criar empresa";
          if (errorMsg === "CNPJ/CPF já cadastrado") {
            setCnpjError(errorMsg);
          } else {
            setError(errorMsg);
          }
        }
      } catch {
        setError("Erro de conexão");
      } finally {
        setCreating(false);
      }
    };

    return (
      <SidebarInset>
        <SiteHeader />
        <div className="flex items-center justify-center min-h-screen p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle>Empresa Necessária</CardTitle>
              <CardDescription>
                Você ainda não tem uma empresa cadastrada. Crie uma para acessar
                o dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateCompany} className="space-y-4">
                <div>
                  <Label htmlFor="nomeFantasia">Nome Fantasia *</Label>
                  <Input
                    id="nomeFantasia"
                    value={formData.nomeFantasia}
                    onChange={(e) =>
                      setFormData({ ...formData, nomeFantasia: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="razaoSocial">Razão Social</Label>
                  <Input
                    id="razaoSocial"
                    value={formData.razaoSocial}
                    onChange={(e) =>
                      setFormData({ ...formData, razaoSocial: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="cnpjCpf">CNPJ/CPF *</Label>
                  <Input
                    id="cnpjCpf"
                    value={formData.cnpjCpf}
                    onChange={(e) => {
                      setFormData({ ...formData, cnpjCpf: e.target.value });
                      if (cnpjError) setCnpjError("");
                    }}
                    required
                  />
                  {cnpjError && (
                    <p className="text-red-500 text-sm mt-1">{cnpjError}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="endereco">Endereço</Label>
                  <Input
                    id="endereco"
                    value={formData.endereco}
                    onChange={(e) =>
                      setFormData({ ...formData, endereco: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    value={formData.telefone}
                    onChange={(e) =>
                      setFormData({ ...formData, telefone: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                {error && (
                  <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                  </div>
                )}
                <Button type="submit" className="w-full" disabled={creating}>
                  {creating && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Criar Empresa
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    );
  }

  const handleExportAppointments = async () => {
    try {
      setExportingAppointments(true);
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
      setExportingAppointments(false);
    }
  };

  const handleExportClients = async () => {
    try {
      setExportingClients(true);
      const res = await fetch("/api/clients/export");
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `clientes_${new Date().toISOString().split("T")[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error("Erro ao exportar:", error);
    } finally {
      setExportingClients(false);
    }
  };

  const totalRevenue = revenueData.reduce((acc, day) => acc + day.revenue, 0);
  const totalAppointmentsInPeriod = revenueData.reduce((acc, day) => acc + day.appointments, 0);

  return (
    <SidebarInset>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div ref={cardsRef}>
              <SectionCards />
            </div>
            
            {/* Quick Actions */}
            <div className="px-4 lg:px-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ações Rápidas</CardTitle>
                  <CardDescription>
                    Exporte seus dados para análise externa
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    onClick={handleExportAppointments}
                    disabled={exportingAppointments}
                  >
                    {exportingAppointments ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Calendar className="mr-2 h-4 w-4" />
                    )}
                    Exportar Agendamentos (CSV)
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleExportClients}
                    disabled={exportingClients}
                  >
                    {exportingClients ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Users className="mr-2 h-4 w-4" />
                    )}
                    Exportar Clientes (CSV)
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Revenue Summary */}
            {loadingData ? (
              <div className="px-4 lg:px-6">
                <Card>
                  <CardContent className="flex items-center justify-center h-48">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div ref={revenueRef} className="px-4 lg:px-6">
                <Card className="bg-gradient-to-br from-primary/10 via-blue-500/5 to-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Receita dos Últimos 30 Dias
                    </CardTitle>
                    <CardDescription>
                      Acompanhe o desempenho financeiro do seu negócio
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Receita Total</p>
                        <p className="text-3xl font-bold text-primary">
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(totalRevenue)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Agendamentos Realizados</p>
                        <p className="text-3xl font-bold">{totalAppointmentsInPeriod}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Upcoming Appointments */}
            <div ref={appointmentsRef} className="px-4 lg:px-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Próximos Agendamentos
                  </CardTitle>
                  <CardDescription>
                    Agendamentos confirmados para os próximos dias
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loadingData ? (
                    <div className="flex items-center justify-center h-32">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : upcomingAppointments.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      Nenhum agendamento confirmado
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {upcomingAppointments.map((appointment) => (
                        <div
                          key={appointment.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex-1">
                            <p className="font-semibold">{appointment.client.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {appointment.service.name} • {appointment.professional.name}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {format(new Date(appointment.startTime), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                            </p>
                          </div>
                          <div className="mt-2 sm:mt-0 text-right">
                            <p className="font-semibold text-primary">
                              {new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format(appointment.service.price)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Popular Services */}
            <div ref={servicesRef} className="px-4 lg:px-6">
              <Card>
                <CardHeader>
                  <CardTitle>Serviços Mais Populares</CardTitle>
                  <CardDescription>
                    Os serviços mais agendados este mês
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loadingData ? (
                    <div className="flex items-center justify-center h-32">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : popularServices.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      Nenhum serviço agendado ainda
                    </p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Serviço</TableHead>
                          <TableHead className="text-center">Agendamentos</TableHead>
                          <TableHead className="text-right">Receita</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {popularServices.map((service, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{service.name}</TableCell>
                            <TableCell className="text-center">{service.count}</TableCell>
                            <TableCell className="text-right font-semibold text-primary">
                              {new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format(service.revenue)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}
