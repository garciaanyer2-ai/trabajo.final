from __future__ import annotations
import os
import pandas as pd
from src.qog_utils import ensure_downloaded

QOG_URL = "https://www.qogdata.pol.gu.se/data/qog_std_ts_jan24.csv"
TARGET_PATH = "datos/qog/qog_std_ts_jan24.csv"

def main() -> None:
    print("=== QoG | Descarga del dataset (Time-Series Jan 2024) ===")
    print(f"URL: {QOG_URL}")

    csv_path = ensure_downloaded(QOG_URL, TARGET_PATH, min_size_mb=10)

    print("\n✅ Descarga OK")
    print(f"Archivo guardado en: {csv_path}")
    
    print("\n⌛ Verificando dimensiones...")
    try:
        df = pd.read_csv(csv_path)
        rows, cols = df.shape
        print(f"Dimensiones encontradas: {rows} filas x {cols} columnas")
        
        # Verificación aproximada basada en la solicitud del usuario
        if 15000 <= rows <= 16000 and 1900 <= cols <= 2100:
            print("✨ Las dimensiones coinciden con lo esperado (~15,500 x ~1,990).")
        else:
            print("⚠️ Las dimensiones difieren de lo esperado. Por favor, revisa el archivo.")
            
    except Exception as e:
        print(f"❌ Error al leer el archivo para verificar: {e}")

if __name__ == "__main__":
    main()
