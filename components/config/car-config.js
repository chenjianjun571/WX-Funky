import { BaseConfig } from './base'
import _ from 'lodash'

const CarConfig = {
  MediaSlider: _.merge({
    dataUrl: 'vda/car_top',
    height: 460,
    aspectRatio: '3:2'
  }, BaseConfig),

  Banner:[
    {
      imageUrl: '//img2.jsbn.com/static/m_car_banner_01.jpg'
    }
  ],

  CarList:_.merge({
    dataUrl:'car/car_list'
  },BaseConfig),

  // 婚车车型
  ModelCategory: _.merge({
    dataUrl: 'carModels/all'
  }, BaseConfig),

  // 婚车品牌
  BrandCategory: _.merge({
    'dataUrl': 'carBrand/all'
  }, BaseConfig),

  // 档次
  LevelCategory: _.merge({
    dataUrl: 'carLevel/all'
  }, BaseConfig)
}

export { CarConfig }
