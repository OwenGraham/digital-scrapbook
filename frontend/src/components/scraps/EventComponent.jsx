import Countdown from "../utils/Countdown";

export default function EventComponent({ img, name, date, venue, lineup }) {
  return (
    <section className="scrap">
      <img src={img} alt="Event promo e.g. from insta" />
      <h2>{name}</h2>
      <p>{date}</p>
      <p>{venue}</p>
      <Countdown targetDate={date} />
      <div>
        <h3>Lineup</h3>
        <ul>
          {lineup.map((artist, index) => (
            <li key={index}>{artist}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
