/**
 * Created by chenjianjun on 16/5/16.
 */
import { BaseConfig } from './base'
import _ from 'lodash'

const FollowPhotoDetailsConfig  = {
  'FollowPhotoDetails':_.merge({
    'dataUrl':'followPhoto/detail/:id'
  },BaseConfig)
}

export { FollowPhotoDetailsConfig }
