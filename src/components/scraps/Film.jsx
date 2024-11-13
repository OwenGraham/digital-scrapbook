export default function Film({
  img,
  rating,
  name,
  director,
  releaseYear,
  review,
}) {
  return (
    <section className="scrap">
      <img src={img} alt="Cover for film" />
      <h1>{rating}/5 Stars</h1>
      <h2>{name}</h2>
      <p>{director}</p>
      <p>{releaseYear}</p>
      <div>
        <p>{review}</p>
      </div>
    </section>
  );
}
