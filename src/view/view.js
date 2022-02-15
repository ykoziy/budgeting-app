class View {
  constructor() {
    //create header
    const headerElement = this.#createElement('header');
    const headerText = this.#createElement('h1');
    headerText.innerText = 'App Header Goes Here';
    headerElement.appendChild(headerText);

    //create main
    const mainElement = this.#createElement('main');
    this.#buildMainPanel();
    //create right panel (graph holder)
    this.chartPanel = this.#createElement('section', undefined, 'right-panel');

    mainElement.append(this.controlPanel, this.chartPanel);

    //create footer
    const footerElement = this.#createElement('footer');
    const footerText = this.#createElement('h2');
    footerText.innerText = 'footer.....';
    footerElement.appendChild(footerText);

    //build the page
    document.body.append(headerElement, mainElement, footerElement);
  }

  #buildMainPanel() {
    //create left panel (income/expenses)
    this.controlPanel = this.#createElement('section', undefined, 'left-panel');

    //left panel navigation
    const navElement = this.#createElement('nav');
    this.expensesNav = this.#createElement('div', 'nav-btn');
    this.expensesNav.innerText = 'Expenses';
    this.incomeNav = this.#createElement('div', 'nav-btn');
    this.incomeNav.innerText = 'Income';
    navElement.append(this.expensesNav, this.incomeNav);

    //left panel data
    this.budgetData = this.#createElement('section');
    this.budgetList = this.#createElement('ul', undefined, 'budget-list');
    this.budgetData.append(this.budgetList);

    //left panel footer
    const leftPanelFooter = this.#createElement('footer');
    leftPanelFooter.innerText = 'footer related to the top nav button';

    this.controlPanel.append(navElement, this.budgetData, leftPanelFooter);
  }

  #createElement(tag, className, id) {
    const el = document.createElement(tag);
    if (className) {
      el.classList.add(className);
    }

    if (id) {
      el.id = id;
    }
    return el;
  }

  #getElement(selector) {
    const el = document.querySelector(selector);
    return el;
  }

  displayExpenses(expenses) {
    while (this.budgetList.firstChild) {
      this.budgetList.removeChild(this.budgetList.firstChild);
    }
    // maybe show something when empty???
    const expenseList = expenses.get();
    for (const category in expenseList) {
      const listItem = this.#createElement('li');
      const categoryText = this.#createElement('p', 'category-name');
      categoryText.innerText = category;
      const categorySum = this.#createElement('p', 'category-sum');
      categorySum.innerText = `$${expenses.sumCategory(category)}`;
      listItem.append(categoryText, categorySum);
      this.budgetList.append(listItem);
    }
  }

  displayIncomes(incomes) {
    //remove the existing display items
    // maybe show something when empty???
    // loop over data and display it.....
    console.log('clicked expense nav, displaying incomes');
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
}

export default View;
