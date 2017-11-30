var express = require('express');
var router = express.Router();

const mysql = require('mysql')
const obj = {
  connectionLimit: 100,
  host: 'localhost',
  user: 'root',
  password: 'hot0918',
  database: 'test'
}; //json

const pool = mysql.createPool(obj);

/* http://localhost:3000 */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

// http://localhost:3000/writeform
router.get('/writeform', (req, res, next) => {
  res.render('writeform', { title: '게시판 글쓰기' });
});

router.post('/write', (req, res, next) => {
  console.log('req.body=', req.body);
  const writer = req.body.writer;
  const pwd = req.body.pwd;
  const subject = req.body.subject;
  const content = req.body.content;

  const sql = "insert into board(writer, pwd, subject, content) values(?,?,?,?)";
  const arr = [writer, pwd, subject, content];
  pool.getConnection((err, conn) => {
    if (err) { return next(err) }
    conn.query(sql, arr, (err, rows) => {
      if (err) { return next(err) }
      console.log('저장 완료');
      conn.release();
      res.send('OK');
    });
  });
});
module.exports = router;

/*CREATE TABLE `board` (
	`num` INT(11) NOT NULL AUTO_INCREMENT,
	`pwd` VARCHAR(20) NOT NULL,
	`subject` VARCHAR(100) NOT NULL,
	`content` TEXT NOT NULL,
	`writer` VARCHAR(20) NOT NULL,
	`regdate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`hit` INT(11) NULL DEFAULT NULL,
	PRIMARY KEY (`num`)
)*/