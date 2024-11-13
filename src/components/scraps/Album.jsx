import StarRating from "../utils/StarRating";

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
      <StarRating rating={rating} />
      <h2>{name}</h2>
      <p>{artist}</p>
      <p>{releaseYear}</p>
      <div>
        <p>{review}</p>
      </div>
    </section>
  );
}
