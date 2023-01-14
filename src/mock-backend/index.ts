import { useState } from 'react';
import { initialBalance, initialItems, Item } from './data';
import { executePurchase } from './purchase';

type UseCheckout = {
  items: Item[];
  balance: number;

  /**
   * Charges the current account with the `price` in USD and decrements an item's inventory
   *
   * @throws if the current account does not have enough or if no inventory
   *
   */
  buy: (itemId: Item['id']) => Promise<void>;
};

export const useCheckout = (): UseCheckout => {
  const [items, setItems] = useState(initialItems);
  const [balance, setBalance] = useState(initialBalance);

  return {
    buy: async (itemId: Item['id']) => {
      return executePurchase(itemId, {
        balance: balance,
        items: items,
      })
        .then((result) => {
          setBalance(result.balance);
          setItems(result.items);

          return result;
        })
        .catch((error) => {
          throw error;
        });
    },
    items,
    balance,
  };
};
