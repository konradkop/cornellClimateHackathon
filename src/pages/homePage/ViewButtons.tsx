import { Flex } from "@mantine/core";

const views = {
  care: {
    name: "🏥 Care Facilities",
  },
  water: {
    name: "💧 Water Departments",
  },
  fire: {
    name: "🔥 Fire Departments",
  },
  community: {
    name: "👥 Community Members",
  },
};

export default function ViewButtons() {
  return (
    <Flex
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "16px",
        justifyContent: "center",
        alignContent: "center",
        marginTop: 10,
      }}
    >
      {Object.entries(views).map(([key, view]) => (
        <button
          key={key}
          style={{
            padding: 10,
            color: "black",
            fontWeight: "bold",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            textAlign: "center",
            transition: "all 0.2s ease-in-out",
            backgroundColor: key === "care" ? "#a1a1a1ff" : "#E0E0E0",
          }}
        >
          {view.name}
        </button>
      ))}
    </Flex>
  );
}
