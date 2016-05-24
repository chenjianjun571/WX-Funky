import React, { PropTypes } from 'react'
import _ from 'lodash'
import { MediaItem, EmImgProcessType } from './media-item.jsx'

class MediaSlider extends React.Component {
  constructor() {
    super();

    this.state = {
      data:{}
    };
  }

  getDefaultProps() {
    return {
      dataUrl:undefined
    }
  }

  render () {
    return null
  }

  // 在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）
  componentDidMount() {
    // 请求数据
    this.intervalId = setInterval(()=>{
      this.setState({data:{}})
    }, 3000);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate')
    return true;
  }

  // 在组件从 DOM 中移除的时候立刻被调用
  componentWillUnmount() {
    clearInterval(this.intervalId)
  }
}

export { MediaSlider }
