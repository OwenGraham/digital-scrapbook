export default function Recipe({ img, name, cookingTime, recipe }) {
  return (
    <section className="scrap">
      <img src={img} alt="Finished recipe" />
      <h2>{name}</h2>
      <p>Cooking time = {cookingTime} mins</p>
      <div>
        <p>{recipe}</p>
      </div>
    </section>
  );
}
