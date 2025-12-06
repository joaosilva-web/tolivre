# 💰📸 Sistema de Comissão e Fotos de Profissionais

**Data de Implementação:** 06 de Dezembro de 2025  
**Status:** ✅ Schema implementado - Aguardando implementação de UI/API

---

## 📋 Resumo

Implementação de dois recursos essenciais para gestão de profissionais:

1. **Sistema de Comissões** - Controle de comissões por profissional e agendamento
2. **Fotos de Profissionais** - Upload e exibição de fotos na landing page pública

---

## 🗄️ Alterações no Schema

### **Model `User` (Profissionais)**

```prisma
model User {
  // ... campos existentes
  
  // ✅ NOVOS CAMPOS:
  photoUrl        String?  // URL da foto do profissional
  bio             String?  @db.Text // Biografia/descrição
  commissionRate  Float?   @default(0) // Taxa de comissão em % (ex: 30.5)
}
```

### **Model `Appointment`**

```prisma
model Appointment {
  // ... campos existentes
  
  // ✅ NOVOS CAMPOS DE COMISSÃO:
  commissionRate    Float?    @default(0) // Taxa aplicada no momento (%)
  commissionAmount  Float?    @default(0) // Valor calculado
  commissionPaid    Boolean   @default(false) // Já foi paga?
  commissionPaidAt  DateTime? // Data do pagamento
}
```

---

## 💼 Sistema de Comissões

### **Funcionamento**

1. **Configuração por Profissional**
   - Cada usuário tem `commissionRate` (taxa %)
   - Exemplo: 30.5 = 30.5% de comissão
   
2. **Cálculo Automático**
   - Ao criar agendamento: copia `user.commissionRate` → `appointment.commissionRate`
   - Calcula: `commissionAmount = price * (commissionRate / 100)`
   
3. **Controle de Pagamento**
   - `commissionPaid = false` → Pendente
   - `commissionPaid = true` + `commissionPaidAt` → Paga

### **Casos de Uso**

#### **Cenário 1: Salão de Beleza**
```
Profissional: Maria (comissão 30%)
Serviço: Corte + Escova = R$ 100
Comissão: R$ 30 (30% de R$ 100)
```

#### **Cenário 2: Clínica Multi-Profissional**
```
Dr. João (comissão 40%) - Consulta R$ 200 → R$ 80
Dra. Ana (comissão 35%) - Exame R$ 150 → R$ 52.50
```

#### **Cenário 3: Estúdio de Tatuagem**
```
Tatuador 1 (comissão 50%) - Tatuagem R$ 500 → R$ 250
Tatuador 2 (comissão 45%) - Piercing R$ 80 → R$ 36
```

---

## 📸 Sistema de Fotos

### **Armazenamento**

**Opções de Implementação:**

#### **Opção 1: Base64 no Banco (Mais Simples)** ⭐ RECOMENDADO
```typescript
// Upload: converter imagem → base64 → salvar em photoUrl
const base64 = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
await prisma.user.update({
  where: { id },
  data: { photoUrl: base64 }
});
```

**Vantagens:**
- ✅ Sem serviço externo
- ✅ Fácil de implementar
- ✅ Funciona com qualquer host

**Desvantagens:**
- ⚠️ Aumenta tamanho do banco
- ⚠️ Limite ~5MB por foto recomendado

#### **Opção 2: Upload para Serviço Externo**
- AWS S3
- Cloudinary
- UploadThing
- Vercel Blob Storage

**Vantagens:**
- ✅ CDN integrado
- ✅ Otimização automática
- ✅ Não sobrecarrega banco

**Desvantagens:**
- ❌ Custo adicional
- ❌ Mais complexo

### **Exibição na Landing Page**

```tsx
// src/app/[slug]/page.tsx

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {professionals.map((prof) => (
    <Card key={prof.id}>
      <CardHeader>
        <Avatar className="h-24 w-24 mx-auto">
          <AvatarImage 
            src={prof.photoUrl || '/default-avatar.png'} 
            alt={prof.name} 
          />
          <AvatarFallback>{prof.name[0]}</AvatarFallback>
        </Avatar>
        <CardTitle className="text-center">{prof.name}</CardTitle>
      </CardHeader>
      <CardContent>
        {prof.bio && (
          <p className="text-sm text-muted-foreground text-center">
            {prof.bio}
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => selectProfessional(prof)}
          className="w-full"
        >
          Agendar com {prof.name}
        </Button>
      </CardFooter>
    </Card>
  ))}
</div>
```

