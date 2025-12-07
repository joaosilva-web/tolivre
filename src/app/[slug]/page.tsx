"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  MessageCircle,
  Star,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
}

interface Professional {
  id: string;
  name: string;
  photoUrl: string | null;
  bio: string | null;
  services: Array<{
    service: Service;
  }>;
}

interface Testimonial {
  id: string;
  authorName: string;
  authorAvatar: string | null;
  rating: number;
  text: string;
  position: number;
}

interface CompanyData {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  logo: string | null;
  coverImage: string | null;
  primaryColor: string;
  accentColor: string;
  whatsapp: string | null;
  instagram: string | null;
  facebook: string | null;
  address: string | null;
  showServices: boolean;
  showTestimonials: boolean;
  showAbout: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  company: {
    id: string;
    nomeFantasia: string;
    telefone: string | null;
    email: string | null;
    endereco: string | null;
  };
  services: Service[];
  professionals: Professional[];
  testimonials: Testimonial[];
}

export default function PublicCompanyPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [data, setData] = useState<CompanyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadPageData();
  }, [slug]);

  // Atualizar favicon e título quando os dados carregarem
  useEffect(() => {
    if (data?.logo) {
      // Atualizar favicon
      const link =
        (document.querySelector("link[rel*='icon']") as HTMLLinkElement) ||
        document.createElement("link");
      link.type = "image/x-icon";
      link.rel = "icon";
      link.href = data.logo;
      document.getElementsByTagName("head")[0].appendChild(link);
    }

    if (data?.title) {
      // Atualizar título da página
      document.title = data.title;
    }

    // Cleanup: restaurar favicon e título originais ao desmontar
    return () => {
      const link = document.querySelector(
        "link[rel*='icon']"
      ) as HTMLLinkElement;
      if (link) {
        link.href = "/favicon.ico";
      }
      document.title = "ToLivre";
    };
  }, [data?.logo, data?.title]);

  const loadPageData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/public/page/${slug}`);
      if (res.ok) {
        const result = await res.json();
        setData(result.data);
      } else {
        setError("Página não encontrada");
      }
    } catch (err) {
      console.error("Erro ao carregar página:", err);
      setError("Erro ao carregar página");
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
  };

  const handleBooking = () => {
    router.push(`/${slug}/agendar`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold mb-4">Página não encontrada</h1>
          <p className="text-muted-foreground mb-6">
            A página que você está procurando não existe.
          </p>
          <Button onClick={() => router.push("/")}>Voltar ao início</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section with Cover Image */}
      <section
        className="relative min-h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: data.coverImage
            ? `url(${data.coverImage})`
            : `linear-gradient(135deg, ${data.primaryColor}, ${data.accentColor})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full min-h-[500px] flex flex-col justify-center items-center text-center text-white py-16">
          {data.logo && (
            <img
              src={data.logo}
              alt={data.title}
              className="w-24 h-24 rounded-full mb-8 border-4 border-white shadow-2xl object-cover"
            />
          )}
          <h1 className="text-5xl md:text-7xl font-bold mb-6">{data.title}</h1>
          {data.description && data.showAbout && (
            <p className="text-xl text-white/90 max-w-2xl mb-10">
              {data.description.split("\n")[0]}
            </p>
          )}
          <button
            onClick={handleBooking}
            className="text-lg px-8 py-6 shadow-2xl hover:scale-110 transition-all duration-300 hover:opacity-90 text-white mb-8 inline-flex items-center justify-center rounded-md font-medium gap-2 h-10 cursor-pointer"
            style={{
              backgroundColor: data.primaryColor,
              borderColor: data.primaryColor,
            }}
          >
            Agendar Agora
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Contact Info Bar */}
      <section className="bg-card border-b py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {data.address && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin
                  className="w-4 h-4"
                  style={{ color: data.primaryColor }}
                />
                <span>{data.address}</span>
              </div>
            )}
            {data.company.telefone && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone
                  className="w-4 h-4"
                  style={{ color: data.primaryColor }}
                />
                <span>{data.company.telefone}</span>
              </div>
            )}
            {data.company.email && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail
                  className="w-4 h-4"
                  style={{ color: data.primaryColor }}
                />
                <span>{data.company.email}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* About Section */}
        {data.showAbout && data.description && (
          <section className="mb-20">
            <h2 className="text-4xl font-bold mb-8 text-center">Sobre Nós</h2>
            <div className="bg-card border rounded-2xl p-8 max-w-4xl mx-auto">
              <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                {data.description}
              </p>
            </div>
          </section>
        )}

        {/* Services Section */}
        {data.showServices && data.services.length > 0 && (
          <section className="mb-20">
            <h2 className="text-4xl font-bold mb-8 text-center">
              Nossos Serviços
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.services.map((service) => (
                <div
                  key={service.id}
                  className="bg-card border rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold">{service.name}</h3>
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${data.primaryColor}20` }}
                    >
                      <CheckCircle
                        className="w-6 h-6"
                        style={{ color: data.primaryColor }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{formatDuration(service.duration)}</span>
                    </div>
                    <div
                      className="text-2xl font-bold"
                      style={{ color: data.primaryColor }}
                    >
                      {formatPrice(service.price)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <button
                onClick={handleBooking}
                className="px-6 h-10 hover:opacity-90 hover:scale-110 transition-all duration-300 text-white inline-flex items-center justify-center rounded-md font-medium gap-2 cursor-pointer"
                style={{
                  backgroundColor: data.primaryColor,
                  borderColor: data.primaryColor,
                }}
              >
                Ver Horários Disponíveis
                <Calendar className="ml-2 w-5 h-5" />
              </button>
            </div>
          </section>
        )}

        {/* Professionals Section */}
        {data.professionals.length > 0 && (
          <section className="mb-20">
            <h2 className="text-4xl font-bold mb-8 text-center">
              Nossa Equipe
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.professionals.map((prof) => (
                <div
                  key={prof.id}
                  className="bg-card border rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className="flex flex-col items-center mb-4">
                    <div
                      className="w-32 h-32 rounded-full mb-4 overflow-hidden border-4 border-white shadow-lg"
                      style={{ borderColor: `${data.primaryColor}40` }}
                    >
                      {prof.photoUrl ? (
                        <img
                          src={prof.photoUrl}
                          alt={prof.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center text-3xl font-bold text-white"
                          style={{ backgroundColor: data.primaryColor }}
                        >
                          {prof.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold">{prof.name}</h3>
                  </div>
                  {prof.bio && (
                    <p className="text-muted-foreground mb-4 text-sm">
                      {prof.bio}
                    </p>
                  )}
                  {prof.services.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm font-semibold mb-2">
                        Especialidades:
                      </p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {prof.services.map((ps) => (
                          <span
                            key={ps.service.id}
                            className="px-3 py-1 rounded-full text-xs font-medium text-white"
                            style={{ backgroundColor: data.primaryColor }}
                          >
                            {ps.service.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <button
                    onClick={() => {
                      router.push(`/${slug}/agendar?professional=${prof.id}`);
                    }}
                    className="mt-4 w-full px-6 h-10 hover:opacity-90 transition-all text-white inline-flex items-center justify-center rounded-md font-medium gap-2 cursor-pointer"
                    style={{
                      backgroundColor: data.primaryColor,
                    }}
                  >
                    Agendar com {prof.name.split(" ")[0]}
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Testimonials Section */}
        {data.showTestimonials && data.testimonials.length > 0 && (
          <section className="mb-20">
            <h2 className="text-4xl font-bold mb-8 text-center">Depoimentos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-card border rounded-xl p-6 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: data.primaryColor }}
                    >
                      {testimonial.authorAvatar ||
                        testimonial.authorName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .substring(0, 2)
                          .toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold">{testimonial.authorName}</h4>
                      <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    "{testimonial.text}"
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="text-center">
          <div
            className="rounded-3xl p-12 md:p-16 text-white"
            style={{
              background: `linear-gradient(135deg, ${data.primaryColor}, ${data.accentColor})`,
            }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Pronto para Agendar?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Escolha o melhor horário para você e garanta seu atendimento
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleBooking}
                className="text-lg px-8 hover:scale-110 transition-all duration-300 hover:opacity-90 inline-flex items-center justify-center rounded-md font-medium gap-2 cursor-pointer"
                style={{
                  backgroundColor: "white",
                  color: data.primaryColor,
                  borderColor: "white",
                }}
              >
                Agendar Online
                <Calendar className="ml-2 w-5 h-5" />
              </button>
              {data.whatsapp && (
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() =>
                    window.open(
                      `https://wa.me/${
                        data.whatsapp?.replace(/\D/g, "") || ""
                      }`,
                      "_blank"
                    )
                  }
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:scale-110 transition-all duration-300 text-lg px-8 py-6 cursor-pointer"
                >
                  WhatsApp
                  <MessageCircle className="ml-2 w-5 h-5" />
                </Button>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-2">
              {data.logo && (
                <img
                  src={data.logo}
                  alt={data.title}
                  className="w-8 h-8 rounded-full"
                />
              )}
              <span className="text-xl font-bold">{data.title}</span>
            </div>
            <div className="flex gap-4">
              {data.instagram && (
                <a
                  href={data.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-all"
                  style={{ backgroundColor: `${data.primaryColor}20` }}
                >
                  <Instagram
                    className="w-5 h-5"
                    style={{ color: data.primaryColor }}
                  />
                </a>
              )}
              {data.facebook && (
                <a
                  href={data.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-all"
                  style={{ backgroundColor: `${data.primaryColor}20` }}
                >
                  <Facebook
                    className="w-5 h-5"
                    style={{ color: data.primaryColor }}
                  />
                </a>
              )}
              {data.whatsapp && (
                <a
                  href={`https://wa.me/${data.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-all"
                  style={{ backgroundColor: `${data.primaryColor}20` }}
                >
                  <MessageCircle
                    className="w-5 h-5"
                    style={{ color: data.primaryColor }}
                  />
                </a>
              )}
            </div>
            <p className="text-sm text-muted-foreground text-center">
              © {new Date().getFullYear()} {data.title}. Todos os direitos
              reservados.
            </p>
            <p className="text-xs text-muted-foreground">
              Powered by{" "}
              <a
                href="/"
                className="hover:underline"
                style={{ color: data.primaryColor }}
              >
                ToLivre
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
