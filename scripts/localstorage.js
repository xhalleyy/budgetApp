const getBudget = () => {
    let budgetData = localStorage.getItem("budget");
    if (budgetData === null) {
        return null;  // or any other default value
    }
    console.log(budgetData);

    return JSON.parse(budgetData);
}

const saveExpenses = (expense) => {
    let expenses = getExpenses();
    console.log(expenses);
    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

const getExpenses = () => {
    let expenseData = localStorage.getItem("expenses");
    if(expenseData == null){
        return [];
    }

    return JSON.parse(expenseData);
}

const removeExpenses = (expense) => {
    let expenses = getExpenses();
    let index = expenses.indexOf(expense);
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

export {getBudget, saveExpenses, getExpenses, removeExpenses}