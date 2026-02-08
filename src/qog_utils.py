import os
import urllib.request
import hashlib


def ensure_downloaded(url: str, target_path: str, min_size_mb: int = 5) -> str:
    """
    Se asegura de que el dataset esté descargado en target_path y tenga un tamaño mínimo.
    Crea los directorios necesarios.
    """
    # Asegurar que el directorio existe
    os.makedirs(os.path.dirname(target_path), exist_ok=True)
    
    sha256_path = f"{target_path}.sha256"

    # Verificar si el archivo existe y tiene el tamaño mínimo
    if os.path.exists(target_path):
        file_size_mb = os.path.getsize(target_path) / (1024 * 1024)
        if file_size_mb >= min_size_mb:
            print(f"Archivo ya existe en {target_path} y tiene un tamaño de {file_size_mb:.2f} MB.")
            return target_path
        else:
            print(f"Archivo existe pero es demasiado pequeño ({file_size_mb:.2f} MB). Descargando de nuevo...")

    print(f"Descargando dataset desde {url}...")
    try:
        urllib.request.urlretrieve(url, target_path)
        
        # Calcular y guardar el SHA256
        sha256_hash = hashlib.sha256()
        with open(target_path, "rb") as f:
            for byte_block in iter(lambda: f.read(4096), b""):
                sha256_hash.update(byte_block)
        
        hash_str = sha256_hash.hexdigest()
        with open(sha256_path, "w") as f:
            f.write(hash_str)
            
        return target_path
    except Exception as e:
        print(f"Error durante la descarga: {e}")
        raise
