# Script para configurar backup automático no Windows Task Scheduler
# Execute como Administrador

param(
    [string]$Time = "03:00",
    [int]$KeepDays = 7
)

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "   Configuração de Backup Automático TôLivre   " -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se está executando como Admin
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "❌ Este script precisa ser executado como Administrador!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Clique com botão direito no PowerShell e selecione 'Executar como Administrador'" -ForegroundColor Yellow
    exit 1
}

# Detectar caminho do projeto
$ProjectRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$ScriptPath = Join-Path $ProjectRoot "scripts\backup.ps1"

Write-Host "📂 Diretório do Projeto: $ProjectRoot" -ForegroundColor Gray
Write-Host "📜 Script de Backup: $ScriptPath" -ForegroundColor Gray
Write-Host ""

# Verificar se o script existe
if (-not (Test-Path $ScriptPath)) {
    Write-Host "❌ Script de backup não encontrado em: $ScriptPath" -ForegroundColor Red
    exit 1
}

# Verificar pré-requisitos
Write-Host "🔍 Verificando pré-requisitos..." -ForegroundColor Yellow

# Verificar PostgreSQL
$pgDumpPath = Get-Command pg_dump -ErrorAction SilentlyContinue
if ($pgDumpPath) {
    Write-Host "✅ pg_dump encontrado: $($pgDumpPath.Path)" -ForegroundColor Green
} else {
    Write-Host "⚠️  pg_dump não encontrado no PATH (usará Docker se necessário)" -ForegroundColor Yellow
}

# Verificar gzip
$gzipPath = Get-Command gzip -ErrorAction SilentlyContinue
if ($gzipPath) {
    Write-Host "✅ gzip encontrado: $($gzipPath.Path)" -ForegroundColor Green
} else {
    Write-Host "❌ gzip não encontrado! Instale via:" -ForegroundColor Red
    Write-Host "   - Git for Windows (inclui gzip)" -ForegroundColor Yellow
    Write-Host "   - GnuWin32: https://gnuwin32.sourceforge.net/packages/gzip.htm" -ForegroundColor Yellow
    Write-Host ""
    $continue = Read-Host "Continuar mesmo assim? (y/n)"
    if ($continue -ne "y") {
        exit 1
    }
}

Write-Host ""

# Parâmetros da tarefa
$TaskName = "Backup TôLivre Database"
$TaskDescription = "Backup automático diário do banco de dados PostgreSQL do TôLivre com retenção de $KeepDays dias"

Write-Host "⚙️  Configurando tarefa agendada..." -ForegroundColor Yellow
Write-Host "   Nome: $TaskName" -ForegroundColor Gray
Write-Host "   Horário: $Time diariamente" -ForegroundColor Gray
Write-Host "   Retenção: $KeepDays dias" -ForegroundColor Gray
Write-Host ""

try {
    # Remover tarefa existente se houver
    $existingTask = Get-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue
    if ($existingTask) {
        Write-Host "🗑️  Removendo tarefa anterior..." -ForegroundColor Yellow
        Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false
    }

    # Criar ação (comando a ser executado)
    $Action = New-ScheduledTaskAction `
        -Execute "powershell.exe" `
        -Argument "-ExecutionPolicy Bypass -NonInteractive -WindowStyle Hidden -File `"$ScriptPath`" -KeepDays $KeepDays" `
        -WorkingDirectory $ProjectRoot

    # Criar gatilho (diariamente no horário especificado)
    $Trigger = New-ScheduledTaskTrigger -Daily -At $Time

    # Configurações adicionais
    $Settings = New-ScheduledTaskSettingsSet `
        -AllowStartIfOnBatteries `
        -DontStopIfGoingOnBatteries `
        -StartWhenAvailable `
        -RunOnlyIfNetworkAvailable:$false `
        -ExecutionTimeLimit (New-TimeSpan -Hours 2) `
        -RestartCount 3 `
        -RestartInterval (New-TimeSpan -Minutes 5)

    # Principal (usuário que executará a tarefa)
    $Principal = New-ScheduledTaskPrincipal `
        -UserId "SYSTEM" `
        -LogonType ServiceAccount `
        -RunLevel Highest

    # Registrar tarefa
    Register-ScheduledTask `
        -TaskName $TaskName `
        -Action $Action `
        -Trigger $Trigger `
        -Settings $Settings `
        -Principal $Principal `
        -Description $TaskDescription `
        -Force | Out-Null

    Write-Host "✅ Tarefa agendada criada com sucesso!" -ForegroundColor Green
    Write-Host ""

    # Testar execução
    Write-Host "🧪 Deseja testar o backup agora? (y/n): " -NoNewline -ForegroundColor Yellow
    $test = Read-Host
    
    if ($test -eq "y") {
        Write-Host ""
        Write-Host "🚀 Executando backup de teste..." -ForegroundColor Yellow
        Write-Host ""
        
        Start-ScheduledTask -TaskName $TaskName
        
        # Aguardar um pouco
        Start-Sleep -Seconds 3
        
        # Verificar status
        $taskInfo = Get-ScheduledTaskInfo -TaskName $TaskName
        
        if ($taskInfo.LastTaskResult -eq 0) {
            Write-Host "✅ Backup de teste executado com sucesso!" -ForegroundColor Green
            
            # Listar backups criados
            $backupsDir = Join-Path $ProjectRoot "backups"
            if (Test-Path $backupsDir) {
                Write-Host ""
                Write-Host "📦 Backups encontrados:" -ForegroundColor Cyan
                Get-ChildItem -Path $backupsDir -Filter "tolivre_backup_*.sql.gz" | 
                    Sort-Object LastWriteTime -Descending |
                    ForEach-Object {
                        $sizeMB = [math]::Round($_.Length / 1MB, 2)
                        Write-Host "   $($_.Name) - $sizeMB MB - $($_.LastWriteTime)" -ForegroundColor Gray
                    }
            }
        } else {
            Write-Host "⚠️  Tarefa executada com código: $($taskInfo.LastTaskResult)" -ForegroundColor Yellow
            Write-Host "   Verifique o histórico no Agendador de Tarefas para mais detalhes." -ForegroundColor Gray
        }
    }

    Write-Host ""
    Write-Host "================================================" -ForegroundColor Cyan
    Write-Host "✅ Configuração concluída!" -ForegroundColor Green
    Write-Host "================================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📋 Próximos passos:" -ForegroundColor Yellow
    Write-Host "   1. Verifique a tarefa no Agendador de Tarefas do Windows" -ForegroundColor Gray
    Write-Host "   2. Backup será executado diariamente às $Time" -ForegroundColor Gray
    Write-Host "   3. Backups antigos (>$KeepDays dias) serão deletados automaticamente" -ForegroundColor Gray
    Write-Host ""
    Write-Host "🔧 Comandos úteis:" -ForegroundColor Yellow
    Write-Host "   # Executar backup manualmente:" -ForegroundColor Gray
    Write-Host "   Start-ScheduledTask -TaskName '$TaskName'" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "   # Ver informações da tarefa:" -ForegroundColor Gray
    Write-Host "   Get-ScheduledTaskInfo -TaskName '$TaskName'" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "   # Desabilitar backup automático:" -ForegroundColor Gray
    Write-Host "   Disable-ScheduledTask -TaskName '$TaskName'" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "   # Remover tarefa:" -ForegroundColor Gray
    Write-Host "   Unregister-ScheduledTask -TaskName '$TaskName'" -ForegroundColor Cyan
    Write-Host ""

} catch {
    Write-Host ""
    Write-Host "❌ Erro ao configurar tarefa agendada:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ""
    exit 1
}