---

## 🔨 Implementação Necessária

### **1. API de Upload de Foto**

**Endpoint:** `POST /api/users/photo`

```typescript
// src/app/api/users/photo/route.ts
import { getUserFromCookie } from "@/app/libs/auth";
import prisma from "@/lib/prisma";
import * as api from "@/app/libs/apiResponse";

export async function POST(req: Request) {
  const user = await getUserFromCookie();
  if (!user) return api.unauthorized();

  const formData = await req.formData();
  const file = formData.get('photo') as File;
  
  if (!file) return api.badRequest("Nenhuma foto enviada");
  
  // Validar tamanho (máx 5MB)
  if (file.size > 5 * 1024 * 1024) {
    return api.badRequest("Foto muito grande. Máximo 5MB");
  }
  
  // Validar tipo
  if (!file.type.startsWith('image/')) {
    return api.badRequest("Arquivo deve ser uma imagem");
  }
  
  // Converter para base64
  const buffer = await file.arrayBuffer();
  const base64 = Buffer.from(buffer).toString('base64');
  const photoUrl = `data:${file.type};base64,${base64}`;
  
  // Atualizar usuário
  await prisma.user.update({
    where: { id: user.id },
    data: { photoUrl }
  });
  
  return api.ok({ photoUrl });
}
```

### **2. API de Comissões**

**Endpoint:** `PATCH /api/users/:id/commission`

```typescript
// src/app/api/users/[id]/commission/route.ts
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const user = await getUserFromCookie();
  if (!user) return api.unauthorized();
  
  // Apenas OWNER pode alterar comissões
  if (user.role !== 'OWNER') {
    return api.forbidden("Apenas o dono pode alterar comissões");
  }
  
  const { commissionRate } = await req.json();
  
  if (commissionRate < 0 || commissionRate > 100) {
    return api.badRequest("Comissão deve estar entre 0% e 100%");
  }
  
  const updated = await prisma.user.update({
    where: { 
      id: params.id,
      companyId: user.companyId // Segurança multi-tenant
    },
    data: { commissionRate }
  });
  
  return api.ok(updated);
}
```

**Endpoint:** `GET /api/reports/commissions`

```typescript
// src/app/api/reports/commissions/route.ts
export async function GET(req: Request) {
  const user = await getUserFromCookie();
  if (!user) return api.unauthorized();
  
  const { searchParams } = new URL(req.url);
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  
  const appointments = await prisma.appointment.findMany({
    where: {
      companyId: user.companyId,
      status: 'COMPLETED',
      paymentStatus: 'PAID',
      ...(startDate && endDate && {
        startTime: {
          gte: new Date(startDate),
          lte: new Date(endDate)
        }
      })
    },
    include: {
      professional: true,
      service: true
    }
  });
  
  // Agrupar por profissional
  const report = appointments.reduce((acc, apt) => {
    const profId = apt.professionalId;
    if (!acc[profId]) {
      acc[profId] = {
        professional: apt.professional,
        totalAppointments: 0,
        totalRevenue: 0,
        totalCommission: 0,
        commissionPaid: 0,
        commissionPending: 0,
        appointments: []
      };
    }
    
    acc[profId].totalAppointments++;
    acc[profId].totalRevenue += apt.price || 0;
    acc[profId].totalCommission += apt.commissionAmount || 0;
    
    if (apt.commissionPaid) {
      acc[profId].commissionPaid += apt.commissionAmount || 0;
    } else {
      acc[profId].commissionPending += apt.commissionAmount || 0;
    }
    
    acc[profId].appointments.push(apt);
    
    return acc;
  }, {} as Record<string, any>);
  
  return api.ok(Object.values(report));
}
```

### **3. Atualizar Criação de Agendamento**

```typescript
// src/app/api/appointments/route.ts
export async function POST(req: Request) {
  // ... validações existentes
  
  // Buscar taxa de comissão do profissional
  const professional = await prisma.user.findUnique({
    where: { id: professionalId },
    select: { commissionRate: true }
  });
  
  const commissionRate = professional?.commissionRate || 0;
  const commissionAmount = price * (commissionRate / 100);
  
  const appointment = await prisma.appointment.create({
    data: {
      // ... dados existentes
      commissionRate,
      commissionAmount
    }
  });
  
  return api.created(appointment);
}
```

