exports.up = async function up(sql) {
  await sql`
	CREATE Table orders(
		orders_id SERIAL,
		date date not null,
		address VARCHAR(100) not null,
		total_price FLOAT
	);
	`;
};

exports.down = async function down(sql) {
  await sql`
	DROP TABLE orders;
	`;
};
