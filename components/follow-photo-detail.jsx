import React, { PropTypes } from 'react'
import _ from 'lodash'

import { FollowPhotoDetailsConfig } from './config/follow-photo-detail-config'
import { MediaItem, EmImgProcessType } from './common/media-item.jsx'

class FollowPhotoDetail extends React.Component {
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

export { FollowPhotoDetail }