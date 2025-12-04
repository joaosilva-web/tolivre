import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Tag,
  ArrowRight,
  TrendingUp,
  Lightbulb,
  Zap,
  Users,
  Target,
  MessageCircle,
} from "lucide-react";

// Dados dos posts do blog
const featuredPost = {
  id: 1,
  title: "Como Reduzir Cancelamentos em 40% com Lembretes Automáticos",
  excerpt:
    "Descubra as estratégias comprovadas para diminuir drasticamente os cancelamentos e no-shows utilizando automação inteligente via WhatsApp.",
  category: "Estratégia",
  author: "Maria Santos",
  date: "15 de Novembro, 2025",
  readTime: "8 min",
  image: "featured",
  slug: "reduzir-cancelamentos-lembretes-automaticos",
};

const blogPosts = [
  {
    id: 2,
    title: "10 Recursos Essenciais de um Sistema de Agendamentos Moderno",
    excerpt:
      "Conheça as funcionalidades indispensáveis que todo profissional precisa para gerenciar seus horários de forma eficiente.",
    category: "Produto",
    author: "João Silva",
    date: "10 de Novembro, 2025",
    readTime: "6 min",
    image: "recursos",
    slug: "recursos-essenciais-sistema-agendamentos",
  },
  {
    id: 3,
    title: "Integração WhatsApp: O Diferencial que Seus Clientes Esperam",
    excerpt:
      "Por que a comunicação via WhatsApp se tornou essencial e como ela pode transformar a experiência dos seus clientes.",
    category: "Tecnologia",
    author: "Pedro Costa",
    date: "5 de Novembro, 2025",
    readTime: "5 min",
    image: "whatsapp",
    slug: "integracao-whatsapp-diferencial",
  },
  {
    id: 4,
    title: "Case de Sucesso: Salão Bella Donna Aumentou Faturamento em 35%",
    excerpt:
      "Como um salão de beleza conseguiu crescer significativamente após implementar um sistema profissional de agendamentos.",
    category: "Case de Sucesso",
    author: "Ana Oliveira",
    date: "1 de Novembro, 2025",
    readTime: "7 min",
    image: "case",
    slug: "case-sucesso-salao-bella-donna",
  },
  {
    id: 5,
    title: "LGPD em Agendamentos: Como Proteger os Dados dos Seus Clientes",
    excerpt:
      "Guia completo sobre conformidade com a Lei Geral de Proteção de Dados no gerenciamento de informações de clientes.",
    category: "Segurança",
    author: "Carlos Mendes",
    date: "28 de Outubro, 2025",
    readTime: "9 min",
    image: "lgpd",
    slug: "lgpd-agendamentos-protecao-dados",
  },
  {
    id: 6,
    title: "5 Erros Comuns ao Gerenciar Agendamentos Manualmente",
    excerpt:
      "Evite os problemas mais frequentes que prejudicam a produtividade e satisfação dos clientes ao usar métodos manuais.",
    category: "Dicas",
    author: "Maria Santos",
    date: "22 de Outubro, 2025",
    readTime: "4 min",
    image: "erros",
    slug: "erros-comuns-agendamentos-manuais",
  },
  {
    id: 7,
    title: "Automação Inteligente: O Futuro dos Agendamentos Profissionais",
    excerpt:
      "Como a inteligência artificial e automação estão revolucionando a gestão de horários e otimização de tempo.",
    category: "Tendências",
    author: "Pedro Costa",
    date: "15 de Outubro, 2025",
    readTime: "6 min",
    image: "ia",
    slug: "automacao-inteligente-futuro-agendamentos",
  },
];

const categories = [
  { name: "Todos", count: 7, slug: "todos" },
  { name: "Estratégia", count: 2, slug: "estrategia" },
  { name: "Produto", count: 1, slug: "produto" },
  { name: "Tecnologia", count: 1, slug: "tecnologia" },
  { name: "Case de Sucesso", count: 1, slug: "case-de-sucesso" },
  { name: "Segurança", count: 1, slug: "seguranca" },
  { name: "Dicas", count: 1, slug: "dicas" },
  { name: "Tendências", count: 1, slug: "tendencias" },
];

