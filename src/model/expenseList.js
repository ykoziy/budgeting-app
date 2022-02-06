class ExpenseList {
  constructor() {
    this.expenses = {};
  }

  add(expense, category = 'other') {
    if (!this.expenses.hasOwnProperty(category)) {
      this.expenses[category] = [expense];
    } else {
      this.expenses[category].push(expense);
    }
  }

  getExpenses() {
    return this.expenses;
  }

  sumCategory(category) {
    if (this.expenses.hasOwnProperty(category)) {
      const expensesArray = this.expenses[category];
      let sum = 0;
      expensesArray.forEach((expense) => {
        sum += expense.cost;
      });
      return sum;
    } else {
      return 0;
    }
  }

  deleteCategory(category) {
    if (this.expenses.hasOwnProperty(category)) {
      delete this.expenses[category];
      return true;
    } else {
      return false;
    }
  }
}

export default ExpenseList;
