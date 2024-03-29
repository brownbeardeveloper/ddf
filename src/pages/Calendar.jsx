import React, { useEffect, useState } from "react";
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../database/firebase-config'
import { HashLoader } from 'react-spinners';
import dayjs from "dayjs"
import '../styles/Calendar.css';

export default function Calendar() {
    const today = dayjs();
    const [loading, setLoading] = useState(true)
    const [currentDate, setCurrentDate] = useState(today);
    const [selectDate, setSelectDate] = useState(today);
    const [highlightDates, setHighlightDates] = useState([]); 
    const postsCollectionRef = collection(db, "events");


    useEffect(() => {
        const getEventList = async () => {
            const data = await getDocs(postsCollectionRef);
            const eventData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            updateHighlightDates(eventData);
            setLoading(false)
        }

        getEventList();
    }, []);

    const updateHighlightDates = (events) => {
        const highlighted = events.map(event => ({
            organization: event.user.organization,
            date: dayjs(event.date, 'YYYY-MM-DD').toDate(),
            title: event.title,
            text: event.description
        }));
        const sortedHighlighted = highlighted.sort((a, b) => a.date - b.date);
        setHighlightDates(sortedHighlighted);
    };

    const sortedHighlightDates = [...highlightDates].sort((a, b) => a.date - b.date);

    // Swedish weekdays' abbreviations, full names, and months' names    
    const swedishWeekdaysChar = ["M", "T", "O", "T", "F", "L", "S"];
    const swedishWeekdays = ["måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag", "söndag"];
    const swedishMonths = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"]
    
    function getOrdinalSuffix(day) {
        if (day === 1 || day === 21 || day === 31) {
            return day + "a";
        } else if (day === 2 || day === 22) {
            return day + "a";
        } else if (day === 3 || day === 23) {
            return day + "e";
        } else {
            return day + "e";
        }
    }

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
    )
    
    const CalendarDateCell = ({ date, isCurrentMonth, isToday, highlight }) => (

        <div className={`calendar-date-cell 
        ${isCurrentMonth ? 'current-month' : 'other-month'} 
        ${isToday ? 'current-date' : ''} 
        ${selectDate.toDate().toDateString() === date.toDate().toDateString() ? 'selected-date' : ''}
        ${highlight ? 'highlighted' : ''}
        `}
        
        onClick={() => setSelectDate(date)} >

            {date.format("D")}

        </div>
    )

    const handlePrevMonth = () => {
        setCurrentDate(currentDate.subtract(1, 'month'))
    }

    const handleNextMonth = () => {
        setCurrentDate(currentDate.add(1, 'month'))
    }

    const generateDate = () => {
        const firstDateOfMonth = currentDate.startOf('month');
        const startDayOfWeek = firstDateOfMonth.day();
        const arrayOfDate = [];
    
        const startDate = firstDateOfMonth.subtract(startDayOfWeek === 0 ? 6 : startDayOfWeek - 1, 'day');
    
        for (let i = 0; i < 42; i++) {
            const currentDate = startDate.add(i, 'day');
            const highlightedDate = highlightDates.find(dateObj => dateObj.date.toDateString() === currentDate.toDate().toDateString());
            const isHighlighted = Boolean(highlightedDate);
    
            arrayOfDate.push({
                date: currentDate,
                currentMonth: currentDate.month() === firstDateOfMonth.month(),
                today: currentDate.isSame(dayjs(), 'day'),
                highlight: isHighlighted,
                highlightOrganization : isHighlighted ? highlightedDate.organization : null,
                highlightTitle: isHighlighted ? highlightedDate.title : null,
                highlightText: isHighlighted ? highlightedDate.text : null
            });
        }
    
        return arrayOfDate;
    };

    return (
        <div className="calendar-page">

        {loading ? (
            <div className="loader-container">
                <HashLoader color="#d69d36" loading size={75} />
            </div>
          

            ) : (
            <>
            <div className="calendar-window">
                <div className="calendar">
                    <CalendarHeader
                        month={currentDate.month()}
                        year={currentDate.year()}
                        onPrevMonth={handlePrevMonth}
                        onNextMonth={handleNextMonth}
                    />

                    <div className="calendar-weekdays-text">
                        {swedishWeekdaysChar.map((day, index) => (
                            <div key={index}>{day}</div>
                        ))}
                    </div>

                    <div className="calendar-date">
                        {generateDate().map((dateObj, index) => (
                            <CalendarDateCell
                                key={index}
                                date={dateObj.date}
                                isCurrentMonth={dateObj.currentMonth}
                                isToday={dateObj.today}
                                highlight={dateObj.highlight}
                            />
                        ))}
                    </div>
                </div>

                <div className="today-schedule">
                <h1>Dagens händelser för {`${swedishWeekdays[dayjs(selectDate.toDate().getDay() + 6) % 7]} den 
                    ${getOrdinalSuffix(dayjs(selectDate.toDate()).date())}
                    ${swedishMonths[dayjs(selectDate.toDate()).month()].toLowerCase()}`}
                </h1>

                    {generateDate().some(dateObj => dateObj.date.isSame(selectDate, 'day') && dateObj.highlight) ? (
                        generateDate().map(dateObj => {
                            if (dateObj.date.isSame(selectDate, 'day') && dateObj.highlight) {
                                return (
                                    <div key={dateObj.date.toDate().toDateString()}>
                                        <h3>{dateObj.highlightOrganization} - {dateObj.highlightTitle}</h3>
                                        <p>{dateObj.highlightText}</p>
                                    </div>
                                );
                            }
                            return null;
                        })
                    ) : (
                        <p className="no-schedule">Inga aktiviteter för idag.</p>
                    )}
                </div>
            </div>

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
            </>
            )}
        </div>
    )
}    