import { BaseConfig } from './base'
import _ from 'lodash'

const FollowPhotoConfig = {
  'MediaSlider':_.merge({
    'dataUrl':'vda/weddingpat_top',
    'aspectRatio':'3:2',
    'height':460
  },BaseConfig),
}

export { FollowPhotoConfig }
