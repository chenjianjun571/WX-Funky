import React, { PropTypes } from 'react'

import { Home } from '../home.jsx'
import { Shot } from '../shot.jsx'
import { Scheme } from '../scheme.jsx'
import { Hotel } from '../hotel.jsx'
import { Activity} from '../activity.jsx'

const ComponentsIndex = {
  'home': <Home />,
  'shot': <Shot />,
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
