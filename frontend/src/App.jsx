import { useState } from "react";
import "./styles/app.css";
import Filters from "./components/filters/Filters";
import Scraps from "./components/scraps/Scraps";
import AddScrap from "./components/add-scrap/AddScrap";

function App() {
  const [scraps, setScraps] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [sortMode, setSortMode] = useState("newToOld");

  const API_BASE_URL = "http://localhost:8080";

  const fetchScraps = () => {
    fetch(`${API_BASE_URL}/api/scraps`)
      .then((response) => response.json())
      .then((data) => setScraps(data))
      .catch((error) => console.error("Error fetching scraps:", error));
  };

  return (
    <div id="app">
      <h1>Owen's Digital Scrapbook</h1>
      <Filters
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        sortMode={sortMode}
        setSortMode={setSortMode}
      />
      <Scraps
        selectedFilters={selectedFilters}
        sortMode={sortMode}
        fetchScraps={fetchScraps}
        scraps={scraps}
      />
      <AddScrap fetchScraps={fetchScraps} />
    </div>
  );
}

export default App;
