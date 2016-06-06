import { BaseConfig } from './base'
import _ from 'lodash'

const FollowVideoConfig = {
  Base:BaseConfig,

  'MediaSlider':_.merge({
    'dataUrl':'vda/weddingvideo_top',
    'aspectRatio':'3:2',
    'height':460
  },BaseConfig),

  Banner:[
    {
      imageUrl: '//img2.jsbn.com/static/m_sample_banner_01.jpg'
    }
  ],

  FollowVideoList:_.merge({
    dataUrl:'followVideo/weddingvideo_list'
  },BaseConfig),
}

export { FollowVideoConfig }
