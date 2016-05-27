/**
 * Created by chenjianjun on 16/5/26.
 */
import { BaseConfig } from './base'
import _ from 'lodash'

const SampleDetailConfig  = {
  'SampleDetailUrl':_.merge({
    'dataUrl':'sample/detail/:id'
  },BaseConfig)
}

export { SampleDetailConfig }
