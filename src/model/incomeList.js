import BudgetList from './budgetList';

class IncomeList extends BudgetList {
  constructor() {
    super();
  }

  add(income) {
    super.add(income, 'income');
  }
}

export default IncomeList;
