import { BaseConfig } from './base'
import _ from 'lodash'

const FollowVideoConfig = {
  'MediaSlider':_.merge({
    'dataUrl':'vda/weddingvideo_top',
    'aspectRatio':'3:2',
    'height':460
  },BaseConfig)
}

export { FollowVideoConfig }
