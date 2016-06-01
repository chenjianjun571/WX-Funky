/**
 * Created by chenjianjun on 16/5/27.
 */
import { BaseConfig } from './base'
import _ from 'lodash'

const CaseConfig = {
  MediaSlider:_.merge({
    'dataUrl':'cases/scheme_recommend?pageIndex=1&pageSize=6',
    'aspectRatio':'3:2',
    'height':460
  },BaseConfig),

  Banner:[
    {
      imageUrl: '//img2.jsbn.com/static/m_sample_banner_01.jpg'
    }
  ],

  StyleFilter:_.merge({
    dataUrl:'caseStyle/all'
  },BaseConfig),

  'CaseList':_.merge({
    dataUrl:'cases/scheme_list'
  },BaseConfig),
}

export { CaseConfig }
