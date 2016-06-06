import React, { PropTypes } from 'react'
import _ from 'lodash'

import { MediaSlider } from './common/media-slider.jsx'

class Test extends React.Component {
  render () {
    if (this.props.show) {
      return (
        <div>
          <p >nihaoya</p>
          <p >nihaoya</p>
          <p >nihaoya</p>
          <p >nihaoya</p>
          <p >nihaoya</p>
        </div>
      )
    } else {
      return (
        null
      )
    }
  }
}

class Hotel extends React.Component {
  constructor (props) {
    super(props);
    this.showFlg=false;
    this.content=null;
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
        <div id='J_Detail'></div>

        <div className="mbody" onClick={this.handle.bind(this)}>
          <p className="btn" >点击我show出弹出层</p>
        </div>
      </div>
    )
  }

  handle() {
    location.hash = "detail";
    this.content=ReactDOM.render(<Test show={true} />,document.getElementById('J_Detail'))
  }

  componentDidMount() {
    this.content=ReactDOM.render(<Test show={false} />,document.getElementById('J_Detail'))
    window.addEventListener('popstate', (ev)=>{
      if(location.hash.indexOf("#detail")>-1){
        this.content=ReactDOM.render(<Test show={true} />,document.getElementById('J_Detail'))
      }else{
        this.content=ReactDOM.render(<Test show={false} />,document.getElementById('J_Detail'))
      }
    });
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', (ev)=>{
      console.log('componentWillUnmount')
    });
  }

  componentDidUpdate() {
  }
}

export { Hotel }