/**
 * Created by chenjianjun on 16/5/27.
 */
import { BaseConfig } from './base'
import _ from 'lodash'

const SampleConfig  = {
  // 顶部广告
  'MediaSlider': _.merge({
    'dataUrl': 'vda/index_top',
    'aspectRatio': '3:2',
    'height': 460
  }, BaseConfig),
}

export { SampleConfig }
