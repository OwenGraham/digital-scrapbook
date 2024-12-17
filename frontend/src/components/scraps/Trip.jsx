import Countdown from "../utils/Countdown";

export default function Trip({ destination, from, until }) {
  return (
    <section className="scrap">
      <h2>{destination}</h2>
      <p>{from}</p>
      <p>-</p>
      <p>{until}</p>
      <Countdown targetDate={from} />
    </section>
  );
}
