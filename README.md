# 🌍 Cornell Climate in Health Hackathon: 

This project is a **React application powered by Vite** that integrates with **ArcGIS WebMap** for interactive geospatial visualization.  

https://healthinclimate.ai/
---

This is for Cornell's climate in health hackathon. You will also need to run the backend for the email notifications. https://github.com/konradkop/cornellClimateHackathonBackend


---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd <your-project-folder>
````

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
