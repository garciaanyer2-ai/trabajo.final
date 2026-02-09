# 📡 Intelligence Report: Gasto Militar y Resiliencia Democrática ante el Yihadismo

<p align="center">
  <img src="img/perfil.jpg" width="250" style="border-radius: 50%; border: 4px solid #06b6d4; box-shadow: 0 0 25px rgba(6, 182, 212, 0.4);">
</p>

## 👤 Perfil del Analista
- **Nombre:** Anyerlin Ravelo
- **Carrera:** Estudiante de Postgrado
- **Nacionalidad:** Venezolana
- **Especialidad:** Análisis de Datos en Ciberseguridad y Geopolítica

### 🔗 Contacto Operativo
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/cutgore__art?igsh=YWV2ZmQwdWc0ZThv&utm_source=qr)
[![TikTok](https://img.shields.io/badge/TikTok-000000?style=for-the-badge&logo=tiktok&logoColor=white)](https://vm.tiktok.com/ZNRyF3Ps5/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/anyer-garcia-2b88b8392/)

---

## 📑 Resumen del Proyecto
Este ecosistema analítico ha sido diseñado para monitorizar el impacto del yihadismo en la estabilidad democrática global. Utilizando una arquitectura de **Big Data** basada en **PySpark** y **Docker**, el sistema procesa series temporales complejas para identificar patrones de erosión institucional y gasto militar expansivo.

### 🏗️ Arquitectura y Tecnologías
- **Infrasestructura**: Contenedores distribuidos con Docker Compose.
- **Procesamiento**: ETL distribuido en Apache Spark para el manejo de volúmenes masivos de datos (QoG Dataset).
- **Almacenamiento**: Base de Datos PostgreSQL 15 optimizada para consultas analíticas.
- **Visualización**: Dashboard interactivo con Chart.js integrado en una interfaz web táctica.

---

## 🧭 Guía de Navegación del Repositorio

| Fase | Documento | Objetivo |
|:---:|---|---|
| **I** | [01_README.md](01_README.md) | Detalle de la pregunta de investigación y países. |
| **II** | [02_INFRAESTRUCTURA.md](02_INFRAESTRUCTURA.md) | Configuración técnica del entorno Spark/Docker. |
| **III** | `pipeline.py` | Código fuente del proceso ETL distribuido. |
| **IV** | [03_RESULTADOS.md](03_RESULTADOS.md) | Análisis detallado e interpretación de hallazgos. |
| **V** | [04_REFLEXION_IA.md](04_REFLEXION_IA.md) | Post-Mortem y evolución del Prompt Engineering. |

---

## 🚀 Despliegue Rápido
**[VER DASHBOARD EN VIVO](https://garciaanyer2-ai.github.io/trabajo.final/)**

```bash
docker-compose up -d
python download_qog.py
# Ejecutar pipeline en el cluster Spark
docker exec tf_spark_master /opt/spark/bin/spark-submit --master spark://spark-master:7077 /opt/spark/trabajo_final/pipeline.py
python analysis.py
```

---
**Analista:** Anyerlin Ravelo  
**Unidad:** Maestría en Ciberseguridad y Operaciones  
**Fecha:** 2026
