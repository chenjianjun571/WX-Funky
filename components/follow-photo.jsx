import React, { PropTypes } from 'react'
import _ from 'lodash'

import { FollowPhotoConfig } from './config/follow-photo-config'
import { MediaItem, EmImgProcessType } from './common/media-item.jsx'
import { DetailType, ShowType } from '../src/utils/detail-type'
import { ListContent } from './common/list-content.jsx'

class FollowPhotoContent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      params:{
        pageSize:8,
        pageIndex:0
      }
    };
  }

  render () {
    return (
      <div>
        <div className="title-box-style-1">
          <div className="banner">
            <i></i>
            <span>幸福可以绽放的如此耀眼</span>
          </div>
          <span className="title">跟拍欣赏</span>
        </div>

        <ListContent params={this.state.params} type={DetailType.FollowPhoto} dataUrl={FollowPhotoConfig.FollowPhotoList.dataUrl} />
      </div>
    )
  }
}

class FollowPhoto extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className="followPhoto-list-view">
        <div className="top-logo-box">
          <div className="logo-box">
            <i className="icon-home-logo"></i>
            <i className="icon-home-word"></i>
          </div>
        </div>

        <MediaItem
          aspectRatio="1:-1"
          imageUrl={FollowPhotoConfig.Banner[0].imageUrl}
          processType={EmImgProcessType.emGD_S_S}
        />

        <FollowPhotoContent />
      </div>
    )
  }

  componentDidMount() {}
}

export { FollowPhoto }
