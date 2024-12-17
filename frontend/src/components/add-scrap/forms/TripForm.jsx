export default function TripForm() {
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      type: "TRIP",
      location: event.target.location.value,
      img: event.target.img.value,
      from: event.target.from.value,
      to: event.target.to.value,
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
      <label htmlFor="location">Location:</label>
      <input type="text" id="location" name="location" required />
      <label htmlFor="img">Image URL:</label>
      <input type="text" id="img" name="img" required />
      <label htmlFor="from">Start date:</label>
      <input type="date" id="from" name="from" required />
      <label htmlFor="to">End date:</label>
      <input type="date" id="to" name="to" required />
      <button type="submit">Add trip</button>
    </form>
  );
}
