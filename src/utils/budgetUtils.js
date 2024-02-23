const randomHashIdfunction = (date) => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + date.getTime().toString(36);
}

export const getPaydays = (incomes, selectedMonth) => {
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
        paydays.push(
          {
            id: randomHashIdfunction(currentDate),
            name: income.title,
            amount: income.amount,
            description: income.description,
            start_date: new Date(currentDate) // Clone the date to avoid mutations
          }
        );
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

export const getExpenseday = (expenses, selectedMonth) => {
  const expensedays = [];

  expenses.forEach((expense) => {
    const [year, month, day] = expense.due_date.split('-').map(Number);
    // Explicitly create a date object using local time
    const startDate = new Date(year, month - 1, day); // months are 0-indexed
    const endDate = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0); // Last day of the selected month

    let currentDate = startDate;

    // Loop through all paydays between the start date and the end date
    while (currentDate <= endDate) {
      if (currentDate.getMonth() === selectedMonth.getMonth()) {
        expensedays.push({
          id: expense.id,
          name: expense.name,
          amount: expense.amount,
          description: expense.description,
          due_date: new Date(currentDate) // Clone the date to avoid mutations
        });
        //add object to selectedDayExpenses

      }

      // Move to the next payday based on frequency
      switch (expense.frequency.toLowerCase()) {
        case "weekly":
          currentDate.setDate(currentDate.getDate() + 7);
          break;
        case "bi-weekly":
          currentDate.setDate(currentDate.getDate() + 14);
          break;
        case "monthly":
          currentDate.setMonth(currentDate.getMonth() + 1);
          break;
        default:
          throw new Error(`Unsupported frequency: ${expense.frequency}`);
      }
    }
  });
  return expensedays;
};
