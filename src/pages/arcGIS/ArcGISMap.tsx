// ArcGISMap.jsx
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Point from "@arcgis/core/geometry/Point";
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine.js";

const ArcGISMap = () => {
  let initialized = false; // local variable ensures map initializes only once

  const mapNodeRef = (node: HTMLDivElement | null) => {
    if (!node || initialized) return;
    initialized = true;

    const webMap = new WebMap({
      portalItem: {
        id: "e691172598f04ea8881cd2a4adaa45ba",
      },
    });

    const view = new MapView({
      container: node,
      map: webMap,
      center: [34.85, -6.79],
      zoom: 6,
    });

    // Create a graphics layer for the hotspot
    const hotspotLayer = new GraphicsLayer();
    webMap.add(hotspotLayer);

    // Example hotspot centers
    const hotspotCenters = [
      { longitude: 34.85, latitude: -6.8 },
      { longitude: 37.5, latitude: -5.0 },
      { longitude: 33.9, latitude: -6.5 },
    ];

    const radius = 50000; // 50 km in meters

    for (const coords of hotspotCenters) {
      const center = new Point({
        longitude: coords.longitude,
        latitude: coords.latitude,
      });

      const circlePolygon = geometryEngine.geodesicBuffer(
        center,
        radius,
        "meters"
      );

      const hotspotGraphic = new Graphic({
        geometry: circlePolygon,
        symbol: {
          type: "simple-fill",
          color: [255, 0, 0, 0.5],
          outline: {
            color: [255, 0, 0],
            width: 2,
          },
        },
      });

      hotspotLayer.add(hotspotGraphic);
    }
  };

  return <div ref={mapNodeRef} style={{ width: "100%", height: "500px" }} />;
};

export default ArcGISMap;
