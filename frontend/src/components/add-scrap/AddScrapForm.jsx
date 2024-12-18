import { useState } from "react";

export default function EventForm({
  scrapType,
  handleCloseOverlay,
  fetchScraps,
}) {
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let imageUrl = event.target.img.value;

    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);
      const response = await fetch("http://localhost:8080/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.text();
      imageUrl = "http://localhost:8080" + data;
    }

    const formData = {
      type: scrapType,
      name: event.target.name.value,
      img: imageUrl,
    };

    if (scrapType === "EVENT") {
      formData.date = event.target.date.value;
      formData.venue = event.target.venue.value;
      formData.lineup = event.target.lineup.value
        .split(",")
        .map((person) => person.trim());
    } else if (scrapType === "WISHLIST") {
      formData.brand = event.target.brand.value;
      formData.price = event.target.price.value;
      formData.link = event.target.link.value;
    } else if (
      scrapType === "FILM" ||
      scrapType === "BOOK" ||
      scrapType === "ALBUM"
    ) {
      formData.rating = event.target.rating.value;
      formData.review = event.target.review.value;
      formData.releaseYear = event.target.releaseYear.value;

      if (scrapType === "FILM") {
        formData.director = event.target.director.value;
      } else if (scrapType === "BOOK") {
        formData.author = event.target.author.value;
      } else if (scrapType === "ALBUM") {
        formData.artist = event.target.artist.value;
      }
    } else if (scrapType === "RECIPE") {
      formData.cookingTime = event.target.cookingTime.value;
      formData.ingredients = event.target.ingredients.value
        .split(",")
        .map((ingredient) => ingredient.trim());
      formData.steps = event.target.steps.value
        .split(",")
        .map((step) => step.trim());
    } else if (scrapType === "TRIP") {
      formData.location = event.target.location.value;
      formData.from = event.target.from.value;
      formData.to = event.target.to.value;
    }

    fetch("http://localhost:8080/api/scraps", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        fetchScraps();
        handleCloseOverlay();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <form
      className="add-scrap-form"
      onSubmit={handleSubmit}
      onClick={(e) => e.stopPropagation()}
    >
      <h2>Add {scrapType.toLowerCase()}</h2>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" required />
      <label htmlFor="img">Image URL:</label>
      <input type="text" id="img" name="img" />
      <label htmlFor="imageFile">Or upload an image:</label>
      <input
        type="file"
        id="imageFile"
        name="imageFile"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files[0])}
      />
      {scrapType === "EVENT" && (
        <>
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" name="date" required />
          <label htmlFor="venue">Venue:</label>
          <input type="text" id="venue" name="venue" required />
          <label htmlFor="lineup">Lineup:</label>
          <textarea id="lineup" name="lineup" rows="4" required></textarea>
        </>
      )}
      {scrapType === "WISHLIST" && (
        <>
          <label htmlFor="brand">Brand:</label>
          <input type="text" id="brand" name="brand" required />
          <label htmlFor="price">Price:</label>
          <input type="number" id="price" name="price" required />
          <label htmlFor="link">Link:</label>
          <input type="text" id="link" name="link" required />
        </>
      )}
      {(scrapType === "FILM" ||
        scrapType === "BOOK" ||
        scrapType === "ALBUM") && (
        <>
          <label htmlFor="rating">Rating:</label>
          <input type="number" id="rating" name="rating" required />
        </>
      )}
      {scrapType === "FILM" && (
        <>
          <label htmlFor="director">Director:</label>
          <input type="text" id="director" name="director" required />
        </>
      )}
      {scrapType === "BOOK" && (
        <>
          <label htmlFor="author">Author:</label>
          <input type="text" id="author" name="author" required />
        </>
      )}
      {scrapType === "ALBUM" && (
        <>
          <label htmlFor="artist">Artist:</label>
          <input type="text" id="artist" name="artist" required />
        </>
      )}
      {scrapType === "RECIPE" && (
        <>
          <label htmlFor="cookingTime">Cooking time:</label>
          <input type="number" id="cookingTime" name="cookingTime" required />
          <label htmlFor="ingredients">Ingredients:</label>
          <textarea
            id="ingredients"
            name="ingredients"
            rows="4"
            required
          ></textarea>
          <label htmlFor="steps">Steps:</label>
          <textarea id="steps" name="steps" rows="4" required></textarea>
        </>
      )}
      {scrapType === "TRIP" && (
        <>
          <label htmlFor="location">Location:</label>
          <input type="text" id="location" name="location" required />
          <label htmlFor="from">Start date:</label>
          <input type="date" id="from" name="from" required />
          <label htmlFor="to">End date:</label>
          <input type="date" id="to" name="to" required />
        </>
      )}
      {(scrapType === "FILM" ||
        scrapType === "BOOK" ||
        scrapType === "ALBUM") && (
        <>
          <label htmlFor="releaseYear">Release year:</label>
          <input type="number" id="releaseYear" name="releaseYear" required />
          <label htmlFor="review">Review:</label>
          <textarea id="review" name="review" rows="4" required></textarea>
        </>
      )}
      <button type="submit">Add {scrapType.toLowerCase()}</button>
    </form>
  );
}
