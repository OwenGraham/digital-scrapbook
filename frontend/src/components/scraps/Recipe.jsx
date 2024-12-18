export default function Recipe({ img, name, cookingTime, ingredients, steps }) {
  return (
    <section className="scrap">
      <img src={img} alt="Finished recipe" />
      <h2>{name}</h2>
      <p>Cooking time = {cookingTime} mins</p>
      <div>
        <h3>Ingredients</h3>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h3>Recipe</h3>
        <ul>
          {steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
