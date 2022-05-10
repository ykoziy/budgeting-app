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
    callback = undefined,
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
      callback,
    );
    modal.currentView = this.currentView;
    modalContainer.append(modal.create());
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

  #attachDeleteItemHandler(node, eventHandler) {
    node.addEventListener('click', (evt) => {
      const parent = evt.currentTarget.parentElement;
      let id = parent.dataset.id;
      let categoryID = parent.dataset.categoryId;
      eventHandler(categoryID, id);
    });
  }

  #attachDeleteCategoryHandler(node, eventHandler) {
    node.addEventListener('click', (evt) => {
      evt.stopPropagation();
      const parent = evt.currentTarget.parentElement;
      let categoryID = parent.dataset.categoryId;
      eventHandler(categoryID);
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

  displayExpenses(expenses, deleteCategoryHandler) {
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
      listItem.dataset.categoryId = expenses.getCategory(category).id;
      const deleteButton = this.#createDeleteItemButton();
      this.#attachDeleteCategoryHandler(deleteButton, deleteCategoryHandler);
      listItem.append(deleteButton);

      this.budgetList.append(listItem);
    }
    this.#setFooter('Total Expenses:', expenses.sum());
  }

  openCategory(categoryName, expenses, deleteItemHandler, editItemHandler) {
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
      this.#attachDeleteItemHandler(deleteButton, deleteItemHandler);
      this.#attachEditHandler(editButton, editItemHandler);

      listItem.append(editButton, deleteButton);
      this.budgetList.append(listItem);
    });
    this.#setFooter('Total:', expenses.sumCategory(categoryName));
  }

  displayIncomes(incomes, deleteItemHandler, editItemHandler) {
    this.#setActiveNav(2);
    this.currentView = 'income';
    while (this.budgetList.firstChild) {
      this.budgetList.removeChild(this.budgetList.firstChild);
    }

    const income = incomes.getCategory('income');
    let incomeList;

    if (!income) {
      this.#setFooter('Total Income:', 0);
      return;
    } else {
      incomeList = income.items;
    }

    const categoryID = incomes.getCategory('income').id;
    incomeList.forEach((income) => {
      const listItem = DOM.createElement('li');
      listItem.dataset.category = 'income';
      listItem.dataset.id = income.getId();
      listItem.dataset.categoryId = categoryID;
      const categoryText = DOM.createElement('p', 'budget-item-name');
      categoryText.innerText = income.title;

      const incomeText = DOM.createElement('p', 'budget-item-amount');
      incomeText.innerText = `$${income.money}`;

      const deleteButton = this.#createDeleteItemButton();
      const editButton = this.#createEditItemButton();
      this.#attachDeleteItemHandler(deleteButton, deleteItemHandler);
      this.#attachEditHandler(editButton, editItemHandler);

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
}

export default View;
