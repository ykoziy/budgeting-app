import Modal from '../view/modal/modal';

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
    Modal.setModalCancel(this.handleCancelModal);
  }

  // links model and view
  // add action handlers

  onBudgetListChange = () => {
    if (this.currentView === 'expense') {
      this.view.displayExpenses(this.model.expenses, this.handleDeleteCategory);
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

  // Event handler for the income nav button
  handleIncomeNav = () => {
    this.currentView = 'income';
    this.view.displayIncomes(
      this.model.incomes,
      this.handleDeleteItem,
      this.handleEditItem,
    );
  };

  // Event handler for the expense nav button
  handleExpenseNav = () => {
    this.currentView = 'expense';
    this.view.displayExpenses(this.model.expenses, this.handleDeleteCategory);
    this.view.setCategoryOpen(this.handleCategoryOpen);
  };

  // Event handler for clicking on category
  handleCategoryOpen = (categoryName) => {
    this.view.openCategory(
      categoryName,
      this.model.expenses,
      this.handleDeleteItem,
      this.handleEditItem,
    );
  };

  // Event handler for add button
  handleAddItem = () => {
    this.view.displayModal(
      'add',
      undefined,
      undefined,
      undefined,
      this.handleAddBudgetItem,
    );
  };

  // Event handler for delete button
  handleDeleteItem = (categoryID, id) => {
    if (this.currentView === 'income') {
      this.view.displayModal('delete', undefined, undefined, categoryID, () =>
        this.handleDeleteBudgetItem(categoryID, id),
      );
    } else if (this.currentView === 'expense') {
      this.view.displayModal('delete', undefined, undefined, categoryID, () =>
        this.handleDeleteBudgetItem(categoryID, id),
      );
    }
  };

  // Event handler for delete category button
  handleDeleteCategory = (categoryID) => {
    console.log(`deleting category with ID: ${categoryID}`);
  };

  // Event handler for delete button
  handleEditItem = (category, id, categoryID) => {
    if (this.currentView === 'income') {
      this.view.displayModal(
        'edit',
        this.model.incomes.getByID(id),
        undefined,
        undefined,
        this.handleEditItemSave,
      );
    } else if (this.currentView === 'expense') {
      this.view.displayModal(
        'edit',
        this.model.expenses.getByID(id),
        category,
        undefined,
        this.handleEditItemSave,
      );
    }
  };

  // Event handler for updating model when editing item
  handleEditItemSave = (itemID, categoryName, name, dollarAmount) => {
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
      this.model.changeItemCategory(categoryName, itemID);
    }
    Modal.remove();
  };

  // Event handler for updating model when adding item
  handleAddBudgetItem = (categoryName, name, dollarAmount) => {
    if (this.currentView === 'income') {
      this.model.addIncome(name, Number(dollarAmount));
    } else if (this.currentView === 'expense') {
      if (categoryName) {
        this.model.addExpense(name, Number(dollarAmount), categoryName);
      } else {
        this.model.addExpense(name, Number(dollarAmount));
      }
      Modal.remove();
    }
  };

  // Event handler for updating model when deleting item
  handleDeleteBudgetItem = (categoryID, itemID) => {
    if (this.currentView === 'income') {
      this.model.deleteIncome(categoryID, itemID);
    } else if (this.currentView === 'expense') {
      this.model.deleteExpense(categoryID, itemID);
    }
    Modal.remove();
  };

  // Event handler for canceling modal
  handleCancelModal = () => {
    Modal.remove();
  };
}

export default Controller;
