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

  getByCategoryIndex(category, index) {
    return this.items[category][index];
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

  delete(itemTitle) {
    for (const key in this.items) {
      const array = this.items[key];
      for (let i = 0; i < array.length; i++) {
        if ((array[i].title = itemTitle)) {
          this.items[key].splice(i, 1);
          return true;
        }
      }
    }
    return false;
  }

  deleteCategoryIndex(category, index) {
    if (this.items.hasOwnProperty(category)) {
      let categoryLength = this.items[category].length;
      if (index >= 0 && index < categoryLength) {
        this.items[category].splice(index, 1);
        return true;
      }
    }
    return false;
  }
}

export default BudgetList;