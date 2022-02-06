import Income from '../src/model/income';
import IncomeList from '../src/model/incomeList';

describe('Testing IncomeList class', () => {
  it('should allow to add multiple incomes, adding two.', () => {
    const incomeA = new Income('full-time job', 32400);
    const incomeB = new Income('crypto', 2000);

    const incomes = new IncomeList();
    incomes.add(incomeA);
    incomes.add(incomeB);

    expect(incomes.get()['income'].length).toEqual(2);
  });

  it('should allow getting income by index', () => {
    const incomeA = new Income('full-time job', 32400);
    const incomeB = new Income('crypto', 2000);

    const incomes = new IncomeList();
    incomes.add(incomeA);
    incomes.add(incomeB);

    expect(incomes.getByIndex(0).money).toEqual(32400);
  });

  it('sum of 0 items should be 0', () => {
    const incomes = new IncomeList();
    expect(incomes.sum()).toEqual(0);
  });

  it('should return the sum of all incomes. Other (two incomes totaling: ', () => {
    const incomeA = new Income('full-time job', 32400);
    const incomeB = new Income('crypto', 2000);

    const incomes = new IncomeList();
    incomes.add(incomeA);
    incomes.add(incomeB);

    expect(incomes.get()['income'].length).toEqual(2);

    expect(incomes.sum()).toEqual(34400);
  });

  it('deleting non existing income item should return false', () => {
    const incomeA = new Income('full-time job', 32400);
    const incomeB = new Income('crypto', 2000);

    const incomes = new IncomeList();
    incomes.add(incomeA);
    incomes.add(incomeB);

    incomes.delete('gifts');

    expect(incomes.get()['income'].length).toEqual(1);
  });

  it('should delete income item', () => {
    const incomeA = new Income('full-time job', 32400);
    const incomeB = new Income('crypto', 2000);

    const incomes = new IncomeList();
    incomes.add(incomeA);
    incomes.add(incomeB);

    incomes.delete(incomeB.title);

    expect(incomes.get()['income'].length).toEqual(1);
  });
});
