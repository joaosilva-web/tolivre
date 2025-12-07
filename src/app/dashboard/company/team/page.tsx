"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Upload, X, Save, Users } from "lucide-react";
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

interface Professional {
  id: string;
  name: string;
  email: string;
  role: string;
  photoUrl: string | null;
  bio: string | null;
  commissionRate: number;
}

export default function TeamManagementPage() {
  const router = useRouter();
  const { user, loading: userLoading } = useSession();
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    if (!userLoading && user) {
      loadProfessionals();
    }
  }, [userLoading, user]);

  const loadProfessionals = async () => {
    try {
      const res = await fetch(`/api/company/${user?.companyId}/professionals`);
      if (res.ok) {
        const data = await res.json();
        setProfessionals(data.data || []);
      }
    } catch (err) {
      console.error("Erro ao carregar equipe:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = async (
    userId: string,
    file: File
  ) => {
    setUploading(userId);
    try {
      const formData = new FormData();
      formData.append("photo", file);
      formData.append("userId", userId);

      const res = await fetch("/api/users/photo", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const result = await res.json();
        // Atualizar localmente o estado para refletir a mudança imediatamente
        setProfessionals((prev) =>
          prev.map((p) =>
            p.id === userId ? { ...p, photoUrl: result.data.photoUrl } : p
          )
        );
        // Recarregar para garantir sincronização
        await loadProfessionals();
      } else {
        const error = await res.json();
        alert(error.error || "Erro ao fazer upload");
      }
    } catch (err) {
      console.error("Erro no upload:", err);
      alert("Erro ao fazer upload da foto");
    } finally {
      setUploading(null);
    }
  };

  const handleRemovePhoto = async (userId: string) => {
    try {
      const res = await fetch("/api/users/photo", {
        method: "DELETE",
      });

      if (res.ok) {
        await loadProfessionals();
      }
    } catch (err) {
      console.error("Erro ao remover foto:", err);
    }
  };

  const handleUpdateProfile = async (
    userId: string,
    data: { bio?: string; commissionRate?: number }
  ) => {
    setSaving(userId);
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        await loadProfessionals();
      } else {
        const error = await res.json();
        alert(error.error || "Erro ao atualizar");
      }
    } catch (err) {
      console.error("Erro ao atualizar:", err);
      alert("Erro ao atualizar perfil");
    } finally {
      setSaving(null);
    }
  };

  if (userLoading || loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (user?.roles?.includes("EMPLOYEE") && !user?.roles?.includes("OWNER") && !user?.roles?.includes("MANAGER")) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Acesso Negado</h1>
          <p className="mt-2 text-muted-foreground">
            Apenas proprietários e gerentes podem acessar esta página.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Users className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Gestão de Equipe</h1>
        </div>
        <p className="text-muted-foreground">
          Gerencie fotos, biografias e comissões dos profissionais
        </p>
      </div>

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

                    {prof.photoUrl && (
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
              {/* Biografia */}
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
                      handleUpdateProfile(prof.id, { bio: e.target.value });
                    }
                  }}
                />
              </div>

              {/* Comissão */}
              {user?.roles?.includes("OWNER") && (
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
                      step="0.5"
                      defaultValue={prof.commissionRate}
                      className="max-w-[200px]"
                      onBlur={(e) => {
                        const newRate = parseFloat(e.target.value);
                        if (newRate !== prof.commissionRate) {
                          handleUpdateProfile(prof.id, {
                            commissionRate: newRate,
                          });
                        }
                      }}
                    />
                    <span className="text-sm text-muted-foreground">
                      {prof.commissionRate}% dos agendamentos
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Esta taxa será aplicada automaticamente em novos agendamentos
                  </p>
                </div>
              )}

              {saving === prof.id && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Save className="h-4 w-4 animate-pulse" />
                  Salvando alterações...
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {professionals.length === 0 && (
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
      )}
    </div>
  );
}
