const express = require('express');
const router = express.Router();

const db = require('../model/mysql.operation');
const ADMIN_TABLE = 'admin';

/* GET users listing. */
router.get('/', async (req, res, next) => {
  let sql = `SELECT * FROM ${ADMIN_TABLE}`, params = [], result, name = req.query.name;
  if(name) {
    sql += ` WHERE name = ?`;
    params = [name];
  }
  result = await db.query(sql, params);
  if(result.length > 0) {
    res.send({code: '200', message: '查询成功', data: result})
  } else {
    res.send({code: "404", message: "未查询到相关信息"})
  }
});

router.post('/', async (req, res, next) => {
  let sql = `INSERT INTO ${ADMIN_TABLE} (id, state, date, name, phone, email, userID, password) VALUES(0, 1, ?, ?, ?, ?, ?, ?)`,
    params = [req.body.date, req.body.name, req.body.phone, req.body.email, req.body.userID, req.body.password],
    result = await db.query(sql, params);
  if(result) {
    res.send({code: '200', message: '添加成功'})
  } else {
    res.send({code: '400', message:'添加失败，请重试'})
  }
});

router.put('/', async (req, res, next) => {
  let sql = `UPDATE ${ADMIN_TABLE} set date = ?, name = ?, phone = ?, email = ?, userID = ?, password = ? WHERE id = ?`,
    params = [req.body.date, req.body.name, req.body.phone, req.body.email, req.body.userID, req.body.password, req.body.id],
    result = await db.query(sql, params);
  if(result) {
    res.send({code: '200', message: '修改成功'})
  } else {
    res.send({code: '404', message:'修改失败，请重试'})
  }
});

router.put('/frozen', async (req, res, next) => {
  let sql = `UPDATE ${ADMIN_TABLE} set state = ? WHERE id = ?`,
    params = [],
    result;
  if(req.body.state == 1) {
    params = [0, req.body.id]
  } else {
    params = [1, req.body.id]
  }
  result = await db.query(sql, params);
  if(result) {
    res.send({code: '200', message: '修改成功'})
  } else {
    res.send({code: '404', message:'修改失败，请重试'})
  }
});


router.delete('/', async (req, res, next) => {
  let sql = `DELETE FROM ${ADMIN_TABLE} WHERE id = ?`,
    params = [req.query.id],
    result;
  result = await db.query(sql, params);
  if(result) {
    res.send({code: '200', message: '删除成功'})
  } else {
    res.send({code: '404', message:'删除失败，请重试'})
  }
});

module.exports = router;
