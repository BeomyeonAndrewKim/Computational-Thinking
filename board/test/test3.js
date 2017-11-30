const mysql = require('mysql')
const obj = {
  connectionLimit: 100,
  host: 'localhost',
  user: 'root',
  password: 'hot0918',
  database: 'test'
}; //json

const pool = mysql.createPool(obj);

pool.getConnection((err, conn) => {
  if (err) { console.log('err=', err); return; }

  conn.query('SELECT 1 + 1 as solution',
    (err, rows) => {
      console.log('rows=', rows);
      const a = rows[0];
      console.log('row=', a);
      console.log('row.solution=', a.solution);
      conn.release();
    });
});