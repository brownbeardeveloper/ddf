const CalendarDateCell = ({ date, isCurrentMonth, isToday, highlight, onClick }) => (
    <div className={`calendar-date-cell 
        ${isCurrentMonth ? 'current-month' : 'other-month'} 
        ${isToday ? 'current-date' : ''} 
        ${highlight ? 'highlighted' : ''}`}
        onClick={onClick}>
        {date.format("D")}
    </div>
);

export default CalendarDateCell;