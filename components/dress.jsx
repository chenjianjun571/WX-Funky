import React, { PropTypes } from 'react'
import _ from 'lodash'

import { DressConfig } from './config/dress-config'
import { MediaItem, EmImgProcessType } from './common/media-item.jsx'
import { DetailType } from '../src/utils/detail-type'

class DressContent extends React.Component {
  constructor (props) {
    super(props);
    this.renderFlg=true;
    this.cache=new Map();
    this.typeId=-1;// 记录选中的婚纱类型ID
    this.state = {
      dressType:[],
      dressTypeIndex:0,
      dressBrand:[]
    };
  }

  render () {
    return (
      <div>
        <div className="title-box-style-1">
          <div className="banner">
            <i></i>
            <span>幸福可以绽放的如此耀眼</span>
          </div>
          <span className="title">婚纱礼服</span>
        </div>
        <div className="nav-placeholder">
          <div id="fixedNav" className="option-group-nav">
            <div className="option-group-box">
              <ul className="option-group">
                {
                  _.map(this.state.dressType, (v,k)=>{
                    let kClass = (k == this.state.dressTypeIndex) ? "option activate" :"option"
                    return (
                      <li key={k} className={kClass} onClick={this.typeChangeHandle.bind(this, k, v.typeId)}>
                        <span className="title">{v.name}</span>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
          <div className="list-box">
            <ul className="item-list">
              {
                _.map(this.state.dressBrand, (v,k)=>{
                  return (
                    <li key={k} className="item">
                      <a href={'/detail/'+DetailType.Dress+'?brandId='+v.brandId+'&typeId='+this.typeId} target='_blank' >
                        <div className="photo-box">
                          <MediaItem
                            aspectRatio="3:2"
                            imageUrl={v.coverUrlWeb}
                            processType={EmImgProcessType.emGD_S_S}
                            width={600}
                          />
                        </div>
                        <div className="info-box">
                          <span className="text-title">{v.name}</span>
                        </div>
                      </a>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    // 设置不渲染,最后由数据请求回来以后修改是否渲染
    this.renderFlg=false;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.renderFlg;
  }

  typeChangeHandle(i, typeId, e) {
    e.preventDefault();
    // 根据typeId与i的组合为缓存key
    if (this.cache[typeId]) {
      // 设置当前的婚纱类型
      this.typeId=typeId;
      this.setState({dressBrand:this.cache[typeId], dressTypeIndex:i})
    } else {
      this.queryData(typeId, i);
    }
  }

  componentDidMount() {
    // 获取婚纱礼服类型列表
    let cfg = DressConfig.DressType
    let fetchUrl = cfg.buildUrl(null,cfg.dataUrl)
    fetch(fetchUrl)
      .then(res => {return res.json()})
      .then(j =>{
        if(j.success && j.data.length > 0) {
          this.setState({dressType:j.data, dressTypeIndex:0})
          this.queryData(j.data[0].typeId, 0)
        }
      })
  }

  queryData(typeId, typeIndex) {
    let cfg = DressConfig.DressBrand
    let fetchUrl = cfg.buildQueryUrl({typeId:typeId},cfg.dataUrl)
    console.log(fetchUrl)
    fetch(fetchUrl)
      .then(res => {return res.json()})
      .then(j =>{
        if(j.success) {
          // 设置渲染标志
          this.renderFlg=true;
          // 设置当前的婚纱类型
          this.typeId=typeId;
          // 设置缓存数据
          this.cache[typeId]=j.data
          // 设置数据
          this.setState({dressBrand:j.data, dressTypeIndex:typeIndex})
        }
      })
  }
}

class Dress extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      data:[]
    };
  }

  render () {
    return (
      <div className="dress-list-view">
        <div className="top-logo-box">
          <div className="logo-box">
            <i className="icon-home-logo"></i>
            <i className="icon-home-word"></i>
          </div>
        </div>

        <MediaItem
          aspectRatio="1:-1"
          imageUrl={DressConfig.Banner[0].imageUrl}
          processType={EmImgProcessType.emGD_S_S}
        />

        <DressContent />
      </div>
    )
  }

  componentDidMount() {}
}

export { Dress }
