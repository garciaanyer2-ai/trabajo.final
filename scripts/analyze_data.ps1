$csvPath = "d:\mco\trabajo_final\datos\qog\kpis_terrorismo.csv"
$data = Import-Csv $csvPath

Write-Host "=== RESULTADOS DEL ANÁLISIS (Generado vía PowerShell) ===" -ForegroundColor Cyan
Write-Host ""

# --- 1. TENDENCIAS GLOBALES (Simplificado) ---
Write-Host "1. TENDENCIAS DE CONFLICTO (Últimos 10 años del dataset)" -ForegroundColor Yellow
$trends = $data | Group-Object year | Select-Object Name, @{
    Name = "Conflictos"; Expression = { 
        ($_.Group | Where-Object { $_.ucdp_type3 -eq '1' -or $_.ucdp_type4 -eq '1' }).Count 
    }
} | Sort-Object Name
$trends | Select-Object -Last 10 | Format-Table -AutoSize

# --- 2. NACIONES MÁS CONFLICTIVAS ---
Write-Host "2. TOP 10 PAÍSES POR AÑOS DE CONFLICTO (ucdp_type3/4)" -ForegroundColor Yellow
$ranking = $data | Where-Object { $_.ucdp_type3 -eq '1' -or $_.ucdp_type4 -eq '1' } | 
Group-Object cname | 
Select-Object Name, Count | 
Sort-Object Count -Descending | 
Select-Object -First 10

$ranking | Format-Table -AutoSize

# --- 3. INTENSIDAD RECIENTE (Desde 2000) ---
Write-Host "3. INTENSIDAD RECIENTE (Desde año 2000)" -ForegroundColor Yellow
$recent = $data | Where-Object { [int]$_.year -ge 2000 -and ($_.ucdp_type3 -eq '1' -or $_.ucdp_type4 -eq '1') } |
Group-Object cname |
Select-Object Name, Count |
Sort-Object Count -Descending |
Select-Object -First 10

$recent | Format-Table -AutoSize

# --- 4. IMPACTO ECONÓMICO (PIB Promedio Paz vs Conflicto) ---
Write-Host "4. IMPACTO ECONOMICO (Muestra: Paises con >10 arios de conflicto)" -ForegroundColor Yellow
# Filter data where GDP is present
$gdpData = $data | Where-Object { $_.wdi_gdpcapcur -ne 'NA' -and $_.wdi_gdpcapcur -ne '' }

# Group by country
$econStats = $gdpData | Group-Object cname | ForEach-Object {
    $conflictYears = $_.Group | Where-Object { $_.ucdp_type3 -eq '1' -or $_.ucdp_type4 -eq '1' }
    $peaceYears = $_.Group | Where-Object { $_.ucdp_type3 -ne '1' -and $_.ucdp_type4 -ne '1' }
    
    if ($conflictYears.Count -gt 10 -and $peaceYears.Count -gt 0) {
        $avgGdpWar = ($conflictYears | Measure-Object wdi_gdpcapcur -Average).Average
        $avgGdpPeace = ($peaceYears | Measure-Object wdi_gdpcapcur -Average).Average
        
        [PSCustomObject]@{
            Pais           = $_.Name
            AniosConflicto = $conflictYears.Count
            PIB_Paz        = [math]::Round($avgGdpPeace, 0)
            PIB_Guerra     = [math]::Round($avgGdpWar, 0)
            Diferencia     = [math]::Round($avgGdpPeace - $avgGdpWar, 0)
        }
    }
} | Sort-Object Diferencia -Descending | Select-Object -First 10

$econStats | Format-Table -AutoSize
