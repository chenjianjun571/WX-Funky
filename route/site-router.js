/**
 * Created by chenjianjun on 16/6/24.
 */
import Router from 'koa-router'
import React, { PropTypes } from 'react'
import { renderToString } from 'react-dom/server'
import _ from 'lodash'

import { MenuConfig } from '../components/config/menu-config'
import { ComponentsIndex, ComponentsSeo } from '../components/config/components-index'
import { FirstNavigation } from '../components/first-navigation.jsx'
import { SecondNavigation } from '../components/second-navigation.jsx'
import { DetailType } from '../src/utils/detail-type'

const siteRouter = new Router()

const renderOption = (templateName, menuKey, parentKey, params={}, platformType=0) => {
  let p = params
  // 把参数带给客户端
  _.merge(p,
    {
      'platformType':platformType,
      'menuKey':menuKey,
      'parentKey':parentKey,
      'mode': (process.env.NODE_ENV === 'production') ? 'production' : 'development'
    }
  )
  return {
    'mode': (process.env.NODE_ENV === 'production') ? 'production' : 'development',
    'title':ComponentsSeo[templateName].seoTitle,
    'seoKeywords':ComponentsSeo[templateName].seoKeywords,
    'seoDescription':ComponentsSeo[templateName].seoDescription,
    'reactMarkup': renderToString(ComponentsIndex[templateName]),
    'navFirst': renderToString(<FirstNavigation menuKey={menuKey} parentKey={parentKey} />),
    'navSecond': renderToString(<SecondNavigation menuKey={menuKey} parentKey={parentKey} />),
    'main': templateName,
    'params': JSON.stringify(p)
  }
}
siteRouter.post('/debuger', function *(next) {
  console.log('post:'+this.request.body.msg)
  this.body = 'ok'
});
/*********************************** 首页 *************************************/
siteRouter.get('/', function* (next) {
  yield this.render('modules/default', renderOption('home', '/home', '/home'))
})
siteRouter.get('/home', function* (next) {
  yield this.render('modules/default', renderOption('home', '/home', '/home'))
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
// 客片
siteRouter.get('/pringles', function* (next) {
  yield this.render('modules/default', renderOption('pringles', '/pringles', '/shot'))
})
// 套系
siteRouter.get('/suite', function* (next) {
  yield this.render('modules/default', renderOption('suite', '/suite', '/shot'))
})
// 微电影
siteRouter.get('/movie', function* (next) {
  yield this.render('modules/default', renderOption('movie', '/movie', '/shot'))
})
/************************************** 婚庆定制 ***************************************/
// 婚庆定制首页
siteRouter.get('/scheme', function* (next) {
  yield this.render('modules/default', renderOption('scheme', '/scheme', '/scheme'))
})
// 实景案例
siteRouter.get('/case', function* (next) {
  yield this.render('modules/default', renderOption('case', '/case', '/scheme'))
})
// 婚礼跟拍
siteRouter.get('/followPhoto', function* (next) {
  yield this.render('modules/default', renderOption('follow-photo', '/followPhoto', '/scheme'))
})
// 婚礼视频
siteRouter.get('/followVideo', function* (next) {
  yield this.render('modules/default', renderOption('follow-video', '/followVideo', '/scheme'))
})
// 选婚礼人(四大金刚)
siteRouter.get('/f4', function* (next) {
  yield this.render('modules/default', renderOption('f4', '/f4', '/scheme', this.request.query))
})
// 礼服
siteRouter.get('/dress', function* (next) {
  yield this.render('modules/default', renderOption('dress', '/dress', '/scheme'))
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
  yield this.render('modules/default', renderOption('hotel-details', '/hotel', '/hotel', this.params))
})
// 提交婚宴预订需求
siteRouter.get('/hotel-require', function* (next) {
  yield this.render('modules/default', renderOption('hotel-require', '/hotel-require', '/hotel'))
})
///** 宴会厅详情 **/
//siteRouter.get('/hall/:id', function* (next) {
//  yield this.render('modules/default', renderOption('hall-details', '/hotel', '/hotel',this.params))
//})
///** 酒店位置地图 **/
//siteRouter.get('/map/:longitude/:latitude', function* (next) {
//  yield this.render('modules/default', renderOption('map-location', '/hotel', '/hotel',this.params))
//})

/** 活动详情页 **/
siteRouter.get('/activity/detail/:name', function* index(next) {
  let menuKey = '/'
  if (this.request.query.menuKey) {
    menuKey = '/'+this.request.query.menuKey;
  }
  let parentKey = '/'
  if (this.request.query.parentKey) {
    parentKey = '/'+this.request.query.parentKey
  }
  yield this.render('modules/default', renderOption('activity', menuKey, parentKey, this.params))
})

export { siteRouter }
