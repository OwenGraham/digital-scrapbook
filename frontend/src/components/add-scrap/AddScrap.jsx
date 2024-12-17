import { useState } from "react";
import "../../styles/add-scrap.css";

import EventForm from "./forms/EventForm";
import WishlistForm from "./forms/WishlistForm";
import FilmForm from "./forms/FilmForm";
import BookForm from "./forms/BookForm";
import AlbumForm from "./forms/AlbumForm";
import RecipeForm from "./forms/RecipeForm";
import TripForm from "./forms/TripForm";

export default function AddScrap() {
  const [scrapType, setScrapType] = useState("");

  const handleTypeChange = (event) => {
    setScrapType(event.target.value);
  };

  return (
    <>
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
      {(scrapType === "EVENT" && <EventForm />) ||
        (scrapType === "WISHLIST" && <WishlistForm />) ||
        (scrapType === "FILM" && <FilmForm />) ||
        (scrapType === "BOOK" && <BookForm />) ||
        (scrapType === "ALBUM" && <AlbumForm />) ||
        (scrapType === "RECIPE" && <RecipeForm />) ||
        (scrapType === "TRIP" && <TripForm />)}
    </>
  );
}
