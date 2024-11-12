import { useState } from "react";
import Filter from "./Filter";
import "../styles/filters.css";

export default function Filters({ selectedFilters, setSelectedFilters }) {
  const handleFilterClick = (filter) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(filter)
        ? prevFilters.filter((f) => f !== filter)
        : [...prevFilters, filter]
    );
  };

  return (
    <menu id="filters">
      <Filter onClick={() => handleFilterClick("All")}>All</Filter>
      <Filter onClick={() => handleFilterClick("Event")}>Events</Filter>
      <Filter onClick={() => handleFilterClick("Wishlist")}>Wishlist</Filter>
      <Filter onClick={() => handleFilterClick("Film")}>Films</Filter>
      <Filter onClick={() => handleFilterClick("Book")}>Books</Filter>
      <Filter onClick={() => handleFilterClick("Album")}>Albums</Filter>
      <Filter onClick={() => handleFilterClick("Recipe")}>Recipes</Filter>
      <Filter onClick={() => handleFilterClick("Trip")}>Trips</Filter>
    </menu>
  );
}
