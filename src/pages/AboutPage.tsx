import { Title, Flex } from "@mantine/core";

function AboutPage() {
  return (
    <Flex
      align="center"
      justify="center"
      style={{
        height: "100vh",
        width: "100vw",
        textAlign: "center",
        flexDirection: "column",
        padding: "1rem",
      }}
    >
      <Title order={1} mb="md">
        About Page WIP
      </Title>
    </Flex>
  );
}

export default AboutPage;
