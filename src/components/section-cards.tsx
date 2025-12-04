"use client";

import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Loader2, Calendar, Users, CheckCircle, XCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Stats {
  appointmentsThisMonth: number;
  appointmentsGrowth: number;
  totalClients: number;
  newClientsThisMonth: number;
  clientsGrowth: number;
  upcomingAppointments: number;
  confirmationRate: number;
  cancellationRate: number;
}

export function SectionCards() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data.data);
        }
      } catch (err) {
        console.error("Erro ao carregar estatísticas:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="@container/card">
            <CardHeader className="flex items-center justify-center h-40">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="px-4 lg:px-6">
        <p className="text-muted-foreground text-center py-8">
          Erro ao carregar estatísticas
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card bg-gradient-to-br from-primary/10 via-blue-500/10 to-card shadow-xs dark:bg-card">
        <CardHeader>
          <CardDescription>Agendamentos Este Mês</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl flex items-center gap-2">
            <Calendar className="h-6 w-6 text-primary" />
            {stats.appointmentsThisMonth}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {stats.appointmentsGrowth >= 0 ? (
                <IconTrendingUp />
              ) : (
                <IconTrendingDown />
              )}
              {stats.appointmentsGrowth >= 0 ? "+" : ""}
              {stats.appointmentsGrowth}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {stats.appointmentsGrowth >= 0 ? (
              <>
                Crescimento este mês <IconTrendingUp className="size-4" />
              </>
            ) : (
              <>
                Queda este mês <IconTrendingDown className="size-4" />
              </>
            )}
          </div>
          <div className="text-muted-foreground">
            vs. mês anterior
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-card shadow-xs dark:bg-card">
        <CardHeader>
          <CardDescription>Clientes Ativos</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl flex items-center gap-2">
            <Users className="h-6 w-6 text-blue-500" />
            {stats.totalClients}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {stats.clientsGrowth >= 0 ? (
                <IconTrendingUp />
              ) : (
                <IconTrendingDown />
              )}
              {stats.clientsGrowth >= 0 ? "+" : ""}
              {stats.clientsGrowth}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {stats.newClientsThisMonth} novos este mês
          </div>
          <div className="text-muted-foreground">
            Base de clientes cadastrados
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-card shadow-xs dark:bg-card">
        <CardHeader>
          <CardDescription>Taxa de Confirmação</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-500" />
            {stats.confirmationRate}%
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="bg-green-500/10">
              <IconTrendingUp />
              Excelente
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Alta taxa de comparecimento
          </div>
          <div className="text-muted-foreground">
            Agendamentos confirmados
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card bg-gradient-to-br from-orange-500/10 via-red-500/10 to-card shadow-xs dark:bg-card">
        <CardHeader>
          <CardDescription>Próximos Agendamentos</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl flex items-center gap-2">
            <Calendar className="h-6 w-6 text-orange-500" />
            {stats.upcomingAppointments}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="bg-orange-500/10">
              {stats.cancellationRate < 10 ? (
                <>
                  <IconTrendingDown />
                  {stats.cancellationRate}% cancelamentos
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4" />
                  {stats.cancellationRate}% cancelamentos
                </>
              )}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Agendamentos futuros
          </div>
          <div className="text-muted-foreground">
            Pendentes e confirmados
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
