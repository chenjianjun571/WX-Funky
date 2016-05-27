/**
 * Created by chenjianjun on 16/5/27.
 */
import { BaseConfig } from './base'
import _ from 'lodash'

const DressDetailsConfig  = {
  'DressDetailUrl':_.merge({
    'dataUrl':'dress/dress_list?brandId=:brandId&typeId=:typeId'
  },BaseConfig)
}


export { DressDetailsConfig }