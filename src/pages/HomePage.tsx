import { useState } from "react";
import { Link } from "react-router-dom";
import { MantineProvider, Title, Flex, Image } from "@mantine/core";
import hospitalLogo from "../assets/hospitalLogo.png";
import ArcGISMap from "../pages/arcGIS/ArcGISMap";
import HomePageHero from "./homePage/HomePageHero";
import ViewButtons from "./homePage/ViewButtons";

function HomePage() {
  const linkStyle = {
    textDecoration: "none",
    color: "#333",
    fontWeight: "500",
    padding: "0.5rem 1rem",
    transition: "background 0.2s, color 0.2s",
  };

  const linkStyleCurrent = {
    textDecoration: "none",
    color: "#ec0000ff",
    fontWeight: "900",
    padding: "0.5rem 1rem",
    transition: "background 0.2s, color 0.2s",
  };

  const hotspotCenters = [
    {
      name: "Ebonyi",
      longitude: 8.083,
      latitude: 6.25,
      radius: 80000,
      color: [255, 0, 0, 0.5], // red
      colorText: "red",
    },
    {
      name: "Oyo",
      longitude: 3.93125,
      latitude: 7.85257,
      radius: 30000,
      color: [0, 0, 255, 0.5], // blue
      colorText: "blue",
    },
    {
      name: "Niger",
      longitude: 5.6511,
      latitude: 9.9326,
      radius: 50000,
      color: [0, 255, 0, 0.5], // green
      colorText: "green",
    },
    {
      name: "Cross River",
      longitude: 8.5,
      latitude: 5.75,
      radius: 40000,
      color: [255, 165, 0, 0.5], // orange
      colorText: "orange",
    },
  ];

  const [currentHotSpot, setCurrentHotSpot] = useState(hotspotCenters[0]);

  return (
    <MantineProvider>
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <Link to="/" style={linkStyleCurrent}>
          Government View
        </Link>
        <Link to="/patients" style={linkStyle}>
          Clinic View
        </Link>
      </nav>
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

              // Determine brightness to adjust text color for contrast
              const brightness = (r * 299 + g * 587 + b * 114) / 1000;
              const textColor = brightness > 150 ? "#000" : "#fff";

              return (
                <button
                  key={hotspot.name}
                  onClick={() => setCurrentHotSpot(hotspot)}
                  style={{
                    width: 140,
                    height: 50,
                    backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})`,
                    color: textColor,
                    fontSize: "1rem",
                    fontWeight: 600,
                    textTransform: "capitalize",
                    borderRadius: "8px",
                    border: isActive
                      ? `3px solid ${textColor}`
                      : "2px solid #ccc",
                    boxShadow: isActive
                      ? "0 0 10px rgba(0,0,0,0.3)"
                      : "0 2px 5px rgba(0,0,0,0.1)",
                    cursor: "pointer",
                    transition: "all 0.2s ease-in-out",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform =
                      "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform =
                      "scale(1)";
                  }}
                >
                  {hotspot.name}
                </button>
              );
            })}
          </div>
          <ViewButtons />
          <HomePageHero
            hotspotCenters={hotspotCenters}
            currentHotSpot={currentHotSpot}
            setCurrentHotSpot={setCurrentHotSpot}
          />
        </Flex>

        <Flex
          style={{
            display: "flex",
            padding: "2rem",
            width: "75%",
            flexDirection: "column",
            alignItems: "center", // horizontal center
            justifyContent: "center", // optional vertical center
          }}
        >
          <ArcGISMap
            hotspotCenters={hotspotCenters}
            currentHotSpot={currentHotSpot}
            setCurrentHotSpot={setCurrentHotSpot}
          />
          <button
            style={{
              marginTop: "2rem",
              width: "80%",
              height: "70px",
              backgroundColor: currentHotSpot.colorText,
              color: "white",
              fontSize: "1.5rem",
              fontWeight: "bold",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              textAlign: "center",
              transition: "all 0.2s ease-in-out",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.opacity = "0.8";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.opacity = "1";
            }}
            onClick={async () => {
              console.log("clicked");
              try {
                const response = await fetch(
                  "http://localhost:3000/api/send-email",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      fromEmail: "konrad.kopko@gmail.com",
                      toEmail: "konrad.kopko@gmail.com",
                      subject: `EMERGENCY ALERT: ${currentHotSpot.name.toUpperCase()}`,
                      message: `Health Alert: Heavy rains & flooding have raised the risk of cholera in your area.
 Drink only safe water (boiled, chlorinated, or bottled).
Wash your hands with soap before eating and after using the toilet.
If you have not yet received the cholera vaccine, visit your nearest clinic for vaccination.
If you develop watery diarrhea, visit your nearest clinic for a rehydration kit.
Your nearest clinic is in <b> Asvon Hospital </b> (Ibadan 200132, Oyo, Nigeria)`,
                    }),
                  }
                );

                const data = await response.json();

                if (data.success) {
                  alert(
                    `${currentHotSpot.name.toUpperCase()} has been alerted`
                  );
                } else {
                  alert("Failed to send email: " + data.error);
                }
              } catch (err) {
                alert("Error sending email: " + err.message);
              }
            }}
          >
            {`TRIGGER EMERGENCY WARNING FOR ${currentHotSpot.name.toUpperCase()}`}
          </button>
        </Flex>
      </Flex>
    </MantineProvider>
  );
}

export default HomePage;
