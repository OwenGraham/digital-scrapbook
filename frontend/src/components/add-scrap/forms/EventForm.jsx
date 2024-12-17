export default function EventForm() {
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      type: "EVENT",
      name: event.target.name.value,
      img: event.target.img.value,
      date: event.target.date.value,
      venue: event.target.venue.value,
      lineup: event.target.lineup.value
        .split(",")
        .map((person) => person.trim()),
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
      <label htmlFor="date">Date:</label>
      <input type="date" id="date" name="date" required />
      <label htmlFor="venue">Venue:</label>
      <input type="text" id="venue" name="venue" required />
      <label htmlFor="lineup">Lineup:</label>
      <textarea id="lineup" name="lineup" rows="4" required></textarea>
      <button type="submit">Add event</button>
    </form>
  );
}
