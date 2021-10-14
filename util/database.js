import camelcaseKeys from 'camelcase-keys';
import dotenvSafe from 'dotenv-safe';
import postgres from 'postgres';

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

export async function getProducts() {
  const products = await sql`
  SELECT * FROM products;
  `;

  return products.map((product) => camelcaseKeys(product));
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

export async function addOrder(date, address, totalPrice) {
  await sql`
  INSERT INTO orders (date, address, total_price)
  VALUES (${date}, ${address}, ${totalPrice})
  `;
}
