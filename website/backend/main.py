from fastapi import FastAPI, UploadFile, File
import joblib
import numpy as np
import rasterio
from io import BytesIO

app = FastAPI()

# Load trained model
model = joblib.load("model/flood_model.pkl")

@app.get("/")
def home():
    return {"message": "Sundarbans-AI API Running"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    contents = await file.read()

    with rasterio.open(BytesIO(contents)) as src:
        image = src.read(1)

    X = image.flatten().reshape(-1, 1)

    prediction = model.predict(X)

    prediction_map = prediction.reshape(image.shape)

    return {
        "status": "success",
        "message": "Prediction completed",
        "shape": prediction_map.shape
    }