### **4. Interface de Gestão de Comissões**

**Página:** `/dashboard/company/team`

```tsx
// src/app/dashboard/company/team/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function TeamManagementPage() {
  const [professionals, setProfessionals] = useState([]);
  
  const updateCommission = async (userId: string, rate: number) => {
    const res = await fetch(`/api/users/${userId}/commission`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ commissionRate: rate })
    });
    
    if (res.ok) {
      // Atualizar lista
      loadProfessionals();
    }
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gestão de Equipe</h1>
      
      <div className="grid gap-4">
        {professionals.map((prof) => (
          <Card key={prof.id}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={prof.photoUrl} />
                  <AvatarFallback>{prof.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{prof.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {prof.email}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>Taxa de Comissão (%)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    step="0.5"
                    value={prof.commissionRate || 0}
                    onChange={(e) => 
                      updateCommission(prof.id, parseFloat(e.target.value))
                    }
                  />
                </div>
                
                <div>
                  <Label>Biografia (exibida na página pública)</Label>
                  <Textarea
                    value={prof.bio || ''}
                    onChange={(e) => updateBio(prof.id, e.target.value)}
                    placeholder="Especialidades, experiência, etc."
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
```

### **5. Relatório de Comissões**

**Página:** `/dashboard/reports/commissions`

```tsx
// src/app/dashboard/reports/commissions/page.tsx
export default function CommissionsReportPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Relatório de Comissões</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Período</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input type="date" />
            <Input type="date" />
            <Button>Filtrar</Button>
          </div>
        </CardContent>
      </Card>
      
      <DataTable columns={commissionsColumns} data={data} />
    </div>
  );
}
```

---

## 📊 Relatórios e Métricas

### **Dashboard do Profissional**
- Total de atendimentos
- Receita total gerada
- Comissões acumuladas
- Comissões pagas
- Comissões pendentes

### **Dashboard do Dono**
- Comparativo entre profissionais
- Total de comissões pagas no período
- Comissões pendentes a pagar
- Média de comissão por atendimento

---

## 🚀 Próximos Passos

### **Prioridade Alta**
- [ ] Implementar upload de foto (base64)
- [ ] Exibir fotos na landing page pública
- [ ] API de alteração de comissão
- [ ] Tela de gestão de equipe no dashboard

### **Prioridade Média**
- [ ] Relatório de comissões por período
- [ ] Marcar comissões como pagas
- [ ] Exportar relatório para Excel
- [ ] Notificação de comissões pendentes

### **Prioridade Baixa**
- [ ] Histórico de alterações de comissão
- [ ] Gráficos de performance por profissional
- [ ] Integração com sistema de folha de pagamento
- [ ] Upload para serviço externo (CDN)

---

## 📝 Notas Técnicas

### **Segurança**
- ✅ Validar tamanho de imagens (máx 5MB)
- ✅ Validar tipos de arquivo (apenas imagens)
- ✅ Apenas OWNER pode alterar comissões
- ✅ Multi-tenant: sempre filtrar por companyId

### **Performance**
- ⚠️ Considerar paginação em relatórios grandes
- ⚠️ Cache de fotos no frontend
- ⚠️ Compressão de imagens antes do upload

### **UX**
- 💡 Preview da foto antes de salvar
- 💡 Crop/resize de imagens
- 💡 Indicador visual de comissões pendentes
- 💡 Filtros avançados em relatórios

---

## 🎯 Impacto no Negócio

### **Para Proprietários**
- ✅ Transparência na gestão de comissões
- ✅ Relatórios detalhados de custo por profissional
- ✅ Maior profissionalismo na página pública

### **Para Profissionais**
- ✅ Visibilidade de seus ganhos
- ✅ Perfil mais atraente para clientes
- ✅ Histórico de comissões recebidas

### **Para Clientes**
- ✅ Conhecer melhor os profissionais
- ✅ Escolher baseado em biografia/foto
- ✅ Maior confiança na empresa

---

**Status Final:** ✅ Schema pronto, aguardando implementação de UI/API
