exports.up = async function up(sql) {
  await sql`
	INSERT INTO products(keyword, name, price )
	VALUES
	('butter-popcorn', 'Movie Theater Butter Popcorn' , 3.5 ),
	('original-coke ', 'Original Coke' , 2.1 ),
	('dark-chocolate-grapes', 'Dark Chocolate With Grape Filling ' , 4.1 ),
	('nut-chocolate', 'Extra Nut Chocolate  ' , 3.9 ),
	('extra-salty-chips', 'Extra Salty Chips ' , 3.8 ),
	('caramel-popcorn', 'Super Caramel Popcorn  ' , 3.6 ),
	('fanta-papaya', 'Fanta Papaya (Limited Edition)' , 2.4 ),
	('sneaky-bar', 'Sneaky Bar' , 2.6 ),
	('caffeine-bar', 'Crazy Caffeine Bar' , 2.8 ),
	('hot-pepper-chips ', 'Too Hot To Handle Pepper Chips' , 3.8 ),
	('monstrous-caffeine-booster', 'Monstrous Caffeine Booster' , 2.7 ),
	('ice-tea-peach ', 'Ice Tea Peach' , 2.4 ),
	('strawberry-donuts', 'Original Simpsons Strawberry Donuts (Five Pack)' , 5.5 ),
	('chocolate-donuts ', 'Sassy Chocolate Donuts (Five Pack)' , 5.5 ),
	('cinnamon-donuts ', 'Santa''s Favorite Cinnamon Donuts (Five Pack)' , 5.5 )


	`;
};

exports.down = async function down(sql) {
  await sql`
	DELETE FROM products;
	`;
};
