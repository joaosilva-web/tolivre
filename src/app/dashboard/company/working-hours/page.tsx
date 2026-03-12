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
import { Loader2, Plus, Trash2, Clock } from "lucide-react";
import { toast } from "sonner";

const DAY_NAMES = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const DAY_SHORT = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

interface WorkingHour {
  id: string;
  companyId: string;
  dayOfWeek: number;
  openTime: string;
  closeTime: string;
}

export default function WorkingHoursPage() {
  const { user, loading: sessionLoading } = useSession();
  const [loading, setLoading] = useState(true);
  const [workingHours, setWorkingHours] = useState<WorkingHour[]>([]);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    dayOfWeek: "1",
    openTime: "08:00",
    closeTime: "17:00",
  });

  const loadData = useCallback(async () => {
    if (!user?.companyId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/working-hours?companyId=${user.companyId}`);
      if (res.ok) {
        const data = await res.json();
        setWorkingHours(data.data ?? []);
      }
    } catch {
      toast.error("Erro ao carregar horários");
    } finally {
      setLoading(false);
    }
  }, [user?.companyId]);

  useEffect(() => {
    if (user?.companyId && !sessionLoading) loadData();
  }, [user?.companyId, sessionLoading, loadData]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.companyId) return;
    setCreating(true);
    try {
      const res = await fetch("/api/working-hours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyId: user.companyId,
          dayOfWeek: parseInt(form.dayOfWeek),
          openTime: form.openTime,
          closeTime: form.closeTime,
        }),
      });
      if (res.ok) {
        setSheetOpen(false);
        await loadData();
        toast.success("Horário criado com sucesso");
      } else {
        const data = await res.json();
        toast.error(data.error || "Erro ao criar horário");
      }
    } catch {
      toast.error("Erro de conexão");
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir este horário?")) return;
    try {
      const res = await fetch(`/api/working-hours/${id}`, { method: "DELETE" });
      if (res.ok) {
        await loadData();
        toast.success("Horário excluído");
      } else {
        const data = await res.json();
        toast.error(data.error || "Erro ao excluir horário");
      }
    } catch {
      toast.error("Erro de conexão");
    }
  };

  // Sort by dayOfWeek
  const sorted = [...workingHours].sort((a, b) => a.dayOfWeek - b.dayOfWeek);

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
            <Clock className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Horários de Funcionamento</h1>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Horários de Funcionamento</CardTitle>
                <CardDescription>
                  Configure os dias e períodos em que sua empresa atende
                </CardDescription>
              </div>
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Novo Horário
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Criar Horário</SheetTitle>
                    <SheetDescription>
                      Defina um dia da semana e o período de atendimento
                    </SheetDescription>
                  </SheetHeader>
                  <form onSubmit={handleCreate} className="space-y-4 mt-4">
                    <div>
                      <Label>Dia da Semana</Label>
                      <Select
                        value={form.dayOfWeek}
                        onValueChange={(v) => setForm({ ...form, dayOfWeek: v })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {DAY_NAMES.map((name, i) => (
                            <SelectItem key={i} value={String(i)}>
                              {name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Início</Label>
                      <Input
                        type="time"
                        value={form.openTime}
                        onChange={(e) => setForm({ ...form, openTime: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label>Fim</Label>
                      <Input
                        type="time"
                        value={form.closeTime}
                        onChange={(e) => setForm({ ...form, closeTime: e.target.value })}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={creating}>
                      {creating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Criar
                    </Button>
                  </form>
                </SheetContent>
              </Sheet>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Dia</TableHead>
                    <TableHead>Início</TableHead>
                    <TableHead>Fim</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sorted.map((wh) => (
                    <TableRow key={wh.id}>
                      <TableCell>{DAY_SHORT[wh.dayOfWeek]}</TableCell>
                      <TableCell>{wh.openTime}</TableCell>
                      <TableCell>{wh.closeTime}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(wh.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {sorted.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground">
                        Nenhum horário cadastrado
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarInset>
  );
}
