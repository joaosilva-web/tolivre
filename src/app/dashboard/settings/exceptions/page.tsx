"use client";

import { useState, useEffect } from "react";
import useSession from "@/hooks/useSession";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Plus, Calendar, Trash2, Edit } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface WorkingHourException {
  id: string;
  date: string;
  type: "BLOCKED" | "CUSTOM" | "HOLIDAY";
  reason?: string;
  openTime?: string;
  closeTime?: string;
  professionalId?: string;
  professional?: {
    name: string;
  };
}

export default function ExceptionsPage() {
  const { user, loading: sessionLoading } = useSession();
  const [exceptions, setExceptions] = useState<WorkingHourException[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [editingException, setEditingException] = useState<WorkingHourException | null>(null);
  
  // Form state
  const [selectedDate, setSelectedDate] = useState("");
  const [exceptionType, setExceptionType] = useState<"BLOCKED" | "CUSTOM" | "HOLIDAY">("BLOCKED");
  const [reason, setReason] = useState("");
  const [openTime, setOpenTime] = useState("09:00");
  const [closeTime, setCloseTime] = useState("18:00");
  const [isCompanyWide, setIsCompanyWide] = useState(true);
  
  // Load exceptions
  const loadExceptions = async () => {
    if (!user?.companyId) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/working-hours/exceptions`);
      if (res.ok) {
        const data = await res.json();
        setExceptions(data.data || []);
      }
    } catch (error) {
      console.error("Erro ao carregar exceções:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.companyId) {
      loadExceptions();
    }
  }, [user?.companyId]);

  const handleOpenDialog = (exception?: WorkingHourException) => {
    if (exception) {
      setEditingException(exception);
      setSelectedDate(exception.date);
      setExceptionType(exception.type);
      setReason(exception.reason || "");
      setOpenTime(exception.openTime || "09:00");
      setCloseTime(exception.closeTime || "18:00");
      setIsCompanyWide(!exception.professionalId);
    } else {
      setEditingException(null);
      setSelectedDate("");
      setExceptionType("BLOCKED");
      setReason("");
      setOpenTime("09:00");
      setCloseTime("18:00");
      setIsCompanyWide(true);
    }
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setEditingException(null);
  };

  const handleSubmit = async () => {
    if (!selectedDate) {
      alert("Selecione uma data");
      return;
    }

    const payload = {
      date: selectedDate,
      type: exceptionType,
      reason: reason.trim() || undefined,
      openTime: exceptionType === "CUSTOM" ? openTime : undefined,
      closeTime: exceptionType === "CUSTOM" ? closeTime : undefined,
      professionalId: isCompanyWide ? null : user?.id,
    };

    try {
      let res;
      if (editingException) {
        res = await fetch(`/api/working-hours/exceptions/${editingException.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/working-hours/exceptions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        alert(editingException ? "Exceção atualizada com sucesso!" : "Exceção criada com sucesso!");
        handleCloseDialog();
        loadExceptions();
      } else {
        const data = await res.json();
        alert(data.error || "Erro ao salvar exceção");
      }
    } catch (error) {
      console.error("Erro ao salvar exceção:", error);
      alert("Erro ao salvar exceção");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Deseja realmente excluir esta exceção?")) return;

    try {
      const res = await fetch(`/api/working-hours/exceptions/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Exceção excluída com sucesso!");
        loadExceptions();
      } else {
        const data = await res.json();
        alert(data.error || "Erro ao excluir exceção");
      }
    } catch (error) {
      console.error("Erro ao excluir exceção:", error);
      alert("Erro ao excluir exceção");
    }
  };

  if (sessionLoading || loading) {
    return (
      <SidebarInset>
        <SiteHeader />
        <div className="flex items-center justify-center h-screen">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </SidebarInset>
    );
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "BLOCKED":
        return "Dia Bloqueado";
      case "CUSTOM":
        return "Horário Personalizado";
      case "HOLIDAY":
        return "Feriado";
      default:
        return type;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "BLOCKED":
        return "bg-red-100 text-red-800";
      case "CUSTOM":
        return "bg-blue-100 text-blue-800";
      case "HOLIDAY":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Sort exceptions by date
  const sortedExceptions = [...exceptions].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <SidebarInset>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-6 w-6" />
              <h1 className="text-2xl font-bold">Exceções de Horário</h1>
            </div>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="h-4 w-4 mr-2" />
              Nova Exceção
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Gerenciar Exceções</CardTitle>
              <CardDescription>
                Configure dias bloqueados, feriados ou horários personalizados
              </CardDescription>
            </CardHeader>
            <CardContent>
              {sortedExceptions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Nenhuma exceção cadastrada</p>
                  <p className="text-sm mt-1">
                    Clique em "Nova Exceção" para adicionar
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {sortedExceptions.map((exception) => (
                    <div
                      key={exception.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-medium">
                            {format(new Date(exception.date), "dd/MM/yyyy (EEEE)", { locale: ptBR })}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeBadgeColor(exception.type)}`}>
                            {getTypeLabel(exception.type)}
                          </span>
                        </div>
                        {exception.reason && (
                          <p className="text-sm text-gray-600 mb-1">
                            {exception.reason}
                          </p>
                        )}
                        {exception.type === "CUSTOM" && (
                          <p className="text-sm text-gray-600">
                            Horário: {exception.openTime} - {exception.closeTime}
                          </p>
                        )}
                        {exception.professional && (
                          <p className="text-xs text-gray-500 mt-1">
                            Profissional: {exception.professional.name}
                          </p>
                        )}
                        {!exception.professionalId && (
                          <p className="text-xs text-gray-500 mt-1">
                            Toda a empresa
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenDialog(exception)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(exception.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingException ? "Editar Exceção" : "Nova Exceção"}
            </DialogTitle>
            <DialogDescription>
              Configure uma exceção de horário de trabalho
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="date">Data</Label>
              <Input
                id="date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="type">Tipo de Exceção</Label>
              <Select value={exceptionType} onValueChange={(v: any) => setExceptionType(v)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BLOCKED">Dia Bloqueado</SelectItem>
                  <SelectItem value="CUSTOM">Horário Personalizado</SelectItem>
                  <SelectItem value="HOLIDAY">Feriado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="reason">Motivo (opcional)</Label>
              <Input
                id="reason"
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Ex: Natal, Manutenção, etc"
                className="mt-1"
              />
            </div>

            {exceptionType === "CUSTOM" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="openTime">Horário de Abertura</Label>
                  <Input
                    id="openTime"
                    type="time"
                    value={openTime}
                    onChange={(e) => setOpenTime(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="closeTime">Horário de Fechamento</Label>
                  <Input
                    id="closeTime"
                    type="time"
                    value={closeTime}
                    onChange={(e) => setCloseTime(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="companyWide"
                checked={isCompanyWide}
                onChange={(e) => setIsCompanyWide(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="companyWide" className="cursor-pointer">
                Aplicar para toda a empresa
              </Label>
            </div>
            {!isCompanyWide && (
              <p className="text-sm text-gray-600">
                Esta exceção será aplicada apenas para você
              </p>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit}>
              {editingException ? "Atualizar" : "Criar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarInset>
  );
}
