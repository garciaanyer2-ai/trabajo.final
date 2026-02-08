-- Create table for QoG terrorism/conflict data
DROP TABLE IF EXISTS qog_data;

CREATE TABLE qog_data (
    ccode INT,
    cname VARCHAR(255),
    year INT,
    ccodealp VARCHAR(10), -- Adjusted length for safety
    ucdp_type1 INT, -- Extrasystemic armed conflict
    ucdp_type2 INT, -- Interstate armed conflict
    ucdp_type3 INT, -- Internal armed conflict
    ucdp_type4 INT, -- Internationalized internal armed conflict
    wdi_gdpcapcur FLOAT, -- GDP per capita (current US$)
    wdi_pop BIGINT -- Population
);

-- INSTRUCCIONES DE IMPORTACIÓN MANUAL
-- Debido a limitaciones del sistema (falta de Python/psql en PATH), ejecute el siguiente comando
-- directamente en su cliente de base de datos (pgAdmin, DBeaver, psql console):

-- COPY qog_data FROM 'd:\mco\trabajo_final\datos\qog\kpis_terrorismo.csv' WITH (FORMAT CSV, HEADER TRUE, DELIMITER ',', ENCODING 'UTF8');

-- Si el comando COPY falla por permisos (error "could not open file"), intente usar \copy en psql:
-- \copy qog_data FROM 'd:\mco\trabajo_final\datos\qog\kpis_terrorismo.csv' WITH (FORMAT CSV, HEADER TRUE, DELIMITER ',', ENCODING 'UTF8');

-- Example Analysis Query: Countries with most years of Internal Conflict
SELECT 
    cname, 
    COUNT(*) as conflict_years
FROM qog_data
WHERE ucdp_type3 = 1
GROUP BY cname
ORDER BY conflict_years DESC
LIMIT 10;
