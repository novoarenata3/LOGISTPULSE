const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'logistpulse-db',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'logistpulse_pass',
  database: process.env.DB_NAME || 'logistpulse_db',
});

const initDb = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      tracking_code VARCHAR(50) UNIQUE NOT NULL,
      destination VARCHAR(100) NOT NULL,
      status VARCHAR(30) DEFAULT 'EN_TRANSITO',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(query);
};

initDb().catch(console.error);

module.exports = {
  createOrder: async (trackingCode, destination) => {
    const res = await pool.query(
      'INSERT INTO orders (tracking_code, destination) VALUES ($1, $2) RETURNING *',
      [trackingCode, destination]
    );
    return res.rows[0];
  },
  getOrders: async () => {
    const res = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
    return res.rows;
  },
  pool
};
