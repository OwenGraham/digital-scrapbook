export default function Book({
  img,
  rating,
  name,
  author,
  releaseYear,
  isbn,
  review,
}) {
  return (
    <section className="scrap">
      <img src={img} alt="Cover for book" />
      <h1>{rating} /5 Stars</h1>
      <h2>{name}</h2>
      <p>{author}</p>
      <p>{releaseYear}</p>
      <p>{isbn}</p>
      <div>
        <p>{review}</p>
      </div>
    </section>
  );
}
