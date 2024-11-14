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
      <h2>{name}</h2>
      <p>{director}</p>
      <p>{releaseYear}</p>
      <div>
        <p className="review">{review}</p>
      </div>
    </section>
  );
}
