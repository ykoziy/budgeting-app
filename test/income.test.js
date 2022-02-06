import Income from '../src/model/income';

describe('Testing Income class', () => {
  it('should set title and income with new Income("full-time job", 32456)', () => {
    const income = new Income('full-time job', 32456);
    expect(income.title).toEqual('full-time job');
    expect(income.money).toEqual(32456);
  });
});
