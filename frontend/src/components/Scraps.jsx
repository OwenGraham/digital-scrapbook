import { useState, useEffect } from "react";
import Film from "./scraps/Film";
import Book from "./scraps/Book";
import Album from "./scraps/Album";
import Recipe from "./scraps/Recipe";
import Wishlist from "./scraps/Wishlist";
import EventComponent from "./scraps/EventComponent";
import Trip from "./scraps/Trip";
import "../styles/scraps.css";

export default function Scraps({ selectedFilters, sortMode }) {
  const [scraps, setScraps] = useState([]);
  const [selectedScrap, setSelectedScrap] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/scraps")
      .then((response) => response.json())
      .then((data) => setScraps(data))
      .catch((error) => console.error("Error fetching scraps:", error));
  }, []);

  const handleImageClick = (scrap) => {
    setSelectedScrap(scrap);
  };

  const handleCloseOverlay = () => {
    setSelectedScrap(null);
  };

  const renderScrapComponent = (scrap) => {
    switch (scrap.type) {
      case "FILM":
        return <Film {...scrap} />;
      case "BOOK":
        return <Book {...scrap} />;
      case "ALBUM":
        return <Album {...scrap} />;
      case "RECIPE":
        return <Recipe {...scrap} />;
      case "WISHLIST":
        return <Wishlist {...scrap} />;
      case "EVENT":
        return <EventComponent {...scrap} />;
      case "TRIP":
        return <Trip {...scrap} />;
      default:
        return null;
    }
  };

  const filteredScraps = scraps.filter(
    (scrap) =>
      selectedFilters.includes("All") || selectedFilters.includes(scrap.type)
  );

  const sortedScraps =
    sortMode === "newToOld" ? filteredScraps.reverse() : filteredScraps;

  return (
    <section id="scraps">
      {selectedFilters.length > 0 ? (
        sortedScraps.length > 0 ? (
          sortedScraps.map((scrap, index) => (
            <div
              key={index}
              className="scrap-preview"
              onClick={() => handleImageClick(scrap)}
            >
              <img src={scrap.img} alt={`Scrap ${index}`} />
              <h2>{scrap.name}</h2>
            </div>
          ))
        ) : (
          <p className="no-scraps-message">No scraps, make some!</p>
        )
      ) : (
        <p data-testid="no-filters-message">No filters selected</p>
      )}
      {selectedScrap && (
        <div className="overlay" onClick={handleCloseOverlay}>
          <div className="scrap-overlay" onClick={(e) => e.stopPropagation()}>
            {renderScrapComponent(selectedScrap)}
          </div>
        </div>
      )}
    </section>
  );
}
