# 🌍 Cornell Climate in Health Hackathon

This project is a **React application powered by Vite** that integrates with **ArcGIS WebMap** for interactive geospatial visualization.

---

## 🔗 Live Demo & Related Projects

- **Live site:** [healthinclimate.ai](https://healthinclimate.ai/) :contentReference[oaicite:0]{index=0}  
- **Backend for email notifications:** [cornellClimateHackathonBackend](https://github.com/konradkop/cornellClimateHackathonBackend) :contentReference[oaicite:1]{index=1}

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/konradkop/cornellClimateHackathon.git
cd cornellClimateHackathon
```

### 2. Install Dependencies
```bash
npm install
````

### 3. Configure ArcGIS WebMap
You will need to create an ArcGIS https://www.arcgis.com/index.html account. You can either put this token in an .env or just hardcode it here:
```bash
const webMap = new WebMap({
  portalItem: { id: "<YOUR_ARCGIS_TOKEN>" },
});
````

### 4. Run the Development Server
```bash
npm run dev
````
This will start the Vite development server. Open the URL displayed in your terminal (usually http://localhost:5173) to view the app.
