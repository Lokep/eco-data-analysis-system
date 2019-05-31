const express = require('express');
const router = express.Router();
const ECO_DATA_TABLE = 'ecoData';
const CHECK_PARAMS_TABLE = 'check_params';
const db = require('../model/mysql.operation');

router.get('/wind', async(req, res, next) => {
  let sql = `SELECT maxSpeed FROM ${ECO_DATA_TABLE} WHERE unix_timestamp(datetime) >= unix_timestamp(?)`,
    params = [req.query.datetime],
    result = await db.query(sql, params);
  let selectSql = `SELECT minWind, maxWind FROM ${CHECK_PARAMS_TABLE}`, scope = await db.query(selectSql, []);
  if(result.length > 0) {
    res.send({code: '200', message: '查询成功', data: {type: '风速', currentValue: result[0].maxSpeed, min: scope[0].minWind, max: scope[0].maxWind}})
  } else {
    res.send({code: '404', message: '没有查询到数据'})
  }
});

router.get('/rain', async(req, res, next) => {
  let sql = `SELECT airHumidity FROM ${ECO_DATA_TABLE} WHERE unix_timestamp(datetime) >= unix_timestamp(?)`,
    params = [req.query.datetime],
    result = await db.query(sql, params);
  let selectSql = `SELECT minHumidity, maxHumidity FROM ${CHECK_PARAMS_TABLE}`, scope = await db.query(selectSql, []);
  if(result.length > 0) {
    res.send({code: '200', message: '查询成功', data: {type: '湿度', currentValue: result[0].airHumidity, min: scope[0].minHumidity, max: scope[0].maxHumidity}})
  } else {
    res.send({code: '404', message: '没有查询到数据'})
  }
});

router.get('/temperature', async(req, res, next) => {
  let sql = `SELECT maxTemperature FROM ${ECO_DATA_TABLE} WHERE unix_timestamp(datetime) >= unix_timestamp(?)`,
    params = [req.query.datetime],
    result = await db.query(sql, params);
  let selectSql = `SELECT minTemperature, maxTemperature FROM ${CHECK_PARAMS_TABLE}`, scope = await db.query(selectSql, []);
  if(result.length > 0) {
    res.send({code: '200', message: '查询成功', data: {type: '气温', currentValue: result[0].maxTemperature, min: scope[0].minTemperature, max: scope[0].maxTemperature}})
  } else {
    res.send({code: '404', message: '没有查询到数据'})
  }
});

router.get('/earth', async(req, res, next) => {
  let sql = `SELECT surfaceGroundTemperature FROM ${ECO_DATA_TABLE} WHERE unix_timestamp(datetime) >= unix_timestamp(?)`,
    params = [req.query.datetime],
    result = await db.query(sql, params);
  let selectSql = `SELECT minEarthTemp, maxEarthTemp FROM ${CHECK_PARAMS_TABLE}`, scope = await db.query(selectSql, []);
  if(result.length > 0) {
    res.send({code: '200', message: '查询成功', data: {type: '地表温度', currentValue: result[0].surfaceGroundTemperature, min: scope[0].minEarthTemp, max: scope[0].maxEarthTemp}})
  } else {
    res.send({code: '404', message: '没有查询到数据'})
  }
});

router.get('/pressure', async(req, res, next) => {
  let sql = `SELECT stationPressure FROM ${ECO_DATA_TABLE} WHERE unix_timestamp(datetime) >= unix_timestamp(?)`,
    params = [req.query.datetime],
    result = await db.query(sql, params);
  let selectSql = `SELECT minPressure, maxPressure FROM ${CHECK_PARAMS_TABLE}`, scope = await db.query(selectSql, []);
  if(result.length > 0) {
    res.send({code: '200', message: '查询成功', data: {type: '气压', currentValue: result[0].stationPressure, min: scope[0].minPressure, max: scope[0].maxPressure}})
  } else {
    res.send({code: '404', message: '没有查询到数据'})
  }
});

module.exports = router;
