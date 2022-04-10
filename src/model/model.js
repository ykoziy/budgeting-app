import Expense from './expense';
import Income from './income';
import ExpenseList from './expenseList';
import IncomeList from './incomeList';

class Model {
  constructor() {
    this.expenses = new ExpenseList();
    this.incomes = new IncomeList();

    //Test data
    //expenses
    const exp1 = new Expense('Water', 65.32);
    const exp2 = new Expense('Gas', 100.45);
    const exp3 = new Expense('Electricity', 235.67);
    const exp4 = new Expense('Internet', 76.98);
    const exp5 = new Expense('Fun', 200.56);

    this.expenses.add(exp1, 'Utilities');
    this.expenses.add(exp2, 'Utilities');
    this.expenses.add(exp3, 'Utilities');
    this.expenses.add(exp4, 'Utilities');
    this.expenses.add(exp5);

    //income
    const inc1 = new Income('Full-time job', 2917);
    this.incomes.add(inc1);
  }

  setBudgetListChanged(callback) {
    this.onBudgetListChanged = callback;
  }

  addIncome(description, amount) {
    const income = new Income(description, amount);
    this.incomes.add(income);

    this.onBudgetListChanged();
  }

  addExpense(description, amount, category) {
    const expense = new Expense(description, amount);
    this.expenses.add(expense, category);

    this.onBudgetListChanged();
  }

  editExpense(category = 'other', index, newData) {
    this.expenses.edit(category, index, newData);
  }

  editIncome(index, newData) {
    this.incomes.edit('income', index, newData);
  }

  renameCategory(oldName, newName) {
    this.expenses.renameCategory(oldName, newName);
  }
}

export default Model;
