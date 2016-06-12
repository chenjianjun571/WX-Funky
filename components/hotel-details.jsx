import React, { PropTypes } from 'react'
import _ from 'lodash'
import { BaseConfig } from './config/base'

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
    console.log('~~'+JSON.stringify(this.props.dataParams))
    // 获取酒店ID
    let id = this.props.dataParams.id;
    if (id && parseInt(id)>0) {
      let url = BaseConfig.baseUrl+"hotel/detail/"+id;
      // 请求数据
      fetch(url)
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
