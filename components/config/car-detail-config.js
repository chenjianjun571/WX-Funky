/**
 * Created by chenjianjun on 16/5/27.
 */
import { BaseConfig } from './base'
import _ from 'lodash'

const CarDetailConfig = {
  'CarDetailUrl':_.merge({
    'dataUrl':'car/detail/:id'
  },BaseConfig)
}

export { CarDetailConfig }
