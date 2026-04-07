# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from gee_fetch import fetch_data
from inference import predict
import numpy as np
from datetime import datetime
import os
import matplotlib.pyplot as plt

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SAVE_DIR = "saved_risk_maps"
os.makedirs(SAVE_DIR, exist_ok=True)

app.mount("/maps", StaticFiles(directory=SAVE_DIR), name="maps")


@app.post("/predict")
async def predict_api(payload: dict):
    try:
        coords = payload["coords"]
        start = payload["start"]
        end = payload["end"]

        vv, ndvi, ndwi = fetch_data(coords, start, end)
        risk_map, stats = predict(vv, ndvi, ndwi)

        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        img_filename = f"risk_map_{timestamp}.png"
        img_path = os.path.join(SAVE_DIR, img_filename)

        # Save visualization
        plt.figure(figsize=(8, 8))
        plt.imshow(risk_map, cmap="viridis")
        plt.colorbar(label="Flood Risk Probability")
        plt.title(f"Risk Map - {start} to {end}")
        plt.axis("off")
        plt.savefig(img_path, bbox_inches="tight", dpi=200)
        plt.close()

        # Downsample for frontend
        downsampled = risk_map[::8, ::8]

        return {
            "risk_map": np.nan_to_num(downsampled).tolist(),   # ← Fixed key
            "stats": stats,
            "image_file": img_filename
        }

    except Exception as e:
        print(f"❌ Error: {e}")
        return {"error": str(e)}