import Model from '../src/model/model';
import ExpenseList from '../src/model/expenseList';
import IncomeList from '../src/model/incomeList';

describe('Testing the Model', () => {
  let model;
  beforeEach(() => {
    model = new Model();
    model.expenses = new ExpenseList();
    model.incomes = new IncomeList();
  });

  it('should be able to add an income', () => {
    model.addIncome('full-time job', 32500);
    expect(model.incomes.getByIndex(0).money).toEqual(32500);
  });

  it('should be able to add an expense without category', () => {
    model.addExpense('internet', 76.98);
    expect(model.expenses.getByCategoryIndex('other', 0).money).toEqual(76.98);
  });

  it('should be able to add an expense with category', () => {
    model.addExpense('gas', 86.75, 'utility');
    expect(model.expenses.getByCategoryIndex('utility', 0).money).toEqual(
      86.75,
    );
  });

  it('should be able to edit an expense without a category', () => {
    model.addExpense('internet', 76.98);
    const newCost = 95.78;
    const newTitle = 'nope';
    model.editExpense(undefined, 0, { money: newCost, description: newTitle });

    expect(model.expenses.getByCategoryIndex('other', 0).money).toEqual(
      newCost,
    );
    expect(model.expenses.getByCategoryIndex('other', 0).title).toEqual(
      newTitle,
    );
  });

  it('should be able to edit an expense with a category', () => {
    model.addExpense('water', 45.12, 'utilities');
    const newCost = 63.45;
    model.editExpense('utilities', 0, { money: 63.45 });
    expect(model.expenses.getByCategoryIndex('utilities', 0).money).toEqual(
      newCost,
    );
  });

  it('should be able to edit an income', () => {
    model.addIncome('full-time job', 32500);
    const newIncome = 42100;
    model.editIncome(0, { money: newIncome });
    expect(model.incomes.getByIndex(0).money).toEqual(newIncome);
  });

  it('should be able to rename an expense category', () => {
    model.addExpense('gas', 86.75, 'utilities');
    model.addExpense('restaurants', 300, 'fun');
    model.addExpense('entertainment', 200, 'fun');

    model.renameCategory('fun', 'waste of money');

    const hasProperty = model.expenses.get().hasOwnProperty('waste of money');
    const hasOldProperty = model.expenses.get().hasOwnProperty('fun');

    expect(hasOldProperty).toBeFalsy();
    expect(hasProperty).toBeTruthy();
  });
});
