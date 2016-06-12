import React, { PropTypes } from 'react'
import _ from 'lodash'

/*
 http://cq.jsbn.com/api/hotel/detail/2864
* */
class HotelDetails extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      data:{}
    };
  }

  render () {
    return (
      <div>详情页面</div>
    )
  }

  componentDidMount() {
    // 获取酒店ID
    let id = this.dataParams.id;
    if (id && parseInt(id)>0) {
      let url = "/hotel/detail/"+id;
      // 请求数据
      fetch(fetchUrl)
        .then(res => {return res.json()})
        .then(j =>{
          if(j.success && j.data.length > 0) {
            this.setState({data:j.data[0]});
          }
        })
    }
  }
}

export { HotelDetails }
