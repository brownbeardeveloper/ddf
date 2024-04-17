export default function CalendarDateCell({ date, isCurrentMonth, isToday, highlight, selectDate, onClick }) {
    let classNames = "w-10 h-10 m-1 flex items-center justify-center rounded-full cursor-pointer border ";

    switch (true) {
        case date.toISOString() === selectDate.toISOString():
            classNames += "bg-sky-500 border-sky-700 text-white";
            break;
        case isToday:
            classNames += "bg-green-500 border-green-700 text-white";
            break;
        case isCurrentMonth && highlight:
            classNames += "bg-blue-500 border-blue-700 text-white";
            break;
        case isCurrentMonth:
            classNames += " bg-gray-200 border-gray-300";
            break;
        default:
            classNames += "bg-gray-100 text-gray-400 border-gray-300";
    }

    return (
        <div className={classNames} onClick={onClick}>
            {date.format("D")}
        </div>
    );
}
