import { useState } from "react";
import "./styles/app.css";
import Filters from "./components/Filters.jsx";
import Scraps from "./components/Scraps.jsx";

function App() {
  const [selectedFilters, setSelectedFilters] = useState([]);

  return (
    <div id="app">
      <h1>Owen's Digital Scrapbook</h1>
      <Filters
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
      <Scraps selectedFilters={selectedFilters} />
    </div>
  );
}

export default App;
