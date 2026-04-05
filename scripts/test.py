import rasterio
import numpy as np

with rasterio.open("features_final.tif") as src:
    img = src.read()

print("Shape:", img.shape)
print("Dtype:", img.dtype)
print("Min/Max:", np.min(img), np.max(img))