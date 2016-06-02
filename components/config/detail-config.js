/**
 * Created by chenjianjun on 16/6/2.
 */
import _ from 'lodash'

import { DetailType } from '../../src/utils/detail-type'

const DetailConfig = new Map();

DetailConfig[DetailType.Sample]={
  dataUrl:'sample/detail/:id'
}

DetailConfig[DetailType.Pringles]={
  dataUrl:'pringles/detail/:id'
}

DetailConfig[DetailType.Suite]={
  dataUrl:'suite/detail/:id'
}

export { DetailConfig }
