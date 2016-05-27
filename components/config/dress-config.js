/**
 * Created by chenjianjun on 16/5/27.
 */

import { BaseConfig } from './base'
import _ from 'lodash'

const DressConfig  = {

  'MediaSlider':_.merge({
    'dataUrl':'vda/dress_top',
    'aspectRatio':'3:2',
    'height':460
  },BaseConfig),

  'DressType':_.merge({
    'dataUrl':'dressType/all'
  },BaseConfig),

  'DressBrand':_.merge({
    'dataUrl':'dressBrand/all?typeId='
  },BaseConfig)
}

export { DressConfig}
