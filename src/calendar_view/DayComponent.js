import React from 'react';

/*
    * This component is responsible for rendering a single day in the calendar.
    * It takes in the following props:
    *  - day: the day of the month to render
    * - today: boolean value indicating if the day is today
    * - sameMonth: boolean value indicating if the day is in the same month as today
    * - sameYear: boolean value indicating if the day is in the same year as today
    * - setSelectedDate: function to call when the day is clicked
    * 
    * functionality 
    * - if the day is today, and in the same month and year as today, render the day in green
    * - if the day is not today, render the day in white
*/
function DayComponent(props) {
    const day = props.day;
    const text_color = props.isPayday ? "text-green-500" : "text-black";
    if(props.today && props.sameMonth && props.sameYear) {
    return (
        <div className={`calendar-cell text-center border-4 border-white hover:bg-gray-300 hover:cursor-pointer hover:border-gray-300 rounded-full ${text_color}`} key={day} onClick={() => props.setSelectedDate(day)}>
        <b> {day} </b>
      </div>
    );
    } else 
    return (
        <div className={`calendar-cell text-center border-4 border-white hover:bg-gray-300 hover:cursor-pointer hover:border-gray-300 rounded-full ${text_color}`} key={day} onClick={() => props.setSelectedDate(day)}>
        {day}
      </div>
    );
}

export default DayComponent;
