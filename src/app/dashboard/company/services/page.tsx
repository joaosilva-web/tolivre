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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Plus, Trash2, Scissors } from "lucide-react";
import { toast } from "sonner";

interface Professional {
  id: string;
  name: string;
}

interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
}

interface ProfessionalService {
  id: string;
  professionalId: string;
  serviceId: string;
  professional: Professional;
  service: Service;
}

export default function ServicesPage() {
  const { user, loading: sessionLoading } = useSession();
  const [loading, setLoading] = useState(true);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [professionalServices, setProfessionalServices] = useState<
    ProfessionalService[]
  >([]);

  const [serviceForm, setServiceForm] = useState({
    name: "",
    price: "",
    duration: "",
  });
  const [associationForm, setAssociationForm] = useState({
    professionalId: "",
    serviceId: "",
  });

  const [creatingService, setCreatingService] = useState(false);
  const [creatingAssociation, setCreatingAssociation] = useState(false);
  const [serviceSheetOpen, setServiceSheetOpen] = useState(false);
  const [assocSheetOpen, setAssocSheetOpen] = useState(false);

  const loadData = useCallback(async () => {
    if (!user?.companyId) return;
    setLoading(true);
    try {
      const [profRes, servRes, assocRes] = await Promise.all([
        fetch(`/api/company/${user.companyId}/professionals`),
        fetch(`/api/services?companyId=${user.companyId}`),
        fetch(`/api/professional-service?companyId=${user.companyId}`),
      ]);

      if (profRes.ok) setProfessionals((await profRes.json()).data ?? []);
      if (servRes.ok) setServices((await servRes.json()).data ?? []);
      if (assocRes.ok) setProfessionalServices((await assocRes.json()).data ?? []);
    } catch {
      toast.error("Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  }, [user?.companyId]);

  useEffect(() => {
    if (user?.companyId && !sessionLoading) loadData();
  }, [user?.companyId, sessionLoading, loadData]);

  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.companyId) return;
    setCreatingService(true);
    try {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...serviceForm,
          companyId: user.companyId,
          price: parseFloat(serviceForm.price),
          duration: parseInt(serviceForm.duration),
        }),
      });
      if (res.ok) {
        setServiceForm({ name: "", price: "", duration: "" });
        setServiceSheetOpen(false);
        await loadData();
        toast.success("Serviço criado com sucesso");
      } else {
        const data = await res.json();
        toast.error(data.error || "Erro ao criar serviço");
      }
    } catch {
      toast.error("Erro de conexão");
    } finally {
      setCreatingService(false);
    }
  };

  const handleDeleteService = async (serviceId: string) => {
    if (!confirm("Tem certeza que deseja excluir este serviço?")) return;
    try {
      const res = await fetch(`/api/services/${serviceId}`, { method: "DELETE" });
      if (res.ok) {
        await loadData();
        toast.success("Serviço excluído");
      } else {
        const data = await res.json();
        toast.error(data.error || "Erro ao excluir serviço");
      }
    } catch {
      toast.error("Erro de conexão");
    }
  };

  const handleCreateAssociation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.companyId) return;
    setCreatingAssociation(true);
    try {
      const res = await fetch("/api/professional-service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(associationForm),
      });
      if (res.ok) {
        setAssociationForm({ professionalId: "", serviceId: "" });
        setAssocSheetOpen(false);
        await loadData();
        toast.success("Associação criada com sucesso");
      } else {
        const data = await res.json();
        toast.error(data.error || "Erro ao associar serviço");
      }
    } catch {
      toast.error("Erro de conexão");
    } finally {
      setCreatingAssociation(false);
    }
  };

  const handleDeleteAssociation = async (assocId: string) => {
    if (!confirm("Tem certeza que deseja remover esta associação?")) return;
    try {
      const res = await fetch(`/api/professional-service/${assocId}`, { method: "DELETE" });
      if (res.ok) {
        await loadData();
        toast.success("Associação removida");
      } else {
        const data = await res.json();
        toast.error(data.error || "Erro ao remover associação");
      }
    } catch {
      toast.error("Erro de conexão");
    }
  };

  if (sessionLoading || loading) {
    return (
      <SidebarInset>
        <SiteHeader />
        <div className="flex items-center justify-center min-h-[400px]">
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
          <div className="flex items-center gap-2">
            <Scissors className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Serviços</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Serviços */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Serviços</CardTitle>
                  <CardDescription>Gerencie os serviços oferecidos</CardDescription>
                </div>
                <Sheet open={serviceSheetOpen} onOpenChange={setServiceSheetOpen}>
                  <SheetTrigger asChild>
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Novo Serviço
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Criar Serviço</SheetTitle>
                      <SheetDescription>
                        Adicione um novo serviço à sua empresa
                      </SheetDescription>
                    </SheetHeader>
                    <form onSubmit={handleCreateService} className="space-y-4 mt-4">
                      <div>
                        <Label htmlFor="serviceName">Nome do Serviço *</Label>
                        <Input
                          id="serviceName"
                          value={serviceForm.name}
                          onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="servicePrice">Preço (R$) *</Label>
                        <Input
                          id="servicePrice"
                          type="number"
                          step="0.01"
                          value={serviceForm.price}
                          onChange={(e) => setServiceForm({ ...serviceForm, price: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="serviceDuration">Duração (minutos) *</Label>
                        <Input
                          id="serviceDuration"
                          type="number"
                          value={serviceForm.duration}
                          onChange={(e) => setServiceForm({ ...serviceForm, duration: e.target.value })}
                          required
                        />
                      </div>
                      <Button type="submit" disabled={creatingService} className="w-full">
                        {creatingService && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Criar Serviço
                      </Button>
                    </form>
                  </SheetContent>
                </Sheet>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Preço</TableHead>
                      <TableHead>Duração</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {services.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell>{service.name}</TableCell>
                        <TableCell>R$ {service.price.toFixed(2)}</TableCell>
                        <TableCell>{service.duration} min</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteService(service.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {services.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-muted-foreground">
                          Nenhum serviço cadastrado
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Associações */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Associações</CardTitle>
                  <CardDescription>Vincule serviços aos profissionais</CardDescription>
                </div>
                <Sheet open={assocSheetOpen} onOpenChange={setAssocSheetOpen}>
                  <SheetTrigger asChild>
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Nova Associação
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Associar Serviço</SheetTitle>
                      <SheetDescription>Vincule um serviço a um profissional</SheetDescription>
                    </SheetHeader>
                    <form onSubmit={handleCreateAssociation} className="space-y-4 mt-4">
                      <div>
                        <Label>Profissional *</Label>
                        <Select
                          value={associationForm.professionalId}
                          onValueChange={(v) => setAssociationForm({ ...associationForm, professionalId: v })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um profissional" />
                          </SelectTrigger>
                          <SelectContent>
                            {professionals.map((prof) => (
                              <SelectItem key={prof.id} value={prof.id}>
                                {prof.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Serviço *</Label>
                        <Select
                          value={associationForm.serviceId}
                          onValueChange={(v) => setAssociationForm({ ...associationForm, serviceId: v })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um serviço" />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map((serv) => (
                              <SelectItem key={serv.id} value={serv.id}>
                                {serv.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Button type="submit" disabled={creatingAssociation} className="w-full">
                        {creatingAssociation && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Associar
                      </Button>
                    </form>
                  </SheetContent>
                </Sheet>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Profissional</TableHead>
                      <TableHead>Serviço</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {professionalServices.map((assoc) => (
                      <TableRow key={assoc.id}>
                        <TableCell>{assoc.professional.name}</TableCell>
                        <TableCell>{assoc.service.name}</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteAssociation(assoc.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {professionalServices.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center text-muted-foreground">
                          Nenhuma associação criada
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}
