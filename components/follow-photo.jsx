import React, { PropTypes } from 'react'
import _ from 'lodash'

import { FollowPhotoConfig } from './config/follow-photo-config'
import { MediaItem, EmImgProcessType } from './common/media-item.jsx'

class FollowPhoto extends React.Component {
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

export { FollowPhoto }
