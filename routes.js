import Router from 'koa-router'
import React, { PropTypes } from 'react'
import { renderToString } from 'react-dom/server'
import _ from 'lodash'

import { MenuConfig } from './components/config/menu-config'
import { ComponentsIndex, ComponentsSeo } from './components/config/components-index'
import { FirstNavigation } from './components/first-navigation.jsx'
import { SecondNavigation } from './components/second-navigation.jsx'
import { DetailType } from './src/utils/detail-type'

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
//// 微电影详情
//siteRouter.get('/movie-details', function* (next) {
//  yield this.render('modules/default', renderOption('movie-details', '/movie', '/shot', this.request.query))
//})
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

/** 详情页面 **/
siteRouter.get('/detail/:type/:id', function* (next) {
  switch (parseInt(this.params.type)) {
    case DetailType.Sample:
    {
      // 样片详情
      yield this.render('modules/default', renderOption('detail', '/sample', '/shot', this.params))
      break;
    }
    case DetailType.Pringles:
    {
      // 客片详情
      yield this.render('modules/default', renderOption('detail', '/pringles', '/shot', this.params))
      break;
    }
    case DetailType.Suite:
    {
      // 套系详情
      yield this.render('modules/default', renderOption('detail', '/suite', '/shot', this.params))
      break;
    }
    case DetailType.Case:
    {
      // 实景案例详情
      yield this.render('modules/default', renderOption('detail', '/cases', '/scheme',this.params))
      break;
    }
    case DetailType.FollowPhoto:
    {
      // 婚礼跟拍详情
      yield this.render('modules/default', renderOption('detail', '/followPhoto', '/scheme',this.params))
      break;
    }
    case DetailType.FollowVideo:
    {
      // 婚礼视频详情
      yield this.render('modules/default', renderOption('detail', '/followVideo', '/scheme',this.params))
      break;
    }
    case DetailType.Car:
    {
      // 婚车详情
      yield this.render('modules/default', renderOption('detail', '/car', '/scheme', this.params))
      break;
    }
    case DetailType.Supply:
    {
      // 用品详情
      yield this.render('modules/default', renderOption('detail', '/supply', '/scheme', this.params))
      break;
    }
    case DetailType.Dress:
    {
      // 礼服详情
      yield this.render('modules/default', renderOption('detail', '/dress', '/scheme', this.params))
      break;
    }
  }
})

/** 活动详情页 **/
siteRouter.get('/activity/detail/:name', function* (next) {
  yield this.render('modules/default', renderOption('activity', '/activity', '/', this.params))
})

export { siteRouter }
