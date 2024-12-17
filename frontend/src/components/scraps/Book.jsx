import StarRating from "../utils/StarRating";

export default function Book({
  img,
  rating,
  name,
  author,
  releaseYear,
  review,
}) {
  return (
    <section className="scrap">
      <img src={img} alt="Cover for book" />
      <StarRating rating={rating} />
      <h2>{name}</h2>
      <p>{author}</p>
      <p>{releaseYear}</p>
      <div>
        <p className="review">{review}</p>
      </div>
    </section>
  );
}
