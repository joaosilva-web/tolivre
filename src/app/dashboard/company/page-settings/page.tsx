"use client";

import { useEffect, useState } from "react";
import useSession from "@/hooks/useSession";
import {
  Loader2,
  Save,
  Eye,
  Plus,
  Trash2,
  Star,
  Link as LinkIcon,
  Palette,
  Image as ImageIcon,
  Globe,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Testimonial {
  id?: string;
  authorName: string;
  authorAvatar: string;
  rating: number;
  text: string;
  position: number;
}

interface PageConfig {
  id?: string;
  slug: string;
  title: string;
  description: string;
  logo: string;
  coverImage: string;
  primaryColor: string;
  accentColor: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  address: string;
  showServices: boolean;
  showTestimonials: boolean;
  showAbout: boolean;
  metaTitle: string;
  metaDescription: string;
  testimonials?: Testimonial[];
}

export default function CompanyPageSettings() {
  const { user, loading: sessionLoading } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pageExists, setPageExists] = useState(false);

  const [config, setConfig] = useState<PageConfig>({
    slug: "",
    title: "",
    description: "",
    logo: "",
    coverImage: "",
    primaryColor: "#6366f1",
    accentColor: "#3b82f6",
    whatsapp: "",
    instagram: "",
    facebook: "",
    address: "",
    showServices: true,
    showTestimonials: true,
    showAbout: true,
    metaTitle: "",
    metaDescription: "",
    testimonials: [],
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    if (user?.companyId) {
      loadPageConfig();
    }
  }, [user]);

  const loadPageConfig = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/company/page");

      if (res.ok) {
        const result = await res.json();
        setConfig(result.data);
        setTestimonials(result.data.testimonials || []);
        setPageExists(true);
      } else if (res.status === 404) {
        // Página não existe ainda
        setPageExists(false);
        // Deixar campos em branco para o usuário preencher
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Erro ao carregar configurações");
      }
    } catch (err) {
      console.error("Erro ao carregar configurações:", err);
      toast.error("Erro ao carregar configurações");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const payload = {
        ...config,
        testimonials,
      };

      const method = pageExists ? "PUT" : "POST";
      const res = await fetch("/api/company/page", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success("Configurações salvas com sucesso!");
        setPageExists(true);
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Erro ao salvar configurações");
      }
    } catch (err) {
      console.error("Erro ao salvar:", err);
      toast.error("Erro ao salvar configurações");
    } finally {
      setSaving(false);
    }
  };

  const addTestimonial = () => {
    setTestimonials([
      ...testimonials,
      {
        authorName: "",
        authorAvatar: "",
        rating: 5,
        text: "",
        position: testimonials.length,
      },
    ]);
  };

  const removeTestimonial = (index: number) => {
    setTestimonials(testimonials.filter((_, i) => i !== index));
  };

  const updateTestimonial = (
    index: number,
    field: keyof Testimonial,
    value: string | number
  ) => {
    const updated = [...testimonials];
    updated[index] = { ...updated[index], [field]: value };
    setTestimonials(updated);
  };

  const handlePreview = () => {
    if (config.slug) {
      window.open(`/${config.slug}`, "_blank");
    } else {
      alert("Configure o slug primeiro para visualizar a página");
    }
  };

  if (sessionLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  // Verifica se é EMPLOYEE
  const isEmployee = user.role === "EMPLOYEE";

  if (isEmployee) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-orange-500" />
          <h1 className="text-2xl font-bold mb-2">Acesso Restrito</h1>
          <p className="text-muted-foreground">
            Apenas donos e gerentes podem configurar a página da empresa.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Página Personalizada</h1>
          <p className="text-muted-foreground">
            Configure a página pública da sua empresa para seus clientes
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePreview}>
            <Eye className="mr-2 w-4 h-4" />
            Visualizar
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
            ) : (
              <Save className="mr-2 w-4 h-4" />
            )}
            Salvar
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        {/* Informações Básicas */}
        <section className="bg-card border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <Globe className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold">Informações Básicas</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Nome da Página *
              </label>
              <input
                type="text"
                value={config.title}
                onChange={(e) =>
                  setConfig({ ...config, title: e.target.value })
                }
                placeholder="Nome da sua empresa"
                className="w-full px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Slug (URL) *
              </label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  tolivre.com/
                </span>
                <input
                  type="text"
                  value={config.slug}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      slug: e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9-]/g, ""),
                    })
                  }
                  placeholder="minha-empresa"
                  className="flex-1 px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">
                Descrição / História
              </label>
              <textarea
                value={config.description}
                onChange={(e) =>
                  setConfig({ ...config, description: e.target.value })
                }
                placeholder="Conte a história da sua empresa..."
                rows={4}
                className="w-full px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Endereço</label>
              <input
                type="text"
                value={config.address}
                onChange={(e) =>
                  setConfig({ ...config, address: e.target.value })
                }
                placeholder="Rua, número, cidade"
                className="w-full px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">WhatsApp</label>
              <input
                type="text"
                value={config.whatsapp}
                onChange={(e) =>
                  setConfig({ ...config, whatsapp: e.target.value })
                }
                placeholder="5511999999999"
                className="w-full px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </section>

        {/* Imagens */}
        <section className="bg-card border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <ImageIcon className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold">Imagens</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                URL do Logo
              </label>
              <input
                type="url"
                value={config.logo}
                onChange={(e) => setConfig({ ...config, logo: e.target.value })}
                placeholder="https://..."
                className="w-full px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                URL da Imagem de Capa
              </label>
              <input
                type="url"
                value={config.coverImage}
                onChange={(e) =>
                  setConfig({ ...config, coverImage: e.target.value })
                }
                placeholder="https://..."
                className="w-full px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </section>

        {/* Cores */}
        <section className="bg-card border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <Palette className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold">Cores da Marca</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Cor Primária
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={config.primaryColor}
                  onChange={(e) =>
                    setConfig({ ...config, primaryColor: e.target.value })
                  }
                  className="w-16 h-10 rounded border cursor-pointer"
                />
                <input
                  type="text"
                  value={config.primaryColor}
                  onChange={(e) =>
                    setConfig({ ...config, primaryColor: e.target.value })
                  }
                  className="flex-1 px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Cor de Acento
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={config.accentColor}
                  onChange={(e) =>
                    setConfig({ ...config, accentColor: e.target.value })
                  }
                  className="w-16 h-10 rounded border cursor-pointer"
                />
                <input
                  type="text"
                  value={config.accentColor}
                  onChange={(e) =>
                    setConfig({ ...config, accentColor: e.target.value })
                  }
                  className="flex-1 px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Redes Sociais */}
        <section className="bg-card border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <LinkIcon className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold">Redes Sociais</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Instagram
              </label>
              <input
                type="url"
                value={config.instagram}
                onChange={(e) =>
                  setConfig({ ...config, instagram: e.target.value })
                }
                placeholder="https://instagram.com/..."
                className="w-full px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Facebook</label>
              <input
                type="url"
                value={config.facebook}
                onChange={(e) =>
                  setConfig({ ...config, facebook: e.target.value })
                }
                placeholder="https://facebook.com/..."
                className="w-full px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </section>

        {/* Depoimentos */}
        <section className="bg-card border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold">Depoimentos</h2>
            </div>
            <Button onClick={addTestimonial} variant="outline" size="sm">
              <Plus className="mr-2 w-4 h-4" />
              Adicionar
            </Button>
          </div>
          <div className="space-y-4">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={testimonial.authorName}
                      onChange={(e) =>
                        updateTestimonial(index, "authorName", e.target.value)
                      }
                      placeholder="Nome do cliente"
                      className="px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Estrelas:</span>
                      <select
                        value={testimonial.rating}
                        onChange={(e) =>
                          updateTestimonial(
                            index,
                            "rating",
                            parseInt(e.target.value)
                          )
                        }
                        className="px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        {[1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeTestimonial(index)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <textarea
                  value={testimonial.text}
                  onChange={(e) =>
                    updateTestimonial(index, "text", e.target.value)
                  }
                  placeholder="Depoimento do cliente..."
                  rows={2}
                  className="w-full px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Exibição */}
        <section className="bg-card border rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6">O que Exibir</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={config.showServices}
                onChange={(e) =>
                  setConfig({ ...config, showServices: e.target.checked })
                }
                className="w-5 h-5 rounded border-gray-300"
              />
              <span>Mostrar Serviços</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={config.showTestimonials}
                onChange={(e) =>
                  setConfig({ ...config, showTestimonials: e.target.checked })
                }
                className="w-5 h-5 rounded border-gray-300"
              />
              <span>Mostrar Depoimentos</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={config.showAbout}
                onChange={(e) =>
                  setConfig({ ...config, showAbout: e.target.checked })
                }
                className="w-5 h-5 rounded border-gray-300"
              />
              <span>Mostrar Sobre Nós</span>
            </label>
          </div>
        </section>

        {/* SEO */}
        <section className="bg-card border rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6">SEO</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Meta Título (máx. 60 caracteres)
              </label>
              <input
                type="text"
                value={config.metaTitle}
                onChange={(e) =>
                  setConfig({ ...config, metaTitle: e.target.value })
                }
                placeholder="Título para mecanismos de busca"
                maxLength={60}
                className="w-full px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {config.metaTitle.length}/60
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Meta Descrição (máx. 160 caracteres)
              </label>
              <textarea
                value={config.metaDescription}
                onChange={(e) =>
                  setConfig({ ...config, metaDescription: e.target.value })
                }
                placeholder="Descrição para mecanismos de busca"
                maxLength={160}
                rows={3}
                className="w-full px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {config.metaDescription.length}/160
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="flex justify-end gap-4 mt-8 pb-8">
        <Button variant="outline" onClick={handlePreview}>
          <Eye className="mr-2 w-4 h-4" />
          Visualizar
        </Button>
        <Button onClick={handleSave} disabled={saving} size="lg">
          {saving ? (
            <Loader2 className="mr-2 w-5 h-5 animate-spin" />
          ) : (
            <Save className="mr-2 w-5 h-5" />
          )}
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
}
