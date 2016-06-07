import { BaseConfig } from './base'
import _ from 'lodash'

const FollowPhotoConfig = {
  'MediaSlider':_.merge({
    'dataUrl':'vda/weddingpat_top',
    'aspectRatio':'3:2',
    'height':460
  },BaseConfig),

  Banner:[
    {
      imageUrl: '//img2.jsbn.com/static/m_follow_photo_banner_01.jpg'
    }
  ],

  FollowPhotoList:_.merge({
    dataUrl:'followPhoto/weddingpat_list'
  },BaseConfig),
}

export { FollowPhotoConfig }
