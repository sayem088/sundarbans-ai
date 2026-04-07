# inference.py
import numpy as np
import joblib

# Load trained model
model = joblib.load("trained_model.pkl")


def predict(vv, ndvi, ndwi):

    print("\n--- MODEL START ---")

    # Shape
    h, w = vv.shape
    print("[MODEL] Shape:", h, w)

    # Flatten inputs
    vv_f = vv.flatten()
    ndvi_f = ndvi.flatten()
    ndwi_f = ndwi.flatten()
    print("[MODEL] Flatten done")

    # Mask valid pixels
    mask = (~np.isnan(vv_f)) & (~np.isnan(ndvi_f)) & (~np.isnan(ndwi_f))
    valid_count = mask.sum()
    print("[MODEL] Valid pixels:", valid_count)

    if valid_count == 0:
        raise ValueError("No valid pixels after masking")

    # Feature matrix
    X = np.column_stack([vv_f[mask], ndvi_f[mask], ndwi_f[mask]])
    print("[MODEL] Feature matrix:", X.shape)

    # Predict probabilities
    probs = model.predict_proba(X)[:, 1]
    print("[MODEL] Prediction done")

    # Reconstruct full map
    full = np.full(vv_f.shape, np.nan)
    full[mask] = probs
    risk_map = full.reshape(h, w)

    # ================= BASIC STATS =================
    mean_risk = float(np.nanmean(risk_map))
    total_valid = np.isfinite(risk_map).sum()

    high_risk_ratio = float((risk_map > 0.7).sum() / total_valid)

    # ================= ADVANCED ANALYTICS =================

    # Extract valid values only
    valid = risk_map[np.isfinite(risk_map)]

    # --- Classification ---
    low = (valid <= 0.3).sum()
    medium = ((valid > 0.3) & (valid <= 0.7)).sum()
    high = (valid > 0.7).sum()

    total = len(valid)

    # Safety check
    if total == 0:
        raise ValueError("No valid data for classification")

    classification = {
        "low": float(low / total),
        "medium": float(medium / total),
        "high": float(high / total)
    }

    # --- Histogram (distribution) ---
    hist, bins = np.histogram(valid, bins=10, range=(0, 1))

    # ================= LOG =================
    print("[MODEL] Mean Risk:", mean_risk)
    print("[MODEL] High Risk Ratio:", high_risk_ratio)
    print("[MODEL] Classification:", classification)
    print("[MODEL] Histogram:", hist.tolist())

    print("--- MODEL END ---\n")

    # ================= RETURN =================
    return risk_map, {
        "mean_risk": mean_risk,
        "high_risk_ratio": high_risk_ratio,
        "classification": classification,   # ✅ NEW
        "histogram": hist.tolist(),         # ✅ NEW
        "bins": bins.tolist()               # ✅ NEW
    }