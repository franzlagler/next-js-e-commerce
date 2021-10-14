exports.up = async function up(sql) {
  await sql`
	CREATE Table reviews(
		review_id SERIAL,
		author varchar(50) not null,
		text VARCHAR(200) not null
	);
	`;
};

exports.down = async function down(sql) {
  await sql`
	DROP TABLE orders;
	`;
};
