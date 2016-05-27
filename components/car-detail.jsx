import React, { PropTypes } from 'react'
import _ from 'lodash'

import { CarDetailConfig } from './config/car-detail-config'
import { MediaItem, EmImgProcessType } from './common/media-item.jsx'

class CarDetail extends React.Component {
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

export { CarDetail }

