import React, { PropTypes } from 'react'
import _ from 'lodash'

import { SupplyConfig } from './config/supply-config'
import { MediaItem, EmImgProcessType } from './common/media-item.jsx'

class Supply extends React.Component {
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

export { Supply }
