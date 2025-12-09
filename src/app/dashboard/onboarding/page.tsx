"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useSession from "@/hooks/useSession";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  Loader2,
  Building,
  Clock,
  Scissors,
  Check,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
}

const steps: OnboardingStep[] = [
  {
    id: 1,
    title: "Informações da Empresa",
    description: "Dados básicos do seu negócio",
    icon: Building,
  },
  {
    id: 2,
    title: "Horários de Funcionamento",
    description: "Configure quando você atende",
    icon: Clock,
  },
  {
    id: 3,
    title: "Serviços Oferecidos",
    description: "Adicione seus serviços",
    icon: Scissors,
  },
  {
    id: 4,
    title: "Configuração Completa",
    description: "Tudo pronto para começar!",
    icon: CheckCircle2,
  },
];

interface WorkingHour {
  dayOfWeek: number;
  openTime: string;
  closeTime: string;
}

interface Service {
  name: string;
  price: string;
  duration: string;
}

export default function OnboardingPage() {
  const router = useRouter();
  const { user, loading: sessionLoading } = useSession();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Step 1: Company Info
  const [companyForm, setCompanyForm] = useState({
    nomeFantasia: "",
    razaoSocial: "",
    cnpjCpf: "",
    telefone: "",
    endereco: "",
    email: "",
  });

  // Step 2: Working Hours
  const [workingHours, setWorkingHours] = useState<WorkingHour[]>([
    { dayOfWeek: 1, openTime: "08:00", closeTime: "18:00" },
    { dayOfWeek: 2, openTime: "08:00", closeTime: "18:00" },
    { dayOfWeek: 3, openTime: "08:00", closeTime: "18:00" },
    { dayOfWeek: 4, openTime: "08:00", closeTime: "18:00" },
    { dayOfWeek: 5, openTime: "08:00", closeTime: "18:00" },
  ]);
  const [selectedDays, setSelectedDays] = useState<number[]>([1, 2, 3, 4, 5]);

  // Step 3: Services
  const [services, setServices] = useState<Service[]>([
    { name: "", price: "", duration: "30" },
  ]);

  // Check if onboarding is already completed
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      // Se não tem companyId, precisa fazer onboarding
      if (!user?.companyId) {
        return;
      }

      try {
        const res = await fetch(`/api/company/${user.companyId}`);
        if (res.ok) {
          const data = await res.json();
          // Se empresa já tem dados, redireciona para dashboard
          if (
            data.data?.nomeFantasia &&
            data.data?.cnpjCpf &&
            data.data?.telefone
          ) {
            router.push("/dashboard");
          }
        }
      } catch (err) {
        console.error("Erro ao verificar status do onboarding:", err);
      }
    };

    if (!sessionLoading && user) {
      checkOnboardingStatus();
    }
  }, [user, sessionLoading, router]);

  const toggleDay = (day: number) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
      setWorkingHours(workingHours.filter((wh) => wh.dayOfWeek !== day));
    } else {
      setSelectedDays([...selectedDays, day].sort());
      setWorkingHours([
        ...workingHours,
        { dayOfWeek: day, openTime: "08:00", closeTime: "18:00" },
      ]);
    }
  };

  const updateWorkingHour = (
    day: number,
    field: "openTime" | "closeTime",
    value: string
  ) => {
    setWorkingHours(
      workingHours.map((wh) =>
        wh.dayOfWeek === day ? { ...wh, [field]: value } : wh
      )
    );
  };

  const addService = () => {
    setServices([...services, { name: "", price: "", duration: "30" }]);
  };

  const removeService = (index: number) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const updateService = (
    index: number,
    field: keyof Service,
    value: string
  ) => {
    setServices(
      services.map((s, i) => (i === index ? { ...s, [field]: value } : s))
    );
  };

  const handleStep1Next = () => {
    if (!companyForm.nomeFantasia || !companyForm.cnpjCpf) {
      setError("Preencha os campos obrigatórios");
      return;
    }

    setError("");
    setCurrentStep(2);
  };

  const handleStep2Next = () => {
    if (workingHours.length === 0) {
      setError("Selecione pelo menos um dia de funcionamento");
      return;
    }

    setError("");
    setCurrentStep(3);
  };

  const handleStep3Next = () => {
    const validServices = services.filter(
      (s) => s.name && s.price && s.duration
    );

    if (validServices.length === 0) {
      setError("Adicione pelo menos um serviço");
      return;
    }

    setError("");
    setCurrentStep(4);
  };

  const handleFinishOnboarding = async () => {
    setLoading(true);
    setError("");

    try {
      // 1. Criar ou atualizar empresa
      const method = user?.companyId ? "PUT" : "POST";
      const companyRes = await fetch("/api/company", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(companyForm),
      });

      if (!companyRes.ok) {
        const data = await companyRes.json();
        setError(data.error || "Erro ao salvar informações da empresa");
        return;
      }

      const companyData = await companyRes.json();
      const companyId = user?.companyId || companyData.data?.id;

      if (!companyId) {
        setError("Erro ao obter ID da empresa");
        return;
      }

      // 2. Salvar horários de funcionamento
      const whPromises = workingHours.map((wh) =>
        fetch("/api/working-hours", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            companyId,
            ...wh,
          }),
        })
      );

      const whResults = await Promise.all(whPromises);
      if (!whResults.every((r) => r.ok)) {
        setError("Erro ao salvar horários de funcionamento");
        return;
      }

      // 3. Salvar serviços
      const validServices = services.filter(
        (s) => s.name && s.price && s.duration
      );

      const servicePromises = validServices.map((s) =>
        fetch("/api/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            companyId,
            name: s.name,
            price: parseFloat(s.price),
            duration: parseInt(s.duration),
          }),
        })
      );

      const serviceResults = await Promise.all(servicePromises);
      if (!serviceResults.every((r) => r.ok)) {
        setError("Erro ao salvar serviços");
        return;
      }

      // Tudo salvo com sucesso!
      // Se foi POST (nova empresa), recarrega para atualizar token
      if (method === "POST") {
        window.location.href = "/dashboard";
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Erro ao finalizar onboarding:", err);
      setError("Erro de conexão ao salvar dados");
    } finally {
      setLoading(false);
    }
  };

  if (sessionLoading) {
    return (
      <SidebarInset>
        <SiteHeader />
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </SidebarInset>
    );
  }

  const progress = (currentStep / steps.length) * 100;

  return (
    <SidebarInset>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="container max-w-4xl mx-auto py-8 px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Bem-vindo ao TôLivre! 🎉
            </h1>
            <p className="text-muted-foreground">
              Vamos configurar seu sistema em {steps.length} passos simples
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={cn(
                    "flex flex-col items-center flex-1",
                    step.id < currentStep && "text-primary",
                    step.id === currentStep && "text-primary font-semibold",
                    step.id > currentStep && "text-muted-foreground"
                  )}
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center mb-2",
                      step.id < currentStep &&
                        "bg-primary text-primary-foreground",
                      step.id === currentStep &&
                        "bg-primary text-primary-foreground ring-4 ring-primary/20",
                      step.id > currentStep && "bg-muted"
                    )}
                  >
                    {step.id < currentStep ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <step.icon className="h-5 w-5" />
                    )}
                  </div>
                  <span className="text-xs text-center hidden sm:block">
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Step Content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {(() => {
                  const Icon = steps[currentStep - 1].icon;
                  return <Icon className="h-6 w-6" />;
                })()}
                {steps[currentStep - 1].title}
              </CardTitle>
              <CardDescription>
                {steps[currentStep - 1].description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Step 1: Company Info */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="nomeFantasia">
                      Nome da Empresa *{" "}
                      <span className="text-xs text-muted-foreground">
                        (Como seus clientes conhecem você)
                      </span>
                    </Label>
                    <Input
                      id="nomeFantasia"
                      placeholder="Ex: Barbearia do João"
                      value={companyForm.nomeFantasia}
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
                    <Label htmlFor="razaoSocial">
                      Razão Social{" "}
                      <span className="text-xs text-muted-foreground">
                        (Opcional)
                      </span>
                    </Label>
                    <Input
                      id="razaoSocial"
                      placeholder="Ex: João Silva ME"
                      value={companyForm.razaoSocial}
                      onChange={(e) =>
                        setCompanyForm({
                          ...companyForm,
                          razaoSocial: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cnpjCpf">
                        CNPJ ou CPF *{" "}
                        <span className="text-xs text-muted-foreground">
                          (Apenas números)
                        </span>
                      </Label>
                      <Input
                        id="cnpjCpf"
                        placeholder="00000000000000"
                        value={companyForm.cnpjCpf}
                        onChange={(e) =>
                          setCompanyForm({
                            ...companyForm,
                            cnpjCpf: e.target.value.replace(/\D/g, ""),
                          })
                        }
                        maxLength={14}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="telefone">
                        WhatsApp/Telefone{" "}
                        <span className="text-xs text-muted-foreground">
                          (Com DDD)
                        </span>
                      </Label>
                      <Input
                        id="telefone"
                        placeholder="45999999999"
                        value={companyForm.telefone}
                        onChange={(e) =>
                          setCompanyForm({
                            ...companyForm,
                            telefone: e.target.value.replace(/\D/g, ""),
                          })
                        }
                        maxLength={11}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="endereco">
                      Endereço Completo{" "}
                      <span className="text-xs text-muted-foreground">
                        (Rua, número, bairro, cidade)
                      </span>
                    </Label>
                    <Textarea
                      id="endereco"
                      placeholder="Ex: Rua das Flores, 123, Centro, São Paulo - SP"
                      value={companyForm.endereco}
                      onChange={(e) =>
                        setCompanyForm({
                          ...companyForm,
                          endereco: e.target.value,
                        })
                      }
                      rows={2}
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">
                      Email{" "}
                      <span className="text-xs text-muted-foreground">
                        (Para contato e notificações)
                      </span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="contato@suaempresa.com"
                      value={companyForm.email}
                      onChange={(e) =>
                        setCompanyForm({
                          ...companyForm,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Working Hours */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <Label className="mb-3 block">
                      Selecione os dias que você atende
                    </Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {[
                        { value: 0, label: "Domingo" },
                        { value: 1, label: "Segunda" },
                        { value: 2, label: "Terça" },
                        { value: 3, label: "Quarta" },
                        { value: 4, label: "Quinta" },
                        { value: 5, label: "Sexta" },
                        { value: 6, label: "Sábado" },
                      ].map((day) => (
                        <Button
                          key={day.value}
                          type="button"
                          variant={
                            selectedDays.includes(day.value)
                              ? "default"
                              : "outline"
                          }
                          onClick={() => toggleDay(day.value)}
                          className="w-full"
                        >
                          {selectedDays.includes(day.value) && (
                            <Check className="mr-2 h-4 w-4" />
                          )}
                          {day.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {workingHours.length > 0 && (
                    <div>
                      <Label className="mb-3 block">
                        Configure os horários de atendimento
                      </Label>
                      <div className="space-y-3">
                        {workingHours
                          .sort((a, b) => a.dayOfWeek - b.dayOfWeek)
                          .map((wh) => (
                            <div
                              key={wh.dayOfWeek}
                              className="flex items-center gap-3 p-3 border rounded-lg"
                            >
                              <div className="font-medium min-w-[80px]">
                                {
                                  [
                                    "Domingo",
                                    "Segunda",
                                    "Terça",
                                    "Quarta",
                                    "Quinta",
                                    "Sexta",
                                    "Sábado",
                                  ][wh.dayOfWeek]
                                }
                              </div>
                              <div className="flex items-center gap-2 flex-1">
                                <Input
                                  type="time"
                                  value={wh.openTime}
                                  onChange={(e) =>
                                    updateWorkingHour(
                                      wh.dayOfWeek,
                                      "openTime",
                                      e.target.value
                                    )
                                  }
                                />
                                <span className="text-muted-foreground">
                                  até
                                </span>
                                <Input
                                  type="time"
                                  value={wh.closeTime}
                                  onChange={(e) =>
                                    updateWorkingHour(
                                      wh.dayOfWeek,
                                      "closeTime",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      💡 <strong>Dica:</strong> Você poderá ajustar esses
                      horários a qualquer momento nas configurações da empresa.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 3: Services */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <Label className="mb-3 block">
                      Adicione os serviços que você oferece
                    </Label>
                    <div className="space-y-4">
                      {services.map((service, index) => (
                        <div
                          key={index}
                          className="p-4 border rounded-lg space-y-3"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-sm">
                              Serviço {index + 1}
                            </span>
                            {services.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeService(index)}
                              >
                                Remover
                              </Button>
                            )}
                          </div>

                          <div>
                            <Label htmlFor={`service-name-${index}`}>
                              Nome do Serviço *
                            </Label>
                            <Input
                              id={`service-name-${index}`}
                              placeholder="Ex: Corte Masculino"
                              value={service.name}
                              onChange={(e) =>
                                updateService(index, "name", e.target.value)
                              }
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label htmlFor={`service-price-${index}`}>
                                Preço (R$) *
                              </Label>
                              <Input
                                id={`service-price-${index}`}
                                type="number"
                                step="0.01"
                                placeholder="30.00"
                                value={service.price}
                                onChange={(e) =>
                                  updateService(index, "price", e.target.value)
                                }
                              />
                            </div>

                            <div>
                              <Label htmlFor={`service-duration-${index}`}>
                                Duração (min) *
                              </Label>
                              <Select
                                value={service.duration}
                                onValueChange={(value) =>
                                  updateService(index, "duration", value)
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="15">15 min</SelectItem>
                                  <SelectItem value="30">30 min</SelectItem>
                                  <SelectItem value="45">45 min</SelectItem>
                                  <SelectItem value="60">1 hora</SelectItem>
                                  <SelectItem value="90">1h 30min</SelectItem>
                                  <SelectItem value="120">2 horas</SelectItem>
                                  <SelectItem value="180">3 horas</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={addService}
                      className="w-full mt-4"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Adicionar Mais um Serviço
                    </Button>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      💡 <strong>Dica:</strong> Adicione pelo menos os
                      principais serviços. Você poderá adicionar mais serviços
                      depois.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 4: Complete */}
              {currentStep === 4 && (
                <div className="text-center space-y-6 py-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full">
                    <CheckCircle2 className="h-12 w-12 text-green-600" />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-2">
                      Parabéns! Tudo Configurado! 🎉
                    </h2>
                    <p className="text-muted-foreground">
                      Seu sistema está pronto para uso. Agora você pode:
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">
                          ✅ Receber Agendamentos
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        Seus clientes já podem agendar serviços online
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">
                          ✅ Gerenciar sua Agenda
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        Visualize e organize todos os seus compromissos
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">
                          ✅ Cadastrar Clientes
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        Mantenha um histórico completo de atendimentos
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">
                          ✅ Acompanhar Estatísticas
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        Veja relatórios de faturamento e desempenho
                      </CardContent>
                    </Card>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="font-semibold mb-2">Próximos Passos:</h3>
                    <ul className="text-sm text-left space-y-2 max-w-md mx-auto">
                      <li>• Configure sua página pública de agendamentos</li>
                      <li>• Personalize seu perfil profissional</li>
                      <li>
                        • Compartilhe seu link de agendamento com clientes
                      </li>
                      <li>• Explore todas as funcionalidades do sistema</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                {currentStep > 1 && currentStep < 4 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    disabled={loading}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar
                  </Button>
                )}

                {currentStep < 4 ? (
                  <Button
                    type="button"
                    onClick={() => {
                      if (currentStep === 1) handleStep1Next();
                      if (currentStep === 2) handleStep2Next();
                      if (currentStep === 3) handleStep3Next();
                    }}
                    disabled={loading}
                    className="ml-auto"
                  >
                    Continuar
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleFinishOnboarding}
                    className="w-full"
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Salvando Configuração...
                      </>
                    ) : (
                      <>
                        Concluir e Ir para o Dashboard
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarInset>
  );
}
