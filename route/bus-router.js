/**
 * Created by chenjianjun on 16/6/24.
 */
import Router from 'koa-router'
import React, { PropTypes } from 'react'
import _ from 'lodash'
import thunkify from 'thunkify-wrap'

var BusProcessMrg = require('../src/server/bus/bus-process').Instance()
var proxyFetcher = thunkify.genify(BusProcessMrg.post)
const busRouter = new Router()

// 获取验证码
busRouter.post('/bus/sms', function* index(next) {
  console.log(JSON.stringify(this.request.body))
  this.body = yield* proxyFetcher('/bus/sms', this.request.body)
})
// 提交酒店需求
busRouter.post('/bus/hotelSurvey', function* index(next) {
  console.log(JSON.stringify(this.request.body))
  this.body = yield* proxyFetcher('/bus/hotelSurvey', this.request.body)
})

export { busRouter }
