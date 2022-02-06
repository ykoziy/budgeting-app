import Expense from '../src/model/expense';

describe('Testing Expense class', () => {
  it('should set title and cost with new Expense("gas", 35)', () => {
    const expense = new Expense('gas', 35.89);
    expect(expense.title).toEqual('gas');
    expect(expense.cost).toEqual(35.89);
  });
});
