exports.up = async function up(sql) {
  await sql`
	CREATE Table products(
		product_id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
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
