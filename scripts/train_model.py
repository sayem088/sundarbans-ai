import rasterio
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
import joblib

# =========================
# 1. LOAD FEATURES
# =========================
with rasterio.open("features_final.tif") as src:
    img = src.read()   # shape (5, H, W)

print("Image shape:", img.shape)

# Extract bands
VV   = img[0]
VH   = img[1]
NDVI = img[2]
NDWI = img[3]
DEM  = img[4]

# =========================
# 2. LOAD LABEL
# =========================
with rasterio.open("flood_final.tif") as src:
    y = src.read(1)

# Fix NaN
y = np.nan_to_num(y, nan=0)

# =========================
# 3. CREATE FEATURE MATRIX
# =========================
X = np.stack([
    VV.flatten(),
    VH.flatten(),
    NDVI.flatten(),
    NDWI.flatten(),
    DEM.flatten()
], axis=1)

y = y.flatten()

# =========================
# 4. CLEAN DATA
# =========================
mask = ~np.isnan(X).any(axis=1)
X = X[mask]
y = y[mask]

print("Final dataset size:", X.shape)

# =========================
# 5. CLASS CHECK
# =========================
unique, counts = np.unique(y, return_counts=True)
print("Class distribution:", dict(zip(unique, counts)))

if len(unique) < 2:
    raise ValueError("❌ Only one class found. Fix GEE threshold.")

# =========================
# 6. TRAIN / TEST SPLIT
# =========================
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    stratify=y,
    random_state=42
)

# =========================
# 7. TRAIN MODEL
# =========================
model = RandomForestClassifier(
    n_estimators=300,       # stronger model
    max_depth=12,
    class_weight='balanced',
    random_state=42,
    n_jobs=-1               # use all CPU cores
)

model.fit(X_train, y_train)

# =========================
# 8. EVALUATION
# =========================
y_pred = model.predict(X_test)

print("\n✅ Accuracy:", model.score(X_test, y_test))
print("\n📊 Classification Report:\n")
print(classification_report(y_test, y_pred))

# =========================
# 9. SAVE MODEL
# =========================
joblib.dump(model, "flood_model_full.pkl")

print("✅ Model saved as flood_model_full.pkl")