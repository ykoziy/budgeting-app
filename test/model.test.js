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

  it('should be able to edit an expense by ID', () => {
    model.addExpense('water', 45.12, 'utilities');
    const editID = model.expenses.getByCategoryIndex('utilities', 0).getId();
    const newCost = 63.45;

    model.editExpense(editID, { money: 63.45 });
    expect(model.expenses.getByCategoryIndex('utilities', 0).money).toEqual(
      newCost,
    );
  });

  it('should be able to edit an income by ID', () => {
    model.addIncome('full-time job', 32500);
    const editID = model.incomes.getByIndex(0).getId();
    const newIncome = 42100;

    model.editIncome(editID, { money: newIncome });
    expect(model.incomes.getByIndex(0).money).toEqual(newIncome);
  });

  it('should be able to rename an expense category by ID', () => {
    model.addExpense('gas', 86.75, 'utilities');
    model.addExpense('restaurants', 300, 'fun');
    model.addExpense('entertainment', 200, 'fun');

    const categoryID = model.expenses.getCategory('fun').id;

    model.renameCategory(categoryID, 'waste of money');

    const hasProperty = model.expenses.get().hasOwnProperty('waste of money');
    const hasOldProperty = model.expenses.get().hasOwnProperty('fun');

    expect(hasOldProperty).toBeFalsy();
    expect(hasProperty).toBeTruthy();
  });

  it('should be able to change item category', () => {
    model.addExpense('gas', 86.75, 'utilities');
    model.addExpense('restaurants', 300, 'fun');
    const editID = model.expenses.getByCategoryIndex('fun', 0).getId();
    model.addExpense('entertainment', 200, 'fun');

    model.changeItemCategory('nope', editID);

    expect(model.expenses.get()['fun'].items.length).toEqual(1);
    expect(model.expenses.get()['nope'].items.length).toEqual(1);
  });
});
