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

  getCategoryItems(category) {
    return this.items[category];
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

  edit(category, index, newData) {
    if (this.items.hasOwnProperty(category)) {
      let item = this.items[category][index];
      if (newData.hasOwnProperty('description')) {
        item.title = newData.description;
      }
      if (newData.hasOwnProperty('money')) {
        item.money = newData.money;
      }
      return true;
    } else {
      return false;
    }
  }

  renameCategory(oldName, newName) {
    if (this.items.hasOwnProperty(oldName)) {
      if (newName !== oldName) {
        this.items[newName] = this.items[oldName];
        delete this.items[oldName];
        return true;
      }
    }
    return false;
  }

  delete(category, id) {
    let isDeleted = false;
    if (this.items.hasOwnProperty(category)) {
      this.items[category].forEach((item, index) => {
        if (item.getId() === id) {
          this.items[category].splice(index, 1);
          isDeleted = true;
        }
      });
      if (this.items[category].length == 0) {
        delete this.items[category];
      }
    }
    return isDeleted;
  }
}

export default BudgetList;
