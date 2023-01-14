import { executePurchase } from '../purchase';

describe('purchase', () => {
  // @TODO
  test.todo('[BONUS] Implement tests for the `executePurchase`');

  test('should throw an error if the item is not found', () => {
    const state = {
      balance: 100,
      items: [
        {
          id: 1,
          name: 'Item 1',
          price: 10,
          inventory: 1,
        },
      ],
    };
    expect(executePurchase(2, state)).rejects.toThrowError('Item not found');
  });

  test('should throw an error if the item is out of stock', () => {
    const state = {
      balance: 100,
      items: [
        {
          id: 1,
          name: 'Item 1',
          price: 10,
          inventory: 0,
        },
      ],
    };

    expect(executePurchase(1, state)).rejects.toThrowError('Item out of stock');
  });

  test('should throw an error if the user does not have enough balance', () => {
    const state = {
      balance: 5,
      items: [
        {
          id: 1,
          name: 'Item 1',
          price: 10,
          inventory: 1,
        },
      ],
    };

    expect(executePurchase(1, state)).rejects.toThrowError(
      'Insufficient funds'
    );
  });

  test('should decrement the item inventory and user balance', () => {
    const state = {
      balance: 100,
      items: [
        {
          id: 1,
          name: 'Item 1',
          price: 10,
          inventory: 1,
        },
      ],
    };

    executePurchase(1, state).then((result) => {
      expect(result.balance).toEqual(90);
      expect(result.items[0].inventory).toEqual(0);
    });
  });
});
