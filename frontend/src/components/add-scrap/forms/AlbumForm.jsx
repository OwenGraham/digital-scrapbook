export default function FilmForm() {
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      type: "ALBUM",
      name: event.target.name.value,
      img: event.target.img.value,
      rating: event.target.rating.value,
      artist: event.target.artist.value,
      releaseYear: event.target.year.value,
      review: event.target.review.value,
    };

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
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <form className="add-scrap-form" onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" required />
      <label htmlFor="img">Image URL:</label>
      <input type="text" id="img" name="img" required />
      <label htmlFor="rating">Rating:</label>
      <input type="number" name="rating" />
      <label htmlFor="artist">Artist:</label>
      <input type="text" id="artist" name="artist" required />
      <label htmlFor="year">Year:</label>
      <input type="number" id="year" name="year" required />
      <label htmlFor="review">Review:</label>
      <textarea id="review" name="review" rows="4" required></textarea>
      <button type="submit">Add album</button>
    </form>
  );
}
