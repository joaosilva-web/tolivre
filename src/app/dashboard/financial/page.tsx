"use client";

import { useState, useEffect, useCallback } from "react";
import useSession from "@/hooks/useSession";
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
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
} from "lucide-react";
import { format, startOfMonth, endOfMonth } from "date-fns";

interface FinancialReport {
  period: {
    start: string;
    end: string;
  };
  summary: {
    totalReceived: number;
    totalPending: number;
    totalPartial: number;
    totalExpected: number;
    totalCanceled: number;
    totalAppointments: number;
    paidAppointments: number;
    pendingAppointments: number;
  };
  byPaymentMethod: Record<string, { count: number; total: number }>;
  byProfessional: Record<string, { count: number; total: number }>;
  byService: Record<string, { count: number; total: number }>;
  appointments: Array<{
    id: string;
    date: string;
    time: string;
    clientName: string;
    professional: string;
    service: string;
    price: number;
    paymentStatus: string;
    paidAmount: number | null;
    paymentMethod: string | null;
    paymentDate: string | null;
  }>;
}

export default function FinancialPage() {
  const { user } = useSession();
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState<FinancialReport | null>(null);
  
  const today = new Date();
  const [startDate, setStartDate] = useState(format(startOfMonth(today), "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState(format(endOfMonth(today), "yyyy-MM-dd"));

  const loadReport = useCallback(async () => {
    if (!user?.companyId) return;

    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);

      const res = await fetch(`/api/financial/report?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setReport(data.data);
      }
    } catch (error) {
      console.error("Erro ao carregar relatório:", error);
    } finally {
      setLoading(false);
    }
  }, [user?.companyId, startDate, endDate]);

  useEffect(() => {
    if (user?.companyId) {
      loadReport();
    }
  }, [user?.companyId, loadReport]);

  const getPaymentStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
      PAID: { variant: "default", label: "Pago" },
      PENDING: { variant: "secondary", label: "Pendente" },
      PARTIAL: { variant: "outline", label: "Parcial" },
      CANCELED: { variant: "destructive", label: "Cancelado" },
    };
    const config = variants[status] || variants.PENDING;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

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

  return (
    <SidebarInset>
      <SiteHeader />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Relatório Financeiro</h1>
            <p className="text-muted-foreground">
              Acompanhe receitas, pagamentos e contas a receber
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Filtrar Período</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 items-end">
              <div className="flex-1 space-y-2">
                <Label htmlFor="start">Data Início</Label>
                <Input
                  id="start"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="flex-1 space-y-2">
                <Label htmlFor="end">Data Fim</Label>
                <Input
                  id="end"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <Button onClick={loadReport}>
                <Calendar className="mr-2 h-4 w-4" />
                Atualizar
              </Button>
            </div>
          </CardContent>
        </Card>

        {report && (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Recebido</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    R$ {report.summary.totalReceived.toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {report.summary.paidAppointments} agendamentos pagos
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">A Receber</CardTitle>
                  <Clock className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">
                    R$ {report.summary.totalPending.toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {report.summary.pendingAppointments} agendamentos pendentes
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Receita Esperada</CardTitle>
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    R$ {report.summary.totalExpected.toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {report.summary.totalAppointments} agendamentos totais
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Cancelados</CardTitle>
                  <XCircle className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">
                    R$ {report.summary.totalCanceled.toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Valor de agendamentos cancelados
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Por Método de Pagamento</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Método</TableHead>
                        <TableHead className="text-right">Qtd</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(report.byPaymentMethod).map(([method, data]) => (
                        <TableRow key={method}>
                          <TableCell className="font-medium">{method}</TableCell>
                          <TableCell className="text-right">{data.count}</TableCell>
                          <TableCell className="text-right">
                            R$ {data.total.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                      {Object.keys(report.byPaymentMethod).length === 0 && (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center text-muted-foreground">
                            Nenhum pagamento registrado
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Por Profissional</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead className="text-right">Qtd</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(report.byProfessional).map(([name, data]) => (
                        <TableRow key={name}>
                          <TableCell className="font-medium">{name}</TableCell>
                          <TableCell className="text-right">{data.count}</TableCell>
                          <TableCell className="text-right">
                            R$ {data.total.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Por Serviço</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Serviço</TableHead>
                        <TableHead className="text-right">Qtd</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(report.byService).map(([name, data]) => (
                        <TableRow key={name}>
                          <TableCell className="font-medium">{name}</TableCell>
                          <TableCell className="text-right">{data.count}</TableCell>
                          <TableCell className="text-right">
                            R$ {data.total.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Detalhamento de Agendamentos</CardTitle>
                <CardDescription>
                  Todos os agendamentos do período selecionado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Profissional</TableHead>
                      <TableHead>Serviço</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                      <TableHead>Status Pagamento</TableHead>
                      <TableHead>Método</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {report.appointments.map((apt) => (
                      <TableRow key={apt.id}>
                        <TableCell>
                          {format(new Date(apt.date), "dd/MM/yyyy")} {apt.time}
                        </TableCell>
                        <TableCell>{apt.clientName}</TableCell>
                        <TableCell>{apt.professional}</TableCell>
                        <TableCell>{apt.service}</TableCell>
                        <TableCell className="text-right">
                          R$ {apt.price.toFixed(2)}
                        </TableCell>
                        <TableCell>{getPaymentStatusBadge(apt.paymentStatus)}</TableCell>
                        <TableCell>{apt.paymentMethod || "-"}</TableCell>
                      </TableRow>
                    ))}
                    {report.appointments.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center text-muted-foreground">
                          Nenhum agendamento no período
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </SidebarInset>
  );
}
