import React, { PropTypes } from 'react'
import _ from 'lodash'

import { MediaSlider } from './common/media-slider.jsx'

class Hotel extends React.Component {
  constructor (props) {
    super(props);
    this.showFlg=false;
    this.state = {
      data:[]
    };
  }

  render () {
    return (
      <div>
        婚宴预订.......
      </div>
    )
  }

  componentDidMount() {
  }
}

export { Hotel }