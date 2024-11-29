import { useEffect } from "react";
import Filter from "./Filter";
import DropDownFilter from "./DropDownFilter";
import "../styles/filters.css";

export default function Filters({ selectedFilters, setSelectedFilters, sortMode, setSortMode }) {
  useEffect(() => {
    const filtersElement = document.getElementById("filters");
    filtersElement.classList.add("fade-in");
  }, []);

  const handleFilterClick = (filter) => {
    if (filter === "All") {
      if (selectedFilters.includes("All")) {
        setSelectedFilters([]);
      } else {
        setSelectedFilters([
          "All",
          "Event",
          "Wishlist",
          "Film",
          "Book",
          "Album",
          "Recipe",
          "Trip",
        ]);
      }
    } else {
      setSelectedFilters((prevFilters) => {
        const newFilters = prevFilters.includes(filter)
          ? prevFilters.filter((f) => f !== filter)
          : [...prevFilters, filter];
        if (newFilters.length === 7 && !newFilters.includes("All")) {
          newFilters.push("All");
        } else if (newFilters.includes("All")) {
          newFilters.splice(newFilters.indexOf("All"), 1);
        }
        return newFilters;
      });
    }
  };

  const handleSortChange = (event) => {
    setSortMode(event.target.value);
  };

  return (
    <menu id="filters">
      <Filter
        onClick={() => handleFilterClick("All")}
        selected={selectedFilters.includes("All")}
      >
        All
      </Filter>
      {/* <DropDownFilter>events</DropDownFilter> */}
      <Filter
        onClick={() => handleFilterClick("Event")}
        selected={selectedFilters.includes("Event")}
      >
        Events
      </Filter>
      <Filter
        onClick={() => handleFilterClick("Wishlist")}
        selected={selectedFilters.includes("Wishlist")}
      >
        Wishlist
      </Filter>
      <Filter
        onClick={() => handleFilterClick("Film")}
        selected={selectedFilters.includes("Film")}
      >
        Films
      </Filter>
      <Filter
        onClick={() => handleFilterClick("Book")}
        selected={selectedFilters.includes("Book")}
      >
        Books
      </Filter>
      <Filter
        onClick={() => handleFilterClick("Album")}
        selected={selectedFilters.includes("Album")}
      >
        Albums
      </Filter>
      <Filter
        onClick={() => handleFilterClick("Recipe")}
        selected={selectedFilters.includes("Recipe")}
      >
        Recipes
      </Filter>
      <Filter
        onClick={() => handleFilterClick("Trip")}
        selected={selectedFilters.includes("Trip")}
      >
        Trips
      </Filter>
      <select name="sortBy" id="sortBy" value={sortMode} onChange={handleSortChange}>
        <option value="oldToNew">Old to new</option>
        <option value="newToOld">New to old</option>
      </select>
    </menu>
  );
}
