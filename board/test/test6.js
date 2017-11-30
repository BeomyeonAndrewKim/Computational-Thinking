const mysql = require('mysql')
const obj = {
  connectionLimit: 100,
  host: 'localhost',
  user: 'root',
  password: 'hot0918',
  database: 'test'
}; //json

const pool = mysql.createPool(obj);
const sql = "insert into memeber(id, name, email, tel) values(?,?,?,?)";
const arr = ['hong', '홍길동', 'hong@aaa.com', '010-1234-5678'];
pool.getConnection((err, conn) => {
  if (err) { console.log('err=', err); return; }
  conn.query(sql, arr, (err, rows) => {
    if (err) { console.log('err=', err); return; }
    console.log('저장 완료');
    conn.release();
  });
});