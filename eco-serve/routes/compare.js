const express = require('express');
const router = express.Router();
const ECO_DATA_TABLE = 'ecoData';
const db = require('../model/mysql.operation');


router.get('/wind', async(req, res, next) => {
  let sql = `SELECT InstantaneousSpeed, InstantaneousDirection, 2minSpeed, 2minDirection, 10minSpeed, 10minDirection, largeSpeed, largeDirection, largeWindTime, maxSpeed, maxDirection, maxWindTime FROM ${ECO_DATA_TABLE} WHERE unix_timestamp(datetime) >= unix_timestamp(?)`,
    params = [req.query.datetime],
    result = await db.query(sql, params);
  if(result.length > 0) {
    res.send({code: '200', message: '查询成功', data: result[0]})
  } else {
    res.send({code: '404', message: '数据为空'})
  }
});

router.get('/rain', async(req, res, next) => {
  let sql = `SELECT 1minRainFall, 1hourRainFall, relativeHumidity, minHumidity, minHumidityShowTime FROM ${ECO_DATA_TABLE} WHERE unix_timestamp(datetime) >= unix_timestamp(?)`,
    params = [req.query.datetime],
    result = await db.query(sql, params);
  if(result.length > 0) {
    res.send({code: '200', message: '查询成功', data: result[0]})
  } else {
    res.send({code: '404', message: '数据为空'})
  }
});

router.get('/temperature', async(req, res, next) => {
  let sql = `SELECT airHumidity, maxTemperatureShowTime, maxTemperature, minTemperatureShowTime, minTemperature FROM ${ECO_DATA_TABLE} WHERE unix_timestamp(datetime) >= unix_timestamp(?)`,
    params = [req.query.datetime],
    result = await db.query(sql, params);
  if(result.length > 0) {
    res.send({code: '200', message: '查询成功', data: result[0]})
  } else {
    res.send({code: '404', message: '数据为空'})
  }
});

router.get('/earth', async(req, res, next) => {
  let sql = `SELECT surfaceGroundTemperature, 5cmGroundTemperature, 10cmGroundTemperature, 15cmGroundTemperature, 20cmGroundTemperature, allRadiation FROM ${ECO_DATA_TABLE} WHERE unix_timestamp(datetime) >= unix_timestamp(?)`,
    params = [req.query.datetime],
    result = await db.query(sql, params);
  if(result.length > 0) {
    res.send({code: '200', message: '查询成功', data: result[0]})
  } else {
    res.send({code: '404', message: '数据为空'})
  }
});

router.get('/pressure', async(req, res, next) => {
  let sql = `SELECT stationPressure, maxPressureShowTime, maxPressure, minPressureShowTime, minPressure FROM ${ECO_DATA_TABLE} WHERE unix_timestamp(datetime) >= unix_timestamp(?)`,
    params = [req.query.datetime],
    result = await db.query(sql, params);
  if(result.length > 0) {
    res.send({code: '200', message: '查询成功', data: result[0]})
  } else {
    res.send({code: '404', message: '数据为空'})
  }
});

module.exports = router;
