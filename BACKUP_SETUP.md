# Configuração de Backups Automáticos - TôLivre

## 📋 Visão Geral

Sistema de backup automático do banco de dados PostgreSQL com:

- ✅ Execução diária às 3h da manhã
- ✅ Retenção de 7 dias (backups antigos são deletados automaticamente)
- ✅ Compactação GZIP para economizar espaço
- ✅ Logs de execução

---

## 🪟 Windows - Task Scheduler

### Pré-requisitos

1. **PostgreSQL instalado** ou **Docker Desktop** rodando
2. **gzip** instalado (vem com Git Bash)
   - Se não tiver: baixe em https://gnuwin32.sourceforge.net/packages/gzip.htm
   - Ou use 7-Zip: `7z a -tgzip arquivo.sql.gz arquivo.sql`

### Passo 1: Testar o Script Manualmente

Abra o PowerShell como Administrador e teste:

```powershell
cd C:\Users\joaog\empresa\tolivre
.\scripts\backup.ps1
```

Se der erro de política de execução:

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Passo 2: Criar Tarefa Agendada

#### Método A: Via Interface Gráfica

1. Abra o **Agendador de Tarefas** (Task Scheduler)
   - Pesquise por "Task Scheduler" no menu Iniciar

2. Clique em **"Criar Tarefa Básica..."**

3. **Nome**: `Backup TôLivre`
   - **Descrição**: `Backup automático diário do banco de dados PostgreSQL`

4. **Gatilho**: Selecione "Diariamente"
   - **Hora**: `03:00:00` (3h da manhã)
   - **Repetir a cada**: 1 dia

5. **Ação**: Selecione "Iniciar um programa"
   - **Programa/script**: `powershell.exe`
   - **Argumentos**:
     ```
     -ExecutionPolicy Bypass -File "C:\Users\joaog\empresa\tolivre\scripts\backup.ps1"
     ```
   - **Iniciar em**: `C:\Users\joaog\empresa\tolivre`

6. **Concluir** e marcar "Abrir a caixa de diálogo Propriedades..."

7. Na aba **Geral**:
   - ☑️ Marcar "Executar mesmo quando o usuário não estiver conectado"
   - ☑️ Marcar "Executar com privilégios mais altos"

8. Na aba **Configurações**:
   - ☑️ "Permitir que a tarefa seja executada por demanda"
   - ☑️ "Executar tarefa assim que possível após perder início agendado"

#### Método B: Via PowerShell (Automático)

Execute como Administrador:

```powershell
# Parâmetros da tarefa
$TaskName = "Backup TôLivre"
$ScriptPath = "C:\Users\joaog\empresa\tolivre\scripts\backup.ps1"
$WorkingDir = "C:\Users\joaog\empresa\tolivre"

# Criar ação
$Action = New-ScheduledTaskAction `
    -Execute "powershell.exe" `
    -Argument "-ExecutionPolicy Bypass -File `"$ScriptPath`"" `
    -WorkingDirectory $WorkingDir

# Criar gatilho (diariamente às 3h)
$Trigger = New-ScheduledTaskTrigger -Daily -At 3:00AM

# Configurações adicionais
$Settings = New-ScheduledTaskSettingsSet `
    -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries `
    -StartWhenAvailable `
    -RunOnlyIfNetworkAvailable:$false

# Registrar tarefa (executa como SYSTEM)
Register-ScheduledTask `
    -TaskName $TaskName `
    -Action $Action `
    -Trigger $Trigger `
    -Settings $Settings `
    -Description "Backup automático diário do banco de dados PostgreSQL do TôLivre" `
    -User "SYSTEM" `
    -RunLevel Highest `
    -Force

Write-Host "✅ Tarefa agendada criada com sucesso!" -ForegroundColor Green
```

### Passo 3: Testar a Tarefa

Execute manualmente para testar:

```powershell
Start-ScheduledTask -TaskName "Backup TôLivre"
```

Verifique os backups criados:

```powershell
Get-ChildItem .\backups\tolivre_backup_*.sql.gz
```

### Passo 4: Verificar Logs

Ver histórico de execução:

```powershell
Get-ScheduledTask -TaskName "Backup TôLivre" | Get-ScheduledTaskInfo
```

---

## 🐧 Linux/macOS - Crontab

### Passo 1: Dar Permissão de Execução

```bash
chmod +x scripts/backup.sh
```

### Passo 2: Testar Manualmente

```bash
./scripts/backup.sh
```

### Passo 3: Adicionar ao Crontab

```bash
crontab -e
```

Adicione esta linha (executa às 3h da manhã):

```cron
0 3 * * * cd /caminho/para/tolivre && ./scripts/backup.sh >> /var/log/tolivre-backup.log 2>&1
```

