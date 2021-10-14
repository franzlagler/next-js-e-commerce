exports.up = async function up(sql) {
  await sql`
	CREATE Table ordered_products(
		orders_id integer REFERENCES orders(orders_id) ON DELETE CASCADE,
		products_id integer REFERENCES products(products_id) ON DELETE CASCADE,
		amount integer
	);
	`;
};

exports.down = async function down(sql) {
  await sql`
	DROP TABLE ordered_products;
	`;
};
