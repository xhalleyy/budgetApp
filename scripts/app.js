// import { newExpense } from "./elements.js";
import { getBudget, getExpenses, saveExpenses, removeExpenses } from "./localstorage.js";

let budgetInput = document.getElementById('budgetInput');
let submitBtn = document.getElementById('submitBtn');
let name = document.getElementById('name');
let price = document.getElementById('price');
let addBtn = document.getElementById('addBtn');
let spendingsLeft = document.getElementById('spendingsLeft');
let budgetValue = document.getElementById('budgetValue');
let addedExpense = document.getElementById('addedExpense');
let modal = document.getElementById('popup-modal');

let remainder = 0;

const newExpense = (bill) => {
    let div = document.createElement('div');
    div.className = 'flex justify-between items-center text-center px-3 border-b-2 border-black/10 py-1.5';

    let h1 = document.createElement('h1');
    h1.className = 'font-quick-med ps-3 pe-2';
    h1.textContent = bill.ExpenseName;

    let p = document.createElement('p');
    p.className = 'items-center flex';
    p.textContent = bill.Amount;

    let span = document.createElement('span');
    span.className = 'material-symbols-outlined ps-2';
    span.textContent = 'do_not_disturb_on';
    span.id = 'removeBtn';

    p.append(span);
    div.append(h1, p);
    addedExpense.append(div);

    span.addEventListener('click', () => {
        let budget = getBudget();
        let expenses = getExpenses();

        // gets rid of the object in the expenses array
        // need to update spendings left
        removeExpenses(bill);
        remainder += parseInt(bill.Amount);
        console.log(remainder)
        spendingsLeft.textContent = remainder;

        div.remove();
    })
}

const onLoad = () => {
    let spendings = 0;
    let budget = getBudget();
    let expenses = getExpenses();
    expenses.forEach((purchase) => {
        newExpense(purchase);
        spendings += parseInt(purchase.Amount);
        console.log(spendings)
    })

    remainder = parseInt(budget - spendings);
    budgetValue.textContent = budget;
    spendingsLeft.textContent = remainder;
}

onLoad();

submitBtn.addEventListener('click', () => {
    // console.log(budgetInput);
    if (budgetInput.value == '') {
        modal.classList.remove('hidden');
    } else {
        budgetValue.textContent = '';

        localStorage.setItem("budget", JSON.stringify(budgetInput.value));
        localStorage.removeItem("expenses");
        budgetValue.textContent = budgetInput.value;
        remainder = getBudget();
        spendingsLeft.textContent = remainder;
        addedExpense.remove();
    }


});

addBtn.addEventListener('click', () => {
    // my inputs and button is inside a form, which default is to refresh the page. 
    // event.preventDefault();
    let budget = getBudget();
    let spendings = 0;

    if(name.value !== '' && price.value !== ''){
        if (budget) {
            let purchase = {
                ExpenseName: name.value,
                Amount: price.value
            }
    
            saveExpenses(purchase);
            let expenses = getExpenses();
    
            expenses.forEach((purchase) => {
                spendings += parseInt(purchase.Amount);
            })
    
            newExpense(purchase);
            remainder = parseInt(budget - spendings);
            spendingsLeft.textContent = remainder;
        } else {
            modal.classList.remove('hidden');
        }
    }


});

