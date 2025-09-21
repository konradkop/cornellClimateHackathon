import React from "react";
import { Container, Table, Card, Text, Title, ScrollArea } from "@mantine/core";
import samplePatientData from "./patientChart/samplePatientData";
import PatientLineChart from "./patientChart/PatientLineChart";

const PatientTablePage: React.FC = () => {
  const rows = samplePatientData.map((patient) => (
    <tr key={patient.PatientID}>
      <td>{patient.PatientID}</td>
      <td>
        {patient.FirstName} {patient.LastName}
      </td>
      <td>{patient.Gender}</td>
      <td>{patient.Age}</td>
      <td>{patient.Location}</td>
      <td>{patient.EncounterDate}</td>
      <td>{patient.Symptoms}</td>
      <td>{patient.Temperature}</td>
      <td>{patient.DiarrheaSeverity}</td>
      <td>{patient.LabResult}</td>
      <td>{patient.WaterSourceQuality}</td>
      <td>{patient.SanitationStatus}</td>
    </tr>
  ));

  return (
    <Container size="xl" py="md">
      <Title order={2} mb="md">
        Clinic view WIP
      </Title>
      <Title order={2} mb="md">
        Cholera Disease Surveillance - Patient Overview
      </Title>
      <PatientLineChart />
      <Card shadow="sm" padding="md">
        <ScrollArea>
          <Table striped highlightOnHover>
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Location</th>
                <th>Encounter Date</th>
                <th>Symptoms</th>
                <th>Temperature (°C)</th>
                <th>Diarrhea Severity</th>
                <th>Lab Result</th>
                <th>Water Quality</th>
                <th>Sanitation Status</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </ScrollArea>
      </Card>
      <Text size="sm" color="dimmed" mt="sm">
        Note: Data is for sample cholera surveillance purposes only.
      </Text>
    </Container>
  );
};

export default PatientTablePage;
