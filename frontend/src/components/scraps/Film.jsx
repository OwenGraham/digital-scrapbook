import StarRating from "../utils/StarRating";

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
      <StarRating rating={rating} />
      <h2 data-testid="name">{name}</h2>
      <p data-testid="director">{director}</p>
      <p data-testid="release-year">{releaseYear}</p>
      <div>
        <p className="review">{review}</p>
      </div>
    </section>
  );
}
