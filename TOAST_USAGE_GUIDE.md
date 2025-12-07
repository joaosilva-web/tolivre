# 🍞 Guia de Uso do Sistema de Toast (Sonner)

## 📋 Visão Geral

O ToLivre usa **Sonner** (sistema de toast do shadcn/ui) para todas as notificações e feedbacks ao usuário.

✅ **Implementado em:** `src/app/layout.tsx` (global)  
📦 **Componente:** `src/components/ui/sonner.tsx`  
📚 **Biblioteca:** `sonner`

---

## 🎯 Quando Usar Toast

### ✅ **USE Toast Para:**
- Confirmações de ações (salvar, deletar, atualizar)
- Mensagens de erro
- Avisos importantes
- Feedback de operações assíncronas (upload, API calls)
- Notificações temporárias

### ❌ **NÃO Use Toast Para:**
- Validações de formulário inline (use mensagens abaixo dos campos)
- Erros críticos que precisam de ação imediata (use modal)
- Informações permanentes (use card ou banner)

---

## 🚀 Como Usar

### 1️⃣ **Importar no Componente**

```typescript
import { toast } from "sonner";
```

### 2️⃣ **Tipos de Toast**

#### ✅ **Sucesso**
```typescript
toast.success("Configurações salvas com sucesso!");
toast.success("Foto atualizada!");
toast.success("Cliente cadastrado com sucesso!");
```

#### ❌ **Erro**
```typescript
toast.error("Erro ao salvar configurações");
toast.error("Foto muito grande. Máximo 5MB");
toast.error("CPF inválido");
```

#### ⚠️ **Aviso**
```typescript
toast.warning("Alterações não salvas");
toast.warning("Sessão expirando em 5 minutos");
```

#### ℹ️ **Informação**
```typescript
toast.info("Novo cliente adicionado à fila");
toast.info("Sistema será atualizado em 10 minutos");
```

#### ⏳ **Carregando (Promise)**
```typescript
const promise = fetch('/api/appointments', {
  method: 'POST',
  body: JSON.stringify(data)
});

toast.promise(promise, {
  loading: 'Salvando agendamento...',
  success: 'Agendamento criado com sucesso!',
  error: 'Erro ao criar agendamento',
});
```

---

## 📝 Exemplos Práticos

### **Exemplo 1: Salvar Formulário**

```typescript
const handleSave = async () => {
  try {
    setSaving(true);
    
    const res = await fetch('/api/config', {
      method: 'POST',
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      toast.success('Configurações salvas com sucesso!');
      router.push('/dashboard');
    } else {
      const error = await res.json();
      toast.error(error.message || 'Erro ao salvar');
    }
  } catch (err) {
    toast.error('Erro ao conectar com servidor');
  } finally {
    setSaving(false);
  }
};
```

### **Exemplo 2: Upload de Arquivo**

```typescript
const handleUpload = async (file: File) => {
  // Validação antes de fazer upload
  if (file.size > 5 * 1024 * 1024) {
    toast.error('Arquivo muito grande. Máximo 5MB');
    return;
  }

  if (!file.type.startsWith('image/')) {
    toast.error('Apenas imagens são permitidas');
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  const uploadPromise = fetch('/api/upload', {
    method: 'POST',
    body: formData
  });

  toast.promise(uploadPromise, {
    loading: 'Fazendo upload...',
    success: 'Upload concluído com sucesso!',
    error: 'Erro ao fazer upload',
  });
};
```

### **Exemplo 3: Deletar com Confirmação**

