/**
 * Created by chenjianjun on 16/5/26.
 */
import { BaseConfig } from './base'
import _ from 'lodash'

const SchemeConfig  = {
  MediaSlider: _.merge({
    dataUrl: 'vda/scheme_index_top',
    aspectRatio: '3:2',
    height: 460
  }, BaseConfig), // 广告轮播

  // 最佳案例热区
  BestCasesHot: _.merge({
    dataUrl: 'cases/scheme_index_recommend_list', // 数据请求地址
  },BaseConfig),

  // 婚礼用品&婚车租赁热区
  SupplyCarHot: _.merge({
    dataUrl: 'vda/scheme_car_and_supplies?pageIndex=1&pageSize=4', // 数据请求地址
  },BaseConfig),
}

export { SchemeConfig }
