// components/Map.jsx
"use client";
import { MapContainer, TileLayer, useMap, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { useEffect } from "react";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet.heat";

export default function MapView({ setCoords, heatData }) {
  function HeatLayer() {
    const map = useMap();

    useEffect(() => {
      map.eachLayer((layer) => {
        if (layer instanceof L.HeatLayer) map.removeLayer(layer);
      });

      if (!heatData || heatData.length === 0) return;

      const formatted = heatData.map(p => [p.lat, p.lng, p.risk * 0.8]); // intensity adjustment

      L.heatLayer(formatted, {
        radius: 22,
        blur: 18,
        maxZoom: 16,
        gradient: { 0.4: '#22c55e', 0.7: '#eab308', 1.0: '#ef4444' }
      }).addTo(map);
    }, [heatData]);

    return null;
  }

  return (
    <MapContainer 
      center={[22.0, 89.0]} 
      zoom={8} 
      style={{ height: "100%", width: "100%" }}
      className="z-0"
    >
      <TileLayer 
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />

      <FeatureGroup>
        <EditControl
          position="topright"
          onCreated={(e) => {
            const coords = e.layer.getLatLngs()[0].map(p => [p.lng, p.lat]);
            coords.push(coords[0]); // close polygon
            setCoords([coords]);
          }}
          draw={{
            rectangle: false,
            circle: false,
            marker: false,
            polyline: false,
            polygon: true,
          }}
        />
      </FeatureGroup>

      <HeatLayer />
    </MapContainer>
  );
}