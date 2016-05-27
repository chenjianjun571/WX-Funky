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
  'hotel': <Hotel />,
  'activity': <Activity />
}
const ComponentsSeo= {
  'home': {
    'seoTitle':'',
    'seoKeywords':'',
    'seoDescription':''
  },
  'shot': {
    'seoTitle':'',
    'seoKeywords':'',
    'seoDescription':''
  },
  'sample': {
    'seoTitle':'',
    'seoKeywords':'',
    'seoDescription':''
  },
  'sample-details': {
    'seoTitle':'',
    'seoKeywords':'',
    'seoDescription':''
  },
  'pringles': {
    'seoTitle':'',
    'seoKeywords':'',
    'seoDescription':''
  },
  'pringles-details': {
    'seoTitle':'',
    'seoKeywords':'',
    'seoDescription':''
  },
  'suite': {
    'seoTitle':'',
    'seoKeywords':'',
    'seoDescription':''
  },
  'suite-details': {
    'seoTitle':'',
    'seoKeywords':'',
    'seoDescription':''
  },
  'movie': {
    'seoTitle':'',
    'seoKeywords':'',
    'seoDescription':''
  },
  'scheme': {
    'seoTitle':'',
    'seoKeywords':'',
    'seoDescription':''
  },
  'hotel': {
    'seoTitle':'',
    'seoKeywords':'',
    'seoDescription':''
  },
  'activity': {
    'seoTitle':'',
    'seoKeywords':'',
    'seoDescription':''
  }
}

export {
  ComponentsIndex,
  ComponentsSeo
}
