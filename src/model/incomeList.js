import BudgetList from './budgetList';

class IncomeList extends BudgetList {
  constructor() {
    super();
  }

  add(income) {
    super.add(income, 'income');
  }

  getByIndex(index) {
    return this.items['income'][index];
  }
}

export default IncomeList;
