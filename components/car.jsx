import React, { PropTypes } from 'react'
import _ from 'lodash'

import { CarConfig } from './config/car-config'
import { MediaItem, EmImgProcessType } from './common/media-item.jsx'

class Car extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      data:[]
    };
  }

  render () {
    return (
      <div></div>
    )
  }

  componentDidMount() {}
}

export { Car }
