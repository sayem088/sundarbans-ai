import rasterio
import numpy as np
import matplotlib.pyplot as plt

# Load Sentinel-1 raster
with rasterio.open("data/dataset/sentinel1_vv.tif") as src:
    image = src.read(1)
    profile = src.profile

# print("Shape:", image.shape)

# plt.imshow(image, cmap='gray')
# plt.title("Sentinel-1 Radar Image")
# plt.colorbar()
# plt.show()

with rasterio.open("data/dataset/flood_map_2023.tif") as src:
    flood = src.read(1)

# plt.imshow(flood, cmap='Blues')
# plt.title("Flood Map")
# plt.show()

# Flatten arrays
X = image.flatten().reshape(-1,1)
y = flood.flatten()

# Remove no-data
mask = ~np.isnan(X[:,0])
X = X[mask]
y = y[mask]

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = RandomForestClassifier(n_estimators=100)

model.fit(X_train, y_train)

accuracy = model.score(X_test, y_test)

print("Model Accuracy:", accuracy)
