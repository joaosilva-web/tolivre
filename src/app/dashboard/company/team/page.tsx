"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, Save, Upload, Users, X } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import useSession from "@/hooks/useSession";
import { toast } from "sonner";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";

type Professional = {
  id: string;
  name: string;
  email: string;
  role: "OWNER" | "MANAGER" | "EMPLOYEE";
  photoUrl: string | null;
  bio: string | null;
  commissionRate: number | null;
};

export default function TeamManagementPage() {
  const { user, loading: sessionLoading } = useSession();

  const [loading, setLoading] = useState(true);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [uploading, setUploading] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null);

  const loadProfessionals = useCallback(async () => {
    if (!user?.companyId) return;

    try {
      setLoading(true);
      const res = await fetch(`/api/company/${user.companyId}/professionals`);

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        toast.error(err.error || "Erro ao carregar profissionais");
        return;
      }

      const data = await res.json();
      setProfessionals(data.data ?? data);
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

  const handleUpdateProfile = async (
    professionalId: string,
    updates: Partial<Pick<Professional, "bio" | "commissionRate">>,
  ) => {
    try {
      setSaving(professionalId);
      const res = await fetch(`/api/users/${professionalId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        toast.error(err.error || "Erro ao atualizar profissional");
        return;
      }

      const updated = await res.json();
      setProfessionals((prev) =>
        prev.map((p) => (p.id === professionalId ? { ...p, ...updated } : p)),
      );
      toast.success("Dados atualizados");
    } catch (err) {
      console.error("Erro ao atualizar profissional", err);
      toast.error("Erro ao atualizar profissional");
    } finally {
      setSaving(null);
    }
  };

  const handlePhotoUpload = async (professionalId: string, file: File) => {
    try {
      setUploading(professionalId);
      const formData = new FormData();
      formData.append("photo", file);
      formData.append("userId", professionalId);

      const res = await fetch("/api/users/photo", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        toast.error(err.error || "Erro ao enviar foto");
        return;
      }

      const data = await res.json();
      const photoUrl = data.photoUrl || data.data?.photoUrl;
      const targetId = data.userId || professionalId;

      setProfessionals((prev) =>
        prev.map((p) => (p.id === targetId ? { ...p, photoUrl } : p)),
      );
      toast.success("Foto atualizada");
    } catch (err) {
      console.error("Erro ao enviar foto", err);
      toast.error("Erro ao enviar foto");
    } finally {
      setUploading(null);
    }
  };

  const handleRemovePhoto = async (professionalId: string) => {
    if (professionalId !== user?.id) {
      toast.error("Apenas o próprio usuário pode remover a própria foto");
      return;
    }

    try {
      setUploading(professionalId);
      const res = await fetch("/api/users/photo", { method: "DELETE" });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        toast.error(err.error || "Erro ao remover foto");
        return;
      }

      setProfessionals((prev) =>
        prev.map((p) =>
          p.id === professionalId ? { ...p, photoUrl: null } : p,
        ),
      );
      toast.success("Foto removida");
    } catch (err) {
      console.error("Erro ao remover foto", err);
      toast.error("Erro ao remover foto");
    } finally {
      setUploading(null);
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

  return (
    <SidebarInset>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Gestão de Equipe
              </h1>
              <p className="text-muted-foreground">
                Gerencie fotos, biografias e comissões dos profissionais
              </p>
            </div>
          </div>

          {professionals.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Nenhum profissional encontrado
                </h3>
                <p className="text-muted-foreground">
                  Adicione profissionais na tela de configurações da empresa
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {professionals.map((prof) => (
                <Card key={prof.id}>
                  <CardHeader>
                    <div className="flex items-start gap-6">
                      <div className="relative">
                        <Avatar className="h-24 w-24 border-2">
                          <AvatarImage src={prof.photoUrl || undefined} />
                          <AvatarFallback className="text-2xl">
                            {prof.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        {uploading === prof.id && (
                          <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                            <Loader2 className="h-6 w-6 animate-spin text-white" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle>{prof.name}</CardTitle>
                          <Badge variant="secondary">{prof.role}</Badge>
                        </div>
                        <CardDescription>{prof.email}</CardDescription>

                        <div className="flex gap-2 mt-4">
                          <Label
                            htmlFor={`photo-${prof.id}`}
                            className="cursor-pointer"
                          >
                            <div className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-input bg-background px-4 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground">
                              <Upload className="h-4 w-4" />
                              {prof.photoUrl ? "Trocar Foto" : "Adicionar Foto"}
                            </div>
                            <input
                              id={`photo-${prof.id}`}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handlePhotoUpload(prof.id, file);
                              }}
                            />
                          </Label>

                          {prof.photoUrl && prof.id === user.id && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemovePhoto(prof.id)}
                            >
                              <X className="h-4 w-4" />
                              Remover
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor={`bio-${prof.id}`}>
                        Biografia (exibida na página pública)
                      </Label>
                      <Textarea
                        id={`bio-${prof.id}`}
                        defaultValue={prof.bio || ""}
                        placeholder="Especialidades, experiência, formação..."
                        className="mt-2"
                        onBlur={(e) => {
                          if (e.target.value !== prof.bio) {
                            handleUpdateProfile(prof.id, {
                              bio: e.target.value,
                            });
                          }
                        }}
                      />
                    </div>

                    {user.role === "OWNER" && (
                      <div>
                        <Label htmlFor={`commission-${prof.id}`}>
                          Taxa de Comissão (%)
                        </Label>
                        <div className="flex items-center gap-4 mt-2">
                          <Input
                            id={`commission-${prof.id}`}
                            type="number"
                            min="0"
                            max="100"
                            step="0.01"
                            defaultValue={prof.commissionRate ?? undefined}
                            onBlur={(e) => {
                              const value = parseFloat(e.target.value);
                              if (
                                !isNaN(value) &&
                                value !== prof.commissionRate
                              ) {
                                handleUpdateProfile(prof.id, {
                                  commissionRate: value,
                                });
                              }
                            }}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const input = document.getElementById(
                                `commission-${prof.id}`,
                              ) as HTMLInputElement;
                              const value = parseFloat(input.value);
                              if (!isNaN(value)) {
                                handleUpdateProfile(prof.id, {
                                  commissionRate: value,
                                });
                              }
                            }}
                            disabled={saving === prof.id}
                          >
                            {saving === prof.id ? (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                              <Save className="mr-2 h-4 w-4" />
                            )}
                            Salvar comissão
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </SidebarInset>
  );
}
