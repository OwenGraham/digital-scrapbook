import { useEffect } from "react";
import Filter from "./Filter";
import "../../styles/filters.css";

const filterMapping = {
  All: "ALL",
  Events: "EVENT",
  Wishlist: "WISHLIST",
  Films: "FILM",
  Books: "BOOK",
  Albums: "ALBUM",
  Recipes: "RECIPE",
  Trips: "TRIP",
};

export default function Filters({
  selectedFilters,
  setSelectedFilters,
  sortMode,
  setSortMode,
}) {
  useEffect(() => {
    const filtersElement = document.getElementById("filters");
    filtersElement.classList.add("fade-in");
  }, []);

  const handleFilterClick = (filter) => {
    const mappedFilter = filterMapping[filter];
    if (mappedFilter === "ALL") {
      if (selectedFilters.includes("ALL")) {
        setSelectedFilters([]);
      } else {
        setSelectedFilters(Object.values(filterMapping));
      }
    } else {
      setSelectedFilters((prevFilters) => {
        const newFilters = prevFilters.includes(mappedFilter)
          ? prevFilters.filter((f) => f !== mappedFilter)
          : [...prevFilters, mappedFilter];
        if (
          newFilters.length === Object.values(filterMapping).length - 1 &&
          !newFilters.includes("ALL")
        ) {
          newFilters.push("ALL");
        } else if (newFilters.includes("ALL")) {
          newFilters.splice(newFilters.indexOf("ALL"), 1);
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
      {Object.keys(filterMapping).map((filter) => (
        <Filter
          key={filter}
          onClick={() => handleFilterClick(filter)}
          selected={selectedFilters.includes(filterMapping[filter])}
        >
          {filter}
        </Filter>
      ))}
      <select
        name="sortBy"
        id="sortBy"
        value={sortMode}
        onChange={handleSortChange}
      >
        <option value="oldToNew">Old to new</option>
        <option value="newToOld">New to old</option>
      </select>
    </menu>
  );
}
