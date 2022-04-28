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
      this.view.displayIncomes(this.model.incomes, this.handleDeleteItem);
      this.view.displayChart(this.model.expenses, this.model.incomes);
    }
  };

  handleIncomeNav = () => {
    this.currentView = 'income';
    this.view.displayIncomes(this.model.incomes, this.handleDeleteItem);
  };

  handleExpenseNav = () => {
    this.currentView = 'expense';
    this.view.displayExpenses(this.model.expenses);
    this.view.setCategoryOpen(this.handleCategoryOpen, this.handleDeleteItem);
  };

  handleCategoryOpen = (categoryName) => {
    this.view.openCategory(
      categoryName,
      this.model.expenses,
      this.handleDeleteItem,
    );
  };

  handleAddItem = () => {
    this.view.displayModal('add');
  };

  handleDeleteItem = (category, id) => {
    if (this.currentView === 'income') {
      this.model.deleteIncome(category, id);
    } else if (this.currentView === 'expense') {
      this.model.deleteExpense(category, id);
    }
  };

  handleAddBudgetItemSave = (categoryName, name, dollarAmount) => {
    if (this.currentView === 'income') {
      this.model.addIncome(name, Number(dollarAmount));
    } else if (this.currentView === 'expense') {
      this.model.addExpense(name, Number(dollarAmount), categoryName);
    }
  };

  handleCancelModal = () => {
    this.view.removeModal();
  };
}

export default Controller;
