import Expense from '../src/model/expense';
import ExpenseList from '../src/model/expenseList';

describe('Testing ExpenseList class', () => {
  it('should allow to add multiple expenses without category, adding two. Will be in other category by default', () => {
    const expenseA = new Expense('gas', 35.78);
    const expenseB = new Expense('food', 560.1);

    const expenses = new ExpenseList();
    expenses.add(expenseA);
    expenses.add(expenseB);

    expect(expenses.get()['other'].length).toEqual(2);
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

    expect(expenses.get()['other'].length).toEqual(2);
    expect(expenses.get()['fun'].length).toEqual(1);
    expect(expenses.sumCategory('other')).toEqual(595.88);
    expect(expenses.sumCategory('fun')).toEqual(250.45);
  });

  it('deleting non existing category should return false', () => {
    const expenseA = new Expense('gas', 35.78);
    const expenseB = new Expense('food', 560.1);

    const expenses = new ExpenseList();
    expenses.add(expenseA);
    expenses.add(expenseB);

    expect(expenses.deleteCategory('fun')).toBe(false);
  });

  it('should delete existing category', () => {
    const expenseA = new Expense('gas', 35.78);
    const expenseB = new Expense('food', 560.1);
    const expenseC = new Expense('ski lessons', 250.45);

    const expenses = new ExpenseList();
    expenses.add(expenseA);
    expenses.add(expenseB);
    expenses.add(expenseC, 'fun');

    expect(expenses.deleteCategory('other')).toBe(true);
    expect(Object.keys(expenses.get()).length).toEqual(1);
  });
});
