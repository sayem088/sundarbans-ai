# gee_fetch.py
import ee
import numpy as np

ee.Initialize(project='sundarban-489216')


def extract_array_from_list(img, band_name, roi, scale=10):
    """
    Extract pixel values from an image over a polygon.
    Returns numpy array.
    """
    # Reduce region to get all pixels as list
    arr_list = img.select(band_name).reduceRegion(
        reducer=ee.Reducer.toList(),
        geometry=roi,
        scale=scale,
        maxPixels=1e9
    ).get(band_name).getInfo()

    if arr_list is None or len(arr_list) == 0:
        raise ValueError(f"No data for band {band_name}")

    arr = np.array(arr_list)
    return arr


def fetch_data(coords, start, end):
    print("\n--- GEE FETCH START ---")

    roi = ee.Geometry.Polygon(coords)
    print("[GEE] ROI created")

    # Sentinel-1 VV
    s1_col = ee.ImageCollection('COPERNICUS/S1_GRD') \
        .filterBounds(roi) \
        .filterDate(start, end) \
        .select('VV')
    s2_col = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED') \
        .filterBounds(roi) \
        .filterDate(start, end) \
        .select(['B3','B4','B8'])

    s1_size = s1_col.size().getInfo()
    s2_size = s2_col.size().getInfo()
    print(f"[GEE] S1 images: {s1_size}, S2 images: {s2_size}")

    if s1_size == 0 or s2_size == 0:
        raise ValueError("No satellite data available")

    s1 = s1_col.median()
    s2 = s2_col.median()

    ndvi_img = s2.normalizedDifference(['B8','B4']).rename('NDVI')
    ndwi_img = s2.normalizedDifference(['B3','B8']).rename('NDWI')

    print("[GEE] Extracting pixels via reduceRegion...")

    vv = extract_array_from_list(s1, 'VV', roi)
    ndvi = extract_array_from_list(ndvi_img, 'NDVI', roi)
    ndwi = extract_array_from_list(ndwi_img, 'NDWI', roi)

    print("[GEE] Shapes:", vv.shape, ndvi.shape, ndwi.shape)
    print("--- GEE FETCH DONE ---\n")

    # reshape to 2D if possible (square root length)
    size = int(np.sqrt(vv.size))
    vv = vv[:size*size].reshape(size, size)
    ndvi = ndvi[:size*size].reshape(size, size)
    ndwi = ndwi[:size*size].reshape(size, size)

    return vv, ndvi, ndwi