export default function Wishlist({ name, brand, price, link, img }) {
  return (
    <section className="scrap">
      <img src={img} alt="wishlist item" />
      <h2>{name}</h2>
      <p>{brand}</p>
      <p>{price}</p>
      <div>
        <a href={link}>Link to store</a>
      </div>
    </section>
  );
}
