import { useState, useEffect } from "react";
import DeselectIcon from "../assets/icons/deselect.png";

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
    <li className={isSelected ? "selected" : ""} onClick={handleClick}>
      {children}
      {isSelected && (
        <img src={DeselectIcon} alt="Selected Icon" className="icon" />
      )}
    </li>
  );
}
