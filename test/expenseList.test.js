import Expense from '../src/model/expense';
import ExpenseList from '../src/model/expenseList';

describe('Testing ExpenseList class', () => {
  it('should allow to add multiple expenses without category, adding two. Will be in other category by default', () => {
    const expenseA = new Expense('gas', 35.78);
    const expenseB = new Expense('food', 560.1);

    const expenses = new ExpenseList();
    expenses.add(expenseA);
    expenses.add(expenseB);
    expect(expenses.get()['other'].items.length).toEqual(2);
  });

  it('sum of non existing category should be 0', () => {
    const expenseA = new Expense('gas', 35.78);
    const expenseB = new Expense('food', 560.1);

    const expenses = new ExpenseList();

    expect(expenses.sumCategory('fun')).toEqual(0);
  });

  it('should return the sum of all expenses in category. Other (two expenses of total 595.88 ), fun (one expense of total 250.45)', () => {
    const expenseA = new Expense('gas', 35.78);
    const expenseB = new Expense('food', 560.1);

    const expenseC = new Expense('ski lessons', 250.45);

    const expenses = new ExpenseList();
    expenses.add(expenseA);
    expenses.add(expenseB);
    expenses.add(expenseC, 'fun');

    expect(expenses.get()['other'].items.length).toEqual(2);
    expect(expenses.get()['fun'].items.length).toEqual(1);
    expect(expenses.sumCategory('other')).toEqual(595.88);
    expect(expenses.sumCategory('fun')).toEqual(250.45);
  });

  it('should return the sum of all expenses. Other (two expenses of total 595.88 ), fun (one expense of total 250.45)', () => {
    const expenseA = new Expense('gas', 35.78);
    const expenseB = new Expense('food', 560.1);

    const expenseC = new Expense('ski lessons', 250.45);

    const expenses = new ExpenseList();
    expenses.add(expenseA);
    expenses.add(expenseB);
    expenses.add(expenseC, 'fun');

    expect(expenses.get()['other'].items.length).toEqual(2);
    expect(expenses.get()['fun'].items.length).toEqual(1);
    expect(expenses.sum()).toEqual(846.33);
  });

  it('should get an expense by category and index', () => {
    const expenseA = new Expense('gas', 35.78);
    const expenseB = new Expense('food', 560.1);

    const expenseC = new Expense('ski lessons', 250.45);

    const expenses = new ExpenseList();
    expenses.add(expenseA);
    expenses.add(expenseB);
    expenses.add(expenseC, 'fun');

    expect(expenses.get()['other'].items.length).toEqual(2);
    expect(expenses.get()['fun'].items.length).toEqual(1);
    expect(expenses.getByCategoryIndex('other', 1).money).toEqual(560.1);
  });

  it('deleting non existing category ID should return false', () => {
    const expenseA = new Expense('gas', 35.78);
    const expenseB = new Expense('food', 560.1);
    const expenseC = new Expense('ski lessons', 250.45);

    const expenses = new ExpenseList();
    expenses.add(expenseA);
    expenses.add(expenseB);
    expenses.add(expenseC, 'fun');

    const categoryID = 'this-is-not-an-id';

    expect(expenses.deleteCategoryID(categoryID)).toBe(false);
    expect(Object.keys(expenses.get()).length).toEqual(2);
  });

  it('should delete existing category by ID', () => {
    const expenseA = new Expense('gas', 35.78);
    const expenseB = new Expense('food', 560.1);
    const expenseC = new Expense('ski lessons', 250.45);

    const expenses = new ExpenseList();
    expenses.add(expenseA);
    expenses.add(expenseB);
    expenses.add(expenseC, 'fun');

    const categoryID = expenses.getCategory('fun').id;

    expect(expenses.deleteCategoryID(categoryID)).toBe(true);
    expect(Object.keys(expenses.get()).length).toEqual(1);
  });

  it.skip('should delete item with ID in category', () => {
    const expenseA = new Expense('gas', 35.78);
    const deletionId = expenseA.getId();
    const expenseB = new Expense('food', 560.1);
    const expenseC = new Expense('ski lessons', 250.45);

    const expenses = new ExpenseList();
    expenses.add(expenseA);
    expenses.add(expenseB);
    expenses.add(expenseC, 'fun');

    expect(expenses.delete('other', deletionId)).toBe(true);
    expect(expenses.get()['other'].items.length).toEqual(1);
    expect(expenses.get()['other'][0]).toBe(expenseB);
  });

  it('should return category items', () => {
    const expenseA = new Expense('gas', 35.78);
    const expenseB = new Expense('food', 560.1);

    const expenses = new ExpenseList();
    expenses.add(expenseA);
    expenses.add(expenseB);

    expect(expenses.getCategoryItems('other').length).toBe(2);
    expect(expenses.getCategoryItems('other')[0]).toBe(expenseA);
    expect(expenses.getCategoryItems('other')[1]).toBe(expenseB);
  });

  it('should get expense item by ID', () => {
    const expenseA = new Expense('gas', 35.78);
    const expenseB = new Expense('food', 560.1);
    const expenseC = new Expense('ski lessons', 250.45);

    const expenseID = expenseB.getId();

    const expenses = new ExpenseList();
    expenses.add(expenseA);
    expenses.add(expenseB, 'not fun');
    expenses.add(expenseC, 'fun');

    expect(expenses.getByID(expenseID).money).toEqual(560.1);
  });
});
