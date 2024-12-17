export default function WishlistForm() {
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      type: "WISHLIST",
      name: event.target.name.value,
      brand: event.target.brand.value,
      img: event.target.img.value,
      price: event.target.price.value,
      link: event.target.link.value,
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
      <label htmlFor="brand">Brand:</label>
      <input type="text" id="brand" name="brand" required />
      <label htmlFor="img">Image URL:</label>
      <input type="text" id="img" name="img" required />
      <label htmlFor="price">Price:</label>
      <input type="number" id="price" name="price" required />
      <label htmlFor="link">Link:</label>
      <input type="text" id="link" name="link" required />
      <button type="submit">Add wishlist item</button>
    </form>
  );
}
