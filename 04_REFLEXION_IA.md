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

**Herramienta:** Claude

**El prompt que mas te ayudo en este bloque:**
```
Necesito un script de PowerShell que lea el archivo qog_std_ts_jan24.csv línea por línea, extraiga solo las columnas ucdp_type1, ucdp_type2, ucdp_type3, ucdp_type4, wdi_gdpcapcur, wdi_pop, ccode, cname y year, y guarde el resultado en un nuevo CSV más pequeño para que pueda importarlo a SQL sin problemas de memoria.
```

**Por que fue clave:** Este prompt me permitió saltarme la restricción de no tener un entorno de datos "profesional" instalado y crear mi propia tubería de limpieza de datos usando herramientas nativas de Windows.

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

**Herramienta:** ChatGPT (vía Copilot)

**El prompt que mas te ayudo en este bloque:**
```
Crea un script pipeline.py que use PySpark para: 1. Leer datos/qog/qog_std_ts_jan24.csv. 2. Filtrar ccodealp para ['ESP', 'FRA', 'TUR', 'AFG', 'RUS'] y años entre 2000 y 2023. 3. Crear una columna mil_exp_capita multiplicando wdi_expmil/100 por wdi_gdpcapcur. 4. Guardar el resultado en un archivo Parquet llamado qog_yihadismo_filtered.parquet.
```

**Por que fue clave:** Me dio la estructura base optimizada de Spark que luego pude ajustar para manejar los errores de tipos de datos y nulos.

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

**El prompt que mas te ayudo en este bloque:**
```
Tengo un DataFrame con columnas 'ccodealp', 'year', 'wdi_expmil' y 'vdem_libdem'. Ayúdame a escribir un script en Python con matplotlib que genere dos gráficos: uno con la evolución del gasto militar y otro con la de democracia liberal, usando un bucle para que cada país tenga su propia línea de color y una leyenda clara.
```

**Por que fue clave:** Este prompt me ayudó a automatizar la creación de visualizaciones para múltiples países sin tener que repetir el código de `plt.plot()` cinco veces, lo que hizo el script `analysis.py` mucho más limpio.
