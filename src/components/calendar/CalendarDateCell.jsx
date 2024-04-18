export default function CalendarDateCell({ date, isCurrentMonth, isToday, highlight, selectDate, onClick }) {
    let classNames = "w-10 h-10 m-1 flex items-center justify-center rounded-full cursor-pointer border transition duration-150 ease-out ";

    switch (true) {
        case date.toISOString() === selectDate.toISOString():
            classNames += "bg-sky-500 hover:bg-sky-600 border-sky-700 text-white";
            break;
        case isToday:
            classNames += "bg-green-500 hover:bg-green-600 border-green-700 text-white";
            break;
        case isCurrentMonth && highlight:
            classNames += "bg-blue-500 hover:bg-blue-600 border-blue-700 text-white";
            break;
        case isCurrentMonth:
            classNames += " bg-gray-200 hover:bg-gray-300 border-gray-300";
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
