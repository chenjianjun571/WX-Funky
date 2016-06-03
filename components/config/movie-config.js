/**
 * Created by chenjianjun on 16/5/27.
 */
import { BaseConfig } from './base'
import _ from 'lodash'

const MovieConfig  = {
  // 顶部广告
  'MediaSlider': _.merge({
    'dataUrl': 'vda/movie_top',
    'aspectRatio': '3:2',
    'height': 460
  }, BaseConfig),

  'Banner':[
    {
      imageUrl: '//img2.jsbn.com/static/m_wdy_banner_01.jpg'
    }
  ],

  // 微电影 videoType 1:爱情MV 2:爱情微电影 3:婚纱纪实MV
  MovieList:_.merge({
    'dataUrl':'video/movie_list'
  },BaseConfig),

}

export { MovieConfig }
