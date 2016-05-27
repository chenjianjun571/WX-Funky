import React, { PropTypes } from 'react'

import { Home } from '../home.jsx'

import { Shot } from '../shot.jsx'
import { Sample } from '../sample.jsx'
import { SampleDetail } from '../sample-detail.jsx'
import { Pringles } from '../pringles.jsx'
import { PringlesDetail } from '../pringles-detail.jsx'
import { Suite } from '../suite.jsx'
import { SuiteDetail } from '../suite-detail.jsx'
import { Movie } from '../movie.jsx'

import { Scheme } from '../scheme.jsx'
import { Case } from '../case.jsx'
import { CaseDetail } from '../case-detail.jsx'
import { Car } from '../car.jsx'
import { CarDetail } from '../car-detail.jsx'
import { Dress } from '../dress.jsx'
import { DressDetail } from '../dress-detail.jsx'
import { FollowPhoto } from '../follow-photo.jsx'
import { FollowPhotoDetail } from '../follow-photo-detail.jsx'
import { FollowVideo } from '../follow-video.jsx'
import { FollowVideoDetail } from '../follow-video-detail.jsx'
import { F4 } from '../f4.jsx'
import { Supply } from '../supply.jsx'
import { SupplyDetail } from '../supply-detail.jsx'

import { Hotel } from '../hotel.jsx'
import { Activity} from '../activity.jsx'

const ComponentsIndex = {
  'home': <Home />,

  'shot': <Shot />,
  'sample': <Sample />,
  'sample-detail': <SampleDetail />,
  'pringles': <Pringles />,
  'pringles-detail': <PringlesDetail />,
  'suite': <Suite />,
  'suite-detail': <SuiteDetail />,
  'movie': <Movie />,

  'scheme': <Scheme />,
  'case': <Case />,
  'case-detail': <CaseDetail />,
  'follow-photo': <FollowPhoto />,
  'follow-photo-detail': <FollowPhotoDetail />,
  'follow-video': <FollowVideo />,
  'follow-video-detail': <FollowVideoDetail />,
  'f4': <F4 />,
  'dress': <Dress />,
  'dress-detail': <DressDetail />,
  'supply': <Supply />,
  'supply-detail': <SupplyDetail />,
  'car': <Car />,
  'car-detail': <CarDetail />,

  'hotel': <Hotel />,
  'activity': <Activity />
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
  'sample-detail': {
    'seoTitle':'作品详情',
    'seoKeywords':'',
    'seoDescription':''
  },
  'pringles': {
    'seoTitle':'客片欣赏',
    'seoKeywords':'',
    'seoDescription':''
  },
  'pringles-detail': {
    'seoTitle':'客片详情',
    'seoKeywords':'',
    'seoDescription':''
  },
  'suite': {
    'seoTitle':'套系报价',
    'seoKeywords':'',
    'seoDescription':''
  },
  'suite-detail': {
    'seoTitle':'报价详情',
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
  'case-detail': {
    'seoTitle':'案例详情',
    'seoKeywords':'',
    'seoDescription':''
  },
  'follow-photo': {
    'seoTitle':'婚礼跟拍',
    'seoKeywords':'',
    'seoDescription':''
  },
  'follow-photo-detail': {
    'seoTitle':'跟拍详情',
    'seoKeywords':'',
    'seoDescription':''
  },
  'follow-video': {
    'seoTitle':'婚礼视频',
    'seoKeywords':'',
    'seoDescription':''
  },
  'follow-video-detail': {
    'seoTitle':'视频详情',
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
  'dress-detail': {
    'seoTitle':'礼服详情',
    'seoKeywords':'',
    'seoDescription':''
  },
  'supply': {
    'seoTitle':'婚礼用品',
    'seoKeywords':'',
    'seoDescription':''
  },
  'supply-detail': {
    'seoTitle':'用品详情',
    'seoKeywords':'',
    'seoDescription':''
  },
  'car': {
    'seoTitle':'婚车租赁',
    'seoKeywords':'',
    'seoDescription':''
  },
  'car-detail': {
    'seoTitle':'婚车详情',
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
  }
}

export {
  ComponentsIndex,
  ComponentsSeo
}