### Passo 4: Verificar Crontab

```bash
crontab -l
```

---

## 🐳 Docker/Produção

Se você usa Docker Compose em produção, o script `backup.sh` já está preparado:

```bash
# Backup manual
./scripts/backup.sh

# Via cron (adicione ao crontab do servidor)
0 3 * * * cd /app/tolivre && ./scripts/backup.sh >> /var/log/tolivre-backup.log 2>&1
```

---

## 📂 Estrutura de Backups

```
backups/
├── tolivre_backup_20260209_030000.sql.gz  (mais recente)
├── tolivre_backup_20260208_030000.sql.gz
├── tolivre_backup_20260207_030000.sql.gz
├── tolivre_backup_20260206_030000.sql.gz
├── tolivre_backup_20260205_030000.sql.gz
├── tolivre_backup_20260204_030000.sql.gz
└── tolivre_backup_20260203_030000.sql.gz  (7 dias atrás)
```

Backups mais antigos que 7 dias são **deletados automaticamente**.

---

## 🔄 Restaurar Backup

### Windows

```powershell
# Descompactar
gzip -d .\backups\tolivre_backup_20260209_030000.sql.gz

# Restaurar
$env:PGPASSWORD = "postgres"
psql -h localhost -U postgres -d tolivre-dev < .\backups\tolivre_backup_20260209_030000.sql
```

### Linux/Docker

```bash
# Descompactar e restaurar em um comando
gunzip -c backups/tolivre_backup_20260209_030000.sql.gz | \
    docker-compose exec -T postgres psql -U postgres tolivre-dev
```

---

## ⚙️ Personalização

### Alterar Retenção de Dias

Edite `scripts/backup.ps1`:

```powershell
.\scripts\backup.ps1 -KeepDays 30  # Manter 30 dias
```

### Alterar Diretório de Backup

```powershell
.\scripts\backup.ps1 -BackupDir "D:\Backups\ToLivre"
```

### Backup em Nuvem (Opcional)

Adicione ao final do `backup.ps1`:

```powershell
# Upload para OneDrive/Dropbox/Google Drive
Copy-Item $BackupPath "C:\Users\joaog\OneDrive\Backups\ToLivre\"
```

Ou use **rclone** para upload em nuvem:

```powershell
rclone copy $BackupPath "remote:tolivre-backups/"
```

---

## 🚨 Troubleshooting

### Erro: "pg_dump não é reconhecido"

**Solução**: Adicione PostgreSQL ao PATH:

```powershell
# Adicione ao PATH do Windows
$env:Path += ";C:\Program Files\PostgreSQL\16\bin"
```

Ou edite `backup.ps1` com caminho completo:

```powershell
& "C:\Program Files\PostgreSQL\16\bin\pg_dump.exe" ...
```

### Erro: "gzip não encontrado"

**Solução 1**: Use 7-Zip

```powershell
# Substitua gzip por 7z no script
& 7z a -tgzip $BackupPath arquivo.sql
```

**Solução 2**: Instale Git for Windows (inclui gzip)

### Tarefa não executa automaticamente

1. Verifique se o computador está ligado às 3h
2. Verifique permissões da tarefa (deve ser "SYSTEM" ou seu usuário)
3. Teste execução manual: `Start-ScheduledTask -TaskName "Backup TôLivre"`
4. Veja logs em **Task Scheduler → Histórico**

---

## ✅ Verificação de Saúde

Execute periodicamente para verificar se os backups estão sendo criados:

```powershell
# Lista backups recentes
Get-ChildItem .\backups\tolivre_backup_*.sql.gz |
    Sort-Object LastWriteTime -Descending |
    Select-Object Name, Length, LastWriteTime -First 7
```

**Ideal**: Deve haver 1 backup por dia nos últimos 7 dias.

---

## 📊 Monitoramento

Para ambientes críticos, configure alertas se o backup falhar:

```powershell
# Adicione ao final do backup.ps1
if ($LASTEXITCODE -ne 0) {
    Send-MailMessage `
        -From "backup@tolivre.app" `
        -To "admin@tolivre.app" `
        -Subject "❌ Falha no Backup TôLivre" `
        -Body "Backup falhou. Verifique os logs." `
        -SmtpServer "smtp.resend.com"
}
```

---

## 🎯 Próximos Passos (Produção)

1. ✅ **Configure backup remoto** (AWS S3, Azure Blob, OneDrive)
2. ✅ **Teste restauração** periodicamente
3. ✅ **Monitore espaço em disco** (backups compactados crescem com o tempo)
4. ✅ **Configure backup antes de deploys** importantes

---

**💡 Dica**: Faça um teste de restauração AGORA para garantir que seus backups funcionam!
