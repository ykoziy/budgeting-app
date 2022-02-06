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

  sum() {
    let sum = 0;
    for (const key in this.items) {
      this.items[key].forEach((element) => {
        sum += element.money;
      });
    }
    return Number(sum.toFixed(2));
  }
}

export default BudgetList;
