# Paso 4: Reflexion IA - Proceso de Aprendizaje

**Alumno:** Anyerlin Ravelo

> **Instrucciones:** Para cada bloque (A, B, C), responde 3 preguntas y pega
> el prompt MAS IMPORTANTE que usaste en ese bloque.
>
> Se valoran respuestas **ESPECIFICAS** y **HONESTAS**. No importa si usaste
> IA o no. Lo que importa es que demuestres tu proceso de aprendizaje real.
>
> **Lo que evaluamos:** Tus prompts y tu capacidad de explicar que hiciste.
> Un codigo perfecto con reflexion vacia = nota baja.

---

## Bloque A: Infraestructura Docker

### Momento 1 - Arranque
**Que fue lo primero que le pediste a la IA o buscaste en internet?**

Lo primero que busqué fue cómo configurar el entorno inicial cuando me di cuenta de que no tenía Docker ni Python instalado en mi máquina local. Le pregunté a la IA: "Tengo que preparar un proyecto de análisis de datos con el dataset de QoG, pero no tengo instalado Docker ni Git en mi Windows, ¿cómo puedo descargar los datos y procesarlos manualmente usando solo PowerShell y SQL?".

### Momento 2 - Error
**Que fallo y como lo resolviste? (pega el error si lo tienes)**

El principal fallo fue tratar de trabajar con el archivo `qog_std_ts_jan24.csv` directamente en un editor de texto o Excel para limpiarlo, pero pesaba más de 100MB y se colgaba todo. Intenté hacer un script básico pero me daba error de memoria. La IA me ayudó a entender que debía procesar el archivo por "chunks" o líneas. El script de PowerShell `prep_data.ps1` fue la solución para filtrar las 15,000 filas sin saturar la RAM.

### Momento 3 - Aprendizaje
**Que aprendiste que NO sabias antes de empezar este bloque?**

Aprendí que en entornos restringidos (donde no puedes instalar Docker o Python fácilmente), PowerShell es una herramienta extremadamente potente para la manipulación de archivos CSV grandes mediante objetos de tipo `StreamReader`. También aprendí la importancia de definir el esquema de la base de datos (DDL) antes de intentar importar datos masivos con comandos como `COPY`.

### Prompt clave del Bloque A

**Herramienta:** Claude / ChatGPT

| Nivel | Prompt Utilizado / Propuesto |
|:---|:---|
| **🟢 Principiante** | "Tengo un archivo CSV gigante que no abre y quiero sacar unas columnas de países con terrorismo sin que se rompa mi PC." |
| **🔵 Actual** | "Necesito un script de PowerShell que lea el archivo qog_std_ts_jan24.csv línea por línea, extraiga solo las columnas ucdp_type1, ucdp_type2, ucdp_type3, ucdp_type4, wdi_gdpcapcur, wdi_pop, ccode, cname y year, y guarde el resultado en un nuevo CSV." |
| **🔴 Experto** | "Genera un script de PowerShell optimizado que use `System.IO.StreamReader` para procesar un CSV de 120MB. Implementa un pipeline que filtre por $ccodealp y seleccione columnas específicas mediante un objeto PSObject personalizado, exportando a CSV con codificación UTF8 para evitar pérdida de caracteres en nombres de países." |

**Por que fue clave:** La evolución hacia el prompt experto demuestra que entiendo cómo gestionar los recursos del sistema (RAM y CPU) mediante el procesamiento de flujos de datos en lugar de la carga masiva en memoria.

---

## Bloque B: Pipeline ETL

### Momento 1 - Arranque
**Que fue lo primero que le pediste a la IA o buscaste en internet?**

Al empezar el Bloque B, ya con el entorno un poco más estable, le pedí ayuda para estructurar el script de Spark: "Necesito crear un pipeline de Spark en Python (pyspark) que filtre el dataset de QoG para España, Francia, Turquía, Afganistán y Rusia entre los años 2000 y 2023, y que además calcule una columna nueva del gasto militar por persona".

### Momento 2 - Error
**Que fallo y como lo resolviste?**

