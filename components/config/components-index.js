import React, { PropTypes } from 'react'

import { Home } from '../home.jsx'
import { Activity} from '../activity.jsx'

const ComponentsIndex = {
  'home': <Home />,
  'activity': <Activity />
}
const ComponentsSeo= {
  'home': {
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
