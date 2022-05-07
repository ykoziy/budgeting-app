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
    this.view.setEditBudgetItemSave(this.handleEditItemSave);
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
      this.view.displayIncomes(
        this.model.incomes,
        this.handleDeleteItem,
        this.handleEditItem,
      );
      this.view.displayChart(this.model.expenses, this.model.incomes);
    }
  };

  handleIncomeNav = () => {
    this.currentView = 'income';
    this.view.displayIncomes(
      this.model.incomes,
      this.handleDeleteItem,
      this.handleEditItem,
    );
  };

  handleExpenseNav = () => {
    this.currentView = 'expense';
    this.view.displayExpenses(this.model.expenses);
    this.view.setCategoryOpen(this.handleCategoryOpen);
  };

  handleCategoryOpen = (categoryName) => {
    this.view.openCategory(
      categoryName,
      this.model.expenses,
      this.handleDeleteItem,
      this.handleEditItem,
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

  handleEditItem = (category, id, categoryID) => {
    if (this.currentView === 'income') {
      this.view.displayModal('edit', this.model.incomes.getByID(id));
    } else if (this.currentView === 'expense') {
      this.view.displayModal(
        'edit',
        this.model.expenses.getByID(id),
        category,
        categoryID,
      );
    }
  };

  handleEditItemSave = (
    categoryID,
    itemID,
    categoryName,
    name,
    dollarAmount,
  ) => {
    if (this.currentView === 'income') {
      this.model.editIncome(itemID, {
        description: name,
        money: Number(dollarAmount),
      });
    } else if (this.currentView === 'expense') {
      this.model.editExpense(itemID, {
        description: name,
        money: Number(dollarAmount),
      });
    }
    this.view.removeModal();
  };

  handleAddBudgetItemSave = (categoryName, name, dollarAmount) => {
    if (this.currentView === 'income') {
      this.model.addIncome(name, Number(dollarAmount));
      this.view.removeModal();
    } else if (this.currentView === 'expense') {
      if (categoryName) {
        this.model.addExpense(name, Number(dollarAmount), categoryName);
      } else {
        this.model.addExpense(name, Number(dollarAmount));
      }

      this.view.removeModal();
    }
  };

  handleCancelModal = () => {
    this.view.removeModal();
  };
}

export default Controller;
