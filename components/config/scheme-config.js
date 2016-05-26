/**
 * Created by chenjianjun on 16/5/26.
 */
import { BaseConfig } from './base'
import _ from 'lodash'

const SchemeConfig  = {
  'MediaSlider': _.merge({
    'dataUrl': 'vda/index_top',
    'aspectRatio': '3:2',
    'height': 460
  }, BaseConfig), // 广告轮播
}

export { SchemeConfig }
