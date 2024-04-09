import { swedishMonths } from '../../data/se-version';

const CalendarHeader = ({ month, year, onPrevMonth, onNextMonth }) => (
    <div className="calendar-upper">
        <div className="calendar-month-text">
            <h1>{swedishMonths[month]}, {year}</h1>
        </div>

        <div className="calendar-change-date">
            <div onClick={onPrevMonth}>&lt;</div>
            <div onClick={onNextMonth}>&gt;</div>
        </div>
    </div>
);

export default CalendarHeader;
