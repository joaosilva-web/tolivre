"use client";

import { useState, useEffect, useRef } from "react";
import useSession from "@/hooks/useSession";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
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
import { Loader2, Calendar, Users } from "lucide-react";
import { gsap } from "gsap";

import data from "./data.json";

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

  // Refs for animations
  const cardsRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  // Animations for dashboard elements
  useEffect(() => {
    if (!user?.companyId || loading) return;

    const ctx = gsap.context(() => {
      // Animate cards entrance
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power2.out",
      });

      // Animate chart entrance
      gsap.from(chartRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.7,
        delay: 0.2,
        ease: "power2.out",
      });

      // Animate table entrance
      gsap.from(tableRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: 0.4,
        ease: "power2.out",
      });
    });

    return () => ctx.revert();
  }, [user?.companyId, loading]);

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

            <div ref={chartRef} className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            <div ref={tableRef}>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}
