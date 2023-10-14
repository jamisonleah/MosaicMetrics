import React, { useState, useEffect } from 'react';

function IncomeController() {
    const [income, setIncome] = useState(null);

    useEffect(() => {
        fetch('/api/income')
            .then(response => response.json())
            .then(data => setIncome(data.income))
            .catch(error => console.error(error));
    }, []);

    //create a function that will put the income data into an array of objects with the Title, Start Date, End Date, Frequency and Amount
    // this creates what we'll call a sub-object of the MoneyFlow object that will be used to help create the calendar view
    function incomeData () {
        const incomeArray = [];
        income.forEach(item => {
            const incomeObject = {
                title: item.title,
                start_date: item.start_date,
                end_date: item.end_date,
                frequency: item.frequency,
                amount: item.amount
            }
            incomeArray.push(incomeObject);
        });
        return incomeArray;
    }
}

export default IncomeController;
