import camelcaseKeys from 'camelcase-keys';
import dotenvSafe from 'dotenv-safe';
import postgres from 'postgres';

module.exports = function setPostgresDefaultsOnHeroku() {
  if (process.env.DATABASE_URL) {
    const { parse } = require('pg-connection-string');

    // Extract the connection information from the Heroku environment variable
    const { host, database, user, password } = parse(process.env.DATABASE_URL);

    // Set standard environment variables
    process.env.PGHOST = host;
    process.env.PGDATABASE = database;
    process.env.PGUSERNAME = user;
    process.env.PGPASSWORD = password;
  }
};

dotenvSafe.config();

function connectOneTimeToDatabase() {
  let sql;

  if (process.env.NODE_ENV === 'production') {
    // Heroku needs SSL connections but
    // has an "unauthorized" certificate
    // https://devcenter.heroku.com/changelog-items/852
    sql = postgres({ ssl: { rejectUnauthorized: false } });
  } else {
    if (!globalThis.__postgresSqlClient) {
      globalThis.__postgresSqlClient = postgres();
    }
    sql = globalThis.__postgresSqlClient;
  }

  return sql;
}

// Connect to PostgreSQL
const sql = connectOneTimeToDatabase();

export async function getAllProducts() {
  const products = await sql`
  SELECT * FROM products;
  `;

  return products.map((product) => camelcaseKeys(product));
}

export async function getSingleProduct(keyword) {
  const product = await sql`
  SELECT * FROM products where keyword=${keyword}
  `;
  return product.map((el) => camelcaseKeys(el));
}

export async function getReviews() {
  const previews = await sql`
  SELECT * FROM reviews;
  `;
  return previews.map((preview) => camelcaseKeys(preview));
}

export async function getOrders() {
  const orders = await sql`
  SELECT * FROM orders;
  `;
  return orders.map((order) => camelcaseKeys(order));
}

export async function addOrderDetails(date, address, totalPrice) {
  const orderId = await sql`
  INSERT INTO orders (date, address, total_price)
  VALUES (${date}, ${address}, ${totalPrice})
  RETURNING order_id
  `;
  return camelcaseKeys(orderId[0]);
}

export async function addOrderedProducts(orderId, orderedProducts) {
  console.log('database');
  console.log(orderedProducts);
  for (const object of orderedProducts) {
    await sql`
    INSERT INTO ordered_products (order_id, product_id, amount)
    VALUES (${orderId}, ${object.id}, ${object.amount})
    `;
  }
}
