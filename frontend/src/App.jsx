import { useState } from "react";
import "./styles/app.css";
import Filters from "./components/Filters.jsx";
import Scraps from "./components/Scraps.jsx";
import NewScrap from "./components/add-scrap/AddScrap.jsx";

function App() {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [sortMode, setSortMode] = useState("newToOld");

  return (
    <div id="app">
      <h1>Owen's Digital Scrapbook</h1>
      <Filters
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        sortMode={sortMode}
        setSortMode={setSortMode}
      />
      <Scraps selectedFilters={selectedFilters} sortMode={sortMode} />
      <NewScrap />
    </div>
  );
}

export default App;
