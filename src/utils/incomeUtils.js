export const calculateIncome = (accountAmounts, setTotalIncome) => {
    let income = 0;
    accountAmounts.forEach((account) => {
      income += account.balance;
    });
    setTotalIncome(income);
    return income;  };
  
export const updateTotalIncome = (income, accountAmounts, setTotalIncome) => {
    let updatedTotalincome = 0.00;
    accountAmounts.forEach((account) => {
      if (account.id === income.id) {
        updatedTotalincome += income.balance;
      } else {
        updatedTotalincome += account.balance;
      }
    });
    setTotalIncome(updatedTotalincome);
    return updatedTotalincome;  };
  