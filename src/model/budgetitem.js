import uniqid from 'uniqid';

class BudgetItem {
  constructor(title, money) {
    this.id = uniqid();
    this.title = title;
    this.money = money;
  }

  getId() {
    return this.id;
  }
}

export default BudgetItem;
