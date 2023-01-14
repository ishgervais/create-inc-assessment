import { Item } from './data';
import { sleep } from './utils';

type UserAndItemState = {
  balance: number;
  items: Item[];
};

/**
 * Modifies `state`, given an `itemId` to purchase
 * @returns {UserAndItemState} the updated state if a purchase should succeed
 */
export const executePurchase = async (
  itemId: Item['id'],
  state: UserAndItemState
): Promise<UserAndItemState> => {
  // NOTE: the following line intentionally pauses execution in this
  // function and MUST remain in tact for the assignment to replicate a
  // network request.
  await sleep(1000);

  // @TODO: Not implemented

  // check if user has enough balance
  // check if item is in stock
  // decrement item inventory
  // decrement user balance
  // return updated state

  const { balance, items } = state;
  const item = items.find((item) => item.id === itemId);
  if (!item) {
    throw new Error('Item not found');
  }

  if (item.inventory === 0) {
    throw new Error('Item out of stock');
  }

  if (balance < item.price) {
    throw new Error('Insufficient funds');
  }

  return {
    balance: balance - item.price,
    items: items.map((item) =>
      item.id === itemId ? { ...item, inventory: item.inventory - 1 } : item
    ),
  };
};
