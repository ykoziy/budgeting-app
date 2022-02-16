class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.setIncomeNav(this.handleIncomeNav);
    this.view.setExpenseNav(this.handleExpenseNav);

    this.view.displayExpenses(this.model.expenses);

    this.view.setCategoryOpen(this.handleCategoryOpen);
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
}

export default Controller;
