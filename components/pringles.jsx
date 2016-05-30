import React, { PropTypes } from 'react'
import _ from 'lodash'

import { MediaSlider } from './common/media-slider.jsx'
import { MediaItem, EmImgProcessType } from './common/media-item.jsx'
import { PringlesConfig } from './config/pringles-config'
import { TouchMixin } from './common/TouchMixin'

class Season extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      season:[],
      index:0,
      data:[],
      startX:"",
      startY:"",
      endX:"",
      endY:""
    };
  }

  render () {
    return (
      <div>
        <div className="season-box">
          <div className="list-box list-season" onTouchStart={ev=>{this.touchStart(ev)}} onTouchEnd={ev=>{this.touchEnd(ev, this.state.index)}} >
            <ul className="item-list" style={{width: "calc(( (100vw - 10px * (3 + 1))/3 + 10px) * (" + this.state.season.length +" + 2) - 10px)"}}>
              {
                _.map(this.state.season, (v,k)=>{
                  let kClass = this.state.index==k ? "item activate" : "item"
                  return (
                    <li key={k} className={kClass}>
                      <div className="photo-box">
                        <MediaItem
                          aspectRatio="3:2"
                          imageUrl={v.coverUrlWx || v.coverUrlWeb}
                          processType={EmImgProcessType.emGD_S_S}
                          height={140}
                          quality={95}
                        />
                      </div>
                      <div className="info-box">
                        <span className="text-title">{v.name}</span>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          <i className="icon"></i>
        </div>

        <div className="list-box list-pringles">
          <ul className="item-list">
            <li className="item">
              <a href="javascrip:void(0)"><img src="https://c.stocksy.com/a/iuC400/z1/1002956.jpg"/></a>
            </li>
            <li className="item">
              <a href="javascrip:void(0)"><img src="https://c.stocksy.com/a/iuC400/z1/1002956.jpg"/></a>
            </li>
            <li className="item">
              <a href="javascrip:void(0)"><img src="https://c.stocksy.com/a/iuC400/z1/1002956.jpg"/></a>
            </li>
            <li className="item">
              <a href="javascrip:void(0)"><img src="https://c.stocksy.com/a/iuC400/z1/1002956.jpg"/></a>
            </li>
          </ul>
        </div>
      </div>
    )
  }

  componentDidMount() {
    let cfg = PringlesConfig['Season']
    let fetchUrl = cfg.buildUrl(null,cfg.dataUrl)
    fetch(fetchUrl)
      .then(res => {return res.json()})
      .then(j =>{
        if(j.success && j.data.length > 0) {
          this.setState({season:j.data, index:0})
        }
      })
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
        if (index >= this.state.season.length) {
          index = this.state.season.length-1;
        }
        break;
      case 4:// "向右"
        index = i - 1;
        if (index < 0) {
          index = 0;
        }
        break;
      default:
    }
    console.log(index)
    if(index != -1) {
      this.setState({ index:index });
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
}

Season.mixins=TouchMixin;

class Pringles extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      data:[]
    };
  }

  render () {
    return (
      <div className="pringles-list-view">
        <div className="top-logo-box">
          <div className="logo-box">
            <i className="icon-home-logo"></i>
            <i className="icon-home-word"></i>
          </div>
        </div>

        <div className="adv-header-box">
          <MediaSlider
            dataUrl={PringlesConfig['MediaSlider'].baseUrl+PringlesConfig['MediaSlider'].dataUrl}
            aspectRatio={PringlesConfig['MediaSlider'].aspectRatio}
            height={PringlesConfig['MediaSlider'].height}
          />
        </div>

        <div className="title-box-style-1">
          <div className="banner">
            <i></i>
            <span>幸福可以绽放的如此耀眼</span>
          </div>
          <span className="title">最新客片欣赏</span>
        </div>

        <Season />
      </div>
    )
  }

  componentDidMount() {
  }
}

export { Pringles }
