import Countdown from "../utils/Countdown";

export default function EventComponent({ name, date, venue, lineup }) {
  return (
    <section className="scrap">
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
