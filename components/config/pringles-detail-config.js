/**
 * Created by chenjianjun on 16/5/26.
 */
import { BaseConfig } from './base'
import _ from 'lodash'

const PringlesDetailConfig  = {
  'PringlesDetailUrl':_.merge({
    'dataUrl':'pringles/detail/:id'
  },BaseConfig)
}

export { PringlesDetailConfig }
