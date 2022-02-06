import BudgetItem from './budgetitem';

class Expense extends BudgetItem {
  constructor(title, cost) {
    super(title, cost);
  }
}

export default Expense;
