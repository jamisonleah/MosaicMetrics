// CalendarDisplay.js
import React from 'react';

const CalendarDisplay = ({ currentDate, handlePrevMonth, handleNextMonth, renderCalendar }) => {
  return (
    <div className="flex flex-col w-full h-full p-5 bg-violet-500 shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <button
          className="text-violet-200 font-bold hover:text-violet-400"
          onClick={handlePrevMonth}
        >
          &lt;
        </button>
        <h2 className="text-xl font-semibold text-violet-100">
          {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h2>
        <button
          className="text-violet-200 font-bold hover:text-violet-400"
          onClick={handleNextMonth}
        >
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-3 p-5 rounded-lg">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day =>
          <div key={day} className="text-center text-violet-300 font-semibold">{day}</div>
        )}
        {renderCalendar()}
      </div>
    </div>
  );
};

export default CalendarDisplay;
