"""
Bloque C: Análisis y Visualización - Terrorismo y Yihadismo
Este script genera visualizaciones para responder a la pregunta de investigación.
"""

import os
import pandas as pd
import matplotlib.pyplot as plt

def generate_visualizations():
    # 1. Cargar datos
    parquet_path = "datos/qog_yihadismo_filtered.parquet"
    csv_path = "datos/qog/qog_std_ts_jan24.csv"
    
    print("=== Cargando datos para Bloque C ===")
    
    # Intentar cargar Parquet (resultado de Bloque B)
    if os.path.exists(parquet_path):
        print(f"Cargando desde Parquet: {parquet_path}")
        # Nota: requiere pyarrow o fastparquet
        try:
            df = pd.read_parquet(parquet_path)
        except Exception:
            print("Error al leer Parquet, intentando cargar CSV original...")
            df = None
    else:
        df = None

    # Si no hay Parquet, cargar CSV original y aplicar filtros básicos para el análisis
    if df is None:
        print(f"Cargando y filtrando desde CSV original: {csv_path}")
        paises = ["ESP", "FRA", "TUR", "AFG", "RUS"]
        variables = [
            "cname", "ccodealp", "year", 
            "p_polity2", "vdem_libdem", "wbgi_rle", 
            "wdi_expmil", "wdi_gdpcapcur"
        ]
        full_df = pd.read_csv(csv_path)
        df = full_df[full_df['ccodealp'].isin(paises)]
        df = df[variables]
        df = df[(df['year'] >= 2000) & (df['year'] <= 2023)]

    # Asegurar orden cronológico
    df = df.sort_values(['ccodealp', 'year'])

    # 2. Gráfico 1: Evolución del Gasto Militar (% del PIB)
    print("Generando Gráfico 1: Gasto Militar...")
    plt.figure(figsize=(12, 6))
    for pais in df['ccodealp'].unique():
        pais_data = df[df['ccodealp'] == pais]
        plt.plot(pais_data['year'], pais_data['wdi_expmil'], marker='o', label=pais)
    
    plt.title("Evolución del Gasto Militar (% del PIB) | 2000-2023", fontsize=14, fontweight='bold')
    plt.xlabel("Año", fontsize=12)
    plt.ylabel("% del PIB", fontsize=12)
    plt.legend(title="País")
    plt.grid(True, linestyle='--', alpha=0.7)
    
    # Guardar gráfico
    os.makedirs("datos", exist_ok=True)
    plot1_path = "datos/grafico1_militar.png"
    plt.savefig(plot1_path, dpi=300, bbox_inches='tight')
    print(f"Grafico 1 guardado en {plot1_path}")

    # 3. Gráfico 2: Evolución de la Democracia Liberal (V-Dem)
    print("Generando Gráfico 2: Índice de Democracia...")
    plt.figure(figsize=(12, 6))
    for pais in df['ccodealp'].unique():
        pais_data = df[df['ccodealp'] == pais]
        plt.plot(pais_data['year'], pais_data['vdem_libdem'], marker='s', label=pais)
    
    plt.title("Evolución del Índice de Democracia Liberal (V-Dem) | 2000-2023", fontsize=14, fontweight='bold')
    plt.xlabel("Año", fontsize=12)
    plt.ylabel("Índice (0-1)", fontsize=12)
    plt.legend(title="País")
    plt.grid(True, linestyle='--', alpha=0.7)
    
    plot2_path = "datos/grafico2_democracia.png"
    plt.savefig(plot2_path, dpi=300, bbox_inches='tight')
    print(f"Grafico 2 guardado en {plot2_path}")

if __name__ == "__main__":
    try:
        generate_visualizations()
    except Exception as e:
        print(f"Error durante la generacion de graficos: {e}")
