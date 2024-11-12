import { useState } from "react";
import DeselectIcon from "../assets/deselect.png";

export default function Filter({ children, onClick }) {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
    onClick();
  };

  return (
    <li className={selected ? "selected" : ""} onClick={handleClick}>
      {children}
      {selected && (
        <img src={DeselectIcon} alt="Selected Icon" className="icon" />
      )}
    </li>
  );
}
