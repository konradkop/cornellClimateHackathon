import { useRef, useState, useEffect } from "react";
import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Point from "@arcgis/core/geometry/Point";
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine.js";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

interface GISmodal {
  hotspotCenters: {
    name: string;
    longitude: number;
    latitude: number;
    radius: number;
    color: number[];
  }[];
  currentHotSpot: {
    name: string;
    longitude: number;
    latitude: number;
    radius: number;
    color: number[];
  };
  setCurrentHotSpot: React.Dispatch<
    React.SetStateAction<{
      name: string;
      longitude: number;
      latitude: number;
      radius: number;
      color: number[];
    }>
  >;
}

const ArcGISMapWithToggle = ({
  hotspotCenters,
  currentHotSpot,
  setCurrentHotSpot,
}: GISmodal) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<MapView | null>(null);
  const [layers, setLayers] = useState<FeatureLayer[]>([]);

  useEffect(() => {
    // Hotspot centers

    if (!mapRef.current || viewRef.current) return;

    const webMap = new WebMap({
      portalItem: { id: "" },
    });

    const mapView = new MapView({
      container: mapRef.current,
      map: webMap,
      center: [8.6753, 9.082],
      zoom: 6,
    });

    viewRef.current = mapView;

    const hotspotLayer = new GraphicsLayer({ title: "Potential Hotspots" });

    for (const hotspot of hotspotCenters) {
      const center = new Point({
        longitude: hotspot.longitude,
        latitude: hotspot.latitude,
      });
      const buffer = geometryEngine.geodesicBuffer(
        center,
        hotspot.radius,
        "meters"
      );
      const circlePolygon = Array.isArray(buffer) ? buffer[0] : buffer;

      const hotspotGraphic = new Graphic({
        geometry: circlePolygon,
        symbol: {
          type: "simple-fill",
          color: hotspot.color,
          outline: { color: hotspot.color.slice(0, 3), width: 2 },
        },
      });

      hotspotLayer.add(hotspotGraphic);
    }

    webMap.add(hotspotLayer);

    // const emptyLayer = new GraphicsLayer({ title: "Empty Layer" });
    // webMap.add(emptyLayer);

    webMap.when(() => {
      const featureLayers =
        webMap.layers.items.filter((l: FeatureLayer) => l.type === "feature") ||
        [];
      webMap.layers.reorder(hotspotLayer, webMap.layers.length - 1);
      setLayers([hotspotLayer, ...featureLayers]);
    });
  }, [hotspotCenters]);

  const toggleLayer = (index: number) => {
    layers.forEach((layer, i) => (layer.visible = i === index));
    // Hotspot layer stays visible
    if (viewRef.current) {
      const hotspotLayer = viewRef.current.map.layers.find(
        (l) => l.title === "Potential Hotspots"
      );
      if (hotspotLayer) hotspotLayer.visible = true;
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "10px", display: "flex", flexWrap: "wrap" }}>
        {layers.map((layer, index) => (
          <button
            key={index}
            onClick={() => toggleLayer(index)}
            style={{
              margin: 6,
              padding: "0.6em 1.2em",
              fontSize: "1em",
              fontWeight: 500,
              borderRadius: 8,
              border: "2px solid #5ac593",
              color: "#8bc29f", // text color
              cursor: "pointer",
              transition: "all 0.2s ease-in-out",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "lightgreen";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#8bc29f";
            }}
          >
            {layer.title}
          </button>
        ))}
      </div>

      <div ref={mapRef} style={{ width: "100%", height: "500px" }} />
    </div>
  );
};

export default ArcGISMapWithToggle;
