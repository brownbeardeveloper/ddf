export default function CalendarDateCell({ date, isCurrentMonth, isToday, highlight, onClick }) {

    return (
        <div className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer
        ${isCurrentMonth ? 'current-month' : 'other-month'} 
        ${isToday ? 'current-date' : ''} 
        ${highlight ? 'highlighted' : ''}`}
            onClick={onClick}>
            {date.format("D")}
        </div>
    )
}
