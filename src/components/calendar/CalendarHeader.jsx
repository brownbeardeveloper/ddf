import { swedishMonths } from '../../data/se-version';

const CalendarHeader = ({ month, year, onPrevMonth, onNextMonth }) => (
  <div className="calendar-upper flex justify-between items-center mb-4">
    <div className="calendar-month-text">
      <h1 className="text-2xl font-bold">{swedishMonths[month]}, {year}</h1>
    </div>

    <div className="calendar-change-date flex">
      <div className="cursor-pointer text-xl mr-4" onClick={onPrevMonth}>&lt;</div>
      <div className="cursor-pointer text-xl" onClick={onNextMonth}>&gt;</div>
    </div>
  </div>
);

export default CalendarHeader;
