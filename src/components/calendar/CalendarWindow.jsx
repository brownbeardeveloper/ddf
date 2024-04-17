import React from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarDateCell from './CalendarDateCell';
import { swedishWeekdaysChar } from '../../data/se-version';

const CalendarWindow = ({ currentDate, handlePrevMonth, handleNextMonth, generateDate, selectDate, setSelectDate }) => (
  <div className="">
    <div className="p-5 border rounded-lg border-gray-400">

      <CalendarHeader
        month={currentDate.month()}
        year={currentDate.year()}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />

      <div className="grid grid-cols-7 text-center">
        {swedishWeekdaysChar.map((day, index) => (
          <div key={index} className="w-10 h-10 text-lg font-semibold text-gray-800">{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {generateDate().map((dateObj, index) => (

          <CalendarDateCell
            key={index}
            date={dateObj.date}
            isCurrentMonth={dateObj.currentMonth}
            isToday={dateObj.today}
            highlight={dateObj.highlight}
            selectDate={selectDate}
            onClick={() => setSelectDate(dateObj.date)}
          />
          
        ))}
      </div>
    </div>
  </div>
);

export default CalendarWindow;
