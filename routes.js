import Router from 'koa-router'
import React, { PropTypes } from 'react'
import { renderToString } from 'react-dom/server'
import _ from 'lodash'

import { MenuConfig } from './components/config/menu-config'
import { ComponentsIndex, ComponentsSeo } from './components/config/components-index'

import { Navigation } from './components/navigation.jsx'
import { Home } from './components/home.jsx'

const siteRouter = new Router()
const renderOption = (templateName, menuKey, parentKey, platformType, params) => {
  let p = params || {}

  // 把平台类型放到参数里面带给客户端
  _.merge(p,{'platformType':platformType})

  return {
    'title':ComponentsSeo[templateName].seoTitle,
    'seoKeywords':ComponentsSeo[templateName].seoKeywords,
    'seoDescription':ComponentsSeo[templateName].seoDescription,
    'reactMarkup': renderToString(ComponentsIndex[templateName]),
    'reactNavMarkup': renderToString(<Navigation menuKey={parentKey} currentKey={menuKey} />),
    'main': templateName,
    'params': JSON.stringify(p),
    'mode': (process.env.NODE_ENV === 'production') ? 'production' : 'development'
  }
}

/*********************************** 首页 *************************************/
siteRouter.get('/', function* (next) {
  yield this.render('modules/default', renderOption('home', '/', '/', this.platformType, this.request.query))
})
siteRouter.get('/home', function* (next) {
  yield this.render('modules/default', renderOption('home', '/home', '/home', this.platformType, this.request.query))
})
/*********************************** 婚纱摄影 *************************************/
// 婚纱摄影首页
siteRouter.get('/shot', function* (next) {
  yield this.render('modules/default', renderOption('shot', '/shot', '/shot'))
})
// 作品(样片)
siteRouter.get('/sample', function* (next) {
  yield this.render('modules/default', renderOption('sample', '/sample', '/shot'))
})
// 作品(样片)详情
siteRouter.get('/sample/:id', function* (next) {
  yield this.render('modules/default', renderOption('sample-details', '/sample', '/shot',this.params))
})
// 客片
siteRouter.get('/pringles', function* (next) {
  yield this.render('modules/default', renderOption('pringles', '/pringles', '/shot'))
})
// 客片详情
siteRouter.get('/pringles/:id', function* (next) {
  yield this.render('modules/default', renderOption('pringles-details', '/pringles', '/shot',this.params))
})
// 套系
siteRouter.get('/suite', function* (next) {
  yield this.render('modules/default', renderOption('suite', '/suite', '/shot'))
})
// 套系详情
siteRouter.get('/suite/:id', function* (next) {
  yield this.render('modules/default', renderOption('suite-details', '/suite', '/shot',this.params))
})
// 微电影
siteRouter.get('/movie', function* (next) {
  yield this.render('modules/default', renderOption('movie', '/movie', '/shot'))
})
// 微电影详情
siteRouter.get('/movie-details', function* (next) {
  yield this.render('modules/default', renderOption('movie-details', '/movie', '/shot', this.request.query))
})
/************************************** 婚庆定制 ***************************************/
// 婚庆定制首页
siteRouter.get('/scheme', function* (next) {
  yield this.render('modules/default', renderOption('scheme', '/scheme', '/scheme'))
})
// 实景案例
siteRouter.get('/cases', function* (next) {
  yield this.render('modules/default', renderOption('cases', '/cases', '/scheme'))
})
// 实景案例详情
siteRouter.get('/cases/:id', function* (next) {
  yield this.render('modules/default', renderOption('cases-details', '/cases', '/scheme',this.params))
})
// 婚礼跟拍
siteRouter.get('/followPhoto', function* (next) {
  yield this.render('modules/default', renderOption('follow-photo', '/followPhoto', '/scheme'))
})
// 婚礼跟拍详情
siteRouter.get('/followPhoto/:id', function* (next) {
  yield this.render('modules/default', renderOption('follow-photo-details', '/followPhoto', '/scheme',this.params))
})
// 婚礼视频
siteRouter.get('/followVideo', function* (next) {
  yield this.render('modules/default', renderOption('follow-video', '/followVideo', '/scheme'))
})
// 婚礼视频详情
siteRouter.get('/followVideo/:id', function* (next) {
  yield this.render('modules/default', renderOption('follow-video-details', '/followVideo', '/scheme',this.params))
})
// 选婚礼人(四大金刚)
siteRouter.get('/f4', function* (next) {
  yield this.render('modules/default', renderOption('f4', '/f4', '/scheme', this.request.query))
})
// 礼服
siteRouter.get('/dress', function* (next) {
  yield this.render('modules/default', renderOption('dress', '/dress', '/scheme'))
})
// 礼服详情
siteRouter.get('/dress-details', function* (next) {
  yield this.render('modules/default', renderOption('dress-details', '/dress', '/scheme', this.request.query))
})
// 婚礼用品
siteRouter.get('/supply', function* (next) {
  yield this.render('modules/default', renderOption('supply', '/supply', '/scheme'))
})
// 婚车租赁
siteRouter.get('/car', function* (next) {
  yield this.render('modules/default', renderOption('car', '/car', '/scheme'))
})
/****************************************** 婚宴预订 *********************************************/
// 婚宴预订首页
siteRouter.get('/hotel', function* (next) {
  yield this.render('modules/default', renderOption('hotel', '/hotel', '/hotel'))
})
/** 婚宴酒店详情页 **/
siteRouter.get('/hotel/:id', function* (next) {
  yield this.render('modules/default', renderOption('hotel-details', '/hotel', '/hotel',this.params))
})
/** 宴会厅详情 **/
siteRouter.get('/hall/:id', function* (next) {
  yield this.render('modules/default', renderOption('hall-details', '/hotel', '/hotel',this.params))
})
/** 酒店位置地图 **/
siteRouter.get('/map/:longitude/:latitude', function* (next) {
  yield this.render('modules/default', renderOption('map-location', '/hotel', '/hotel',this.params))
})
// 提交婚宴预订需求
siteRouter.get('/hotel-require', function* (next) {
  yield this.render('modules/default', renderOption('hotel-require', '/hotel-require', '/hotel'))
})

/** 活动详情页 **/
siteRouter.get('/activity/detail/:name', function* (next) {
  yield this.render('modules/default', renderOption('activity', '/activity', '/', this.platformType, this.params))
})

export { siteRouter }
