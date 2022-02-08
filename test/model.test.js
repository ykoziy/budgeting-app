import Model from '../src/model/model';

describe('Testing the Model', () => {
  let model;
  beforeEach(() => {
    model = new Model();
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
    model.editExpense(undefined, 0, { cost: newCost });

    expect(model.expenses.getByCategoryIndex('other', 0).money).toEqual(
      newCost,
    );
  });

  it('should be able to edit an expense with a category', () => {
    model.addExpense('water', 45.12, 'utilities');
    const newCost = 63.45;
    model.editExpense('utilities', 0, { cost: 63.45 });
    expect(model.expenses.getByCategoryIndex('utilities', 0).money).toEqual(
      newCost,
    );
  });

  it('should be able to edit an income', () => {
    model.addIncome('full-time job', 32500);
    const newIncome = 42100;
    model.editIncome(0, { income: newIncome });
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
