import React, { PropTypes } from 'react'
import _ from 'lodash'

import { FollowVideoConfig } from './config/follow-video-config'
import { MediaItem, EmImgProcessType } from './common/media-item.jsx'
import { DetailType } from '../src/utils/detail-type'

class FollowVideoList extends React.Component {
  constructor (props) {
    super(props);
    this.renderFlg=true;
    this.cache=new Map();
    this.state = {
      data:[],
      showMoreFlg:true,
      params:{
        pageSize:6,
        pageIndex:0
      }
    };
  }

  render () {
    let moreButton = null;
    if (this.state.showMoreFlg) {
      moreButton = (
        <div className="more-button" onClick={this.handleMore.bind(this)}>
          <div className="button-box">
            <span className="icon"></span>
            <span className="title">点击加载</span>
          </div>
        </div>
      )
    }
    let listContent = null;
    if (this.state.data.length > 0) {
      listContent = (
        _.map(this.state.data, (v,k)=>{
          // 通过v.coverUrlWeb来做组件的key,这样才能避免条件切换的时候不刷新的问题
          return (
            <li key={k} className="item">
              <a href={'/detail/'+DetailType.FollowVideo+'/'+v.id} target='_blank' >
                <MediaItem
                  aspectRatio="3:2"
                  imageUrl={v.coverUrlWeb}
                  processType={EmImgProcessType.emGD_S_S}
                  width={300}
                />
              </a>
            </li>
          )
        })
      )
    } else {
      return (
        <p>无搜索结果</p>
      )
    }
    return (
      <div className="list-box">
        <ul className="item-list">
          {
            listContent
          }
        </ul>
        {
          moreButton
        }
      </div>
    )
  }

  queryData(params, isChunk) {
    let cfg = FollowVideoConfig.FollowVideoList
    params.pageIndex += 1;
    let fetchUrl = cfg.buildQueryUrl(params,cfg.dataUrl)
    console.log(fetchUrl)
    fetch(fetchUrl)
      .then(res => {return res.json()})
      .then(j =>{
        if(j.success) {
          let tmpData;
          if (isChunk) {
            tmpData = this.state.data;
            tmpData = tmpData.concat(j.data);
          } else {
            tmpData = j.data;
          }

          if (j.count > tmpData.length) {
            this.setState({data:tmpData, params:params, showMoreFlg:true})
          } else {
            this.setState({data:tmpData, params:params, showMoreFlg:false})
          }
        }
      })
  }

  handleMore(e) {
    e.preventDefault();
    this.queryData(this.state.params,true);
  }

  componentDidMount() {
    this.queryData(this.state.params,false);
  }
}

class FollowVideoContent extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
        <div className="title-box-style-1">
          <div className="banner">
            <i></i>
            <span>幸福可以绽放的如此耀眼</span>
          </div>
          <span className="title">婚礼视频欣赏</span>
        </div>

        <FollowVideoList />
      </div>
    )
  }
}

class FollowVideo extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className="followPhoto-list-view">
        <div className="top-logo-box">
          <div className="logo-box">
            <i className="icon-home-logo"></i>
            <i className="icon-home-word"></i>
          </div>
        </div>

        <MediaItem
          aspectRatio="1:-1"
          imageUrl={FollowVideoConfig.Banner[0].imageUrl}
          processType={EmImgProcessType.emGD_S_S}
        />

        <FollowVideoContent />
      </div>
    )
  }

  componentDidMount() {}
}

export { FollowVideo }
