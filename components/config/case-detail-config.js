/**
 * Created by chenjianjun on 16/5/27.
 */
import { BaseConfig } from './base'
import _ from 'lodash'

const CaseDetailsConfig  = {
  'CaseDetails':_.merge({
    'dataUrl':'cases/detail/:id',
  },BaseConfig)
}

export { CaseDetailsConfig }
