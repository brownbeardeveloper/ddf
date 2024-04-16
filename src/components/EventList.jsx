import dayjs from "dayjs";
import { swedishMonths } from "../data/se-version";

const EventList = ({ sortedHighlightDates, currentDate }) => (
  <div className="event-list p-5 border rounded bg-gray-200 shadow-md">
    <h2 className="text-lg font-semibold mb-3 text-gray-700">Evenemang för {swedishMonths[currentDate.month()].toLowerCase()}</h2>
    <ul>
      {sortedHighlightDates.map((event, index) => {
        const eventDate = dayjs(event.date);
        return (
          eventDate.month() === currentDate.month() && eventDate.year() === currentDate.year() &&
          (
            <li key={index} className="mb-4 border rounded bg-white shadow-sm p-4">
              <h3 className="text-lg font-semibold mb-1 text-gray-700">{event.organization} - {event.title}</h3>
              <p className="text-sm text-gray-600">{swedishMonths[eventDate.month()]} {eventDate.format("D, YYYY")} - {event.text}</p>
            </li>
          )
        );
      })}
    </ul>
  </div>
);

export default EventList;
