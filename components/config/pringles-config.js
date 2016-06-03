/**
 * Created by chenjianjun on 16/5/27.
 */
import { BaseConfig } from './base'
import _ from 'lodash'

const PringlesConfig  = {
  // 顶部广告
  'MediaSlider': _.merge({
    dataUrl: 'vda/index_top',
    aspectRatio: '3:2',
    height: 460
  }, BaseConfig),

  Banner:[
    {
      imageUrl: '//img2.jsbn.com/static/m_pringles_banner_01.jpg'
    }
  ],

  BestPringles:_.merge({
    'dataUrl':'pringles/weddingshot_index_best_pringles?pageIndex=1&pageSize=4',
  },BaseConfig),

  SeasonList:_.merge({
    dataUrl:'pringlesSeason/all'
  },BaseConfig),

  PringlesList:_.merge({
    dataUrl:'pringles/pringles_season'
  },BaseConfig),
}

export { PringlesConfig }
