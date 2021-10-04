/* CREATE TABLE products (
  id SERIAL,
  keyword VARCHAR(60),
  name VARCHAR(60),
  price FLOAT,
  image VARCHAR(10)
);

INSERT INTO products (keyword, name, price, image) VALUES
  ('butter-popcorn','Movie Theater Butter Popcorn',3.5,'img1'),
  ('original-coke','Original Coke',2.1,'img2'),
  ('dark-chocolate-grapes','Dark Chocolate With Grape Filling',4.1,'img3'),
  ('extra-salty-chips','Extra Salty Chips',3.9,'img4'),
  ('nut-chocolate','Extra Nut Chocolate',3.8,'img5'),
  ('caramel-popcorn','Super Caramel Popcorn',3.6,'img6'),
  ('fanta-papaya','Fanta Papaya (Limited Edition),',2.4,'img7'),
  ('sneaky-bar','Sneaky Bar',2.6,'img8'),
  ('caffeine-bar','Crazy Caffeine Bar',2.8,'img9'),
  ('hot-pepper-chips','Too Hot To Handle Pepper Chips',3.8,'img10'),
  ('strawberry-donuts','Strawberry Donuts (Five Pack),',5.5,'img11'),
  ('chocolate-donuts','Chocolate Donuts (Five Pack),',5.5,'img12'),
  ('cinnamon-donuts','Cinnamon Donuts (Five Pack),',5.5,'img13'),
  ('monstrous-caffeine-booster','Monstrous Caffeine Booster',2.7,'img14'),
  ('ice-tea-peach','Ice Tea Peach',2.4,'img15'); */


UPDATE products
SET name="Original Simpsons Strawberry Donuts (Five Pack)"
WHERE id=11;
const productData = [
  {
    id: '1',
    keyword: 'butter-popcorn',
    name: 'Movie Theater Butter Popcorn',
    price: 5.2,
    label: ['food', 'salty'],
    image: product1,
  },
  {
    id: '2',
    keyword: 'original-coke',
    name: 'Original Coke',
    price: 2.4,
    label: ['drink', 'sweet'],

    image: product2,
  },
  {
    id: '3',
    keyword: 'dark-chocolate-grapes',
    name: 'Dark Chocolate With Grape Filling',
    price: 5.2,
    label: ['food', 'sweet'],
    image: product3,
  },
  {
    id: '4',
    keyword: 'extra-salty-chips',
    name: 'Extra Salty Chips',
    price: 5.2,
    label: ['food', 'salty'],
    image: product4,
  },
  {
    id: '5',
    keyword: 'nut-chocolate',
    name: 'Extra Nut Chocolate',
    price: 5.2,
    label: ['food', 'sweet'],
    image: product5,
  },
  {
    id: '6',
    keyword: 'caramel-popcorn',
    name: 'Super Caramel Popcorn',
    price: 5.2,
    label: ['food', 'sweet'],
    image: product6,
  },
  {
    id: '7',
    keyword: 'fanta-papaya',
    name: 'Fanta Papaya (Limited Edition),',
    price: 5.2,
    label: ['drink', 'sweet'],
    image: product7,
  },
  {
    id: '8',
    keyword: 'sneaky-bar',
    name: 'Sneaky Bar',
    price: 5.2,
    label: ['food', 'sweet'],
    image: product8,
  },
  {
    id: '9',
    keyword: 'caffeine-bar',
    name: 'Crazy Caffeine Bar',
    price: 5.2,
    label: ['food', 'sweet'],
    image: product9,
  },

  {
    id: '10',
    keyword: 'hot-pepper-chips',
    name: 'Too Hot To Handle Pepper Chips',
    price: 5.2,
    label: ['food', 'salty'],
    image: product10,
  },
  {
    id: '11',
    keyword: 'strawberry-donuts',
    name: 'Strawberry Donuts (Five Pack),',
    price: 5.2,
    label: ['food', 'sweet'],
    image: product11,
  },
  {
    id: '12',
    keyword: 'chcolocate-donuts',
    name: 'Chocolate Donuts (Five Pack),',
    price: 5.2,
    label: ['food', 'sweet'],
    image: product12,
  },
  {
    id: '13',
    keyword: 'cinnamon-donuts',
    name: 'Cinnamon Donuts (Five Pack),',
    price: 5.2,
    label: ['food', 'sweet'],
    image: product13,
  },
  {
    id: '14',
    keyword: 'monstrous-caffeine-booster',
    name: 'Monstrous Caffeine Booster',
    price: 5.2,
    food: ['drink', 'sweet'],
    image: product14,
  },
  {
    id: '15',
    keyword: 'ice-tea-peach',
    name: 'Ice Tea Peach',
    price: 5.2,
    food: ['drink', 'sweet'],
    image: product15,
  },
];