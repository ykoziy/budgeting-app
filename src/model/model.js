import Expense from './expense';
import Income from './income';
import ExpenseList from './expenseList';
import IncomeList from './incomeList';

class Model {
  constructor() {
    this.expenses = new ExpenseList();
    this.incomes = new IncomeList();
  }

  addIncome(description, amount) {
    const income = new Income(description, amount);
    this.incomes.add(income);
  }

  addExpense(description, amount, category) {
    const expense = new Expense(description, amount);
    this.expenses.add(expense, category);
  }

  editExpense(category = 'other', index, newData) {}

  editIncome(index, newData) {}

  renameCategory(oldName, newName) {}

  //TODO: (fix rounding sum category)
}

export default Model;
