exports.up = async function up(sql) {
  await sql`
	CREATE Table ordered_products(
		order_id integer REFERENCES orders(order_id) ON DELETE CASCADE,
		product_id integer REFERENCES products(product_id) ON DELETE CASCADE,
		amount integer
	);
	`;
};

exports.down = async function down(sql) {
  await sql`
	DROP TABLE ordered_products;
	`;
};
