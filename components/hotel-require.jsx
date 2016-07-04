import React, { PropTypes } from 'react'
import _ from 'lodash'

import { RequireHotelComponent, EmShowType } from './common/require-hotel-componet.jsx'

class HotelRequire extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  }

  render () {
    return (
      <RequireHotelComponent showType={EmShowType.HotelRequire} showFlg={true} />
    )
  }

  componentDidUpdate() {
    ReactDOM.render(<HintPopupBox
        ref={(ref)=>{this.hintPopupBox=ref}}
        onDateChange={this.onDateChange.bind(this)} />,
      document.getElementById('J_PopupBox_1'))
  }
}

export { HotelRequire }
