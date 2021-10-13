exports.up = async function up(sql) {
  await sql`
	CREATE Table products(
		products_id SERIAL,
		keyword varchar(50),
		name VARCHAR(100),
		price FLOAT
	);
	`;
};

exports.down = async function down(sql) {
  await sql`
	DROP TABLE products;
	`;
};
