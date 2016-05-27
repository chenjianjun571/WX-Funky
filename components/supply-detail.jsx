import React, { PropTypes } from 'react'
import _ from 'lodash'

import { SupplyDetailConfig } from './config/supply-detail-config'
import { MediaItem, EmImgProcessType } from './common/media-item.jsx'

class SupplyDetail extends React.Component {
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

export { SupplyDetail }
