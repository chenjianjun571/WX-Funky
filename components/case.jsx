import React, { PropTypes } from 'react'
import _ from 'lodash'

import { CaseConfig } from './config/case-config'
import { MediaItem, EmImgProcessType } from './common/media-item.jsx'

class Case extends React.Component {
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

export { Case }