export default function BlogPage() {
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
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Blog ToLivre
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Insights, tendências e dicas práticas para otimizar sua gestão de
              agendamentos e impulsionar seu negócio.
            </p>
          </div>

          {/* Categorias */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.slug}
                className={`px-6 py-2 rounded-full border transition-all duration-300 ${
                  category.slug === "todos"
                    ? "bg-primary text-white border-primary shadow-lg"
                    : "bg-card border-border hover:border-primary hover:shadow-md"
                }`}
              >
                <span className="font-medium">{category.name}</span>
                <span className="ml-2 text-sm opacity-70">
                  ({category.count})
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-card border border-border rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 group">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative h-80 md:h-auto bg-gradient-to-br from-primary via-blue-500 to-purple-500 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative z-10 p-8 text-center">
                  <TrendingUp className="w-24 h-24 text-white/90 mx-auto mb-4" />
                  <p className="text-white font-semibold text-lg">
                    Post em Destaque
                  </p>
                </div>
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-semibold">
                    {featuredPost.category}
                  </span>
                  <span className="text-muted-foreground text-sm flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {featuredPost.readTime}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {featuredPost.author}
                    </span>
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {featuredPost.date}
                    </span>
                  </div>
                  <Button className="group/btn">
                    Ler mais
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Últimos Artigos
            </h2>
            <p className="text-muted-foreground text-lg">
              Conteúdo atualizado para ajudar você a crescer
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
              >
                <div className="relative h-48 bg-gradient-to-br from-primary/20 via-blue-500/20 to-purple-500/20 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  {post.image === "recursos" && (
                    <Lightbulb className="w-16 h-16 text-primary/60 relative z-10" />
                  )}
                  {post.image === "whatsapp" && (
                    <MessageCircle className="w-16 h-16 text-green-500/60 relative z-10" />
                  )}
                  {post.image === "case" && (
                    <Target className="w-16 h-16 text-blue-500/60 relative z-10" />
                  )}
                  {post.image === "lgpd" && (
                    <Users className="w-16 h-16 text-purple-500/60 relative z-10" />
                  )}
                  {post.image === "erros" && (
                    <Zap className="w-16 h-16 text-orange-500/60 relative z-10" />
                  )}
                  {post.image === "ia" && (
                    <TrendingUp className="w-16 h-16 text-cyan-500/60 relative z-10" />
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                      {post.category}
                    </span>
                    <span className="text-muted-foreground text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-grow">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {post.date}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-primary via-blue-500 to-purple-500 rounded-3xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Receba conteúdo exclusivo
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Inscreva-se na nossa newsletter e receba insights, dicas e
              novidades direto no seu e-mail toda semana.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 px-6 py-3 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90"
              >
                Inscrever-se
              </Button>
            </div>
            <p className="text-white/70 text-sm mt-4">
              Sem spam. Cancele a qualquer momento.
            </p>
          </div>
        </div>
      </section>

      {/* Tópicos Populares */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tópicos Populares
            </h2>
            <p className="text-muted-foreground text-lg">
              Explore os assuntos mais procurados
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: TrendingUp,
                title: "Estratégias de Crescimento",
                count: "12 artigos",
                color: "from-green-500 to-emerald-600",
              },
              {
                icon: Lightbulb,
                title: "Dicas de Produtividade",
                count: "8 artigos",
                color: "from-yellow-500 to-orange-600",
              },
              {
                icon: Users,
                title: "Gestão de Clientes",
                count: "15 artigos",
                color: "from-blue-500 to-cyan-600",
              },
              {
                icon: Zap,
                title: "Automação",
                count: "10 artigos",
                color: "from-purple-500 to-pink-600",
              },
            ].map((topic, idx) => (
              <div
                key={idx}
                className="bg-card border border-border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${topic.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <topic.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                  {topic.title}
                </h3>
                <p className="text-sm text-muted-foreground">{topic.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pronto para transformar seus agendamentos?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experimente o ToLivre gratuitamente por 14 dias e descubra como
            podemos ajudar seu negócio a crescer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8 py-6">
                Começar Grátis
                <ArrowRight className="ml-2 w-5 h-5" />
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
