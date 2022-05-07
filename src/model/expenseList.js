import BudgetList from './budgetList';

class ExpenseList extends BudgetList {
  constructor() {
    super();
  }

  sumCategory(category) {
    if (this.items.hasOwnProperty(category)) {
      const expensesArray = this.items[category].items;
      let sum = 0;
      expensesArray.forEach((expense) => {
        sum += expense.money;
      });
      return Number(sum.toFixed(2));
    } else {
      return 0;
    }
  }

  deleteCategoryID(categoryID) {
    for (const prop in this.items) {
      if (this.items[prop].id === categoryID) {
        delete this.items[prop];
        return true;
      }
    }
    return false;
  }
}

export default ExpenseList;
