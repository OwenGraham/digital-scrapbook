import { useState, useEffect } from "react";
import { scraps as scrapsList } from "../data/scraps";
import Film from "./scraps/Film";
import Book from "./scraps/Book";
import Album from "./scraps/Album";
import Recipe from "./scraps/Recipe";
import Wishlist from "./scraps/Wishlist";
import EventComponent from "./scraps/EventComponent";
import Trip from "./scraps/Trip";
import "../styles.css";

export default function Scraps({ selectedFilters }) {
  const [scraps, setScraps] = useState([]);
  const [selectedScrap, setSelectedScrap] = useState(null);

  useEffect(() => {
    setScraps(scrapsList);
  }, []);

  const handleImageClick = (scrap) => {
    setSelectedScrap(scrap);
  };

  const renderScrapComponent = (scrap) => {
    switch (scrap.type) {
      case "Film":
        return <Film {...scrap} />;
      case "Book":
        return <Book {...scrap} />;
      case "Album":
        return <Album {...scrap} />;
      case "Recipe":
        return <Recipe {...scrap} />;
      case "Wishlist":
        return <Wishlist {...scrap} />;
      case "Event":
        return <EventComponent {...scrap} />;
      case "Trip":
        return <Trip {...scrap} />;
      default:
        return null;
    }
  };

  const filteredScraps = scraps.filter(
    (scrap) =>
      selectedFilters.includes("All") || selectedFilters.includes(scrap.type)
  );

  return (
    <section id="scraps">
      {filteredScraps.length > 0 ? (
        filteredScraps.map((scrap, index) => (
          <div key={index} className="scrap-preview">
            <img
              src={scrap.img}
              alt={`Scrap ${index}`}
              onClick={() => handleImageClick(scrap)}
            />
          </div>
        ))
      ) : (
        <p>No filters selected</p>
      )}
      {selectedScrap && (
        <div className="overlay" onClick={() => setSelectedScrap(null)}>
          <div className="scrap-overlay" onClick={(e) => e.stopPropagation()}>
            {renderScrapComponent(selectedScrap)}
          </div>
        </div>
      )}
    </section>
  );
}
