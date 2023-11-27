import React, { useEffect, useState } from "react";
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../database/firebase-config'
import dayjs from "dayjs"
import '../styles/Calendar.css';

export default function Calendar() {
    const today = dayjs();
    const [currentDate, setCurrentDate] = useState(today);
    const [selectDate, setSelectDate] = useState(today);
    const [eventList, setEventList] = useState([]);
    const [highlightDates, setHighlightDates] = useState([]); 

    const postsCollectionRef = collection(db, "posts");

    useEffect(() => {
        const getEventList = async () => {
            const data = await getDocs(postsCollectionRef);
            const eventData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setEventList(eventData);
            updateHighlightDates(eventData);
        }

        getEventList();
    }, []);

    const updateHighlightDates = (events) => {
        const highlighted = events.map(event => ({
            date: dayjs(event.eventDate, 'YYYY-MM-DD').toDate(),
            title: event.eventTitle,
            text: event.eventDescription
        }));
        const sortedHighlighted = highlighted.sort((a, b) => a.date - b.date);
        setHighlightDates(sortedHighlighted);
    };

    const sortedHighlightDates = [...highlightDates].sort((a, b) => a.date - b.date);

    const days = ["M", "T", "W", "T", "F", "S", "S"];
    const months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"]
    
    const CalendarHeader = ({ month, year, onPrevMonth, onNextMonth }) => (
        <div className="calendar-upper">
            <div className="calendar-month-text">
                <h1>{months[month]}, {year}</h1>
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
                highlightTitle: isHighlighted ? highlightedDate.title : null,
                highlightText: isHighlighted ? highlightedDate.text : null
            });
        }
    
        return arrayOfDate;
    };

    return (
        <div className="calendar-page">
            <div className="calendar-window">
                <div className="calendar">
                    <CalendarHeader
                        month={currentDate.month()}
                        year={currentDate.year()}
                        onPrevMonth={handlePrevMonth}
                        onNextMonth={handleNextMonth}
                    />

                    <div className="calendar-weekdays-text">
                        {days.map((day, index) => (
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
                    <h1>Schedule for {selectDate.toDate().toDateString()}</h1>
                    {generateDate().some(dateObj => dateObj.date.toDate().toDateString() === selectDate.toDate().toDateString() && dateObj.highlight) ? (
                        generateDate().map(dateObj => {
                            if (dateObj.date.toDate().toDateString() === selectDate.toDate().toDateString() && dateObj.highlight) {
                                return (
                                    <div key={dateObj.date.toDate().toDateString()}>
                                        <h3>{dateObj.highlightTitle}</h3>
                                        <p>{dateObj.highlightText}</p>
                                    </div>
                                );
                            }
                            return null;
                        })
                    ) : (
                        <p className="no-schedule">No meetings for now.</p>
                    )}
                </div>
            </div>

            <div className="event-list">
                <h2>Events for {months[currentDate.month()]}</h2>
                <ul>
                    {sortedHighlightDates.map((event, index) => {
                        const eventDate = dayjs(event.date);
                        return (
                            eventDate.month() === currentDate.month() && eventDate.year() === currentDate.year() &&
                             (
                                <li key={index}>
                                    <h3>{event.title}</h3>
                                    <p>{eventDate.format("MMMM D, YYYY")} - {event.text}</p>
                                </li>
                            )
                        );
                    })}
                </ul>
            </div>
        </div>
    )
}    