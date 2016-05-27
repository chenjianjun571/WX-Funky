import React, { PropTypes } from 'react'
import _ from 'lodash'

import { DressConfig } from './config/dress-config'
import { MediaItem, EmImgProcessType } from './common/media-item.jsx'

class Dress extends React.Component {
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

export { Dress }
