import React, { PropTypes } from 'react'
import _ from 'lodash'

import { DressDetailsConfig } from './config/dress-detail-config'
import { MediaItem, EmImgProcessType } from './common/media-item.jsx'

class DressDetail extends React.Component {
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

export { DressDetail }