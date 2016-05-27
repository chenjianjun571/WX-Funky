import { BaseConfig } from './base'
import _ from 'lodash'


const SupplyConfig = {
  'MediaSlider': _.merge({
    'dataUrl': 'vda/supplies_top',
    'height': 460,
    'aspectRatio': '3:2'
  }, BaseConfig),
  'TypesCategory': _.merge({
    'dataUrl': 'suppliesType/all'
  }, BaseConfig),
  'BrandCategory': _.merge({
    'dataUrl': 'suppliesBrand/all'
  }, BaseConfig),
  'SupplyItemList': _.merge({
      'dataUrl': 'weddingsupplies/supplies_list',
      'width': 276,
      'aspectRatio': '1:1',
      'params':{
        'pageIndex':1,
        'pageSize':8
      }
    }, BaseConfig),
  'SupplyItemDetail': _.merge({
    'dataUrl':'weddingsupplies/detail/:id'
  },BaseConfig)
  }

export { SupplyConfig }
