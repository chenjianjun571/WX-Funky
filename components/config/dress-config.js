/**
 * Created by chenjianjun on 16/5/27.
 */

import { BaseConfig } from './base'
import _ from 'lodash'

const DressConfig  = {
  Base:BaseConfig,

  'MediaSlider':_.merge({
    'dataUrl':'vda/dress_top',
    'aspectRatio':'3:2',
    'height':460
  },BaseConfig),

  Banner:[
    {
      imageUrl: '//img2.jsbn.com/static/m_sample_banner_01.jpg'
    }
  ],

  DressType:_.merge({
    dataUrl:'dressType/all'
  },BaseConfig),

  DressBrand:_.merge({
    dataUrl:'dressBrand/all'
  },BaseConfig)
}

export { DressConfig}
