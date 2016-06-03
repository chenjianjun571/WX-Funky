import React, { PropTypes } from 'react'
import _ from 'lodash'

import { FollowPhotoConfig } from './config/follow-photo-config'
import { MediaItem, EmImgProcessType } from './common/media-item.jsx'
import { DetailType } from '../src/utils/detail-type'
import { noResult } from './common/no_result'
import { loading } from './common/loading'

class FollowPhotoList extends React.Component {
  constructor (props) {
    super(props);
    this.renderFlg=false;
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

  getListContent () {
    let content;
    if (this.state.data.length > 0) {
      content = (
        _.map(this.state.data, (v,k)=>{
          // 通过v.coverUrlWeb来做组件的key,这样才能避免条件切换的时候不刷新的问题
          return (
            <li key={k} className="item">
              <a href={'/detail/'+DetailType.FollowPhoto+'/'+v.id} target='_blank' >
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
    } else if (this.renderFlg) {
      content = noResult();
    } else {
      content = loading();
    }

    return content;
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
    let listContent = this.getListContent();
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

  componentWillReceiveProps(nextProps) {
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.renderFlg;
  }

  queryData(params, isChunk) {
    let cfg = FollowPhotoConfig.FollowPhotoList
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
          // 设置渲染标志
          this.renderFlg = true;
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

class FollowPhotoContent extends React.Component {
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
          <span className="title">跟拍欣赏</span>
        </div>

        <FollowPhotoList />
      </div>
    )
  }
}

class FollowPhoto extends React.Component {
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
          imageUrl={FollowPhotoConfig.Banner[0].imageUrl}
          processType={EmImgProcessType.emGD_S_S}
        />

        <FollowPhotoContent />
      </div>
    )
  }

  componentDidMount() {}
}

export { FollowPhoto }
