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

export default function Scraps() {
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

  return (
    <section id="scraps">
      {scraps.length > 0 ? (
        scraps.map((scrap, index) => (
          <div key={index} className="scrap-placeholder">
            <img
              src={scrap.img}
              alt={`Scrap ${index}`}
              onClick={() => handleImageClick(scrap)}
            />
          </div>
        ))
      ) : (
        <p>Loading scraps...</p>
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
