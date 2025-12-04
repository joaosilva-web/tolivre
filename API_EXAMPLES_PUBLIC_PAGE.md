# API Examples - Public Booking Page

## 📌 Configuração da Página (Dashboard)

### 1. Criar Página (POST)

```bash
curl -X POST http://localhost:3000/api/company/page \
  -H "Content-Type: application/json" \
  -H "Cookie: auth-token=YOUR_TOKEN" \
  -d '{
    "slug": "salao-bella",
    "title": "Salão Bella Donna",
    "description": "Somos especialistas em beleza há mais de 10 anos.\n\nOferecemos os melhores tratamentos capilares, manicure, pedicure e muito mais.\n\nNossa equipe é altamente qualificada e usamos apenas produtos de primeira linha.",
    "logo": "https://example.com/logo.png",
    "coverImage": "https://example.com/cover.jpg",
    "primaryColor": "#ff69b4",
    "accentColor": "#ff1493",
    "whatsapp": "5511999999999",
    "instagram": "https://instagram.com/salaobella",
    "facebook": "https://facebook.com/salaobella",
    "address": "Rua das Flores, 123 - São Paulo, SP",
    "showServices": true,
    "showTestimonials": true,
    "showAbout": true,
    "metaTitle": "Salão Bella Donna - Beleza e Bem-estar",
    "metaDescription": "Agende seu horário no Salão Bella Donna. Especialistas em cabelo, unhas e estética. Mais de 10 anos de experiência."
  }'
```

**Resposta (201 Created):**

```json
{
  "success": true,
  "data": {
    "id": "clx123abc456",
    "companyId": "clx789def012",
    "slug": "salao-bella",
    "title": "Salão Bella Donna",
    "description": "Somos especialistas em beleza há mais de 10 anos...",
    "logo": "https://example.com/logo.png",
    "coverImage": "https://example.com/cover.jpg",
    "primaryColor": "#ff69b4",
    "accentColor": "#ff1493",
    "whatsapp": "5511999999999",
    "instagram": "https://instagram.com/salaobella",
    "facebook": "https://facebook.com/salaobella",
    "address": "Rua das Flores, 123 - São Paulo, SP",
    "showServices": true,
    "showTestimonials": true,
    "showAbout": true,
    "metaTitle": "Salão Bella Donna - Beleza e Bem-estar",
    "metaDescription": "Agende seu horário no Salão Bella Donna...",
    "createdAt": "2025-12-01T10:30:00.000Z",
    "updatedAt": "2025-12-01T10:30:00.000Z"
  }
}
```

### 2. Obter Configuração (GET)

```bash
curl http://localhost:3000/api/company/page \
  -H "Cookie: auth-token=YOUR_TOKEN"
```

**Resposta (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": "clx123abc456",
    "companyId": "clx789def012",
    "slug": "salao-bella",
    "title": "Salão Bella Donna",
    "description": "Somos especialistas em beleza há mais de 10 anos...",
    "logo": "https://example.com/logo.png",
    "coverImage": "https://example.com/cover.jpg",
    "primaryColor": "#ff69b4",
    "accentColor": "#ff1493",
    "whatsapp": "5511999999999",
    "instagram": "https://instagram.com/salaobella",
    "facebook": "https://facebook.com/salaobella",
    "address": "Rua das Flores, 123 - São Paulo, SP",
    "showServices": true,
    "showTestimonials": true,
    "showAbout": true,
    "metaTitle": "Salão Bella Donna - Beleza e Bem-estar",
    "metaDescription": "Agende seu horário no Salão Bella Donna...",
    "createdAt": "2025-12-01T10:30:00.000Z",
    "updatedAt": "2025-12-01T10:30:00.000Z",
    "testimonials": [
      {
        "id": "clx456ghi789",
        "authorName": "Maria Silva",
        "authorAvatar": "MS",
        "rating": 5,
        "text": "Adorei o atendimento! Super profissionais e o resultado ficou incrível!",
        "position": 0,
        "createdAt": "2025-12-01T11:00:00.000Z",
        "updatedAt": "2025-12-01T11:00:00.000Z"
      }
    ]
  }
}
```

### 3. Atualizar Configuração com Depoimentos (PUT)

```bash
curl -X PUT http://localhost:3000/api/company/page \
  -H "Content-Type: application/json" \
  -H "Cookie: auth-token=YOUR_TOKEN" \
  -d '{
    "slug": "salao-bella",
    "title": "Salão Bella Donna Premium",
    "description": "Atualizado: Agora com novos serviços...",
    "logo": "https://example.com/new-logo.png",
    "coverImage": "https://example.com/new-cover.jpg",
    "primaryColor": "#ff69b4",
    "accentColor": "#ff1493",
    "whatsapp": "5511999999999",
    "instagram": "https://instagram.com/salaobella",
    "facebook": "https://facebook.com/salaobella",
    "address": "Rua das Flores, 123 - São Paulo, SP",
    "showServices": true,
    "showTestimonials": true,
    "showAbout": true,
    "metaTitle": "Salão Bella Donna Premium",
    "metaDescription": "Atualizado...",
    "testimonials": [
      {
        "id": "clx456ghi789",
        "authorName": "Maria Silva",
        "authorAvatar": "MS",
        "rating": 5,
        "text": "Texto atualizado do depoimento",
        "position": 0
      },
      {
        "authorName": "João Santos",
        "authorAvatar": "JS",
        "rating": 5,
        "text": "Novo depoimento! Excelente serviço!",
        "position": 1
      }
    ]
  }'
