import React, { PropTypes } from 'react'
import _ from 'lodash'

import { MediaSlider } from './common/media-slider.jsx'

class Hotel extends React.Component {
  constructor (props) {
    super(props);
    this.showFlg=false;
    this.state = {
      data:[
        'http://img2.jsbn.com/venus/sample/20160317/1458207659557376520150919195756477089_1200x800.jpg@1e_1c_0o_0l_600h_400w_70q.src',
        'http://img2.jsbn.com/venus/sample/20160317/1458209563327072420151015174048870251_1200x800.jpg@1e_1c_0o_0l_600h_400w_70q.src',
        'http://img2.jsbn.com/venus/sample/20160317/1458210736001263120160127190814487233_1200x800.JPG@1e_1c_0o_0l_600h_400w_70q.src'
      ]
    };
  }

  render () {
    return (
      <div>
        <div className="mbody" onClick={this.handle.bind(this)}>
          <p className="btn" >点击我show出弹出层</p>
        </div>
      </div>
    )
  }

  componentDidMount() {
  }
}

export { Hotel }