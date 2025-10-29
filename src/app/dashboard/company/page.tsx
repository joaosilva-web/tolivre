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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Loader2, Plus, Trash2, Users, Building, Scissors } from "lucide-react";

interface Company {
  id: string;
  nomeFantasia: string;
  razaoSocial?: string;
  cnpjCpf: string;
  endereco?: string;
  telefone?: string;
  email?: string;
}

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

export default function CompanyPage() {
  const { user, refresh } = useSession();
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState<Company | null>(null);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [professionalServices, setProfessionalServices] = useState<
    ProfessionalService[]
  >([]);

  // Form states
  const [companyForm, setCompanyForm] = useState<Partial<Company>>({});
  const [serviceForm, setServiceForm] = useState({
    name: "",
    price: "",
    duration: "",
  });
  const [associationForm, setAssociationForm] = useState({
    professionalId: "",
    serviceId: "",
  });

  // UI states
  const [editingCompany, setEditingCompany] = useState(false);
  const [creatingService, setCreatingService] = useState(false);
  const [creatingAssociation, setCreatingAssociation] = useState(false);
  const [error, setError] = useState("");

  const loadData = useCallback(async () => {
    if (!user?.companyId) return;

    setLoading(true);
    try {
      // Load company data
      const companyRes = await fetch(`/api/company/${user.companyId}`);
      if (companyRes.ok) {
        const companyData = await companyRes.json();
        setCompany(companyData.data);
        setCompanyForm(companyData.data);
      }

      // Load professionals
      const profRes = await fetch(
        `/api/company/${user.companyId}/professionals`
      );
      if (profRes.ok) {
        const profData = await profRes.json();
        setProfessionals(profData.data);
      }

      // Load services
      const servRes = await fetch(`/api/services?companyId=${user.companyId}`);
      if (servRes.ok) {
        const servData = await servRes.json();
        setServices(servData.data);
      }

      // Load professional-service associations
      const assocRes = await fetch(
        `/api/professional-service?companyId=${user.companyId}`
      );
      if (assocRes.ok) {
        const assocData = await assocRes.json();
        setProfessionalServices(assocData.data);
      }
    } catch {
      setError("Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  }, [user?.companyId]);

  useEffect(() => {
    if (user?.companyId) {
      loadData();
    }
  }, [user?.companyId, loadData]);

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
        setEditingCompany(false);
      } else {
        const data = await res.json();
        setError(data.error || "Erro ao atualizar empresa");
      }
    } catch {
      setError("Erro de conexão");
    } finally {
      setEditingCompany(false);
    }
  };

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
        await loadData();
      } else {
        const data = await res.json();
        setError(data.error || "Erro ao criar serviço");
      }
    } catch {
      setError("Erro de conexão");
    } finally {
      setCreatingService(false);
    }
  };

  const handleDeleteService = async (serviceId: string) => {
    if (!confirm("Tem certeza que deseja excluir este serviço?")) return;

    try {
      const res = await fetch(`/api/services/${serviceId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await loadData();
      } else {
        const data = await res.json();
        setError(data.error || "Erro ao excluir serviço");
      }
    } catch {
      setError("Erro de conexão");
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
        await loadData();
      } else {
        const data = await res.json();
        setError(data.error || "Erro ao associar serviço");
      }
    } catch {
      setError("Erro de conexão");
    } finally {
      setCreatingAssociation(false);
    }
  };

  const handleDeleteAssociation = async (associationId: string) => {
    if (!confirm("Tem certeza que deseja remover esta associação?")) return;

    try {
      const res = await fetch(`/api/professional-service/${associationId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await loadData();
      } else {
        const data = await res.json();
        setError(data.error || "Erro ao remover associação");
      }
    } catch {
      setError("Erro de conexão");
    }
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
      <div className="flex flex-1 flex-col">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
          <div className="flex items-center gap-2">
            <Building className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Configurações da Empresa</h1>
          </div>

          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <Tabs defaultValue="company" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="company" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                Empresa
              </TabsTrigger>
              <TabsTrigger
                value="professionals"
                className="flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                Profissionais
              </TabsTrigger>
              <TabsTrigger value="services" className="flex items-center gap-2">
                <Scissors className="h-4 w-4" />
                Serviços
              </TabsTrigger>
            </TabsList>

            <TabsContent value="company" className="space-y-4">
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
                          onChange={(e) =>
                            setCompanyForm({
                              ...companyForm,
                              nomeFantasia: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="razaoSocial">Razão Social</Label>
                        <Input
                          id="razaoSocial"
                          value={companyForm.razaoSocial || ""}
                          onChange={(e) =>
                            setCompanyForm({
                              ...companyForm,
                              razaoSocial: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="cnpjCpf">CNPJ/CPF *</Label>
                        <Input
                          id="cnpjCpf"
                          value={companyForm.cnpjCpf || ""}
                          onChange={(e) =>
                            setCompanyForm({
                              ...companyForm,
                              cnpjCpf: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="telefone">Telefone</Label>
                        <Input
                          id="telefone"
                          value={companyForm.telefone || ""}
                          onChange={(e) =>
                            setCompanyForm({
                              ...companyForm,
                              telefone: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="endereco">Endereço</Label>
                        <Input
                          id="endereco"
                          value={companyForm.endereco || ""}
                          onChange={(e) =>
                            setCompanyForm({
                              ...companyForm,
                              endereco: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={companyForm.email || ""}
                          onChange={(e) =>
                            setCompanyForm({
                              ...companyForm,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <Button type="submit" disabled={editingCompany}>
                      {editingCompany && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Salvar Alterações
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="professionals" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Profissionais</CardTitle>
                  <CardDescription>
                    Lista de profissionais da empresa
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {professionals.map((professional) => (
                        <TableRow key={professional.id}>
                          <TableCell>{professional.name}</TableCell>
                        </TableRow>
                      ))}
                      {professionals.length === 0 && (
                        <TableRow>
                          <TableCell
                            colSpan={1}
                            className="text-center text-muted-foreground"
                          >
                            Nenhum profissional cadastrado
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="services" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Serviços */}
                <Card>
                  <CardHeader>
                    <CardTitle>Serviços</CardTitle>
                    <CardDescription>
                      Gerencie os serviços oferecidos
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button className="w-full">
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
                        <form
                          onSubmit={handleCreateService}
                          className="space-y-4"
                        >
                          <div>
                            <Label htmlFor="serviceName">
                              Nome do Serviço *
                            </Label>
                            <Input
                              id="serviceName"
                              value={serviceForm.name}
                              onChange={(e) =>
                                setServiceForm({
                                  ...serviceForm,
                                  name: e.target.value,
                                })
                              }
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
                              onChange={(e) =>
                                setServiceForm({
                                  ...serviceForm,
                                  price: e.target.value,
                                })
                              }
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="serviceDuration">
                              Duração (minutos) *
                            </Label>
                            <Input
                              id="serviceDuration"
                              type="number"
                              value={serviceForm.duration}
                              onChange={(e) =>
                                setServiceForm({
                                  ...serviceForm,
                                  duration: e.target.value,
                                })
                              }
                              required
                            />
                          </div>
                          <Button
                            type="submit"
                            disabled={creatingService}
                            className="w-full"
                          >
                            {creatingService && (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Criar Serviço
                          </Button>
                        </form>
                      </SheetContent>
                    </Sheet>

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
                            <TableCell
                              colSpan={4}
                              className="text-center text-muted-foreground"
                            >
                              Nenhum serviço cadastrado
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Associações Profissional-Serviço */}
                <Card>
                  <CardHeader>
                    <CardTitle>Associações</CardTitle>
                    <CardDescription>
                      Vincule serviços aos profissionais
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button className="w-full">
                          <Plus className="mr-2 h-4 w-4" />
                          Nova Associação
                        </Button>
                      </SheetTrigger>
                      <SheetContent>
                        <SheetHeader>
                          <SheetTitle>Associar Serviço</SheetTitle>
                          <SheetDescription>
                            Vincule um serviço a um profissional
                          </SheetDescription>
                        </SheetHeader>
                        <form
                          onSubmit={handleCreateAssociation}
                          className="space-y-4"
                        >
                          <div>
                            <Label htmlFor="professional">Profissional *</Label>
                            <Select
                              value={associationForm.professionalId}
                              onValueChange={(value) =>
                                setAssociationForm({
                                  ...associationForm,
                                  professionalId: value,
                                })
                              }
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
                            <Label htmlFor="service">Serviço *</Label>
                            <Select
                              value={associationForm.serviceId}
                              onValueChange={(value) =>
                                setAssociationForm({
                                  ...associationForm,
                                  serviceId: value,
                                })
                              }
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
                          <Button
                            type="submit"
                            disabled={creatingAssociation}
                            className="w-full"
                          >
                            {creatingAssociation && (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Associar
                          </Button>
                        </form>
                      </SheetContent>
                    </Sheet>

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
                                onClick={() =>
                                  handleDeleteAssociation(assoc.id)
                                }
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                        {professionalServices.length === 0 && (
                          <TableRow>
                            <TableCell
                              colSpan={3}
                              className="text-center text-muted-foreground"
                            >
                              Nenhuma associação criada
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </SidebarInset>
  );
}
