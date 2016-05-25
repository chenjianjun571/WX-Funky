import React, { PropTypes } from 'react'
import _ from 'lodash'
import { MediaItem, EmImgProcessType } from './media-item.jsx'

class MediaSlider extends React.Component {
  constructor() {
    super();

    this.state = {
      data:[],
      index:-1
    };
  }

  render () {
    if (this.state.index === -1) {
      return null
    } else {
      let obj = this.state.data[this.state.index]
      return (
        <MediaItem aspectRatio="3:2" imageUrl={obj.coverUrlWx || obj.coverUrlWeb} processType={EmImgProcessType.emGD_S_S} height={640} />
      )
    }
  }

  // 在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）
  componentDidMount() {
    if (this.props.dataUrl) {
      // 请求数据
      fetch(this.props.dataUrl)
        .then(res => {return res.json()})
        .then(j => {
          if (j.success && j.data.length > 0) {
            // 如果只有一个,不需要幻灯片
            if(j.data.length > 1) {
              this.setState({ data:j.data, index:0 },()=>{
                this.intervalId = setInterval(()=>{
                  let index = this.state.index + 1;
                  if (index > this.state.data.length - 1) {
                    index = 0;
                  }
                  this.setState({index:index})
                }, 3000);
              })
            }
          }
        })
    }
  }

  // 在组件从 DOM 中移除的时候立刻被调用
  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  }
}

export { MediaSlider }
