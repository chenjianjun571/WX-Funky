/**
 * Created by chenjianjun on 16/3/15.
 */
import { BaseConfig } from './base'
import _ from 'lodash'

const FollowVideoDetailsConfig  = {
  'FollowVideoDetails':_.merge({
    'dataUrl':'followVideo/detail/:id'
  },BaseConfig)
}

export { FollowVideoDetailsConfig }
