/**
 * Created by chenjianjun on 16/5/27.
 */
import { BaseConfig } from './base'
import _ from 'lodash'

const SampleConfig  = {
  // 顶部广告
  'MediaSlider': _.merge({
    'dataUrl': 'vda/samples_top',
    'aspectRatio': '3:2',
    'height': 460
  }, BaseConfig),

  'SampleList':_.merge({
    dataUrl:'sample/samples_list'
  },BaseConfig),

  // 风格条件
  'StyleFilter':_.merge({
    dataUrl:'shootStyle/all'
  },BaseConfig),

  // 外景地条件
  'ExteriorFilter':_.merge({
    'dataUrl':'exterior/all'
  },BaseConfig)

}

export { SampleConfig }
