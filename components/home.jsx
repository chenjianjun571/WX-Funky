import React, { PropTypes } from 'react'
import _ from 'lodash'

import { MediaSlider } from './common/media-slider.jsx'

class Home extends React.Component {

  render () {
    return (
      <div>
        <MediaSlider />
      </div>
    )
  }

  componentDidMount () {
  }
}

export { Home }
