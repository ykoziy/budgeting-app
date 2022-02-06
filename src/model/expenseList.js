import BudgetList from './budgetList';

class ExpenseList extends BudgetList {
  constructor() {
    super();
  }

  sumCategory(category) {
    if (this.items.hasOwnProperty(category)) {
      const expensesArray = this.items[category];
      let sum = 0;
      expensesArray.forEach((expense) => {
        sum += expense.money;
      });
      return sum;
    } else {
      return 0;
    }
  }

  deleteCategory(category) {
    if (this.items.hasOwnProperty(category)) {
      delete this.items[category];
      return true;
    } else {
      return false;
    }
  }

  getByCategoryIndex(category, index) {
    return this.items[category][index];
  }
}

export default ExpenseList;
