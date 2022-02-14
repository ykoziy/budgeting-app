class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.setIncomeNav(this.handleIncomeNav);
    this.view.setExpenseNav(this.handleExpenseNav);
  }

  // links model and view
  // add action handlers

  handleIncomeNav = () => {
    this.view.displayIncomes(this.model.incomes);
  };

  handleExpenseNav = () => {
    this.view.displayExpenses(this.model.expenses);
  };
}

export default Controller;
