/**
 * @jest-environment jsdom
 */

import { incrementAmountInCart } from '../cartItems';
import { getCookies, setCookies, updateCookies } from '../cookies';

test('adds a new item to cookie', () => {
  setCookies('test1', [{ name: 'test1' }]);
  expect(getCookies('test1', [{ name: 'test1' }])).toEqual([{ name: 'test1' }]);
});

test('delete an item from cookie', () => {
  setCookies('test2', [{ name: 'test2' }, { name: 'test2' }]);
  expect(updateCookies('test2', [{ name: 'test2' }])).toEqual([
    { name: 'test2' },
  ]);
});

test('update amount of cookie', () => {
  const cookie = updateCookies('test3', [
    { id: 1, amount: 2 },
    { id: 2, amount: 4 },
  ]);
  const updatedCookie = incrementAmountInCart(2, cookie);
  expect(updateCookies('test3', updatedCookie)).toEqual([
    { id: 1, amount: 2 },
    { id: 2, amount: 5 },
  ]);
});
