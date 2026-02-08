-- =============================================================================
-- ANÁLISIS DE DATOS: CONFLICTOS Y TERRORISMO (QoG Dataset)
-- =============================================================================

-- 1. TENDENCIAS GLOBALES DE CONFLICTO
-- Evolución del número total de conflictos por año.
-- Se suman los indicadores binarios de los 4 tipos de conflicto UCDP.
SELECT 
    year,
    SUM(ucdp_type1) AS conflictos_extrasistemicos,
    SUM(ucdp_type2) AS conflictos_interestatales,
    SUM(ucdp_type3) AS conflictos_internos,
    SUM(ucdp_type4) AS conflictos_internos_internacionalizados,
    (SUM(COALESCE(ucdp_type1, 0)) + SUM(COALESCE(ucdp_type2, 0)) + 
     SUM(COALESCE(ucdp_type3, 0)) + SUM(COALESCE(ucdp_type4, 0))) AS total_conflictos
FROM qog_data
WHERE year >= 1946
GROUP BY year
ORDER BY year;

-- 2. NACIONES MÁS CONFLICTIVAS (Histórico)
-- Ranking de países con mayor número de años sufriendo conflicto interno (Type 3 o 4).
SELECT 
    cname AS pais,
    COUNT(year) AS anios_con_conflicto,
    MIN(year) AS primer_anio_registrado,
    MAX(year) AS ultimo_anio_registrado
FROM qog_data
WHERE ucdp_type3 = 1 OR ucdp_type4 = 1
GROUP BY cname
ORDER BY anios_con_conflicto DESC
LIMIT 20;

-- 3. IMPACTO ECONÓMICO: PIB PER CÁPITA EN PAZ VS. CONFLICTO
-- Compara el promedio del PIB (wdi_gdpcapcur) en años de conflicto vs años de paz
-- para países que han tenido al menos 5 años de conflicto.
WITH ConflictStatus AS (
    SELECT 
        cname,
        CASE 
            WHEN (ucdp_type3 = 1 OR ucdp_type4 = 1) THEN 'Conflicto'
            ELSE 'Paz'
        END AS estado,
        wdi_gdpcapcur
    FROM qog_data
    WHERE wdi_gdpcapcur IS NOT NULL
)
SELECT 
    cname AS pais,
    CAST(AVG(CASE WHEN estado = 'Paz' THEN wdi_gdpcapcur END) AS DECIMAL(10,2)) AS pib_promedio_paz,
    CAST(AVG(CASE WHEN estado = 'Conflicto' THEN wdi_gdpcapcur END) AS DECIMAL(10,2)) AS pib_promedio_conflicto,
    COUNT(*) AS total_registros_con_datos
FROM ConflictStatus
GROUP BY cname
HAVING COUNT(CASE WHEN estado = 'Conflicto' THEN 1 END) >= 5 -- Filtrar países con historial relevante
ORDER BY (AVG(CASE WHEN estado = 'Paz' THEN wdi_gdpcapcur END) - AVG(CASE WHEN estado = 'Conflicto' THEN wdi_gdpcapcur END)) DESC
LIMIT 20;

-- 4. INTENSIDAD RECIENTE (Últimos 20 años disponibles)
-- Países con mayor actividad de conflicto en el periodo reciente.
SELECT 
    cname AS pais,
    SUM(COALESCE(ucdp_type3, 0) + COALESCE(ucdp_type4, 0)) AS anios_conflicto_reciente
FROM qog_data
WHERE year >= 2000
GROUP BY cname
ORDER BY anios_conflicto_reciente DESC
LIMIT 15;
