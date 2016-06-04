import React, { PropTypes } from 'react'
import _ from 'lodash'

import { BaseConfig } from './config/base'
import { DetailType } from '../src/utils/detail-type'
import { DetailConfig } from './config/detail-config'

import { sample } from './detail/sample'
import { pringles } from './detail/pringles'
import { suite } from './detail/suite'

class Detail extends React.Component {
  constructor() {
    super();
    this.state = {
      data:[]
    };
  }

  render() {
    // 没有数据不做渲染
    if (this.state.data.length == 0) {
      return null;
    }

    // 根据类型渲染不同的模块
    switch (parseInt(this.props.dataParams.type)) {
      case DetailType.Sample: {
        return sample(this.state.data)
      }
      case DetailType.Pringles: {
        return pringles(this.state.data)
      }
      case DetailType.Suite: {
        return suite(this.state.data)
      }
      default: {
        console.log('无效的数据类型:'+this.props.dataParams.type)
      }
    }

    return null
  }

  componentDidMount() {
    // 取到配置的获取婚纱类型数据的请求地址
    let params = this.props.dataParams;
    console.log(JSON.stringify(params))
    if (params && params.type && params.id) {
      let fetchUrl = BaseConfig.buildUrl(params,DetailConfig[params.type].dataUrl)
      fetch(fetchUrl)
        .then(res => {return res.json()})
        .then(j =>{
          if(j.success) {
            this.setState({data:j.data})
          }
        })
    }
  }
}

Detail.defaultProps = {
  dataParams:{
    type:-1,
    id:-1
  }
};

export { Detail }
