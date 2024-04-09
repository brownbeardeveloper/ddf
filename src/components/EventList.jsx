import dayjs from "dayjs";
import { swedishMonths } from "../data/se-version";

const EventList = ({ sortedHighlightDates, currentDate }) => (
    <div className="event-list">
        <h2>Evenemang för {swedishMonths[currentDate.month()]}</h2>
        <ul>
            {sortedHighlightDates.map((event, index) => {
                const eventDate = dayjs(event.date);
                return (
                    eventDate.month() === currentDate.month() && eventDate.year() === currentDate.year() &&
                    (
                        <li key={index}>
                            <h3>{event.organization} - {event.title}</h3>
                            <p>{swedishMonths[eventDate.month()]} {eventDate.format("D, YYYY")} - {event.text}</p>
                        </li>
                    )
                );
            })}
        </ul>
    </div>
);

export default EventList;