Tuve un error con los tipos de datos al calcular la variable derivada `mil_exp_capita`. El error era: `PySparkTypeError: [CANNOT_APPLY_DIFF_TYPES] Cannot apply operator '*' on different types: double and string`. Resulta que algunas columnas se estaban leyendo como texto por los valores "NA". Lo resolví usando `cast("double")` y gestionando los nulos con `coalesce` dentro del pipeline.

### Momento 3 - Aprendizaje
**Que aprendiste que NO sabias antes de empezar este bloque?**

Aprendí la diferencia práctica entre guardar datos en CSV y en Parquet. No sabía que Parquet guardaba el esquema y los tipos de datos, lo que evita tener que definir los tipos de nuevo al leer el archivo para el análisis. También entendí mejor el concepto de "Lazy Evaluation" en Spark: nada se ejecuta hasta que llamé a `.write`.

### Prompt clave del Bloque B

**Herramienta:** ChatGPT / Github Copilot

| Nivel | Prompt Utilizado / Propuesto |
|:---|:---|
| **🟢 Principiante** | "Hazme un código de Spark para filtrar el CSV del QoG por años y países y guárdalo en Parquet." |
| **🔵 Actual** | "Crea un script pipeline.py que use PySpark para: 1. Leer qog_std_ts_jan24.csv. 2. Filtrar ccodealp para ['ESP', 'FRA', 'TUR', 'AFG', 'RUS'] y años entre 2000 y 2023. 3. Crear mil_exp_capita. 4. Guardar en Parquet." |
| **🔴 Experto** | "Escribe un Pipeline ETL en PySpark que implemente `inferSchema=False` con un StructType definido para optimizar el JOB. Realiza una limpieza de valores nulos en el campo militar mediante `coalesce` y genera una variable derivada tipada como DoubleType. Configura el nivel de particionamiento a 5 antes de escribir en Parquet." |

**Por que fue clave:** Pasar de un prompt genérico a uno con especificaciones técnicas de paralelismo y tipado de datos permite que Spark funcione mucho más rápido y sin errores de ejecución.

---

## Bloque C: Analisis y Visualizacion

### Momento 1 - Arranque
**Que fue lo primero que le pediste a la IA o buscaste en internet?**

Busqué cómo hacer gráficos comparativos de series temporales para varios países a la vez: "Cómo usar matplotlib para graficar la evolución de dos indicadores diferentes (gasto militar e índice de democracia) para 5 países en gráficos separados pero consistentes".

### Momento 2 - Error
**Que fallo y como lo resolviste?**

Al intentar graficar los datos de Afganistán, el gráfico se veía "roto" porque había muchos años sin datos (huecos en la línea). La IA me sugirió usar `marker='o'` para que los puntos individuales fueran visibles incluso si no había una línea continua, y a ordenar el DataFrame por año antes de graficar para que las líneas no se cruzaran de forma errática.

### Momento 3 - Aprendizaje
**Que aprendiste que NO sabias antes de empezar este bloque?**

Aprendí a interpretar datos sociales y políticos comparándolos. Fue revelador ver gráficamente cómo en países como Turquía o Rusia, el índice `vdem_libdem` (democracia liberal) cae en picado justo cuando el gasto militar se mantiene alto o sube. Entendí que la visualización de datos no es solo hacer dibujos bonitos, sino encontrar historias de correlación.

### Prompt clave del Bloque C

**Herramienta:** Claude

| Nivel | Prompt Utilizado / Propuesto |
|:---|:---|
| **🟢 Principiante** | "Quiero hacer un dibujo con líneas de colores para mostrar los gráficos del gasto militar." |
| **🔵 Actual** | "Ayúdame a escribir un script con matplotlib que genere dos gráficos: uno con el gasto militar y otro con la democracia liberal, usando un bucle para que cada país tenga su propia línea y leyenda." |
| **🔴 Experto** | "Desarrolla una función modular en Matplotlib que reciba un DataFrame y genere una grilla de subplots comparativos. Usa un diccionario de colores estático por 'ccodealp', implementa un suavizado opcional de líneas (rolling mean) y asegura que el eje X esté sincronizado entre ambos gráficos para facilitar la comparación temporal." |

**Por que fue clave:** La modularidad solicitada en el nivel experto permite que el análisis sea reproducible y estéticamente profesional, facilitando la detección de patrones visuales complejos.
