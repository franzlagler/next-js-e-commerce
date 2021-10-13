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
  return await sql`
  SELECT * FROM products;
  `;
}

export async function getReviews() {
  return await sql`
  SELECT * FROM reviews;
  `;
}

export async function getOrders() {
  return await sql`
  SELECT * FROM orders;
  `;
}
