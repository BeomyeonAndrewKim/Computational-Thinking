const mysql = require('mysql')
const obj = {
  connectionLimit: 100,
  host: 'localhost',
  user: 'root',
  password: 'hot0918',
  database: 'test'
}; //json

const pool = mysql.createPool(obj);
const sql = "update memeber set name=?, email=?, tel=? where id=?";
const arr = ['홍길순', 'soon@abc.com', '010-1111-2222', 'hong'];
pool.getConnection((err, conn) => {
  if (err) { console.log('err=', err); return; }
  conn.query(sql, arr, (err, rows) => {
    if (err) { console.log('err=', err); return; }
    console.log('저장 완료');
    conn.release();
  });
});