```typescript
const handleDelete = async (id: string) => {
  // Primeiro, mostrar confirmação (não use toast para isso, use dialog)
  const confirmed = confirm('Deseja realmente deletar?');
  
  if (!confirmed) return;

  try {
    const res = await fetch(`/api/items/${id}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      toast.success('Item deletado com sucesso!');
      loadItems(); // Recarregar lista
    } else {
      toast.error('Erro ao deletar item');
    }
  } catch (err) {
    toast.error('Erro ao conectar com servidor');
  }
};
```

### **Exemplo 4: Ações em Lote**

```typescript
const handleBulkUpdate = async (ids: string[]) => {
  const total = ids.length;
  let success = 0;
  let failed = 0;

  for (const id of ids) {
    try {
      const res = await fetch(`/api/items/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: 'active' })
      });

      if (res.ok) {
        success++;
      } else {
        failed++;
      }
    } catch {
      failed++;
    }
  }

  if (failed === 0) {
    toast.success(`${total} itens atualizados com sucesso!`);
  } else if (success === 0) {
    toast.error(`Falha ao atualizar ${total} itens`);
  } else {
    toast.warning(`${success} atualizados, ${failed} falharam`);
  }
};
```

---

## 🎨 Opções Avançadas

### **Toast com Duração Customizada**

```typescript
toast.success('Mensagem rápida', { duration: 2000 }); // 2 segundos
toast.error('Erro importante', { duration: 10000 }); // 10 segundos
```

### **Toast com Ação**

```typescript
toast.success('Cliente salvo!', {
  action: {
    label: 'Ver',
    onClick: () => router.push(`/clients/${clientId}`)
  }
});
```

### **Toast com Descrição**

```typescript
toast.success('Agendamento criado', {
  description: 'Cliente: João Silva - 14/12/2025 às 14:00'
});
```

### **Toast Customizado**

```typescript
toast('Atenção!', {
  description: 'Você tem 3 agendamentos pendentes hoje',
  icon: '📅',
});
```

---

## 📍 Padrões do ToLivre

### **Mensagens de Sucesso**
- Use verbos no **passado**: "salvo", "criado", "atualizado", "deletado"
- Seja específico: "Foto atualizada" em vez de "Sucesso"
- Use ponto de exclamação para ações positivas

### **Mensagens de Erro**
- Seja claro sobre o que deu errado
- Evite termos técnicos: "Erro ao salvar" em vez de "Error 500"
- Se possível, sugira solução: "Foto muito grande. Tente uma imagem menor"

### **Não Use Mais:**
❌ `alert()` - Substituir por `toast.error()`  
❌ `confirm()` - Substituir por Dialog do shadcn  
❌ Mensagens inline fixas - Substituir por toast

---

## 🔄 Migração de Código Legado

### **Antes (alert):**
```typescript
if (!valid) {
  alert('Erro ao validar dados');
  return;
}
```

### **Depois (toast):**
```typescript
if (!valid) {
  toast.error('Erro ao validar dados');
  return;
}
```

### **Antes (banner de sucesso):**
```typescript
const [success, setSuccess] = useState('');

// No handleSave:
setSuccess('Salvo com sucesso!');
setTimeout(() => setSuccess(''), 3000);

// No JSX:
{success && (
  <div className="bg-green-500 p-4">
    {success}
  </div>
)}
```

### **Depois (toast):**
```typescript
// No handleSave:
toast.success('Salvo com sucesso!');

// Remover estado e JSX do banner
```

---

## 🎯 Checklist de Implementação

Para cada nova feature/página:

- [ ] Importar `toast` de `"sonner"`
- [ ] Substituir todos `alert()` por `toast.error()`
- [ ] Substituir mensagens inline por toast
- [ ] Remover estados de `error` e `success` desnecessários
- [ ] Usar `toast.promise()` para operações assíncronas
- [ ] Adicionar feedback de sucesso após ações
- [ ] Testar todos os cenários de erro

---

## 📚 Referências

- **Documentação Sonner:** https://sonner.emilkowal.ski/
- **shadcn/ui Toast:** https://ui.shadcn.com/docs/components/sonner
- **Componente Local:** `src/components/ui/sonner.tsx`

---

## ✅ Páginas Já Migradas

- ✅ `/dashboard/company/page-settings`
- ✅ `/dashboard/company/team`

## 📝 Páginas Pendentes

Use este guia para migrar:
- `/dashboard/appointments/new`
- `/dashboard/clients`
- `/dashboard/services`
- Todas as outras páginas com `alert()` ou mensagens inline

---

**Lembre-se:** Toast é para feedback rápido e temporário. Para informações permanentes ou críticas, use outros componentes! 🎯
