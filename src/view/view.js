import PieChart from './piechart';
import DOM from './domutil';
import ModalFactory from './modal/modalFactory';

class View {
  constructor() {
    //create header
    const headerElement = DOM.createElement('header');
    const headerText = DOM.createElement('h1');
    headerText.innerText = 'App Header Goes Here';
    headerElement.appendChild(headerText);

    //create main
    const mainElement = DOM.createElement('main');
    this.#buildMainPanel();
    //create right panel (graph holder)
    this.chartPanel = DOM.createElement('section', undefined, 'right-panel');

    mainElement.append(this.controlPanel, this.chartPanel);

    //create footer
    const footerElement = DOM.createElement('footer');
    const footerText = DOM.createElement('h2');
    footerText.innerText = 'footer.....';
    footerElement.appendChild(footerText);

    //build the page
    document.body.append(headerElement, mainElement, footerElement);

    //current view
    this.currentView = 'expenses';
  }

  #buildMainPanel() {
    //create left panel (income/expenses)
    this.controlPanel = DOM.createElement('section', undefined, 'left-panel');

    //left panel navigation
    const navElement = DOM.createElement('nav');
    this.expensesNav = DOM.createElement('div', 'nav-btn active');
    this.expensesNav.innerText = 'Expenses';
    this.incomeNav = DOM.createElement('div', 'nav-btn');
    this.incomeNav.innerText = 'Income';
    navElement.append(this.expensesNav, this.incomeNav);

    //left panel data
    this.budgetData = DOM.createElement('section');
    this.budgetList = DOM.createElement('ul', undefined, 'budget-list');
    this.budgetData.append(this.budgetList);

    //left panel add button
    this.addItemButton = DOM.createElement('button', 'add-item-btn');
    this.addItemButton.innerText = 'Add';

    //left panel footer
    this.leftPanelFooter = DOM.createElement('footer');

