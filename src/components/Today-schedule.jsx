import React from 'react';
import dayjs from 'dayjs';
import { swedishMonths, swedishWeekdays } from '../data/se-version.js';
import { getOrdinalSuffix } from '../functions/getOrdinalSuffix.js';

export default function TodaySchedule({ selectDate, generateDate }) {

    return (
        <div className="bg-gray-100 p-4 rounded-md border border-slate-400">
            <h1 className="text-xl font-bold mb-4">
                Dagens händelser för {`${swedishWeekdays[dayjs(selectDate.toDate().getDay() + 6) % 7]} den 
            ${getOrdinalSuffix(dayjs(selectDate.toDate()).date())}
            ${swedishMonths[dayjs(selectDate.toDate()).month()].toLowerCase()}`}
            </h1>

            {generateDate().some(dateObj => dateObj.date.isSame(selectDate, 'day') && dateObj.highlight) ? (
                generateDate().map(dateObj => {
                    if (dateObj.date.isSame(selectDate, 'day') && dateObj.highlight) {
                        return (
                            <div key={dateObj.date.toDate().toDateString()} className="mb-4">
                                <h3 className="font-semibold">{dateObj.highlightOrganization} - {dateObj.highlightTitle}</h3>
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
    )
}