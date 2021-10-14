exports.up = async function up(sql) {
  await sql`
	INSERT INTO reviews(author, text)
	VALUES
	('Donald Trump', 'Their products are just beautiful. Fell in love with all of them. This will be huge!'),
	('Bernie Sanders', 'I totally support small enterprises that are competing against big greedy corporations.'),
	('Hillary Clinton', 'Support American enterprises. And vote for me please!'),
	('Michelle Obama', 'When they go healthy, we go candy!')



	`;
};

exports.down = async function down(sql) {
  await sql`
	DELETE FROM products;
	`;
};
