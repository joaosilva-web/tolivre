"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import useSession from "@/hooks/useSession";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { gsap } from "gsap";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Building } from "lucide-react";
import { BookingQRCode } from "@/components/booking-qrcode";
import { toast } from "sonner";

interface Company {
  id: string;
  nomeFantasia: string;
  razaoSocial?: string;
  cnpjCpf: string;
  endereco?: string;
  telefone?: string;
  email?: string;
}

export default function CompanyPage() {
  const { user, loading: sessionLoading } = useSession();
  const [loading, setLoading] = useState(true);
  const [companyPage, setCompanyPage] = useState<{ slug: string } | null>(null);
  const [companyForm, setCompanyForm] = useState<Partial<Company>>({});
  const [editingCompany, setEditingCompany] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const loadData = useCallback(async () => {
    if (!user?.companyId) return;
    setLoading(true);
    try {
      const [companyRes, pageRes] = await Promise.all([
        fetch(`/api/company/${user.companyId}`),
        fetch(`/api/company/page`),
      ]);
      if (companyRes.ok) {
        const data = await companyRes.json();
        if (data.data) setCompanyForm(data.data);
      }
      if (pageRes.ok) {
        const data = await pageRes.json();
        setCompanyPage(data.data);
      } else if (pageRes.status === 404) {
        setCompanyPage(null);
      }
    } catch {
      toast.error("Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  }, [user?.companyId]);

  useEffect(() => {
    if (user?.companyId && !sessionLoading) loadData();
  }, [user?.companyId, sessionLoading, loadData]);

  useEffect(() => {
    if (loading) return;
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, { opacity: 0, y: -20, duration: 0.5, ease: "power2.out" });
      gsap.from(contentRef.current, { opacity: 0, y: 30, duration: 0.6, delay: 0.2, ease: "power2.out" });
    });
    return () => ctx.revert();
  }, [loading]);

  const handleUpdateCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.companyId) return;
    setEditingCompany(true);
    try {
      const res = await fetch("/api/company", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...companyForm, id: user.companyId }),
      });
      if (res.ok) {
        await loadData();
        toast.success("Empresa atualizada com sucesso");
      } else {
        const data = await res.json();
        toast.error(data.error || "Erro ao atualizar empresa");
      }
    } catch {
      toast.error("Erro de conexão");
    } finally {
      setEditingCompany(false);
    }
  };

  if (sessionLoading || loading) {
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
      <div className="flex flex-1 flex-col">
        <div className="flex flex-col gap-6 py-4 md:py-6 px-4 lg:px-6">
          <div ref={headerRef} className="flex items-center gap-2">
            <Building className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Configurações da Empresa</h1>
          </div>

          <div ref={contentRef} className="flex flex-col gap-6">
            {/* Informações da Empresa */}
            <Card>
              <CardHeader>
                <CardTitle>Informações da Empresa</CardTitle>
                <CardDescription>
                  Atualize as informações básicas da sua empresa
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateCompany} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nomeFantasia">Nome Fantasia *</Label>
                      <Input
                        id="nomeFantasia"
                        value={companyForm.nomeFantasia || ""}
                        onChange={(e) => setCompanyForm({ ...companyForm, nomeFantasia: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="razaoSocial">Razão Social</Label>
                      <Input
                        id="razaoSocial"
                        value={companyForm.razaoSocial || ""}
                        onChange={(e) => setCompanyForm({ ...companyForm, razaoSocial: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cnpjCpf">CNPJ/CPF *</Label>
                      <Input
                        id="cnpjCpf"
                        value={companyForm.cnpjCpf || ""}
                        onChange={(e) => setCompanyForm({ ...companyForm, cnpjCpf: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input
                        id="telefone"
                        value={companyForm.telefone || ""}
                        onChange={(e) => setCompanyForm({ ...companyForm, telefone: e.target.value })}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="endereco">Endereço</Label>
                      <Input
                        id="endereco"
                        value={companyForm.endereco || ""}
                        onChange={(e) => setCompanyForm({ ...companyForm, endereco: e.target.value })}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={companyForm.email || ""}
                        onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <Button type="submit" disabled={editingCompany}>
                    {editingCompany && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Salvar Alterações
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* QR Code / Página Pública */}
            {companyPage?.slug ? (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Página Pública de Agendamento</CardTitle>
                    <CardDescription>
                      Sua página pública está ativa! Compartilhe o link ou QR Code.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                      <code className="text-sm flex-1">
                        {typeof window !== "undefined"
                          ? `${window.location.origin}/${companyPage.slug}/agendar`
                          : `/${companyPage.slug}/agendar`}
                      </code>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (typeof window !== "undefined") {
                            window.open(`/${companyPage.slug}/agendar`, "_blank");
                          }
                        }}
                      >
                        Abrir Página
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <BookingQRCode
                  bookingUrl={
                    typeof window !== "undefined"
                      ? `${window.location.origin}/${companyPage.slug}/agendar`
                      : `/${companyPage.slug}/agendar`
                  }
                  professionalName={user?.name || "Profissional"}
                />
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Configure sua Página Pública</CardTitle>
                  <CardDescription>
                    Para gerar o QR Code de agendamento, você precisa primeiro criar sua página pública.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => (window.location.href = "/dashboard/company/page-settings")}>
                    Criar Página Pública
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}
