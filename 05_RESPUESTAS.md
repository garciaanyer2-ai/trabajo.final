# Paso 5: Preguntas de Comprension

**Alumno:** Anyerlin Ravelo

> **Instrucciones:** Responde cada pregunta con tus propias palabras.
> Las respuestas deben ser especificas y demostrar que entiendes los conceptos.
> Se acepta entre 3-5 oraciones por pregunta.
>
> **Nota:** Completa este archivo AL FINAL, despues de haber terminado
> los bloques A, B y C. Asi tendras la experiencia necesaria para responder.

---

## 1. Infraestructura

**Si tu worker tiene 2 GB de RAM y el CSV pesa 3 GB, que pasa?
Como lo solucionarias?**

Si el archivo es más grande que la memoria disponible, el sistema probablemente fallaría con un error de "Out of Memory" (OOM) al intentar cargar los datos. Para solucionarlo, usaría Spark para procesar el archivo por particiones mediante su modelo de evaluación perezosa, evitando cargar todo el dataset simultáneamente. También podría aumentar la memoria asignada al contenedor en el `docker-compose.yml` o aplicar un filtrado de columnas temprano para reducir el volumen de datos en memoria.

---

## 2. ETL

**Por que `spark.read.csv()` no ejecuta nada hasta que llamas
`.count()` o `.show()`?**

Esto sucede porque Spark implementa lo que se conoce como "Evaluación Perezosa" o Lazy Evaluation. En lugar de procesar los datos de inmediato, Spark crea un grafo de operaciones (DAG) y espera a que se invoque una "Acción" para ejecutar el plan optimizado. Esto permite que el motor de ejecución analice todas las transformaciones juntas y aplique optimizaciones como el filtrado de columnas antes de leer los datos.

---

## 3. Analisis

**Interpreta tu grafico principal: que patron ves y por que crees
que ocurre?**

El patrón principal muestra una correlación negativa entre el gasto militar y la calidad democrática en países con regímenes híbridos como Rusia y Turquía. Se observa que mientras el gasto en seguridad se mantiene alto o aumenta, el índice de democracia liberal cae drásticamente, lo que sugiere que las tensiones de seguridad se utilizan a menudo para centralizar el poder. En cambio, en democracias consolidadas como España y Francia, el gasto militar estable no ha comprometido la resiliencia de sus instituciones democráticas.

---

## 4. Escalabilidad

**Si tu tuvieses que repetir este ejercicio con un dataset de 50 GB,
que cambiarias en tu infraestructura?**

Para un volumen de 50 GB, dejaría de trabajar en un entorno local y migraría el cluster Spark a un entorno de nube escalable (como AWS EMR o Databricks). Aumentaría significativamente el número de Workers y les asignaría más núcleos y memoria para manejar el paralelismo de forma eficiente. Además, sería crítico utilizar un almacenamiento distribuido como S3 o HDFS y convertir los datos a formato Parquet para optimizar el rendimiento mediante la compresión y las lecturas columnares.
