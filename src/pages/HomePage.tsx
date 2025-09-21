import { useState } from "react";
import { Link } from "react-router-dom";
import { MantineProvider, Title, Flex, Image } from "@mantine/core";
import hospitalLogo from "../assets/hospitalLogo.png";
import ArcGISMap from "../pages/arcGIS/ArcGISMap";
import HomePageHero from "./homePage/HomePageHero";

function HomePage() {
  const hotspotCenters = [
    {
      name: "red",
      longitude: 3.3792,
      latitude: 6.5244,
      radius: 40000,
      color: [255, 0, 0, 0.5], // red
    },
    {
      name: "blue",
      longitude: 7.4951,
      latitude: 9.0579,
      radius: 60000,
      color: [0, 0, 255, 0.5], // blue
    },
    {
      name: "green",
      longitude: 12.4833,
      latitude: 11.8333,
      radius: 50000,
      color: [0, 255, 0, 0.5], // green (was orange before)
    },
    {
      name: "orange",
      longitude: 6.6,
      latitude: 6.5,
      radius: 30000,
      color: [255, 165, 0, 0.5], // orange
    },
  ];
  const [currentHotSpot, setCurrentHotSpot] = useState(hotspotCenters[0]);

  return (
    <MantineProvider>
      <Flex style={{ display: "flex", flexDirection: "row" }}>
        <Flex style={{ display: "flex", flexDirection: "column" }}>
          <Flex
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image src={hospitalLogo} style={{ height: 200, width: 200 }} />
            <Title style={{ color: "#003b00ff" }}>
              Early warning and response system
            </Title>
          </Flex>
          <nav style={{ justifyContent: "center", alignItems: "center" }}>
            <Link to="/">Home</Link> | <Link to="/about">About</Link> |{" "}
            <Link to="/patients">Patients</Link>
          </nav>
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "12px",
            }}
          >
            {hotspotCenters.map((hotspot) => {
              const isActive = currentHotSpot.name === hotspot.name;
              const [r, g, b, a] = hotspot.color;

              return (
                <button
                  key={hotspot.name}
                  onClick={() => setCurrentHotSpot(hotspot)}
                  style={{
                    width: 120, // fixed width
                    height: 50, // fixed height
                    backgroundColor: `rgba(${r},${g},${b},${a})`,
                    color: isActive ? "white" : "black",
                    fontSize: "1em",
                    fontWeight: 500,
                    borderRadius: 8,
                    border: isActive ? "3px solid white" : "2px solid #5ac593",
                    cursor: "pointer",
                    transition: "all 0.2s ease-in-out",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.opacity =
                      "0.8";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                  }}
                >
                  {hotspot.name}
                </button>
              );
            })}
          </div>
          <HomePageHero
            hotspotCenters={hotspotCenters}
            currentHotSpot={currentHotSpot}
            setCurrentHotSpot={setCurrentHotSpot}
          />
        </Flex>

        <Flex style={{ padding: "2rem", width: "75%" }}>
          <ArcGISMap
            hotspotCenters={hotspotCenters}
            currentHotSpot={currentHotSpot}
            setCurrentHotSpot={setCurrentHotSpot}
          />
        </Flex>
      </Flex>
    </MantineProvider>
  );
}

export default HomePage;
