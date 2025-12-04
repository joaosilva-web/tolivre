"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// next/navigation not required here
import { SidebarInset } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import useSession from "@/hooks/useSession";

interface ClientShape {
  id: string;
  name: string;
  email?: string;
  phone?: string;
}

interface AppointmentMini {
  id: string;
  startTime: string;
  clientName: string;
}

export default function ClientPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { user } = useSession();
  const [client, setClient] = useState<ClientShape | null>(null);
  const [editing, setEditing] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [appointments, setAppointments] = useState<AppointmentMini[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (!user?.companyId) return;
      setLoading(true);
      try {
        const [cRes, aRes] = await Promise.all([
          fetch(`/api/clients/${id}`),
          fetch(`/api/appointments?companyId=${user.companyId}&clientId=${id}`),
        ]);
        if (cRes.ok) {
          const d = await cRes.json();
          if (!mounted) return;
          const clientData = d.data || d;
          setClient(clientData);
          setNameInput(clientData?.name || "");
          setEmailInput(clientData?.email || "");
          setPhoneInput(clientData?.phone || "");
        }
        if (aRes.ok) {
          const d = await aRes.json();
          if (!mounted) return;
          setAppointments(d.data || d);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [user?.companyId, id]);

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

  if (!client) {
    return (
      <SidebarInset>
        <SiteHeader />
        <div className="flex items-center justify-center min-h-screen">
          <Card>
            <CardHeader>
              <CardTitle>Cliente não encontrado</CardTitle>
            </CardHeader>
            <CardContent>Verifique se o cliente existe.</CardContent>
          </Card>
        </div>
      </SidebarInset>
    );
  }

  return (
    <SidebarInset>
      <SiteHeader />
      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>{client.name}</CardTitle>
          </CardHeader>
          <CardContent>
            {!editing ? (
              <>
                <div>Email: {client.email || "-"}</div>
                <div>Telefone: {client.phone || "-"}</div>
              </>
            ) : (
              <div className="space-y-2">
                <label className="block">
                  <div className="text-sm">Nome</div>
                  <input
                    className="w-full border rounded px-2 py-1"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                  />
                </label>
                <label className="block">
                  <div className="text-sm">Email</div>
                  <input
                    className="w-full border rounded px-2 py-1"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                  />
                </label>
                <label className="block">
                  <div className="text-sm">Telefone</div>
                  <input
                    className="w-full border rounded px-2 py-1"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                  />
                </label>
              </div>
            )}
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Agendamentos</h3>
              {appointments.length === 0 ? (
                <div className="text-muted-foreground">Nenhum agendamento</div>
              ) : (
                <div className="space-y-2 mt-2">
                  {appointments.map((a) => (
                    <div key={a.id} className="p-2 border rounded">
                      <div>{new Date(a.startTime).toLocaleString("pt-BR")}</div>
                      <div>{a.clientName}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex gap-2 mt-4">
              {!editing ? (
                <>
                  <button
                    className="btn btn-primary"
                    onClick={() => setEditing(true)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-outline text-danger"
                    onClick={async () => {
                      if (
                        !confirm("Tem certeza que deseja deletar este cliente?")
                      )
                        return;
                      setIsDeleting(true);
                      try {
                        const res = await fetch(`/api/clients/${id}`, {
                          method: "DELETE",
                        });
                        if (res.ok) {
                          router.push("/dashboard");
                        } else {
                          const err = await res.json().catch(() => null);
                          alert(err?.error || "Erro ao deletar cliente");
                        }
                      } catch (err) {
                        console.error(err);
                        alert("Erro ao deletar cliente");
                      } finally {
                        setIsDeleting(false);
                      }
                    }}
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deletando..." : "Deletar"}
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-primary"
                    onClick={async () => {
                      setIsSaving(true);
                      try {
                        const res = await fetch(`/api/clients/${id}`, {
                          method: "PUT",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            name: nameInput,
                            email: emailInput || undefined,
                            phone: phoneInput || undefined,
                          }),
                        });
                        if (res.ok) {
                          const d = await res.json();
                          setClient(d.data || d);
                          setEditing(false);
                        } else {
                          const err = await res.json().catch(() => null);
                          alert(err?.error || "Erro ao salvar cliente");
                        }
                      } catch (err) {
                        console.error(err);
                        alert("Erro ao salvar cliente");
                      } finally {
                        setIsSaving(false);
                      }
                    }}
                    disabled={isSaving}
                  >
                    {isSaving ? "Salvando..." : "Salvar"}
                  </button>
                  <button
                    className="btn btn-outline"
                    onClick={() => {
                      setEditing(false);
                      setNameInput(client.name || "");
                      setEmailInput(client.email || "");
                      setPhoneInput(client.phone || "");
                    }}
                    disabled={isSaving}
                  >
                    Cancelar
                  </button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  );
}
