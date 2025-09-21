import { Card, Container, ScrollArea, Table, Title } from "@mantine/core";

interface Facility {
  FID: number;
  globalid: string;
  nhfr_uid: string;
  nhfr_facil: string;
  country: string;
  iso: string;
  state: string;
  lga: string;
  lga_name_d: string;
  ward: string;
  ward_name_: string;
  facility_n: string;
  facility_1: string;
  ownership: string;
  ownership_: string;
  facility_l: string;
  facility_2: string;
  latitude: number;
  longitude: number;
  geocoordin: string;
  last_updat: string;
  x: number;
  y: number;
}

interface FacilityListProps {
  facilities: Facility[];
  currentHotSpot: {
    name: string;
    longitude: number;
    latitude: number;
    radius: number;
    color: number[];
  };
}

const FacilityList: React.FC<FacilityListProps> = ({
  currentHotSpot,
  facilities,
}) => {
  const hotspotRanges: Record<string, [number, number]> = {
    red: [0, 10],
    blue: [10, 20],
    green: [20, 30],
    orange: [30, 40],
  };

  const displayedFacilities = facilities.slice(
    hotspotRanges[currentHotSpot.name][0],
    hotspotRanges[currentHotSpot.name][1]
  );

  return (
    <Container style={{ marginTop: "1rem", maxWidth: "800px" }}>
      <Card shadow="sm" padding="md" radius="md" withBorder>
        <Title order={4} mb="sm" style={{ fontSize: "1rem" }}>
          {currentHotSpot.name.toUpperCase()} Facilities in Area
        </Title>
        <Table
          striped
          highlightOnHover
          verticalSpacing="md" // increased spacing
          style={{ tableLayout: "fixed", width: "100%", fontSize: "0.85rem" }}
        >
          <colgroup>
            <col style={{ width: "30%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "20%" }} />
          </colgroup>
          <thead>
            <tr>
              <th>Name</th>
              <th>State</th>
              <th>LGA</th>
              <th>Ownership</th>
              <th>Last Update</th>
            </tr>
          </thead>
          <tbody>
            {displayedFacilities.map((facility, index) => (
              <tr
                key={facility.FID}
                style={{
                  height: "50px",
                  backgroundColor: index % 2 === 0 ? "#f5f5f5" : "white",
                }}
              >
                <td>{facility.facility_n}</td>
                <td>{facility.state}</td>
                <td>{facility.lga}</td>
                <td>{facility.ownership}</td>
                <td>{facility.last_updat}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
};

export default FacilityList;
