export default function Recipe({ img, title, cookingTime, recipe }) {
  return (
    <section className="scrap">
      <img src={img} alt="Finished recipe" />
      <h2>{title}</h2>
      <p>Cooking time = {cookingTime} mins</p>
      <div>
        <p>{recipe}</p>
      </div>
    </section>
  );
}
