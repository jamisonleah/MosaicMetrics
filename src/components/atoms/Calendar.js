import React, { useState, useRef, useCallback } from 'react';
import BillForm from './BillForm';
import BillHandler from '../molecules/BillHandler';
import IncomeHandler from './IncomeHandler';
import DailySummary from '../atoms/DailySummary';

const Calendar = () => {

    // Calendar Component State
    const [currentDay, setCurrentDay] = useState(new Date().getDate());
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const [selectedDate, setSelectedDate] = useState(new Date());



    // Bill Component State
    // example 
    const [billList, setBillList] = useState([
        {
            bill: 'Rent',
            date: '2021-05-01',
            amount: '1000',
        },
    ]);

    const [income, setIncome] = useState({
        checkings: '1000',
        paycheck: '2000',
        paycheckDate: '2021-05-01',
        occurence: 7
    })
    const [bankbalance, setBankBalance] = useState();

    const calculateBalance = () => {
        const now = new Date();
        const timeDiff = selectedDate - now;
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        console.log(now, selectedDate, daysDiff);
        const payChecks = Math.floor(daysDiff / parseInt(income.occurence));
        setBankBalance(parseFloat(income.checkings) + (payChecks * parseFloat(income.paycheck)));
    };

    // Income Component State 
    // example 
    // const [incomeList, setIncomeList] = useState([
    //     {
    //         checkings: '1000',
    //         paycheck: '2000',
    //         paycheckDate: '2021-05-01',
    //         occruence: 'weekly',
    //     },
    // ]);



    const storeIncome = useCallback((checkings, paycheck, paycheckDate, occurence) => {
        setIncome({
            checkings: checkings,
            paycheck: paycheck,
            paycheckDate: paycheckDate,
            occurence: occurence,
        })

        calculateBalance();
    }, [])




    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const daysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const firstDayOfMonth = (month, year) => {
        return new Date(year, month, 1).getDay();
    };

    const handleSelect = useCallback((date) => {
        setSelectedDate(new Date(date));
        calculateBalance();
    });

    const handleaddBill = useCallback((bill, date, amount) => {

        setBillList([...billList, {
            bill: bill,
            date: date,
            amount: amount,
        }]);
    }, []);

    const handleremoveBill = useCallback((index) => {
        setBillList(billList.filter((_, i) => i !== index));
    }, []);


    const renderCalendar = useCallback((selectedDate) => {
        let calendar = [];
        let totalDays = daysInMonth(currentMonth, currentYear);
        let firstDay = firstDayOfMonth(currentMonth, currentYear);
        let count = 1;

        for (let i = 0; i < 6; i++) { // 6 week SPACES in a month
            let week = [];
            for (let j = 0; j < 7; j++) { // 7 days in a week
                if (i === 0 && j < firstDay) { // if first week, and day is before first day of month
                    week.push(<td key={`empty-${j}`}></td>); // empty space
                } else if (count > totalDays) { // if count is greater than total days in month
                    break; // break out of loop
                } else { // if day is in month

                    let color = selectedDate.getDate() === count ? "bg-violet-300 rounded-full text-white" : "text-gray-700"
                    const date = new Date(currentYear, currentMonth, count)
                    week.push( // push day to week
                        <td key={count} className="p-2" >
                            <div className={`px-2 py-2 cursor-pointer flex w-full justify-center ${color}`}>
                                <button className="text-md text-gray-700 font-medium" onClick={() => handleSelect(date)}> {count} </button>
                            </div>
                        </td>
                    );
                    count++;
                }
            }

            calendar.push(<tr key={i}>{week}</tr>);

            if (count > totalDays) {
                break;
            }
        }

        return calendar;
    });

    const renderBillList = useCallback((list) => {
        let billListRender = [];
        for (let i = 0; i < list.length; i++) {
            billListRender.push(
                <div key={i}>
                    <h1>{list[i].bill}</h1>
                    <h1>{list[i].date}</h1>
                    <h1>{list[i].amount}</h1>
                    <p> __________________</p>
                </div>
            );
        }
        return <div>{billListRender}</div>;
    }, []);


    return (
        <div className='mx-auto w-3/4'>
            <div className="flex grid-flow-col">
                <div className="border-violet-700 border-2 col-span-2 bg-violet-200 p-3 mr-4 rounded-lg shadow-md w-full">
                    <BillHandler handleaddBill={handleaddBill} handleremoveBill={handleremoveBill} />
                </div>
                <div className="w-full border-2 p-3 bg-white rounded-lg shadow-md ">
                    <h1> Calendar </h1>
                    <div className="flex justify-between mb-2">
                        <button
                            className="bg-indigo-500 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-full mr-2"
                            onClick={() => setCurrentMonth(currentMonth - 1)}
                        >
                            Prev
                        </button>
                        <div className="text-gray-700 font-medium">
                            {months[currentMonth]} {currentYear} {currentDay}
                        </div>
                        <button
                            className="bg-indigo-500 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-full mr-2"
                            onClick={() => setCurrentMonth(currentMonth + 1)}
                        >
                            Next
                        </button>
                    </div>
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="p-2 text-violet-700 font-medium">Sun</th>
                                <th className="p-2 text-violet-700 font-medium">Mon</th>
                                <th className="p-2 text-violet-700 font-medium">Tue</th>
                                <th className="p-2 text-violet-700 font-medium">Wed</th>
                                <th className="p-2 text-violet-700 font-medium">Thu</th>
                                <th className="p-2 text-violet-700 font-medium">Fri</th>
                                <th className="p-2 text-violet-700 font-medium">Sat</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderCalendar(selectedDate)}
                        </tbody>
                    </table>
                    <div className='bg-violet-200 p-10 '>
                        <p> Path </p>
                        <p> { parseFloat(income.checkings) }</p>
                        <p> { selectedDate.toDateString()}</p>
                    </div>

                </div>
                <div className="border-lime-700 border-2 col-span-2 bg-lime-200 p-3 ml-4 rounded-lg shadow-md w-full">
                    {selectedDate.toDateString()}
                    <div className="flex flex-col">
                        <IncomeHandler storeIncome={storeIncome} />
                        {bankbalance}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Calendar;
