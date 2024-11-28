import { useState, useEffect } from "react";

export default function Filter({ children, onClick, selected }) {
  const [isSelected, setIsSelected] = useState(selected);

  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  const handleClick = () => {
    setIsSelected(!isSelected);
    onClick();
  };

  return (
    <li
      data-testid="filter"
      className={isSelected ? "selected" : ""}
      onClick={handleClick}
    >
      {children}
      {isSelected && (
        <svg
          width="13"
          height="13"
          viewBox="0 0 13 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.5 13C10.0899 13 13 10.0899 13 6.5C13 2.91015 10.0899 0 6.5 0C2.91015 0 0 2.91015 0 6.5C0 10.0899 2.91015 13 6.5 13ZM10.2917 9.53333L9.53333 10.2917L6.5 7.25833L3.46667 10.2917L2.70833 9.53333L5.74167 6.5L2.70833 3.46667L3.46667 2.70833L6.5 5.74167L9.53333 2.70833L10.2917 3.46667L7.25833 6.5L10.2917 9.53333Z"
            fill="#61624A"
          />
        </svg>
      )}
    </li>
  );
}
