# Reporte Final: Análisis de Datos QoG (Terrorismo y Conflictos)

Este documento resume el proceso de obtención, preparación y análisis de los datos del *Quality of Government (QoG)* y *Uppsala Conflict Data Program (UCDP)*.

## 1. Resumen del Proceso

| Fase | Estado | Descripción |
| :--- | :--- | :--- |
| **Adquisición** | ✅ Completado | Descarga automatizada del dataset `qog_std_ts_jan24.csv` (~115MB). |
| **Preparación** | ✅ Completado | Filtrado de columnas clave y limpieza de formato CSV usando PowerShell. |
| **Base de Datos** | ⚠️ Manual | Se generaron instrucciones SQL (`import_data.sql`) para carga manual debido a restricciones de entorno. |
| **Análisis** | ✅ Completado | Ejecución de script de análisis (`analyze_data.ps1`) para derivar insights. |

## 2. Resultados del Análisis

### A. Tendencias Globales de Conflicto
*Conflictos armados activos (internos o internacionalizados) en los últimos años reportados.*

| Año | Cantidad de Conflictos |
| :--- | :--- |
| 2018 | 22 |
| 2019 | 18 |
| 2020 | 23 |
| 2021 | 24 |
| 2022 | 42 |

> **Observación:** Se nota un incremento significativo en la cantidad de conflictos activos reportados en 2022.

### B. Naciones con Mayor Historial de Conflicto (Top 5)
*Países con mayor número de años registrando conflicto interno desde 1946.*

1. **Reino Unido** (33 años) - *Influenciado por el conflicto en Irlanda del Norte.*
2. **Irak** (32 años)
3. **Tailandia** (32 años)
4. **Turquía** (31 años)
5. **Indonesia** (30 años)

### C. Focos de Conflicto Reciente (Desde 2000)
*Países con más años de conflicto activo en el siglo XXI.*

1. **Tailandia** (20 años)
2. **Federación Rusa** (19 años)
3. **Turquía** (18 años)
4. **Somalia** (14 años)
5. **Chad** (14 años)

### D. Impacto Económico (PIB per Cápita)
*Diferencia promedio del PIB (USD) en años de paz vs. años de conflicto para países seleccionados.*

| País | PIB (Paz) | PIB (Conflicto) | Pérdida/Diferencia |
| :--- | :--- | :--- | :--- |
| **Reino Unido** | $31,236 | $10,456 | -$20,780 |
| **Francia** | $23,745 | $9,724 | -$14,022 |
| **Israel** | $25,385 | $16,825 | -$8,561 |
| **Siria** | $2,813 | $1,450 | -$1,363 |

> **Nota Metodológica:** La correlación no implica causalidad directa única; los años de conflicto pueden coincidir con periodos históricos de menor desarrollo económico global, pero la brecha es consistente.

## 3. Archivos Entregables

- **Datos Procesados:** `d:\mco\trabajo_final\datos\qog\kpis_terrorismo.csv`
- **Script SQL (Importación y Queries):** `d:\mco\trabajo_final\analysis_queries.sql`
- **Script de Análisis (PowerShell):** `d:\mco\trabajo_final\analyze_data.ps1`
