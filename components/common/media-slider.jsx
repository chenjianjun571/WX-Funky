import React, { PropTypes } from 'react'
import _ from 'lodash'
import { MediaItem, EmImgProcessType } from './media-item.jsx'

class MediaSlider extends React.Component {
  constructor() {
    super();

    this.state = {
      data:[],
      index:-1,
      startX:"",
      startY:"",
      endX:"",
      endY:""
    };
  }

  touchStart(ev){
    this.setState({
      startX:ev.touches[0].pageX,
      startY:ev.touches[0].pageY
    })
  }

  touchEnd(ev, i){
    this.setState({
      startX:"",
      startY:""
    })
    let index = -1;
    let direction = this.GetSlideDirection(this.state.startX, this.state.startY, ev.changedTouches[0].pageX, ev.changedTouches[0].pageY);
    switch(direction) {
      case 0:// "没滑动"
        break;
      case 1:// 向上
        break;
      case 2:// "向下"
        break;
      case 3:// "向左"
        index = i + 1;
        if (index >= this.state.data.length) {
          index = 0;
        }
        break;
      case 4:// "向右"
        index = i - 1;
        if (index < 0) {
          index = this.state.data.length - 1;
        }
        break;
      default:
    }

    if (index !== -1) {
      if (this.intervalId) {
        clearInterval(this.intervalId)
        this.setState({ index:index }, ()=>{
          this.intervalId = setInterval(()=>{
            let index = this.state.index + 1;
            if (index > this.state.data.length - 1) {
              index = 0;
            }
            this.setState({index:index})
          }, 3000);
        });
      }
    }
  }

  GetSlideAngle(dx, dy) {
    return Math.atan2(dy, dx) * 180 / Math.PI;
  }

  GetSlideDirection(startX, startY, endX, endY) {
    var dy = startY - endY;
    var dx = endX - startX;
    var result = 0;
    //如果滑动距离太短
    if(Math.abs(dx) < 5 && Math.abs(dy) < 5) {
      return result;
    }

    var angle = this.GetSlideAngle(dx, dy);
    if(angle >= -45 && angle < 45) {
      result = 4;
    }else if (angle >= 45 && angle < 135) {
      result = 1;
    }else if (angle >= -135 && angle < -45) {
      result = 2;
    }
    else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
      result = 3;
    }
    return result;
  }

  render () {
    if (this.state.index === -1) {
      return null
    } else {
      let obj = this.state.data[this.state.index]
      return (
        <div className="carousel-picture">
          <ul className="picture-list">
            <li className="picture-item" onTouchStart={ev=>{this.touchStart(ev)}} onTouchEnd={ev=>{this.touchEnd(ev, this.state.index)}} >
              <MediaItem
                aspectRatio={this.props.aspectRatio}
                imageUrl={obj.coverUrlWx || obj.coverUrlWeb} linkUrl={obj.linkUrl}
                processType={EmImgProcessType.emGD_S_S}
                height={this.props.height}
              />
            </li>
          </ul>
          <div className="point-box">
            {
              this.state.data.length > 1 && (
                _.map(this.state.data, (v,k)=>{
                  if (k === this.state.index) {
                    return <li key={k} className="point point-activate" onClick={this.selHandle.bind(this,k)} ></li>
                  } else {
                    return <li key={k} className="point " onClick={this.selHandle.bind(this,k)} ></li>
                  }
                })
              )
            }
          </div>
        </div>
      )
    }
  }

  selHandle(i, e) {
    this.setState({ index:i });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.index == this.state.index) {
      return false;
    } else {
      return true;
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
            } else {
              this.setState({ data:j.data, index:0 })
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
    super.componentWillUnmount();
  }
}

export { MediaSlider }
