import React, { PropTypes } from 'react'

import { Home } from '../home.jsx'

import { Shot } from '../shot.jsx'
import { Sample } from '../sample.jsx'
import { Pringles } from '../pringles.jsx'
import { Suite } from '../suite.jsx'
import { Movie } from '../movie.jsx'

import { Scheme } from '../scheme.jsx'
import { Case } from '../case.jsx'
import { Car } from '../car.jsx'
import { Dress } from '../dress.jsx'
import { FollowPhoto } from '../follow-photo.jsx'
import { FollowVideo } from '../follow-video.jsx'
import { F4 } from '../f4.jsx'
import { Supply } from '../supply.jsx'

import { Hotel } from '../hotel.jsx'
import { Activity} from '../activity.jsx'

import { Detail } from '../detail.jsx'

const ComponentsIndex = {
  'home': <Home />,

  'shot': <Shot />,
  'sample': <Sample />,
  'pringles': <Pringles />,
  'suite': <Suite />,
  'movie': <Movie />,

  'scheme': <Scheme />,
  'case': <Case />,
  'follow-photo': <FollowPhoto />,
  'follow-video': <FollowVideo />,
  'f4': <F4 />,
  'dress': <Dress />,
  'supply': <Supply />,
  'car': <Car />,

  'hotel': <Hotel />,
  'activity': <Activity />,
  'detail':<Detail />
}
const ComponentsSeo= {
  'home': {
    'seoTitle':'金色百年',
    'seoKeywords':'',
    'seoDescription':''
  },
  'shot': {
    'seoTitle':'婚纱摄影',
    'seoKeywords':'',
    'seoDescription':''
  },
  'sample': {
    'seoTitle':'作品欣赏',
    'seoKeywords':'',
    'seoDescription':''
  },
  'pringles': {
    'seoTitle':'客片欣赏',
    'seoKeywords':'',
    'seoDescription':''
  },
  'suite': {
    'seoTitle':'套系报价',
    'seoKeywords':'',
    'seoDescription':''
  },
  'movie': {
    'seoTitle':'微电影',
    'seoKeywords':'',
    'seoDescription':''
  },
  'scheme': {
    'seoTitle':'婚庆定制',
    'seoKeywords':'',
    'seoDescription':''
  },
  'case': {
    'seoTitle':'实景案例',
    'seoKeywords':'',
    'seoDescription':''
  },
  'follow-photo': {
    'seoTitle':'婚礼跟拍',
    'seoKeywords':'',
    'seoDescription':''
  },
  'follow-video': {
    'seoTitle':'婚礼视频',
    'seoKeywords':'',
    'seoDescription':''
  },
  'f4': {
    'seoTitle':'四大金刚',
    'seoKeywords':'',
    'seoDescription':''
  },
  'dress': {
    'seoTitle':'婚纱礼服',
    'seoKeywords':'',
    'seoDescription':''
  },
  'supply': {
    'seoTitle':'婚礼用品',
    'seoKeywords':'',
    'seoDescription':''
  },
  'car': {
    'seoTitle':'婚车租赁',
    'seoKeywords':'',
    'seoDescription':''
  },

  'hotel': {
    'seoTitle':'婚宴预订',
    'seoKeywords':'',
    'seoDescription':''
  },
  'activity': {
    'seoTitle':'活动详情',
    'seoKeywords':'',
    'seoDescription':''
  },
  'detail': {
    'seoTitle':'详情',
    'seoKeywords':'',
    'seoDescription':''
  },
}

export {
  ComponentsIndex,
  ComponentsSeo
}
