# Script de Backup Automático - PostgreSQL (Windows)
# Este script faz backup do banco de dados e mantém apenas os últimos 7 dias

param(
    [string]$BackupDir = ".\backups",
    [int]$KeepDays = 7
)

$ErrorActionPreference = "Stop"

# Configurações
$Date = Get-Date -Format "yyyyMMdd_HHmmss"
$BackupFile = "tolivre_backup_$Date.sql.gz"
$BackupPath = Join-Path $BackupDir $BackupFile

Write-Host "🗄️  Iniciando backup do banco de dados..." -ForegroundColor Yellow

# Criar diretório se não existir
if (-not (Test-Path $BackupDir)) {
    New-Item -ItemType Directory -Path $BackupDir -Force | Out-Null
    Write-Host "📁 Diretório de backup criado: $BackupDir" -ForegroundColor Green
}

# Fazer backup usando pg_dump
try {
    # Opção 1: Se PostgreSQL estiver instalado localmente
    $env:PGPASSWORD = "postgres"  # Senha do postgres (altere se necessário)
    
    Write-Host "💾 Executando pg_dump..." -ForegroundColor Cyan
    
    # Faz o dump e compacta em um único comando
    & pg_dump -h localhost -U postgres -d tolivre-dev | & gzip > $BackupPath
    
    if (Test-Path $BackupPath) {
        $Size = (Get-Item $BackupPath).Length / 1MB
        Write-Host "✅ Backup criado com sucesso: $BackupFile ($($Size.ToString('0.00')) MB)" -ForegroundColor Green
    }
    else {
        throw "Arquivo de backup não foi criado"
    }
}
catch {
    Write-Host "❌ Erro ao criar backup: $_" -ForegroundColor Red
    
    Write-Host "" -ForegroundColor Yellow
    Write-Host "💡 Alternativa: Use Docker se PostgreSQL não estiver instalado localmente:" -ForegroundColor Yellow
    Write-Host "   docker-compose exec -T postgres pg_dump -U postgres tolivre-dev | gzip > $BackupPath" -ForegroundColor Cyan
    
    exit 1
}

# Limpar backups antigos
Write-Host "" -ForegroundColor Yellow
Write-Host "🧹 Limpando backups antigos (mais de $KeepDays dias)..." -ForegroundColor Yellow

$CutoffDate = (Get-Date).AddDays(-$KeepDays)
$OldBackups = Get-ChildItem -Path $BackupDir -Filter "tolivre_backup_*.sql.gz" | Where-Object {
    $_.LastWriteTime -lt $CutoffDate
}

if ($OldBackups) {
    foreach ($file in $OldBackups) {
        Remove-Item $file.FullName -Force
        Write-Host "  🗑️  Removido: $($file.Name)" -ForegroundColor Gray
    }
    Write-Host "✅ $($OldBackups.Count) backup(s) antigo(s) removido(s)" -ForegroundColor Green
}
else {
    Write-Host "  Nenhum backup antigo para remover" -ForegroundColor Gray
}

# Listar backups disponíveis
Write-Host "" -ForegroundColor Yellow
Write-Host "📦 Backups disponíveis:" -ForegroundColor Cyan

$AllBackups = Get-ChildItem -Path $BackupDir -Filter "tolivre_backup_*.sql.gz" | Sort-Object LastWriteTime -Descending

if ($AllBackups) {
    foreach ($backup in $AllBackups) {
        $size = ($backup.Length / 1MB).ToString("0.00")
        $date = $backup.LastWriteTime.ToString("yyyy-MM-dd HH:mm")
        Write-Host "  📁 $($backup.Name) - $size MB - $date" -ForegroundColor White
    }
    Write-Host "" -ForegroundColor Yellow
    Write-Host "Total: $($AllBackups.Count) backup(s)" -ForegroundColor Cyan
}
else {
    Write-Host "  Nenhum backup encontrado" -ForegroundColor Gray
}

Write-Host "" -ForegroundColor Green
Write-Host "✅ Backup concluído com sucesso!" -ForegroundColor Green
