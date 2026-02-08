# Trabajo Final: Gasto Militar y Calidad Democrática ante el Yihadismo

**🚀 [VER PRESENTACIÓN INTERACTIVA (LIVE)](https://garciaanyer2-ai.github.io/trabajo.final/)**

**Alumno:** Anyerlin Ravelo
**Fecha:** 08/02/2026

---

## Orden de trabajo

Completa los archivos en este orden. Cada numero indica la secuencia:

| Orden | Archivo | Que haces |
|-------|---------|-----------|
| **1** | `01_README.md` (este archivo) | Defines tu pregunta, paises y variables |
| **2** | `02_INFRAESTRUCTURA.md` | Construyes y explicas tu docker-compose.yml |
| **3** | `pipeline.py` | Escribes tu ETL + analisis con Spark |
| **4** | `03_RESULTADOS.md` | Presentas graficos e interpretas resultados |
| **5** | `04_REFLEXION_IA.md` | Documentas tu proceso y pegas tus prompts |
| **6** | `05_RESPUESTAS.md` | Respondes 4 preguntas de comprension |

Los archivos `docker-compose.yml`, `requirements.txt` y `.gitignore` los
completas conforme avanzas.

---

## Pregunta de investigacion

¿Cómo ha evolucionado la relación entre el gasto militar y la calidad democrática en países clave afectados por el fenómeno del yihadismo en Europa y Asia Central durante el periodo 2000-2023?

---

## Paises seleccionados (5)

| # | Pais | Codigo ISO | Por que lo elegiste |
|---|------|------------|---------------------|
| 1 | España | ESP | Referente europeo para comparar la resiliencia democrática frente al terrorismo. |
| 2 | Francia | FRA | País europeo con alta exposición y respuesta militar al yihadismo global. |
| 3 | Turquía | TUR | Puente estratégico entre regiones con un cambio drástico en su modelo político. |
| 4 | Afganistán | AFG | Epicentro de conflicto yihadista prolongado y colapso de instituciones. |
| 5 | Rusia | RUS | Actor clave en la seguridad de Asia Central con una tendencia autocrática marcada. |

**IMPORTANTE:** No puedes usar los paises del ejemplo del profesor (KAZ, UZB, TKM, KGZ, TJK).

---

## Variables seleccionadas (5 numericas)

| # | Variable QoG | Que mide | Por que la elegiste |
|---|-------------|----------|---------------------|
| 1 | `p_polity2` | Puntuación Polity (Democracia vs Autocracia) | Para ver el espectro político general del país. |
| 2 | `vdem_libdem` | Índice de Democracia Liberal | Para medir la salud de las libertades y derechos civiles. |
| 3 | `wbgi_rle` | Estado de Derecho (Rule of Law) | Mide la confianza en las reglas sociales y cumplimiento de leyes. |
| 4 | `wdi_expmil` | Gasto militar (% del PIB) | Indicador principal del esfuerzo económico en defensa y seguridad. |
| 5 | `wdi_gdpcapcur` | PIB per cápita (USD actual) | Contexto económico para normalizar el gasto de seguridad. |

**Tip:** Consulta el codebook de QoG para entender que mide cada variable:
https://www.gu.se/en/quality-government/qog-data

---

## Variable derivada

He creado la variable **`mil_exp_capita`**, que representa el gasto militar anual por cada ciudadano. Se calcula mediante la fórmula: `(wdi_expmil / 100) * wdi_gdpcapcur`. Esto permite comparar el esfuerzo de seguridad de manera más justa entre países con economías de distinto tamaño.

---

## Tipo de analisis elegido

- [ ] Clustering (K-Means)
- [x] Serie temporal (evolucion por pais)
- [ ] Comparacion (antes/despues de un evento)

---

## Como ejecutar mi pipeline

```bash
# Paso 1: Levantar infraestructura
docker compose up -d

# Paso 2: Verificar que todo funciona
docker ps

# Paso 3: Ejecutar pipeline
python pipeline.py
```

**Instrucción adicional:** Asegúrate de tener el dataset `qog_std_ts_jan24.csv` en la carpeta `datos/qog/` antes de ejecutar el pipeline. El script `analysis.py` puede ejecutarse posteriormente para regenerar las visualizaciones en la carpeta `capturas/`.
