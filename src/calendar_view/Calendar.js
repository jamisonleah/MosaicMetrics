import React, { useState } from 'react';
import DayComponent from './DayComponent';
import { useContext } from 'react';
import { AuthContext } from './hooks/AuthContext';


const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);


  //create a custome hook to consume the context 
  const useAuth = () => useContext(AuthContext);
  const { isloggedIn } = useAuth();

  const daysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return new Date(year, month, 0).getDate();
  };

  const getMonthData = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month, daysInMonth(date));
    const startDayOfWeek = firstDay.getDay();
    const endDayOfWeek = lastDay.getDay();
    return {
      year,
      month,
      firstDay,
      lastDay,
      startDayOfWeek,
      endDayOfWeek,
    };
  };

  /*
    * This function is responsible for rendering the days of the month in the calendar.
    * It uses the following global variables:
    * - currentDate: the current date
    * - setSelectedDate: function to call when a day is clicked
    * 
  */
  const renderDays = () => {
    const monthData = getMonthData(currentDate);
    const days = [];
    let day = 1;

    // Render blank cells for the days before the start of the month
    for (let i = 0; i < monthData.startDayOfWeek; i++) {
      days.push(<div className="calendar-cell empty-cell" key={`empty-${i}`}></div>);
    }

    //check to see if it's todays date 
    //get todays month and year
    const today = new Date();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();

    //check to see if the month and year are the same as today
    const sameMonth = todayMonth === monthData.month; 
    const sameYear = todayYear === monthData.year;

    // Render the days of the month
    while (day <= daysInMonth(currentDate)) {
        days.push(
          <DayComponent day={day} setSelectedDate={setSelectedDate} key={day} today={currentDate.getDate() === day} sameMonth={sameMonth} sameYear={sameYear} />
        );
      day++;
    }

    // Render blank cells for the days after the end of the month
    for (let i = 0; i < 6 - monthData.endDayOfWeek; i++) {
      days.push(<div className="calendar-cell empty-cell" key={`empty-${i + monthData.endDayOfWeek}`}></div>);
    }

    return days;
  };
  // end of renderDays function

  const handlePrevMonth = () => {
    const prevMonth = new Date(currentDate);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrentDate(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentDate(nextMonth);
  };


  return (
    <div className="flex w-1/2 h-full p-5 flex-row mx-auto border-2 border-black">
      <div className=" w-full h-full p-5 bg-white shadow-lg rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <button
            className="text-zinc-900 hover:text-gray-700"
            onClick={handlePrevMonth}
          >
            &lt;
          </button>
          <h2 className="text-lg font-semibold">
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h2>
          <button
            className="text-zinc-900 hover:text-gray-700"
            onClick={handleNextMonth}
          >
            &gt;
          </button>
        </div>
        <div className="grid grid-cols-7 gap-3 p-5 rounded-lg">
          <div className="text-center text-zinc-700"> <b> Sun </b>  </div>
          <div className="text-center text-zinc-700"> <b> Mon </b>  </div>
          <div className="text-center text-zinc-700"> <b> Tue </b>  </div>
          <div className="text-center text-zinc-700"> <b> Wed </b>  </div>
          <div className="text-center text-zinc-700"> <b> Thu </b>  </div>
          <div className="text-center text-zinc-700"> <b> Fri </b>  </div>
          <div className="text-center text-zinc-700"> <b> Sat </b>  </div>
          {renderDays()}
        </div>
      </div>
      <div className="w-1/4 p-5 bg-white shadow-lg rounded-lg">
        <h2 className="text-lg font-semibold"> Selected Date </h2>
        <div className="text-center text-zinc-700"> {selectedDate} </div>
      </div>
    </div>
  );
};

export default Calendar;
