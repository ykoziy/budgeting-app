import PieChart from './piechart';
import DOM from './domutil';

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

    const modalContainer = DOM.createElement(
      'div',
      undefined,
      'modal-container',
    );

    mainElement.append(this.controlPanel, this.chartPanel, modalContainer);

    //create footer
    const footerElement = DOM.createElement('footer');
    const footerText = DOM.createElement('h2');
    footerText.innerText = 'footer.....';
    footerElement.appendChild(footerText);

    //build the page
    document.body.append(headerElement, mainElement, footerElement);
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

    //left panel footer
    this.leftPanelFooter = DOM.createElement('footer');

    this.controlPanel.append(navElement, this.budgetData, this.leftPanelFooter);
  }

  displayExpenses(expenses) {
    this.#setActiveNav(1);
    while (this.budgetList.firstChild) {
      this.budgetList.removeChild(this.budgetList.firstChild);
    }
    // maybe show something when empty???
    const expenseList = expenses.get();
    for (const category in expenseList) {
      const listItem = DOM.createElement('li');
      const categoryText = DOM.createElement('p', 'category-name');
      categoryText.innerText = category;
      const categorySum = DOM.createElement('p', 'category-sum');
      categorySum.innerText = `$${expenses.sumCategory(category)}`;
      listItem.append(categoryText, categorySum);
      this.budgetList.append(listItem);
    }
    this.#setFooter('Total Expenses:', expenses.sum());
  }

  displayIncomes(incomes) {
    this.#setActiveNav(2);
    while (this.budgetList.firstChild) {
      this.budgetList.removeChild(this.budgetList.firstChild);
    }
    // maybe show something when empty???
    const incomeArray = incomes.get()['income'];
    incomeArray.forEach((income) => {
      const listItem = DOM.createElement('li');
      const categoryText = DOM.createElement('p', 'income-name');
      categoryText.innerText = income.title;

      const incomeText = DOM.createElement('p', 'income-amount');
      incomeText.innerText = `$${income.money}`;

      listItem.append(categoryText, incomeText);
      this.budgetList.append(listItem);
    });
    this.#setFooter('Total Income:', incomes.sum());
  }

  displayChart(expenses, incomes) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.chartPanel.append(svg);
    const chart = new PieChart(this.chartPanel, expenses);
    chart.show();
  }

  openCategory(categoryName, expenses) {
    //console.log(expenses.getCategoryItems(categoryName));
    while (this.budgetList.firstChild) {
      this.budgetList.removeChild(this.budgetList.firstChild);
    }

    const items = expenses.getCategoryItems(categoryName);
    items.forEach((item) => {
      const listItem = DOM.createElement('li');
      const categoryText = DOM.createElement('p', 'income-name');
      categoryText.innerText = item.title;

      const incomeText = DOM.createElement('p', 'income-amount');
      incomeText.innerText = `$${item.money}`;

      listItem.append(categoryText, incomeText);
      this.budgetList.append(listItem);
    });
    this.#setFooter('Total:', expenses.sumCategory(categoryName));
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
          evt.currentTarget.querySelector('.category-name').innerHTML;
        handlerFunc(categoryName);
      });
    });
  }
}

export default View;
