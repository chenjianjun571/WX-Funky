import React, { PropTypes } from 'react'
import _ from 'lodash'

import { FollowVideoConfig } from './config/follow-video-config'
import { MediaItem, EmImgProcessType } from './common/media-item.jsx'

class FollowVideo extends React.Component {
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

export { FollowVideo }