```

## 🌐 APIs Públicas (Sem Autenticação)

### 4. Obter Página Pública (GET)

```bash
curl http://localhost:3000/api/public/page/salao-bella
```

**Resposta (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": "clx123abc456",
    "companyId": "clx789def012",
    "slug": "salao-bella",
    "title": "Salão Bella Donna",
    "description": "Somos especialistas em beleza há mais de 10 anos...",
    "logo": "https://example.com/logo.png",
    "coverImage": "https://example.com/cover.jpg",
    "primaryColor": "#ff69b4",
    "accentColor": "#ff1493",
    "whatsapp": "5511999999999",
    "instagram": "https://instagram.com/salaobella",
    "facebook": "https://facebook.com/salaobella",
    "address": "Rua das Flores, 123 - São Paulo, SP",
    "showServices": true,
    "showTestimonials": true,
    "showAbout": true,
    "company": {
      "id": "clx789def012",
      "nomeFantasia": "Salão Bella Donna LTDA",
      "telefone": "(11) 99999-9999",
      "email": "contato@salaobella.com",
      "endereco": "Rua das Flores, 123"
    },
    "services": [
      {
        "id": "svc123",
        "name": "Corte Feminino",
        "price": 80.0,
        "duration": 60
      },
      {
        "id": "svc124",
        "name": "Manicure",
        "price": 45.0,
        "duration": 45
      }
    ],
    "professionals": [
      {
        "id": "usr123",
        "name": "Ana Paula",
        "services": [
          {
            "service": {
              "id": "svc123",
              "name": "Corte Feminino",
              "price": 80.0,
              "duration": 60
            }
          }
        ]
      }
    ],
    "testimonials": [
      {
        "id": "clx456ghi789",
        "authorName": "Maria Silva",
        "authorAvatar": "MS",
        "rating": 5,
        "text": "Adorei o atendimento!",
        "position": 0
      }
    ]
  }
}
```

### 5. Criar Agendamento Público (POST)

```bash
curl -X POST http://localhost:3000/api/appointments/public \
  -H "Content-Type: application/json" \
  -d '{
    "companyId": "clx789def012",
    "professionalId": "usr123",
    "serviceId": "svc123",
    "clientName": "Carlos Oliveira",
    "clientEmail": "carlos@example.com",
    "clientPhone": "11987654321",
    "startTime": "2025-12-05T14:00:00.000Z"
  }'
```

**Resposta (201 Created):**

```json
{
  "success": true,
  "data": {
    "id": "apt789xyz",
    "companyId": "clx789def012",
    "professionalId": "usr123",
    "clientId": "cli456",
    "clientName": "Carlos Oliveira",
    "serviceId": "svc123",
    "price": 80.0,
    "startTime": "2025-12-05T14:00:00.000Z",
    "endTime": "2025-12-05T15:00:00.000Z",
    "status": "PENDING",
    "createdAt": "2025-12-01T12:00:00.000Z",
    "updatedAt": "2025-12-01T12:00:00.000Z",
    "service": {
      "id": "svc123",
      "name": "Corte Feminino",
      "price": 80.0,
      "duration": 60
    },
    "professional": {
      "id": "usr123",
      "name": "Ana Paula"
    },
    "client": {
      "id": "cli456",
      "name": "Carlos Oliveira",
      "email": "carlos@example.com",
      "phone": "11987654321"
    }
  }
}
```

**WhatsApp enviado automaticamente:**

