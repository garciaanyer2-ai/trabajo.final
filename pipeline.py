"""
Bloque B: Pipeline ETL con Spark
Tema: Terrorismo y Yihadismo - España, Europa, Asia Central
Autor: Antigravity (AI Assistant)
"""

import os
from pyspark.sql import SparkSession
from pyspark.sql.functions import col

def create_pipeline():
    # 1. Cree una SparkSession
    # Optimizamos para ejecución local simple
    spark = SparkSession.builder \
        .appName("QoG ETL Pipeline - Terrorismo y Yihadismo") \
        .config("spark.sql.shuffle.partitions", "5") \
        .getOrCreate()

    print("=== Iniciando Pipeline ETL con Spark ===")

    # 2. Lea el CSV con spark.read.csv()
    # Usamos la ruta relativa desde la raíz del proyecto
    input_path = "datos/qog/qog_std_ts_jan24.csv"
    
    if not os.path.exists(input_path):
        print(f"Error: No se encuentra el archivo en {input_path}")
        return

    print(f"Leyendo dataset desde: {input_path}")
    df = spark.read.csv(input_path, header=True, inferSchema=True)

    # 3. Seleccione tus paises y variables
    # Países seleccionados (ISO Alpha-3): 
    # ESP (España), FRA (Francia), TUR (Turquía), AFG (Afganistán), RUS (Rusia)
    paises = ["ESP", "FRA", "TUR", "AFG", "RUS"]
    
    # Variables QoG elegidas:
    # - p_polity2: Nivel de democracia (Polity IV)
    # - vdem_libdem: Índice de democracia liberal (V-Dem)
    # - wbgi_rle: Estado de Derecho (World Bank)
    # - wdi_expmil: Gasto militar (% del PIB)
    # - wdi_gdpcapcur: PIB per cápita (US$ actuales)
    variables = [
        "cname", 
        "ccodealp", 
        "year", 
        "p_polity2",
        "vdem_libdem",
        "wbgi_rle",
        "wdi_expmil",
        "wdi_gdpcapcur"
    ]

    print(f"Filtrando por países: {paises}")
    df_filtered = df.select(*variables).filter(col("ccodealp").isin(paises))

    # 4. Filtre un rango de anios (2000-2023)
    print("Filtrando rango de años: 2000-2023")
    df_filtered = df_filtered.filter((col("year") >= 2000) & (col("year") <= 2023))

    # 5. Cree al menos 1 variable derivada
    # Gasto militar per cápita estimado (USD)
    # Formula: (Gasto militar % PIB / 100) * PIB per cápita
    print("Creando variable derivada: mil_exp_capita")
    df_final = df_filtered.withColumn(
        "mil_exp_capita", 
        (col("wdi_expmil") / 100) * col("wdi_gdpcapcur")
    )

    # 6. Guarde el resultado como Parquet
    output_path = "datos/qog_yihadismo_filtered.parquet"
    print(f"Guardando resultado en Parquet: {output_path}")
    
    try:
        df_final.write.mode("overwrite").parquet(output_path)
        print("✅ Guardado exitoso.")
    except Exception as e:
        print(f"❌ Error al guardar Parquet: {e}")

    # Mostrar una vista previa de los resultados
    print("\nResumen de los datos procesados:")
    df_final.orderBy("ccodealp", "year").show(20)

    spark.stop()

if __name__ == "__main__":
    create_pipeline()
