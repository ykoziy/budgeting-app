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
      itemArray.forEach((item) => {
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

  delete(categoryID, itemID) {
    let isDeleted = false;
    for (const category in this.items) {
      if (this.items[category].id === categoryID) {
        const itemArray = this.items[category].items;
        itemArray.forEach((item, index) => {
          if (item.id === itemID) {
            this.items[category].items.splice(index, 1);
            isDeleted = true;
          }
        });
      }
    }
    return isDeleted;
  }

  changeItemCategory(category, id) {
    const itemFound = this.getByID(id);
    if (itemFound) {
      for (const prop in this.items) {
        const itemArray = this.items[prop].items;
        itemArray.forEach((item, index) => {
          if (item.id === id) {
            this.items[prop].items.splice(index, 1);
          }
        });
      }
      this.add(itemFound, category ? category : undefined);
    }
    return 0;
  }
}

export default BudgetList;
