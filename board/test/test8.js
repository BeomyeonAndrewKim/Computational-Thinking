const mysql = require('mysql')
const obj = {
  connectionLimit: 100,
  host: 'localhost',
  user: 'root',
  password: 'hot0918',
  database: 'test'
}; //json

const pool = mysql.createPool(obj);
const sql = "DELETE FROM memeber WHERE id=?";
const arr = ['hong'];
pool.getConnection((err, conn) => {
  if (err) { console.log('err=', err); return; }
  conn.query(sql, arr, (err, rows) => {
    if (err) { console.log('err=', err); return; }
    console.log('삭제 완료');
    conn.release();
  });
});