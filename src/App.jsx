import "./styles.css";

import Scraps from "./components/Scraps.jsx";
import Wishlist from "./components/scraps/Wishlist.jsx";
import Film from "./components/scraps/Film.jsx";
import Book from "./components/scraps/Book.jsx";
import Album from "./components/scraps/Album.jsx";
import Recipe from "./components/scraps/Recipe.jsx";
import EventComponent from "./components/scraps/EventComponent.jsx";
import Trip from "./components/scraps/Trip.jsx";

import ep1320 from "./assets/ep-1320.avif";
import doTheRightThing from "./assets/do-the-right-thing.jpg";
import MakingSenseOfTheTroubles from "./assets/making-sense-of-the-troubles.jpg";
import sling from "./assets/sling.jpg";
import leekPasta from "./assets/leek-pasta.jpg";

function App() {
  return (
    <div id="app">
      <Scraps />
    </div>
  );
}

export default App;
