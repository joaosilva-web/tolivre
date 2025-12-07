"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  Loader2,
  DollarSign,
  TrendingUp,
  Users,
  CheckCircle2,
} from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useSession from "@/hooks/useSession";

interface ReportData {
  report: Array<{
    professional: {
      id: string;
      name: string;
      email: string;
      photoUrl: string | null;
    };
    totalAppointments: number;
    totalRevenue: number;
    totalCommission: number;
    commissionPaid: number;
    commissionPending: number;
    appointments: Array<{
      id: string;
      startTime: string;
      service: { name: string };
      client: string;
      price: number;
      commissionRate: number;
      commissionAmount: number;
      commissionPaid: boolean;
      commissionPaidAt: string | null;
    }>;
  }>;
  totals: {
    totalAppointments: number;
    totalRevenue: number;
    totalCommission: number;
    commissionPaid: number;
    commissionPending: number;
  };
}

export default function CommissionsReportPage() {
  const { user, loading: userLoading } = useSession();
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedProfessional, setSelectedProfessional] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (!userLoading && user) {
      // Definir período padrão (último mês)
      const today = new Date();
      const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      setStartDate(format(lastMonth, "yyyy-MM-dd"));
      setEndDate(format(today, "yyyy-MM-dd"));
    }
  }, [userLoading, user]);

  useEffect(() => {
    if (startDate && endDate) {
      loadReport();
    }
  }, [startDate, endDate]);

  const loadReport = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        startDate,
        endDate,
      });

      const res = await fetch(`/api/reports/commissions?${params}`);
      if (res.ok) {
        const result = await res.json();
        setData(result.data);
      }
    } catch (err) {
      console.error("Erro ao carregar relatório:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  if (userLoading || loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Relatório de Comissões</h1>
        <p className="text-muted-foreground">
          Acompanhe comissões pagas e pendentes por profissional
        </p>
      </div>

      {/* Filtros */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Data Inicial</Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <Label>Data Final</Label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={loadReport} className="w-full">
                Atualizar Relatório
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resumo Geral */}
      {data && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total de Atendimentos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span className="text-2xl font-bold">
                    {data.totals.totalAppointments}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Receita Total</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span className="text-2xl font-bold text-green-600">
                    {formatCurrency(data.totals.totalRevenue)}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Comissões Pagas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600" />
                  <span className="text-2xl font-bold text-blue-600">
                    {formatCurrency(data.totals.commissionPaid)}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Comissões Pendentes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-orange-600" />
                  <span className="text-2xl font-bold text-orange-600">
                    {formatCurrency(data.totals.commissionPending)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Por Profissional */}
          <div className="grid gap-6">
            {data.report.map((prof) => (
              <Card key={prof.professional.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={prof.professional.photoUrl || undefined}
                        />
                        <AvatarFallback>
                          {prof.professional.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{prof.professional.name}</CardTitle>
                        <CardDescription>
                          {prof.professional.email}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">
                        {prof.totalAppointments} atendimentos
                      </div>
                      <div className="text-2xl font-bold">
                        {formatCurrency(prof.totalCommission)}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Receita Gerada
                      </p>
                      <p className="text-xl font-bold text-green-600">
                        {formatCurrency(prof.totalRevenue)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Comissões Pagas
                      </p>
                      <p className="text-xl font-bold text-blue-600">
                        {formatCurrency(prof.commissionPaid)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Comissões Pendentes
                      </p>
                      <p className="text-xl font-bold text-orange-600">
                        {formatCurrency(prof.commissionPending)}
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setSelectedProfessional(
                        selectedProfessional === prof.professional.id
                          ? null
                          : prof.professional.id
                      )
                    }
                  >
                    {selectedProfessional === prof.professional.id
                      ? "Ocultar"
                      : "Ver"}{" "}
                    Detalhes
                  </Button>

                  {selectedProfessional === prof.professional.id && (
                    <div className="mt-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Data</TableHead>
                            <TableHead>Cliente</TableHead>
                            <TableHead>Serviço</TableHead>
                            <TableHead className="text-right">Valor</TableHead>
                            <TableHead className="text-right">Taxa</TableHead>
                            <TableHead className="text-right">
                              Comissão
                            </TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {prof.appointments.map((apt) => (
                            <TableRow key={apt.id}>
                              <TableCell>
                                {format(
                                  new Date(apt.startTime),
                                  "dd/MM/yyyy HH:mm"
                                )}
                              </TableCell>
                              <TableCell>{apt.client}</TableCell>
                              <TableCell>{apt.service.name}</TableCell>
                              <TableCell className="text-right">
                                {formatCurrency(apt.price)}
                              </TableCell>
                              <TableCell className="text-right">
                                {apt.commissionRate}%
                              </TableCell>
                              <TableCell className="text-right font-medium">
                                {formatCurrency(apt.commissionAmount)}
                              </TableCell>
                              <TableCell>
                                {apt.commissionPaid ? (
                                  <Badge variant="default">Paga</Badge>
                                ) : (
                                  <Badge variant="secondary">Pendente</Badge>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {data?.report.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <DollarSign className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Nenhuma comissão encontrada
            </h3>
            <p className="text-muted-foreground">
              Não há registros de comissões no período selecionado
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
