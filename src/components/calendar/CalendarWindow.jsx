import React from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarDateCell from './CalendarDateCell';
import { swedishWeekdaysChar } from '../../data/se-version';

const CalendarWindow = ({ currentDate, handlePrevMonth, handleNextMonth, generateDate, setSelectDate }) => (
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
                        onClick={() => setSelectDate(dateObj.date)}
                    />
                    
                ))}
            </div>
        </div>
    </div>
);

export default CalendarWindow;
