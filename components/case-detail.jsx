import React, { PropTypes } from 'react'
import _ from 'lodash'

import { CaseDetailsConfig } from './config/case-detail-config'
import { MediaItem, EmImgProcessType } from './common/media-item.jsx'

class CaseDetail extends React.Component {
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

export { CaseDetail }