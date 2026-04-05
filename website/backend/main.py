from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import joblib
import numpy as np
import rasterio
from io import BytesIO
import tempfile
import base64
import matplotlib.pyplot as plt
import gc

app = FastAPI()

# ✅ CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load("./model/flood_model.pkl")


@app.get("/")
def home():
    return {"message": "Sundarbans-AI API Running"}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        contents = await file.read()

        with rasterio.open(BytesIO(contents)) as src:
            image = src.read(1)
            profile = src.profile

        # preprocess
        image = np.clip(image, -30, 5)
        X = image.flatten().reshape(-1, 1)

        prediction = model.predict(X)
        prediction_map = prediction.reshape(image.shape)

        # ✅ SAVE TIF
        profile.update(dtype=rasterio.uint8, count=1, compress="lzw")
        temp_tif = tempfile.NamedTemporaryFile(delete=False, suffix=".tif")

        with rasterio.open(temp_tif.name, "w", **profile) as dst:
            dst.write(prediction_map.astype("uint8"), 1)

        # ✅ CREATE PNG PREVIEW
        fig, ax = plt.subplots(figsize=(5, 5))
        ax.imshow(prediction_map, cmap="Blues")
        ax.axis("off")

        temp_png = tempfile.NamedTemporaryFile(delete=False, suffix=".png")
        plt.savefig(temp_png.name, bbox_inches="tight", pad_inches=0)
        plt.close()

        # ✅ convert PNG → base64
        with open(temp_png.name, "rb") as f:
            png_bytes = f.read()
            encoded = base64.b64encode(png_bytes).decode("utf-8")

        # cleanup
        del image, X, prediction, prediction_map
        gc.collect()

        return {
            "message": "Prediction complete",
            "preview": encoded,  # 👈 frontend will show this
            "download_url": "/download/" + temp_tif.name.split("/")[-1]
        }

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})