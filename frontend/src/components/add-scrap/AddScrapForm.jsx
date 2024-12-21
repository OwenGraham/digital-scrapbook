import { useState } from "react";

export default function EventForm({
  scrapType,
  handleCloseOverlay,
  fetchScraps,
}) {
  const [imageFile, setImageFile] = useState(null);
  const [errorMessages, setErrorMessages] = useState({});

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
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            if (response.status === 400) {
              const fieldErrors = {};
              if (errorData.field && errorData.message) {
                fieldErrors[errorData.field] = errorData.message;
              }
              setErrorMessages(fieldErrors);
              throw new Error(
                errorData.message ||
                  "Bad Request: Please check your input data."
              );
            } else {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
          });
        }
      })
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
      {errorMessages.name && (
        <p className="error-message">{errorMessages.name}</p>
      )}
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
      {errorMessages.img && (
        <p className="error-message">{errorMessages.img}</p>
      )}
      {scrapType === "EVENT" && (
        <>
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" name="date" required />
          {errorMessages.date && (
            <p className="error-message">{errorMessages.date}</p>
          )}
          <label htmlFor="venue">Venue:</label>
          <input type="text" id="venue" name="venue" required />
          {errorMessages.venue && (
            <p className="error-message">{errorMessages.venue}</p>
          )}
          <label htmlFor="lineup">Lineup:</label>
          <textarea id="lineup" name="lineup" rows="4" required></textarea>
          {errorMessages.lineup && (
            <p className="error-message">{errorMessages.lineup}</p>
          )}
        </>
      )}
      {scrapType === "WISHLIST" && (
        <>
          <label htmlFor="brand">Brand:</label>
          <input type="text" id="brand" name="brand" required />
          {errorMessages.brand && (
            <p className="error-message">{errorMessages.brand}</p>
          )}
          <label htmlFor="price">Price:</label>
          <input type="number" id="price" name="price" required />
          {errorMessages.price && (
            <p className="error-message">{errorMessages.price}</p>
          )}
          <label htmlFor="link">Link:</label>
          <input type="text" id="link" name="link" required />
          {errorMessages.link && (
            <p className="error-message">{errorMessages.link}</p>
          )}
        </>
      )}
      {(scrapType === "FILM" ||
        scrapType === "BOOK" ||
        scrapType === "ALBUM") && (
        <>
          <label htmlFor="rating">Rating:</label>
          <input type="number" id="rating" name="rating" required />
          {errorMessages.rating && (
            <p className="error-message">{errorMessages.rating}</p>
          )}
        </>
      )}
      {scrapType === "FILM" && (
        <>
          <label htmlFor="director">Director:</label>
          <input type="text" id="director" name="director" required />
          {errorMessages.director && (
            <p className="error-message">{errorMessages.director}</p>
          )}
        </>
      )}
      {scrapType === "BOOK" && (
        <>
          <label htmlFor="author">Author:</label>
          <input type="text" id="author" name="author" required />
          {errorMessages.author && (
            <p className="error-message">{errorMessages.author}</p>
          )}
        </>
      )}
      {scrapType === "ALBUM" && (
        <>
          <label htmlFor="artist">Artist:</label>
          <input type="text" id="artist" name="artist" required />
          {errorMessages.artist && (
            <p className="error-message">{errorMessages.artist}</p>
          )}
        </>
      )}
      {scrapType === "RECIPE" && (
        <>
          <label htmlFor="cookingTime">Cooking time:</label>
          <input type="number" id="cookingTime" name="cookingTime" required />
          {errorMessages.cookingTime && (
            <p className="error-message">{errorMessages.cookingTime}</p>
          )}
          <label htmlFor="ingredients">Ingredients:</label>
          <textarea
            id="ingredients"
            name="ingredients"
            rows="4"
            required
          ></textarea>
          {errorMessages.ingredients && (
            <p className="error-message">{errorMessages.ingredients}</p>
          )}
          <label htmlFor="steps">Steps:</label>
          <textarea id="steps" name="steps" rows="4" required></textarea>
          {errorMessages.steps && (
            <p className="error-message">{errorMessages.steps}</p>
          )}
        </>
      )}
      {scrapType === "TRIP" && (
        <>
          <label htmlFor="location">Location:</label>
          <input type="text" id="location" name="location" required />
          {errorMessages.location && (
            <p className="error-message">{errorMessages.location}</p>
          )}
          <label htmlFor="from">Start date:</label>
          <input type="date" id="from" name="from" required />
          {errorMessages.from && (
            <p className="error-message">{errorMessages.from}</p>
          )}
          <label htmlFor="to">End date:</label>
          <input type="date" id="to" name="to" required />
          {errorMessages.to && (
            <p className="error-message">{errorMessages.to}</p>
          )}
        </>
      )}
      {(scrapType === "FILM" ||
        scrapType === "BOOK" ||
        scrapType === "ALBUM") && (
        <>
          <label htmlFor="releaseYear">Release year:</label>
          <input type="number" id="releaseYear" name="releaseYear" required />
          {errorMessages.releaseYear && (
            <p className="error-message">{errorMessages.releaseYear}</p>
          )}
          <label htmlFor="review">Review:</label>
          <textarea id="review" name="review" rows="4" required></textarea>
          {errorMessages.review && (
            <p className="error-message">{errorMessages.review}</p>
          )}
        </>
      )}
      <button type="submit">Add {scrapType.toLowerCase()}</button>
    </form>
  );
}
