import React, { useEffect, useState } from "react";
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../backend/firebase-config'
import { HashLoader } from 'react-spinners';
import dayjs from "dayjs"
import { swedishWeekdaysChar } from "../data/se-version";
import TodaySchedule from "../components/Today-schedule";
import CalendarWindow from "../components/calendar/CalendarWindow";
import EventList from "../components/EventList";
import SideIcons from "../components/side-icon";

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
                highlightOrganization: isHighlighted ? highlightedDate.organization : null,
                highlightTitle: isHighlighted ? highlightedDate.title : null,
                highlightText: isHighlighted ? highlightedDate.text : null
            });
        }

        return arrayOfDate;
    };

    return (
        <div className="calendar-page h-screen">

            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <HashLoader color="#0096FF" loading size={75} />
                </div>
            ) : (
                <>
                    <div className="flex flex-row">
                        <SideIcons />
                        <CalendarWindow
                            currentDate={currentDate}
                            handlePrevMonth={handlePrevMonth}
                            handleNextMonth={handleNextMonth}
                            swedishWeekdaysChar={swedishWeekdaysChar}
                            generateDate={generateDate}
                            setSelectDate={setSelectDate}
                        />
                        <TodaySchedule selectDate={selectDate} generateDate={generateDate} />
                    </div>
                    <EventList sortedHighlightDates={sortedHighlightDates} currentDate={currentDate} />
                </>
            )}
        </div>
    )
}    