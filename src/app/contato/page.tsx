"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Clock,
  Send,
  CheckCircle,
  HelpCircle,
  Headphones,
  Building,
} from "lucide-react";

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simular envio do formulário
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
      });

      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    }, 2000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Voltar para Home</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost">Entrar</Button>
              </Link>
              <Link href="/register">
                <Button>Começar Grátis</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-blue-500/5 to-purple-500/5" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Fale Conosco
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            Estamos aqui para ajudar você. Entre em contato através de qualquer
            um dos nossos canais e teremos prazer em responder suas dúvidas.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">E-mail</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Resposta em até 24h
              </p>
              <a
                href="mailto:contato@tolivre.com.br"
                className="text-primary hover:underline text-sm font-medium"
              >
                contato@tolivre.com.br
              </a>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">WhatsApp</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Atendimento direto
              </p>
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm font-medium"
              >
                (11) 99999-9999
              </a>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Telefone</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Seg-Sex: 9h às 18h
              </p>
              <a
                href="tel:+551140404040"
                className="text-primary hover:underline text-sm font-medium"
              >
                (11) 4040-4040
              </a>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Suporte Técnico</h3>
              <p className="text-sm text-muted-foreground mb-3">
                24/7 para clientes
              </p>
              <a
                href="mailto:suporte@tolivre.com.br"
                className="text-primary hover:underline text-sm font-medium"
              >
                suporte@tolivre.com.br
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Form + Info */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-card border border-border rounded-3xl p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-4">Envie sua mensagem</h2>
              <p className="text-muted-foreground mb-8">
                Preencha o formulário abaixo e entraremos em contato o mais
                rápido possível.
              </p>

              {success && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-green-700 dark:text-green-400">
                      Mensagem enviada com sucesso!
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Entraremos em contato em breve.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2"
                    >
                      Nome completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Seu nome"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium mb-2"
                    >
                      Telefone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="(11) 99999-9999"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium mb-2"
                    >
                      Empresa
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Nome da empresa"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium mb-2"
                  >
                    Assunto *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="vendas">Vendas e Planos</option>
                    <option value="suporte">Suporte Técnico</option>
                    <option value="parceria">Parcerias</option>
                    <option value="duvida">Dúvidas Gerais</option>
                    <option value="feedback">Feedback</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Descreva sua dúvida ou solicitação..."
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar Mensagem
                      <Send className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Additional Info */}
            <div className="space-y-8">
              {/* Horário de Atendimento */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-blue-500/10 rounded-lg p-3">
                    <Clock className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Horário de Atendimento
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Nosso time está disponível para ajudar você
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">
                      Segunda a Sexta
                    </span>
                    <span className="font-semibold">9h às 18h</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Sábado</span>
                    <span className="font-semibold">9h às 13h</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">
                      Domingo e Feriados
                    </span>
                    <span className="text-muted-foreground">Fechado</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm font-medium text-primary">
                    ⚡ Suporte técnico 24/7 para clientes dos planos
                    Professional e Enterprise
                  </p>
                </div>
              </div>

              {/* Localização */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-purple-500/10 rounded-lg p-3">
                    <MapPin className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Nossa Localização
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Visite nosso escritório
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="font-medium">ToLivre Tecnologia Ltda.</p>
                  <p className="text-muted-foreground">
                    Av. Paulista, 1234 - Conj. 567
                  </p>
                  <p className="text-muted-foreground">
                    Bela Vista, São Paulo - SP
                  </p>
                  <p className="text-muted-foreground">CEP: 01310-100</p>
                </div>
                <Button variant="outline" className="w-full mt-6">
                  <Building className="mr-2 w-4 h-4" />
                  Ver no Google Maps
                </Button>
              </div>

              {/* FAQ Link */}
              <div className="bg-gradient-to-br from-primary via-blue-500 to-purple-500 rounded-2xl p-8 text-white">
                <div className="flex items-start gap-4 mb-4">
                  <HelpCircle className="w-8 h-8" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Dúvidas Frequentes
                    </h3>
                    <p className="text-white/90 text-sm">
                      Antes de entrar em contato, veja se sua dúvida já foi
                      respondida em nossa central de ajuda.
                    </p>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  className="w-full bg-white text-primary hover:bg-white/90"
                >
                  Acessar Central de Ajuda
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pronto para começar?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experimente o ToLivre gratuitamente por 14 dias. Sem cartão de
            crédito, sem compromisso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8 py-6">
                Começar Grátis
              </Button>
            </Link>
            <Link href="/sobre">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Conhecer o ToLivre
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer simplificado */}
      <footer className="border-t bg-card py-8 px-6">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>&copy; 2025 ToLivre. Todos os direitos reservados.</p>
          <div className="flex justify-center gap-6 mt-4">
            <Link
              href="/sobre"
              className="hover:text-primary transition-colors text-sm"
            >
              Sobre
            </Link>
            <Link
              href="/blog"
              className="hover:text-primary transition-colors text-sm"
            >
              Blog
            </Link>
            <Link
              href="/legal/privacidade"
              className="hover:text-primary transition-colors text-sm"
            >
              Privacidade
            </Link>
            <Link
              href="/legal/termos"
              className="hover:text-primary transition-colors text-sm"
            >
              Termos
            </Link>
            <Link
              href="/legal/seguranca"
              className="hover:text-primary transition-colors text-sm"
            >
              Segurança
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
