import React, { PropTypes } from 'react'
import _ from 'lodash'

import { DressConfig } from './config/dress-config'
import { MediaItem, EmImgProcessType } from './common/media-item.jsx'
import { DetailType, ShowType } from '../src/utils/detail-type'
import { ListContent } from './common/list-content.jsx'

class DressContent extends React.Component {

  constructor (props) {
    super(props);
    // 组件状态
    this.state = {
      // 礼服类型列表
      dressType:[],
      // 选中的礼服类型tab
      dressTypeIndex:-1,
      // 搜索条件
      params:{
        pageSize:2,
        pageIndex:0
      }
    };
  }

  render () {
    let dressType=null;
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
                    let kClass = "option";
                    if (k == this.state.dressTypeIndex) {
                      dressType=v.typeId;
                      kClass = "option activate";
                    }
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
        </div>
        {
          dressType !== null
            ? <ListContent params={this.state.params} type={DetailType.Dress}
                           customData={{dressType:dressType}}
                           dataUrl={DressConfig.DressBrand.dataUrl} />
            : null
        }
      </div>
    )
  }

  componentDidMount() {
    // 获取婚纱礼服类型列表
    let cfg = DressConfig.DressType
    let fetchUrl = cfg.buildUrl(null,cfg.dataUrl)
    fetch(fetchUrl)
      .then(res => {return res.json()})
      .then(j =>{
        if(j.success && j.data.length > 0) {
          let p = {}
          p.pageSize = this.state.params.pageSize;
          p.pageIndex = this.state.params.pageIndex;
          p.typeId = j.data[0].typeId;
          this.setState({params:p, dressType:j.data, dressTypeIndex:0})
        }
      })
  }


  typeChangeHandle(i, typeId, e) {
    e.preventDefault();

    if (i == this.state.dressTypeIndex) {
      return;
    }

    let p = {}
    p.pageSize = this.state.params.pageSize;
    p.pageIndex = this.state.params.pageIndex;
    p.typeId = typeId;

    this.setState({params:p, dressTypeIndex:i});
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
