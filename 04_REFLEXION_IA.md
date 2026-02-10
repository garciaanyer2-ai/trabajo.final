# Paso 4: Reflexión IA - Mi Proceso de Aprendizaje

**Alumno:** Anyerlin Ravelo

> **Nota Personal:** Este documento resume cómo me las he arreglado para sacar adelante este proyecto. He pasado de no tener ni idea de cómo abrir un CSV gigante a pelearme con tests estadísticos de nivel avanzado. Aquí cuento la verdad de mis errores y mis prompts, utilizando el apoyo de **Claude y Gemini** para superar cada obstáculo técnico.

---

## Bloque A: El lío de la Infraestructura y Docker

### Momento 1 - El arranque
**¿Qué fue lo primero que buscaste o le preguntaste a la IA?**

Al principio estaba bastante perdida porque en mi ordenador no tenía ni Python ni Docker configurados. Lo primero que hice fue entrar en pánico al ver el tamaño de los archivos. Le pregunté a la IA algo super básico: "Mira, tengo que hacer un trabajo con el dataset de QoG, pero mi Windows no tiene nada instalado y no puedo meter Docker ahora mismo. ¿Cómo puedo sacar los datos que necesito para verlos en SQL sin romperlo todo?".

### Momento 2 - El gran fallo
**¿Qué salió mal y cómo lo arreglaste?**

Intenté abrir el archivo `qog_std_ts_jan24.csv` con el Excel y casi se me queda frita la pantalla. El archivo pesa más de 100MB y no había forma. Probé a hacer un script de Python que vi por ahí, pero me daba errores de memoria (MemoryError) a cada rato. Al final, la IA me explicó que no podía cargar todo de golpe. La solución fue usar un script de PowerShell que lee los datos línea por línea. Fue un alivio ver que por fin se creaba un archivo pequeño que sí podía manejar.

### Momento 3 - Lo que me llevo
**¿Qué aprendiste que te explotó la cabeza?**

No sabía que PowerShell servía para tanto. Pensaba que solo era para poner comandos raros, pero resulta que con `StreamReader` puedes filtrar megabytes de datos en segundos sin que el PC sufra. También aprendí que antes de meter datos en una base de datos, hay que tener muy claro el "dibujo" (el DDL) de las tablas.

### Mis Prompts del Bloque A

| Nivel | Cómo pregunté (o preguntaría) |
|:---|:---|
| **🟢 Principiante** | "Oye, tengo un excel que pesa un montón y no abre. ¿Cómo saco solo los países que tienen problemas de terrorismo sin cargarme el PC?" |
| **🔵 Actual** | "Necesito un script para PowerShell que vaya leyendo el csv de qog poco a poco. Quiero que solo guarde las columnas de gasto militar y democracia de unos cuantos países en un archivo nuevo más pequeño." |
| **🔴 Experto** | "Hazme un código de PowerShell que use `System.IO.StreamReader` para no petar la RAM. Necesito filtrar por el código de país (ccodealp) y que la salida sea un CSV en UTF8, que si no los nombres con tildes salen fatal." |

---

## Bloque B: El Pipeline ETL (Spark a tope)

### Momento 1 - El arranque
**¿Qué fue lo primero que hiciste en este bloque?**

Cuando ya tuve los datos, me tocó meterme con Spark. Le pedí a la IA que me diera una estructura para empezar: "Tengo que filtrar estos países: España, Francia, Turquía, Afganistán y Rusia. Necesito que el script de Spark coja los años del 2000 al 2023 y me calcule una columna nueva con el gasto militar por persona, que eso no viene en el dataset original".

### Momento 2 - El error de los tipos
**¿Qué te dio problemas de verdad?**

Me salió un error rarísimo de "diff types" al multiplicar. Resulta que Spark pensaba que el gasto militar era una palabra (string) en vez de un número porque en el CSV a veces pone "NA". Me volví loca hasta que entendí que tenía que forzar a Spark a leerlo como número (cast double). Lo arreglamos usando `coalesce` para que los nulos no estropearan la cuenta.

### Momento 3 - Lo que aprendí
**¿Cuál fue la gran lección aquí?**

Me quedo con la diferencia entre CSV y Parquet. Antes me parecía una tontería, pero ahora veo que Parquet es magia: ocupa menos y recuerda qué columna es número y cuál es texto. También aprendí que Spark es "vago" (Lazy Evaluation). No hace nada hasta que no le dices que guarde el archivo de verdad.

### Mis Prompts del Bloque B

