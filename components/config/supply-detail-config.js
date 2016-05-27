/**
 * Created by chenjianjun on 16/5/27.
 */
import { BaseConfig } from './base'
import _ from 'lodash'

const SupplyDetailConfig = {
  'SupplyDetailUrl':_.merge({
    'dataUrl':'supply/detail/:id'
  },BaseConfig)
}

export { SupplyDetailConfig }
