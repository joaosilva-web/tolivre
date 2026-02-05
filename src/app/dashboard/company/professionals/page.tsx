"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, Plus, Trash2, UserPlus, Users } from "lucide-react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import useSession from "@/hooks/useSession";
import { toast } from "sonner";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { PlanLimitWarning } from "@/components/PlanLimitWarning";
import { PLANS } from "@/lib/subscriptionLimits";
import type { ContractType } from "@/generated/prisma/client";

type Professional = {
  id: string;
  name: string;
  email: string;
  role: "OWNER" | "MANAGER" | "EMPLOYEE";
  photoUrl: string | null;
  bio: string | null;
  commissionRate: number | null;
};

const ROLE_LABELS = {
  OWNER: "Proprietário",
  MANAGER: "Gerente",
  EMPLOYEE: "Funcionário",
};

export default function ProfessionalsManagementPage() {
  const { user, loading: sessionLoading } = useSession();

  const [loading, setLoading] = useState(true);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [companyPlan, setCompanyPlan] = useState<ContractType | null>(null);

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "EMPLOYEE" as "EMPLOYEE" | "MANAGER",
  });

  const loadProfessionals = useCallback(async () => {
    if (!user?.companyId) return;

    try {
      setLoading(true);

      const [profRes, companyRes] = await Promise.all([
        fetch(`/api/company/${user.companyId}/professionals`),
        fetch(`/api/company/${user.companyId}`),
      ]);

      if (!profRes.ok) {
        const err = await profRes.json().catch(() => ({}));
        toast.error(err.error || "Erro ao carregar profissionais");
        return;
      }

      const profData = await profRes.json();
      setProfessionals(profData.data ?? profData);

      if (companyRes.ok) {
        const companyData = await companyRes.json();
        setCompanyPlan(companyData.data?.contrato || companyData.contrato);
      }
    } catch (err) {
      console.error("Erro ao carregar profissionais", err);
      toast.error("Erro ao carregar profissionais");
    } finally {
      setLoading(false);
    }
  }, [user?.companyId]);

  useEffect(() => {
    loadProfessionals();
  }, [loadProfessionals]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch("/api/users/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Erro ao adicionar profissional");
        return;
      }

      toast.success("Profissional adicionado com sucesso!");
      setDialogOpen(false);
      setFormData({ name: "", email: "", password: "", role: "EMPLOYEE" });
      loadProfessionals();
    } catch (err) {
      console.error("Erro ao adicionar profissional", err);
      toast.error("Erro ao adicionar profissional");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProfessional = async (professionalId: string) => {
    if (!confirm("Deseja realmente remover este profissional?")) return;

    try {
      const res = await fetch(`/api/users/${professionalId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        toast.error(err.error || "Erro ao remover profissional");
        return;
      }

      toast.success("Profissional removido");
      loadProfessionals();
    } catch (err) {
      console.error("Erro ao remover profissional", err);
      toast.error("Erro ao remover profissional");
    }
  };

  if (sessionLoading || loading) {
    return (
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </SidebarInset>
    );
  }

  if (!user) return null;

  // Calcular limites do plano
  const limits = companyPlan ? PLANS[companyPlan] : null;
  const professionalsFeature = limits?.features.professionals;
  const professionalLimit =
    professionalsFeature === "unlimited" ? 999 : (professionalsFeature ?? 999);
  const currentCount = professionals.length;
  const canAddMore = currentCount < professionalLimit;

  const getRecommendedPlan = () => {
    if (currentCount >= 10) return "Business";
    if (currentCount >= 3) return "Pro Plus";
    if (currentCount >= 1) return "Professional";
    return "Basic";
  };

  const isOwner = user.role === "OWNER";

  return (
    <SidebarInset>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  Profissionais
                </h1>
                <p className="text-muted-foreground">
                  Gerencie os profissionais da sua empresa
                </p>
              </div>
            </div>

            {isOwner && (
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button disabled={!canAddMore}>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Adicionar Profissional
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <form onSubmit={handleSubmit}>
                    <DialogHeader>
                      <DialogTitle>Adicionar Profissional</DialogTitle>
                      <DialogDescription>
                        Preencha os dados do novo profissional. Uma conta será
                        criada automaticamente.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Nome *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="João Silva"
                          required
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="joao@exemplo.com"
                          required
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="password">Senha Inicial *</Label>
                        <Input
                          id="password"
                          type="password"
                          value={formData.password}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              password: e.target.value,
                            })
                          }
                          placeholder="Mínimo 6 caracteres"
                          required
                          minLength={6}
                        />
                        <p className="text-xs text-muted-foreground">
                          O profissional poderá alterar a senha após o primeiro
                          login
                        </p>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="role">Cargo</Label>
                        <Select
                          value={formData.role}
                          onValueChange={(value) =>
                            setFormData({
                              ...formData,
                              role: value as "EMPLOYEE" | "MANAGER",
                            })
                          }
                        >
                          <SelectTrigger id="role">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="EMPLOYEE">
                              Funcionário
                            </SelectItem>
                            <SelectItem value="MANAGER">Gerente</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setDialogOpen(false)}
                        disabled={submitting}
                      >
                        Cancelar
                      </Button>
                      <Button type="submit" disabled={submitting}>
                        {submitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Adicionando...
                          </>
                        ) : (
                          <>
                            <Plus className="mr-2 h-4 w-4" />
                            Adicionar
                          </>
                        )}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </div>

          {companyPlan && professionalLimit < 999 && (
            <PlanLimitWarning
              currentCount={currentCount}
              limit={professionalLimit}
              resourceType="profissionais"
              currentPlan={companyPlan}
              recommendedPlan={getRecommendedPlan()}
            />
          )}

          <Card>
            <CardHeader>
              <CardTitle>
                Lista de Profissionais ({currentCount}/
                {professionalLimit === 999 ? "∞" : professionalLimit})
              </CardTitle>
              <CardDescription>
                {isOwner
                  ? "Gerencie os profissionais que têm acesso ao sistema"
                  : "Visualize os profissionais da empresa"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {professionals.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    Nenhum profissional cadastrado
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Adicione profissionais para começar a gerenciar sua equipe
                  </p>
                  {isOwner && canAddMore && (
                    <Button onClick={() => setDialogOpen(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Adicionar Primeiro Profissional
                    </Button>
                  )}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Cargo</TableHead>
                      {isOwner && (
                        <TableHead className="text-right">Ações</TableHead>
                      )}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {professionals.map((prof) => (
                      <TableRow key={prof.id}>
                        <TableCell className="font-medium">
                          {prof.name}
                        </TableCell>
                        <TableCell>{prof.email}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              prof.role === "OWNER" ? "default" : "secondary"
                            }
                          >
                            {ROLE_LABELS[prof.role]}
                          </Badge>
                        </TableCell>
                        {isOwner && (
                          <TableCell className="text-right">
                            {prof.role !== "OWNER" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleDeleteProfessional(prof.id)
                                }
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            )}
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarInset>
  );
}
