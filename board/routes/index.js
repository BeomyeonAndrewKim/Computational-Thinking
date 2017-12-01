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

// http://localhost:3000/list : get 방식
router.get('/list', (req, res, next) => {
  //res.send("여기는 list입니다!");
  pool.getConnection((err, conn) => {
    if (err) { return next(err) }
    const sql =
      `SELECT num, 
      subject, 
      writer, 
      DATE_FORMAT(regdate, '%Y-%c-%d %T') as regdate, 
      hit
 FROM board 
 ORDER BY num DESC`
    const arr = [];
    conn.query(sql, arr, (err, rows) => {
      console.log('rows=', rows);
      conn.release();
      var obj = { "title": "게시판 리스트", "rows": rows };
      // res.json(obj); // 모바일 서버
      res.render('list', obj); //웹 서버
    });
  });
});

router.get('/read/:num', (req, res, next) => {
  let num = req.params.num;
  // if (err) { return next(err) }
  // res.json({ num: num });
  pool.getConnection((err, conn) => {
    if (err) { return next(err) }
    let update_sql = "update board set hit = hit + 1 where num=?";
    let arr = [num];
    conn.query(update_sql, arr, (err, result) => {
      if (err) { return next(err) }
      console.log('result=', result);
      let sql = "SELECT * FROM board WHERE num=?";
      conn.query(sql, arr, (err, rows) => {
        if (err) { return next(err) }
        console.log('rows=', rows);
        conn.release();
        let obj = {
          title: "게시판 글 읽기",
          row: rows[0]
        };
        res.render('read', obj)
      });
    });
  });
});

router.get('/updateform/:num', (req, res, next) => {
  let num = req.params.num;
  // res.json({ num: num });
  // 1. SELECT -> 보여준다.
  pool.getConnection((err, conn) => {
    if (err) { return next(err) }
    let sql = "select * from board where num=?";
    let arr = [num];
    conn.query(sql, arr, (err, rows) => {
      if (err) { return next(err) }
      console.log('row=', rows);
      conn.release();
      let obj = {
        title: "게시판 수정",
        row: rows[0]
      };
      res.render('updateform', obj);
    });
  });

});
router.post('/update', (req, res, next) => {
  console.log('req.body=', req.body);
  const num = req.body.num;
  // writeform.ejs에서 정의한
  // <input type="hidden" name="num">에 정의한 값 받기
  const writer = req.body.writer;
  const pwd = req.body.pwd;
  const subject = req.body.subject;
  const content = req.body.content;
  pool.getConnection((err, conn) => {
    if (err) { return next(err) }
    const sql = "UPDATE board SET writer=?, subject=?, content=? WHERE num=? and pwd=?";
    const arr = [writer, subject, content, num, pwd];
    conn.query(sql, arr, (err, result) => {
      if (err) { return next(err) }
      console.log("result=", result);
      conn.release();
      if (result.affectedRows == 1) {
        res.redirect('/list'); //리스트로 이동
      } else {
        res.send("<script>alert('비밀번호가 틀려서 되돌아갑니다.'); history.back();</script>")
      };
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