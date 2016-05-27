import React, { PropTypes } from 'react'
import _ from 'lodash'

import { FollowVideoDetailsConfig } from './config/follow-video-detail-config'
import { MediaItem, EmImgProcessType } from './common/media-item.jsx'

class FollowVideoDetail extends React.Component {
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

export { FollowVideoDetail }
