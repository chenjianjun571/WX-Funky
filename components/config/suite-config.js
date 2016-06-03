/**
 * Created by chenjianjun on 16/5/27.
 */
import { BaseConfig } from './base'
import _ from 'lodash'

const SuiteConfig  = {
  // 顶部广告
  MediaSlider: _.merge({
    dataUrl: 'vda/suite_top',
    aspectRatio: '3:2',
    height: 460
  }, BaseConfig),

  Banner:[
    {
      imageUrl: '//img2.jsbn.com/static/m_suite_banner_01.jpg'
    }
  ],

  SuiteList:_.merge({
    dataUrl:'suite/suite_list',
    params:{
      pageSize:3,
      pageIndex:1
    }
  },BaseConfig)
}

export { SuiteConfig }
