const express = require('express');
const router = express.Router();
const CHECK_PARAMS_TABLE = 'check_params';
const db = require('../model/mysql.operation');

router.get('/', async (req, res, next) => {
  let sql = `SELECT * FROM ${CHECK_PARAMS_TABLE}`;
  let result = await db.query(sql, []);
  if(result.length > 0) {
    res.send({code: '200', message: '查询成功', data: result[0]})
  } else {
    res.send({code: '404', message: '没有查到数据'})
  }
});

router.post('/', async (req, res, next) => {
  let sql = `INSERT INTO ${CHECK_PARAMS_TABLE} (id, minWind, maxWind, minEarthTemp, maxEarthTemp, minTemperature, maxTemperature, minPressure, maxPressure, minHumidity, maxHumidity) VALUES (0, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    params = [req.body.minWind, req.body.maxWind, req.body.minEarthTemp, req.body.maxEarthTemp, req.body.minTemperature, req.body.maxTemperature, req.body.minPressure, req.body.maxPressure, req.body.minHumidity, req.body.maxHumidity];
  let result = await db.query(sql, params);
  if(result) {
    res.send({code: '200', message: '创建成功'})
  } else {
    res.send({code: '400', message: '参数错误'})
  }
});

router.put('/', async (req, res, next) => {
  let sql = `UPDATE ${CHECK_PARAMS_TABLE} set minWind = ?, maxWind = ?, minEarthTemp = ?, maxEarthTemp = ?, minTemperature = ?, maxTemperature = ?, minPressure = ?, maxPressure = ?, minHumidity = ?, maxHumidity = ? WHERE id = ?`,
    params = [req.body.minWind, req.body.maxWind, req.body.minEarthTemp, req.body.maxEarthTemp, req.body.minTemperature, req.body.maxTemperature, req.body.minPressure, req.body.maxPressure, req.body.minHumidity, req.body.maxHumidity, req.body.id];
  let result = await db.query(sql, params);
  if(result) {
    res.send({code: '200', message: '修改成功'})
  } else {
    res.send({code: '404', message: '修改失败'})
  }
});

module.exports = router;
