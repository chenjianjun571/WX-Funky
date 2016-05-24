/**
 * Created by chenjianjun on 16/5/10.
 */
import { BaseConfig } from './base'
import _ from 'lodash'

const ActivityConfig  = {
  'ActiveData':_.merge({
    'dataUrl':'activity/detail/'
  },BaseConfig)
}

export { ActivityConfig }
