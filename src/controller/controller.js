class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.currentView = 'expense';

    this.onBudgetListChange();

    this.model.setBudgetListChanged(this.onBudgetListChange);

    this.view.setIncomeNav(this.handleIncomeNav);
    this.view.setExpenseNav(this.handleExpenseNav);
    this.view.setAddItem(this.handleAddItem);
    this.view.setAddBudgetItemSave(this.handleAddBudgetItemSave);
    this.view.setModalCancel(this.handleCancelModal);
  }

  // links model and view
  // add action handlers

  onBudgetListChange = () => {
    if (this.currentView === 'expense') {
      this.view.displayExpenses(this.model.expenses);
      this.view.setCategoryOpen(this.handleCategoryOpen);
      this.view.displayChart(this.model.expenses, this.model.incomes);
    } else {
      this.view.displayIncomes(this.model.incomes);
      this.view.displayChart(this.model.expenses, this.model.incomes);
    }
  };

  handleIncomeNav = () => {
    this.currentView = 'income';
    this.view.displayIncomes(this.model.incomes);
  };

  handleExpenseNav = () => {
    this.currentView = 'expense';
    this.view.displayExpenses(this.model.expenses);
    this.view.setCategoryOpen(this.handleCategoryOpen);
  };

  handleCategoryOpen = (categoryName) => {
    this.view.openCategory(categoryName, this.model.expenses);
  };

  handleAddItem = () => {
    this.view.displayModal('add');
  };

  handleAddBudgetItemSave = (categoryName, name, dollarAmount, type) => {
    if (type === 'expense') {
      this.model.addExpense(name, Number(dollarAmount), categoryName);
    } else {
      this.model.addIncome(name, Number(dollarAmount));
    }
  };

  handleCancelModal = () => {
    this.view.removeModal();
  };
}

export default Controller;
