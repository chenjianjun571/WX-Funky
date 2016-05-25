import React, { PropTypes } from 'react'
import _ from 'lodash'

import { MediaSlider } from './common/media-slider.jsx'

class Home extends React.Component {

  render () {
    return (
      <div>
        <MediaSlider dataUrl="/api/vda/index_top" />
      </div>
    )
  }

  componentDidMount () {
  }
}

export { Home }
