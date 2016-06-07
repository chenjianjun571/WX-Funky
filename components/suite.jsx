import React, { PropTypes } from 'react'
import _ from 'lodash'

import { SuiteConfig } from './config/suite-config'
import { MediaItem, EmImgProcessType } from './common/media-item.jsx'
import { DetailType, ShowType } from '../src/utils/detail-type'
import { ListContent } from './common/list-content.jsx'

class Suite extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      params:{
        pageSize:4,
        pageIndex:0
      }
    };
  }

  render () {
    return (
      <div className="hssy-suit-list-view">
        <div className="top-logo-box">
          <div className="logo-box">
            <i className="icon-home-logo"></i>
            <i className="icon-home-word"></i>
          </div>
        </div>

        <MediaItem
          aspectRatio="1:-1"
          imageUrl={SuiteConfig.Banner[0].imageUrl}
          processType={EmImgProcessType.emGD_S_S}
        />

        <ListContent params={this.state.params} type={DetailType.Suite} dataUrl={SuiteConfig.SuiteList.dataUrl} />
      </div>
    )
  }

  componentDidMount() {}
}

export { Suite }
