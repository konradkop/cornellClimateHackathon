import { Container, Text } from "@mantine/core";
import { useState, useEffect } from "react";
import Papa from "papaparse";
import FacilityList from "./FacilityList";

interface HomePageHeroInterface {
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

const HomePageHero = ({
  hotspotCenters,
  currentHotSpot,
  setCurrentHotSpot,
}: HomePageHeroInterface) => {
  const [facilities, setFacilities] = useState<Facility[]>([]);

  const load = () => {
    fetch("../../sampledata/healthFacility2.csv")
      .then((response) => response.text())
      .then((csvText) => {
        const parsed = Papa.parse<Facility>(csvText, {
          header: true,
          skipEmptyLines: true,
        });
        setFacilities(parsed.data);
      });
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Container size="lg" style={{ padding: "2rem 0" }}>
      <FacilityList facilities={facilities} currentHotSpot={currentHotSpot} />
    </Container>
  );
};

export default HomePageHero;