    this.controlPanel.append(
      navElement,
      this.budgetData,
      this.addItemButton,
      this.leftPanelFooter,
    );
  }

  displayModal(
    type,
    data = undefined,
    category = undefined,
    categoryID = undefined,
  ) {
    const modalContainer = DOM.createElement(
      'div',
      undefined,
      'modal-container',
    );
    document.body.append(modalContainer);

    let modalFactory = new ModalFactory();
    let modal = modalFactory.createModal(
      type,
      data,
      category,
      categoryID,
      modalContainer,
    );
    modal.currentView = this.currentView;
    /*     if (type === 'add' || type === 'edit') {
      modal = this.#createAddEditModal(type, data, category, categoryID);
    } else if (type === 'delete') {
      modal = this.#createDeleteModal();
    } */
    modalContainer.append(modal.create());
  }
  /// remove modal in separate class now..
  removeModal() {
    const modal = document.querySelector('#modal-container');
    modal.remove();
  }

  #createAddEditModal(
    type,
    data = undefined,
    category = undefined,
    categoryID = undefined,
  ) {
    const modal = DOM.createElement('div', 'modal');

    const modalForm = DOM.createElement('form', 'modal-top');
    const modalBottom = DOM.createElement('div', 'modal-bottom');

    modal.append(modalForm);

    const labelCat = DOM.createElement('label');
    labelCat.innerText = 'Category:';
    labelCat.setAttribute('for', 'category-name');

    const labelName = DOM.createElement('label');
    labelName.innerText = 'Name:';
    labelName.setAttribute('for', 'name');

    const labelDollarAmount = DOM.createElement('label');
    labelDollarAmount.innerText = 'Amount $:';
    labelDollarAmount.setAttribute('for', 'dollar-amount');

    const categoryInput = DOM.createElement('input', null, 'category-name');
    categoryInput.setAttribute('type', 'text');

    const nameInput = DOM.createElement('input', null, 'name');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('required', true);

    const dollarAmountInput = DOM.createElement('input', null, 'dollar-amount');
    dollarAmountInput.setAttribute('type', 'number');
    dollarAmountInput.setAttribute('step', '0.01');
    dollarAmountInput.setAttribute('required', true);

    const modalTitle = DOM.createElement('h1');

    if (this.currentView === 'expense') {
      if (type === 'edit') {
        modalTitle.innerText = 'Editing expense';
        categoryInput.value = category;
        nameInput.value = data.title;
        dollarAmountInput.value = data.money;
      } else {
        modalTitle.innerText = 'Adding expense';
      }
      modalForm.append(
        modalTitle,
        labelCat,
        categoryInput,
        labelName,
        nameInput,
        labelDollarAmount,
        dollarAmountInput,
      );
    } else {
      if (type === 'edit') {
        modalTitle.innerText = 'Editing income';
        nameInput.value = data.title;
        dollarAmountInput.value = data.money;
      } else {
        modalTitle.innerText = 'Adding income';
      }
      modalForm.append(
        modalTitle,
        labelName,
        nameInput,
        labelDollarAmount,
        dollarAmountInput,
      );
    }

    const cancelButton = DOM.createElement('button', 'cancel-btn');
    cancelButton.setAttribute('type', 'button');
    cancelButton.innerText = 'Cancel';

    let addEditButton;
    if (type === 'edit') {
      addEditButton = DOM.createElement('button', 'save-btn');
      addEditButton.setAttribute('value', 'edit');
      addEditButton.innerText = 'Save';
      addEditButton.dataset.id = data.id;
      if (categoryID) {
        addEditButton.dataset.categoryId = categoryID;
      }
    } else {
      addEditButton = DOM.createElement('button', 'add-btn');
      addEditButton.setAttribute('value', 'add');
      addEditButton.innerText = 'Add';
    }

    addEditButton.setAttribute('type', 'submit');

    modalBottom.append(cancelButton, addEditButton);
    modalForm.append(modalBottom);
    return modal;
  }
  /// in separate class now
  #createDeleteModal() {
    const modal = DOM.createElement('div', 'modal');

    const modalTop = DOM.createElement('div', 'modal-top');
    const modalBottom = DOM.createElement('div', 'modal-bottom');
    modal.append(modalTop);
    modal.append(modalBottom);

    const confirmationMsg = DOM.createElement('p');
    confirmationMsg.innerText = 'Are you sure you want to delete?';

    modalTop.append(confirmationMsg);

    const cancelButton = DOM.createElement('button', 'cancel-btn');
    cancelButton.innerText = 'Cancel';

    const yesBtn = DOM.createElement('button', 'yes-btn');
    yesBtn.innerText = 'Yes';

    modalBottom.append(cancelButton, yesBtn);
    return modal;
  }

  #createDeleteItemButton() {
    const button = DOM.createElement('button', 'delete-item-btn');
    button.innerText = 'X';
    return button;
  }

  #createEditItemButton() {
    const button = DOM.createElement('button', 'edit-item-btn');
    button.innerText = 'Edit';
    return button;
  }

  #attachItemHandler(node, eventHandler) {
    node.addEventListener('click', (evt) => {
      const parent = evt.currentTarget.parentElement;
      let category = parent.dataset.category;
      let id = parent.dataset.id;
      eventHandler(category, id);
    });
  }

  #attachEditHandler(node, eventHandler) {
    node.addEventListener('click', (evt) => {
      const parent = evt.currentTarget.parentElement;
      let category = parent.dataset.category;
      let id = parent.dataset.id;
      let categoryID = parent.dataset.categoryId;
      eventHandler(category, id, categoryID);
    });
  }

  #generateListItem(name, amount) {
    const item = DOM.createElement('li');
    const budgetItemText = DOM.createElement('p', 'budget-item-name');
    budgetItemText.innerText = name;
    const budgetItemAmount = DOM.createElement('p', 'budget-item-sum');
    budgetItemAmount.innerText = `$${amount}`;
    item.append(budgetItemText, budgetItemAmount);
    return item;
  }

  displayExpenses(expenses) {
    this.#setActiveNav(1);
    this.currentView = 'expense';
    while (this.budgetList.firstChild) {
      this.budgetList.removeChild(this.budgetList.firstChild);
    }

    const expenseList = expenses.get();

    if (!expenseList) {
      this.#setFooter('Total Expenses:', 0);
      return;
    }

    for (const category in expenseList) {
      const listItem = this.#generateListItem(
        category,
        expenses.sumCategory(category),
      );
      this.budgetList.append(listItem);
    }
    this.#setFooter('Total Expenses:', expenses.sum());
  }

  openCategory(categoryName, expenses, deleteHandler, editHandler) {
    while (this.budgetList.firstChild) {
      this.budgetList.removeChild(this.budgetList.firstChild);
    }

    const items = expenses.getCategoryItems(categoryName);
    const categoryID = expenses.getCategory(categoryName).id;
    items.forEach((item) => {
      const listItem = this.#generateListItem(item.title, item.money);
      listItem.dataset.category = categoryName;
      listItem.dataset.id = item.getId();
      listItem.dataset.categoryId = categoryID;
      const deleteButton = this.#createDeleteItemButton();
      const editButton = this.#createEditItemButton();
      this.#attachItemHandler(deleteButton, deleteHandler);
      this.#attachEditHandler(editButton, editHandler);

      listItem.append(editButton, deleteButton);
      this.budgetList.append(listItem);
    });
    this.#setFooter('Total:', expenses.sumCategory(categoryName));
  }

  displayIncomes(incomes, deleteHandler, editHandler) {
    this.#setActiveNav(2);
    this.currentView = 'income';
    while (this.budgetList.firstChild) {
      this.budgetList.removeChild(this.budgetList.firstChild);
    }

    const income = incomes.get()['income'];
    let incomeList;

    if (!income) {
      this.#setFooter('Total Income:', 0);
      return;
    } else {
      incomeList = income.items;
    }

    incomeList.forEach((income) => {
      const listItem = DOM.createElement('li');
      listItem.dataset.category = 'income';
      listItem.dataset.id = income.getId();
      const categoryText = DOM.createElement('p', 'budget-item-name');
      categoryText.innerText = income.title;

      const incomeText = DOM.createElement('p', 'budget-item-amount');
      incomeText.innerText = `$${income.money}`;

      const deleteButton = this.#createDeleteItemButton();
      const editButton = this.#createEditItemButton();
      this.#attachItemHandler(deleteButton, deleteHandler);
      this.#attachEditHandler(editButton, editHandler);

      listItem.append(categoryText, incomeText, editButton, deleteButton);

      this.budgetList.append(listItem);
    });
    this.#setFooter('Total Income:', incomes.sum());
  }

  displayChart(expenses, incomes) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    let svgElement = document.querySelector('svg');
    if (svgElement) {
      svgElement.remove();
    }
    this.chartPanel.append(svg);
    const chart = new PieChart(this.chartPanel, expenses);
    chart.show();
  }

  #setActiveNav(activeNav) {
    if (activeNav === 1) {
      this.expensesNav.classList.add('active');
      this.incomeNav.classList.remove('active');
    } else if (activeNav === 2) {
      this.expensesNav.classList.remove('active');
      this.incomeNav.classList.add('active');
    }
  }

  #setFooter(text, money) {
    this.leftPanelFooter.innerHTML = '';
    const description = DOM.createElement('p');
    description.innerText = text;
    const total = DOM.createElement('p');
    total.innerText = `$${money}`;
    this.leftPanelFooter.append(description, total);
  }

  // Set event listeners

  setIncomeNav(handlerFunc) {
    this.incomeNav.addEventListener('click', (evt) => {
      handlerFunc();
    });
  }

  setExpenseNav(handlerFunc) {
    this.expensesNav.addEventListener('click', (evt) => {
      handlerFunc();
    });
  }

  setCategoryOpen(handlerFunc) {
    const listItems = Array.from(this.budgetList.childNodes);
    listItems.forEach((listItem) => {
      listItem.addEventListener('click', (evt) => {
        const categoryName =
          evt.currentTarget.querySelector('.budget-item-name').innerHTML;
        handlerFunc(categoryName);
      });
    });
  }

  setAddItem(handlerFunc) {
    this.addItemButton.addEventListener('click', (evt) => {
      handlerFunc();
    });
  }

  setAddBudgetItemSave(handlerFunc) {
    document.body.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const submitType = document.activeElement.value;
      if (submitType === 'add') {
        let categoryName = 'income';
        if (this.currentView === 'expense') {
          categoryName = document.querySelector('.modal #category-name').value;
        }
        const name = document.querySelector('.modal #name').value;
        const dollarAmount = document.querySelector(
          '.modal #dollar-amount',
        ).value;
        handlerFunc(categoryName, name, dollarAmount);
      }
    });
  }

  setEditBudgetItemSave(handlerFunc) {
    document.body.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const submitType = document.activeElement.value;
      if (submitType === 'edit') {
        let categoryName;
        let categoryID = document.activeElement.dataset.categoryId;
        const itemID = document.activeElement.dataset.id;
        if (this.currentView === 'expense') {
          categoryName = document.querySelector('.modal #category-name').value;
        }
        const name = document.querySelector('.modal #name').value;
        const dollarAmount = document.querySelector(
          '.modal #dollar-amount',
        ).value;
        handlerFunc(itemID, categoryName, name, dollarAmount);
      }
    });
  }
}

export default View;
