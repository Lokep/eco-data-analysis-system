const express = require('express');
const router = express.Router();
const ECO_DATA_TABLE = 'ecoData';
const db = require('../model/mysql.operation');

router.get('/', function(req, res, next) {
  let sql = `SELECT * FROM ${ECO_DATA_TABLE}`,
    result = db.query(sql, []);
  if(result.length > 0) {
    res.send({code: '200', message: '查询成功', data: result})
  } else {
    res.send({code: '404', message: '数据为空'})
  }
});

router.get('/by_date', function(req, res, next) {
  let sql = `SELECT * FROM ${ECO_DATA_TABLE} WHERE datetime > ?`,
    params = [req.query.datetime],
    result = db.query(sql, params);
  if(result.length > 0) {
    res.send({code: '200', message: '查询成功', data: result})
  } else {
    res.send({code: '404', message: '数据为空'})
  }
});

router.get('/wind', async(req, res, next) => {
  let sql = `SELECT 2minSpeed, datetime FROM ${ECO_DATA_TABLE} WHERE unix_timestamp(datetime) BETWEEN unix_timestamp(?) AND unix_timestamp(?)`,
    params = [req.query.startDateTime, req.query.endDateTime],
    result = await db.query(sql, params);
  if(result.length > 0) {
    res.send({code: '200', message: '查询成功', data: result})
  } else {
    res.send({code: '404', message: '数据为空'})
  }
});

router.get('/rain', async(req, res, next) => {
  let sql = `SELECT 1hourRainFall, datetime FROM ${ECO_DATA_TABLE} WHERE unix_timestamp(datetime) BETWEEN unix_timestamp(?) AND unix_timestamp(?)`,
    params = [req.query.startDateTime, req.query.endDateTime],
    result = await db.query(sql, params);
  if(result.length > 0) {
    res.send({code: '200', message: '查询成功', data: result})
  } else {
    res.send({code: '404', message: '数据为空'})
  }
});

router.get('/temperature', async(req, res, next) => {
  let sql = `SELECT maxTemperature, datetime FROM ${ECO_DATA_TABLE} WHERE unix_timestamp(datetime) BETWEEN unix_timestamp(?) AND unix_timestamp(?)`,
    params = [req.query.startDateTime, req.query.endDateTime],
    result = await db.query(sql, params);
  if(result.length > 0) {
    res.send({code: '200', message: '查询成功', data: result})
  } else {
    res.send({code: '404', message: '数据为空'})
  }
});

router.get('/earth', async(req, res, next) => {
  let sql = `SELECT surfaceGroundTemperature, datetime FROM ${ECO_DATA_TABLE} WHERE unix_timestamp(datetime) BETWEEN unix_timestamp(?) AND unix_timestamp(?)`,
    params = [req.query.startDateTime, req.query.endDateTime],
    result = await db.query(sql, params);
  if(result.length > 0) {
    res.send({code: '200', message: '查询成功', data: result})
  } else {
    res.send({code: '404', message: '数据为空'})
  }
});

router.get('/pressure', async(req, res, next) => {
  let sql = `SELECT stationPressure, datetime FROM ${ECO_DATA_TABLE} WHERE unix_timestamp(datetime) BETWEEN unix_timestamp(?) AND unix_timestamp(?)`,
    params = [req.query.startDateTime, req.query.endDateTime],
    result = await db.query(sql, params);
  if(result.length > 0) {
    res.send({code: '200', message: '查询成功', data: result})
  } else {
    res.send({code: '404', message: '数据为空'})
  }
});

module.exports = router;
