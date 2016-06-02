import { BaseConfig } from './base'
import _ from 'lodash'

const SupplyConfig = {
  'MediaSlider': _.merge({
    'dataUrl': 'vda/supplies_top',
    'height': 460,
    'aspectRatio': '3:2'
  }, BaseConfig),

  Banner:[
    {
      imageUrl: '//img2.jsbn.com/static/m_sample_banner_01.jpg'
    }
  ],

  SupplyList: _.merge({
    dataUrl: 'weddingsupplies/supplies_list',
  }, BaseConfig),

  // 分类
  TypesCategory: _.merge({
    dataUrl: 'suppliesType/all'
  }, BaseConfig),

  // 品牌
  BrandCategory: _.merge({
    dataUrl: 'suppliesBrand/all'
  }, BaseConfig),

}

export { SupplyConfig }
