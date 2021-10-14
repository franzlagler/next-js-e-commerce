import { getPrice } from '../orderPrice';

const sampleCart = [
  { id: 2, amount: 3 },
  { id: 5, amount: 8 },
];
const sampleProducts = [
  { productsId: 1, name: 'test', price: 4.5 },
  { productsId: 2, name: 'test', price: 2.8 },
  { productsId: 3, name: 'test', price: 1.5 },
  { productsId: 4, name: 'test', price: 7.9 },
  { productsId: 5, name: 'test', price: 3.7 },
];

test('calculates price correctly depending on data', () => {
  expect(getPrice(sampleCart, sampleProducts)).toEqual({
    subtotal: 38,
    total: 38,
  });
});
