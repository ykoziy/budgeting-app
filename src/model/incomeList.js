import BudgetList from './budgetList';

class IncomeList extends BudgetList {
  constructor() {
    super();
  }

  add(income) {
    super.add(income, 'income');
  }

  getByIndex(index) {
    return super.getByCategoryIndex('income', index);
  }
}

export default IncomeList;
