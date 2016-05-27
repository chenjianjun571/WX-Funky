import React, { PropTypes } from 'react'

import { Home } from '../home.jsx'
import { Shot } from '../shot.jsx'
import { PringlesDetails } from '../pringles-details.jsx'
import { SampleDetails } from '../sample-details.jsx'
import { SuiteDetails } from '../suite-details.jsx'
import { Scheme } from '../scheme.jsx'
import { Hotel } from '../hotel.jsx'
import { Activity} from '../activity.jsx'

const ComponentsIndex = {
  'home': <Home />,
  'shot': <Shot />,
  'sample-details': <SampleDetails />,
  'pringles-details': <PringlesDetails />,
  'suite-details': <SuiteDetails />,
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
