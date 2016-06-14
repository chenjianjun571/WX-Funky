/**
 * Created by chenjianjun on 16/5/26.
 */
import { BaseConfig } from './base'
import _ from 'lodash'

const ShotConfig  = {
  // 顶部广告
  'MediaSlider': _.merge({
    'dataUrl': 'vda/weddingshot_index_top',
    'aspectRatio': '3:2',
    'height': 460
  }, BaseConfig),

  // 最佳样片热区
  BestSampleHot: _.merge({
    'dataUrl': 'sample/weddingshot_index_best_sample?pageIndex=1&pageSize=4', // 数据请求地址
  },BaseConfig),

  // 最佳客片热区
  BestPringlesHot: _.merge({
    'dataUrl': 'pringles/weddingshot_index_best_pringles?pageIndex=1&pageSize=6', // 数据请求地址
  },BaseConfig),

  // 最新活动
  NewActivityHot: _.merge({
    'dataUrl': 'vda/weddingshot_index_activity?pageIndex=1&pageSize=4', // 数据请求地址
  },BaseConfig)

}

export { ShotConfig }
