/**
 * Created by chenjianjun on 16/5/26.
 */
import { BaseConfig } from './base'
import _ from 'lodash'

const HotelConfig  = {
  'MediaSlider': _.merge({
    'dataUrl': 'vda/hotel_top',
    'aspectRatio': '3:2',
    'height': 460
  }, BaseConfig),

  HotelType:_.merge({
    dataUrl:'hotelType/all'
  },BaseConfig),

  HotelDistrict:_.merge({
    dataUrl:'hotelDistrict/all'
  },BaseConfig),

  HotelList:_.merge({
    dataUrl:'hotel/hotel_list'
  },BaseConfig),
}

export { HotelConfig }
