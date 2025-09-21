import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import PatientTablePage from "./pages/PatientTablePage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/patients" element={<PatientTablePage />} />
      </Routes>
    </div>
  );
};

export default App;
