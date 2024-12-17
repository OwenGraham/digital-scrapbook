export default function RecipeForm() {
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      type: "RECIPE",
      name: event.target.name.value,
      img: event.target.img.value,
      ingredients: event.target.ingredients.value
        .split(",")
        .map((ingredient) => ingredient.trim()),
      steps: event.target.steps.value
        .split("\n")
        .map((instruction) => instruction.trim()),
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
      <label htmlFor="ingredients">Ingredients:</label>
      <textarea
        id="ingredients"
        name="ingredients"
        rows="4"
        required
      ></textarea>
      <label htmlFor="steps">Steps:</label>
      <textarea id="steps" name="steps" rows="4" required></textarea>
      <button type="submit">Add recipe</button>
    </form>
  );
}
