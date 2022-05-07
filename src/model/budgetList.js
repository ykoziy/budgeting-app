import uniqid from 'uniqid';

class BudgetList {
  constructor() {
    this.items = {};
  }

  add(item, category = 'other') {
    if (!this.items.hasOwnProperty(category)) {
      this.items[category] = { id: uniqid(), items: [item] };
    } else {
      this.items[category].items.push(item);
    }
  }

  get() {
    return this.items;
  }

  getByID(id) {
    let itemFound;
    for (const prop in this.items) {
      const itemArray = this.items[prop].items;
      itemArray.forEach((item) => {
        if (item.id === id) {
          itemFound = item;
        }
      });
    }
    return itemFound;
  }

  getCategory(category) {
    return this.items[category];
  }

  getCategoryItems(category) {
    return this.items[category].items;
  }

  getByCategoryIndex(category, index) {
    return this.items[category].items[index];
  }

  sum() {
    let sum = 0;
    for (const key in this.items) {
      this.items[key].items.forEach((element) => {
        sum += element.money;
      });
    }
    return Number(sum.toFixed(2));
  }

  edit(id, newData) {
    for (const prop in this.items) {
      const itemArray = this.items[prop].items;
      itemArray.every((item) => {
        if (item.id === id) {
          if (newData.hasOwnProperty('description')) {
            item.title = newData.description;
          }
          if (newData.hasOwnProperty('money')) {
            item.money = newData.money;
          }
        }
      });
    }
  }

  renameCategory(categoryID, newName) {
    for (const prop in this.items) {
      if (this.items[prop].id === categoryID) {
        this.items[newName] = this.items[prop];
        delete this.items[prop];
        return true;
      }
    }
    return false;
  }

  deleteCategoryID(categoryID) {
    for (const prop in this.items) {
      if (this.items[prop].id === categoryID) {
        delete this.items[prop];
        return true;
      }
    }
    return false;
  }

  delete(category, id) {
    let isDeleted = false;
    if (this.items.hasOwnProperty(category)) {
      this.items[category].items.forEach((item, index) => {
        if (item.getId() === id) {
          this.items[category].items.splice(index, 1);
          isDeleted = true;
        }
      });
      if (this.items[category].items.length == 0) {
        delete this.items[category];
      }
    }
    return isDeleted;
  }
}

export default BudgetList;
