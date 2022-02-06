import BudgetItem from './budgetitem';

class Expense extends BudgetItem {
  constructor(title, cost) {
    super(title);
    this.cost = cost;
  }
}

export default Expense;