```
✅ *Agendamento Confirmado*

Olá Carlos Oliveira!

Seu agendamento foi confirmado:

📅 *Data:* 05/12/2025
⏰ *Horário:* 14:00
💼 *Serviço:* Corte Feminino
👤 *Profissional:* Ana Paula
🏢 *Local:* Salão Bella Donna LTDA

Até lá! 😊
```

## ❌ Exemplos de Erros

### Slug já existe (POST)

```json
{
  "success": false,
  "error": "Este slug já está em uso por outra empresa"
}
```

### Página não encontrada (GET)

```json
{
  "success": false,
  "error": "Página não encontrada"
}
```

### Horário indisponível (POST public appointment)

```json
{
  "success": false,
  "error": "Este horário não está mais disponível. Por favor, escolha outro."
}
```

### Validação Zod (POST/PUT)

```json
{
  "success": false,
  "error": "Dados inválidos",
  "errorDetails": [
    {
      "code": "invalid_string",
      "message": "Slug deve conter apenas letras minúsculas, números e hífens",
      "path": ["slug"]
    }
  ]
}
```

### Sem permissão (Employee tentando criar página)

```json
{
  "success": false,
  "error": "Apenas donos e gerentes podem configurar a página"
}
```

## 🔍 Query Parameters

### Working Hours

```bash
curl "http://localhost:3000/api/working-hours?companyId=clx789def012"
```

### Appointments

```bash
# Buscar agendamentos de um profissional em uma data
curl "http://localhost:3000/api/appointments?professionalId=usr123&date=2025-12-05"
```

## 📝 Validações

### Slug

- Mínimo 3 caracteres
- Máximo 50 caracteres
- Apenas letras minúsculas, números e hífens
- Único no sistema

### Cores

- Formato hexadecimal: `#RRGGBB`
- Exemplo: `#ff69b4`

### URLs

- Devem ser URLs válidas
- Protocolos aceitos: `http://`, `https://`

### Telefone (WhatsApp)

- Mínimo 8 caracteres
- Máximo 20 caracteres
- Aceita formatação, mas normaliza para envio
- Adiciona `55` (Brasil) se não tiver código do país

### Rating (Depoimentos)

- Inteiro entre 1 e 5

### Datas

- Formato ISO 8601: `YYYY-MM-DDTHH:mm:ss.sssZ`
- Sempre em UTC

## 🧪 Testes com curl

```bash
# 1. Criar página
TOKEN="seu-token-aqui"
curl -X POST http://localhost:3000/api/company/page \
  -H "Content-Type: application/json" \
  -H "Cookie: auth-token=$TOKEN" \
  -d @- << EOF
{
  "slug": "teste-$(date +%s)",
  "title": "Empresa Teste",
  "description": "Descrição de teste",
  "primaryColor": "#6366f1",
  "accentColor": "#3b82f6",
  "showServices": true,
  "showTestimonials": true,
  "showAbout": true
}
EOF

# 2. Obter página pública
curl http://localhost:3000/api/public/page/teste-123456

# 3. Criar agendamento público
curl -X POST http://localhost:3000/api/appointments/public \
  -H "Content-Type: application/json" \
  -d @- << EOF
{
  "companyId": "clx789def012",
  "professionalId": "usr123",
  "serviceId": "svc123",
  "clientName": "Cliente Teste",
  "clientEmail": "teste@example.com",
  "clientPhone": "11999999999",
  "startTime": "$(date -u -d '+1 day 14:00' +%Y-%m-%dT%H:%M:%S.000Z)"
}
EOF
```

## 📊 Response Times (Expected)

- **GET** `/api/company/page`: ~50ms
- **GET** `/api/public/page/[slug]`: ~100ms (includes joins)
- **POST** `/api/company/page`: ~150ms
- **PUT** `/api/company/page`: ~200ms (includes testimonials)
- **POST** `/api/appointments/public`: ~300ms (includes conflict check + WhatsApp)

## 🔒 Security Headers

Todos os endpoints retornam:

```
Content-Type: application/json
```

Endpoints autenticados verificam:

```
Cookie: auth-token=...
```

## 🎯 Status Codes

- **200 OK**: Sucesso (GET, PUT)
- **201 Created**: Recurso criado (POST)
- **400 Bad Request**: Dados inválidos
- **401 Unauthorized**: Não autenticado
- **403 Forbidden**: Sem permissão
- **404 Not Found**: Recurso não encontrado
- **500 Internal Server Error**: Erro no servidor
