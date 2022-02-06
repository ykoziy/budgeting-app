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
});
