class BudgetList {
  constructor() {
    this.items = {};
  }

  add(item, category = 'other') {
    if (!this.items.hasOwnProperty(category)) {
      this.items[category] = [item];
    } else {
      this.items[category].push(item);
    }
  }

  get() {
    return this.items;
  }
}

export default BudgetList;
