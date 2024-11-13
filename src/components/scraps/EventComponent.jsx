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
        <p>{lineup}</p>
      </div>
    </section>
  );
}
