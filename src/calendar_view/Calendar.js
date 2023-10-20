import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './hooks/AuthContext';
import { getBudget, initialBudget } from './hooks/BudgetController';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const { token } = useContext(AuthContext);
  const [budget, setBudget] = useState(initialBudget);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const budgetData = await getBudget(token);
        setBudget(budgetData);
      } catch (error) {
        console.error('Error fetching budget data', error);
      }
    };

    fetchData();
  }, [token]);

  const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  /*
    getPaydays function
    - Takes in an array of incomes and a selected month
    - Returns an array of paydays for the selected month
  */

    const getPaydays = (incomes, selectedMonth) => {
      const paydays = [];
    
      incomes.forEach((income) => {
        const [year, month, day] = income.start_date.split('-').map(Number);
        // Explicitly create a date object using local time
        const startDate = new Date(year, month - 1, day); // months are 0-indexed
        const endDate = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0); // Last day of the selected month
    
        let currentDate = startDate;
    
        // Loop through all paydays between the start date and the end date
        while (currentDate <= endDate) {
          if (currentDate.getMonth() === selectedMonth.getMonth()) {
            paydays.push(new Date(currentDate)); // Clone the date to avoid mutations
          }
    
          // Move to the next payday based on frequency
          switch (income.frequency) {
            case "Weekly":
              currentDate.setDate(currentDate.getDate() + 7);
              break;
            case "Bi-Weekly":
              currentDate.setDate(currentDate.getDate() + 14);
              break;
            case "Monthly":
              currentDate.setMonth(currentDate.getMonth() + 1);
              break;
            default:
              throw new Error(`Unsupported frequency: ${income.frequency}`);
          }
        }
      });
    
      return paydays;
    };
    
  

  const markCalendar = (day, currentDate) => {
    const incomes = budget['incomes'] || [];
    const paydayDates = getPaydays(incomes, currentDate);

    // some() returns true if at least one element in the array satisfies the condition
    const isPayday = paydayDates.some((payday) =>
      payday.getDate() === day &&
      payday.getMonth() === currentDate.getMonth() &&
      payday.getFullYear() === currentDate.getFullYear()
    );

    const dayClassName = isPayday ? 'text-lime-500' : 'text-black';

    const today = new Date();
    const isToday = today.getDate() === day &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear();

    return (
      <div 
        key={day} 
        className={`text-center rounded-full border-4 ${isToday ? 'border-lime-500' : 'border-lime-900'} hover:bg-lime-300 hover:cursor-pointer hover:border-lime-300 ${dayClassName}`}
        onClick={() => setSelectedDate(day)}
      >
        <span className={'text-center text-xl'}>{day}</span>
      </div>
    );
  };

  const handlePrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  return (
    <div className="flex w-1/2 h-full p-5 flex-row mx-auto border-2 border-black">
      <div className="w-full h-full p-5 bg-lime-900 shadow-lg rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <button
            className="text-lime-100 font-bold hover:text-gray-700"
            onClick={handlePrevMonth}
          >
            &lt;
          </button>
          <h2 className="text-lg font-semibold">
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h2>
          <button
            className="text-lime-100 font-bold hover:text-gray-700"
            onClick={handleNextMonth}
          >
            &gt;
          </button>
        </div>
        <div className="grid grid-cols-7 gap-3 p-5 rounded-lg">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => 
            <div key={day} className="text-center text-lime-100"><b>{day}</b></div>
          )}
          {Array.from({ length: daysInMonth(currentDate) }).map((_, index) =>
            markCalendar(index + 1, currentDate)
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
