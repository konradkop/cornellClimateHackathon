import { MantineProvider, Title, Flex, Image } from "@mantine/core";
import tanzaniaPic from "../assets/tanzania-map.png";
import PatientLineChart from "../pages/patientChart/PatientLineChart";
import ArcGISMap from "../pages/arcGIS/ArcGISMap";
function HomePage() {
  return (
    <MantineProvider>
      <Flex
        style={{
          height: "100vh",
          width: "100vw",
          textAlign: "center",
          flexDirection: "column",
          padding: "1rem",
        }}
      >
        <Image src={tanzaniaPic} height={100} width={100} mb="md" />
        <Title order={1} mb="md">
          Hospital Dashboard
        </Title>
        <Flex style={{ padding: "10rem" }}>
          <PatientLineChart />
          <ArcGISMap />
        </Flex>
      </Flex>
    </MantineProvider>
  );
}

export default HomePage;
