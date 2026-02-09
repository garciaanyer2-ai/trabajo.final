# 📡 Informe de Inteligencia: Gasto Militar y Resiliencia Democrática ante el Yihadismo

<p align="center">
  <img src="img/perfil.jpg" width="300" style="border-radius: 50%; border: 4px solid #06b6d4; box-shadow: 0 0 20px rgba(6, 182, 212, 0.4);">
</p>

## 👤 Perfil del Analista
- **Nombre:** Anyerlin Ravelo
- **Carrera:** Estudiante de Postgrado
- **Nacionalidad:** Venezolana
- **Especialidad:** Análisis de Datos en Ciberseguridad y Geopolítica

### 🔗 Contacto Operativo
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/cutgore__art?igsh=YWV2ZmQwdWc0ZThv&utm_source=qr)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/anyer-garcia-2b88b8392/)

---

## 📑 Resumen del Proyecto: Big Data & Geopolítica
Este trabajo representa la culminación del módulo de procesamiento de datos masivos. Se basa en una arquitectura de **Contenedores Docker** y **Apache Spark** para analizar cómo el fenómeno del yihadismo impacta en el equilibrio entre el gasto de defensa y las libertades civiles.

### 🛠️ Capacidades Técnicas Desplegadas:
1. **Infraestructura elástica**: Cluster Spark (Master/Worker) y base de datos relacional PostgreSQL 15.
2. **Pipeline ETL Robusto**: Procesamiento de datasets de +120MB (QoG Time-Series) mediante PySpark con tipado estricto y limpieza de señales.
3. **Análisis Longitudinal**: Estudio de tendencias 2000-2023 para 5 naciones clave (España, Francia, Turquía, Afganistán y Rusia).
4. **Visualización de Alto Impacto**: Dashboard interactivo con Chart.js y análisis comparativo de indicadores V-Dem.

---

## ⚡ Estructura de Inteligencia de Datos

| Fase | Misión Táctica |
|:---:|---|
| **I** | `01_README.md` (Perfil y Objetivos) |
| **II** | `02_INFRAESTRUCTURA.md` (Docker & Spark) |
| **III** | `pipeline.py` (ETL y Spark Jobs) |
| **IV** | `03_RESULTADOS.md` (Exploración Visual) |
| **V** | `04_REFLEXION_IA.md` (Prompt Engineering) |
| **VI** | `05_RESPUESTAS.md` (Validación Teórica) |

---

## 🚀 Despliegue Táctico (Quick Start)

```bash
docker-compose up -d
python download_qog.py
docker exec tf_spark_master /opt/spark/bin/spark-submit --master spark://spark-master:7077 /opt/spark/trabajo_final/pipeline.py
python analysis.py
```

---
**Analista:** Anyerlin Ravelo  
**Unidad:** Maestría en Ciberseguridad y Operaciones  
**Fecha:** 09/02/2026
