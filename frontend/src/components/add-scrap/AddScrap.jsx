import { useState } from "react";
import "../../styles/add-scrap.css";

import AddScrapForm from "./AddScrapForm";

export default function AddScrap({ fetchScraps }) {
  const [scrapType, setScrapType] = useState("");

  const handleTypeChange = (event) => {
    setScrapType(event.target.value);
  };

  const handleCloseOverlay = () => {
    setScrapType("");
  };

  return (
    <section id="addScrap">
      <select
        name="selectScrapType"
        id="typeSelect"
        defaultValue=""
        onChange={handleTypeChange}
      >
        <option value="" disabled>
          Add new scrap
        </option>
        <option value="EVENT">Event</option>
        <option value="WISHLIST">Wishlist</option>
        <option value="FILM">Film</option>
        <option value="BOOK">Book</option>
        <option value="ALBUM">Album</option>
        <option value="RECIPE">Recipe</option>
        <option value="TRIP">Trip</option>
      </select>
      {scrapType && (
        <div className="overlay" onClick={handleCloseOverlay}>
          {scrapType && (
            <AddScrapForm
              scrapType={scrapType}
              handleCloseOverlay={handleCloseOverlay}
              fetchScraps={fetchScraps}
            />
          )}
        </div>
      )}
    </section>
  );
}