| Nivel | Cómo pregunté (o preguntaría) |
|:---|:---|
| **🟢 Principiante** | "¿Cómo hago lo de filtrar por años y países en Spark y guardarlo en ese formato raro que es como una carpeta?" |
| **🔵 Actual** | "Ayúdame con un archivo pipeline.py. Tiene que usar PySpark para leer mis datos, filtrar estos 5 países y los años del 2000 en adelante. También quiero crear la variable de gasto per cápita." |
| **🔴 Experto** | "Escribe un pipeline en PySpark pero no uses inferSchema, que tarda mucho. Define tú el StructType de las columnas. Haz la limpieza de los NA con `coalesce` y particiona los datos antes de guardarlos en Parquet para que sea eficiente." |

---

## Bloque C: Gráficos y Visualización

### Momento 1 - El arranque
**¿Cómo empezaste a dibujar los datos?**

Quería que se viera bien la comparativa entre países. Le pregunté: "¿Cómo puedo hacer con matplotlib unos gráficos que muestren a la vez el gasto en armas y cómo va la democracia para ver si hay relación?".

### Momento 2 - El caos de Afganistán
**¿Qué salió mal en los dibujos?**

Cuando saqué el gráfico de Afganistán era un desastre por los datos que faltaban. Se veía todo cortado. La solución fue poner puntitos (markers) en la línea para que se viera dónde sí había datos y ordenar todo por fechas. Si no lo ordenas, las líneas van de un lado a otro y no se entiende nada.

### Momento 3 - La historia detrás de los datos
**¿Qué descubriste al ver los gráficos?**

Fue impactante ver a Rusia y Turquía. Se ve perfectamente cómo el índice de democracia baja mientras el gasto militar sube o se queda alto. Me di cuenta de que los datos cuentan una historia política real, no son solo números en una tabla. El dashboard interactivo me ayudó a que todo se viera mucho más profesional.

### Mis Prompts del Bloque C

| Nivel | Cómo pregunté (o preguntaría) |
|:---|:---|
| **🟢 Principiante** | "¿Cómo saco unos gráficos de colores con líneas para ver lo del gasto en armas de mis países?" |
| **🔵 Actual** | "Hazme un script de Python con matplotlib. Quiero dos subplots: uno para gasto militar y otro para democracia liberal. Que cada país tenga un color diferente para que se distingan rápido." |
| **🔴 Experto** | "Crea una función en matplotlib que sea modular. Quiero que pase por un bucle los países y pinte las series temporales sincronizando los ejes X. Ponle un suavizado de líneas para que las tendencias se vean más claras en el reporte." |

---

## Bloque D: La validación profesional (Hausman Test)

### Momento 1 - El arranque
**¿Por qué te metiste en este jardín?**

Quería que mi trabajo fuera impecable y científico. Le dije a la IA: "vamos a hacer el test a mi trabajo de test de hausman, cuanto porcentaje tiene mi trabajo de cada modlo y cul me recoomiendas colocar en base a mi proyect". Quería saber si mi análisis de países era riguroso o si me estaba inventando las conclusiones.

### Momento 2 - Pelea con las librerías
**¿Qué fallo técnico tuviste al final?**

Tuve un lío increíble con las versiones de Pandas 3.0 y `linearmodels`. El código no paraba de dar errores de dimensiones. Al final, lo solucionamos bajando la versión de Pandas y usando `statsmodels` para hacer las cuentas a mano. Fue estresante pero valió la pena para tener los resultados reales del test.

### Momento 3 - El veredicto
**¿Qué aprendiste de la estadística?**

Aprendí que el Test de Hausman sirve para elegir entre Efectos Fijos y Aleatorios. Aunque el test decía una cosa (RE), yo decidí usar Efectos Fijos (FE) porque en geopolítica la historia de cada país importa demasiado como para tratarla como algo aleatorio. Esa decisión técnica es lo que le da valor a mi informe de inteligencia.

### Mi Prompt de Nivel Maestro

| Nivel | El prompt real que usé |
|:---|:---|
| **🚀 Maestro** | "vamos a hacer el test a mi trabajo de test de hausman, cuanto porcentaje tiene mi trabajo de cada modlo y cul me recoomiendas colocar en base a mi proyect" |

**Respuesta clave:** "Se ha aplicado el Test de Hausman (p=0.71). Aunque RE es consistente, se opta por un análisis de Efectos Fijos (FE) para controlar por la heterogeneidad estructural no observada de los estados en conflicto (Rusia, España, Afganistán...)."

---
**Firmado:** Anyerlin Ravelo
