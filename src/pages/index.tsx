/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useCheckout } from '../mock-backend';
import { Item } from '../mock-backend/data';
import styles from './index.module.scss';

const Index = () => {
  const { items, buy, balance } = useCheckout();

  const [submitted, setSubmitted] = useState(false);

  const [sortedItems, setSortedItems] = useState<Item[]>([]);
  useEffect(() => {
    const sorted = items.sort((a, b) => b.inventory - a.inventory);
    setSortedItems(sorted);
  }, [items]);

  const buyItem = (id: number) => {
    setSubmitted(true);

    toast.promise(
      buy(id),
      {
        loading: 'Purchasing item ...',
        success: (response) => {
          setSubmitted(false);
          return 'Item purchased successfully';
        },
        error: (error) => {
          setSubmitted(false);
          const message = error.message;
          return message;
        },
      },
      {
        id: 'buy-item',
      }
    );
  };

  return (
    <main className={styles.main}>
      <div className="flex">
        <h1>Create, Inc. Store</h1>
        <h2 className="ml-auto">
          Balance: ${Math.round((balance + Number.EPSILON) * 100) / 100}
        </h2>
      </div>
      {/** @TODO: Not implemented */}
      <div className={'w-11/12 ml-6 items'}>
        {sortedItems.map((item) => {
          return (
            <div
              key={item.id}
              className={
                'bg-white ml-2 relative mt-4 flex w-96 p-8 pb-0 shopByCategory'
              }
            >
              {item.inventory === 0 && (
                <button
                  className="absolute w-28 bg-red-500 -mt-8 -ml-8 text-white rounded-tr-lg
           rounded-br-md rounded-bl-lg"
                >
                  Sold out
                </button>
              )}

              <div className={`${item.inventory === 0 ? 'mt-4' : ''}`}>
                <h1 className="font-black mb-4">{item.name}</h1>
                <h2>${item.price}</h2>
                <h3 className="mb-4">{item.inventory} remaining</h3>
              </div>
              <div
                className={`flex h-20 ml-auto ${
                  item.inventory === 0 ? 'mt-4' : ''
                }`}
              >
                <button
                  onClick={() => buyItem(item.id)}
                  disabled={submitted}
                  className="text-white bg-black h-12 px-4 text-center rounded "
                >
                  <p>Buy</p>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Index;
