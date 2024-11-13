export default function Album({
  img,
  rating,
  name,
  artist,
  releaseYear,
  review,
}) {
  return (
    <section className="scrap">
      <img src={img} alt="Cover for album" />
      <h1>{rating} /5 Stars</h1>
      <h2>{name}</h2>
      <p>{artist}</p>
      <p>{releaseYear}</p>
      <div>
        <p>{review}</p>
      </div>
    </section>
  );
}
