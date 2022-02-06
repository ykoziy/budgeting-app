import BudgetItem from './budgetitem';

class Income extends BudgetItem {
  constructor(title, income) {
    super(title);
    this.income = income;
  }
}

export default Income;
