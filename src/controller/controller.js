class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.setIncomeNav(this.handleIncomeNav);
    this.view.setExpenseNav(this.handleExpenseNav);

    this.view.displayExpenses(this.model.expenses);
    this.view.displayChart(this.model.expenses, this.model.incomes);

    this.view.setCategoryOpen(this.handleCategoryOpen);

    this.view.setAddItem(this.handleAddItem);

    this.view.setAddBudgetItemSave(this.handleAddBudgetItemSave);
    this.view.setModalCancel(this.handleCancelModal);
  }

  // links model and view
  // add action handlers

  handleIncomeNav = () => {
    this.view.displayIncomes(this.model.incomes);
  };

  handleExpenseNav = () => {
    this.view.displayExpenses(this.model.expenses);
    this.view.setCategoryOpen(this.handleCategoryOpen);
  };

  handleCategoryOpen = (categoryName) => {
    this.view.openCategory(categoryName, this.model.expenses);
  };

  handleAddItem = () => {
    this.view.displayModal('add');
  };

  handleAddBudgetItemSave = (categoryName, name, dollarAmount) => {
    const output = `Adding budget item to the app.
    category name: ${categoryName}
    name: ${name}
    dollar amount: ${dollarAmount}`;
    console.log(output);
  };

  handleCancelModal = () => {
    this.view.removeModal();
  };
}

export default Controller;
