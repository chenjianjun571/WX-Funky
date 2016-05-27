import React, { PropTypes } from 'react'
import _ from 'lodash'

import { F4Config } from './config/f4-config'
import { MediaItem, EmImgProcessType } from './common/media-item.jsx'

class F4 extends React.Component {
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

export { F4 }
