/**
 * Created by chenjianjun on 16/5/26.
 */
import { BaseConfig } from './base'
import _ from 'lodash'

const SuiteDetailConfig  = {
  'SuiteDetailUrl':_.merge({
    'dataUrl':'suite/detail/:id'
  },BaseConfig)
}

export { SuiteDetailConfig }
