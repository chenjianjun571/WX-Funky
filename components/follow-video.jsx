import React, { PropTypes } from 'react'
import _ from 'lodash'

import { FollowVideoConfig } from './config/follow-video-config'
import { MediaItem, EmImgProcessType } from './common/media-item.jsx'
import { DetailType } from '../src/utils/detail-type'
import { GetHintContent, HintType } from './common/hint'
import { ReqCode } from './common/code'

class FollowVideoList extends React.Component {
  constructor (props) {
    super(props);
    // 渲染标志,控制组件是否渲染
    this.renderFlg=false;
    // 缓存对象
    this.cache=new Map();
    // 组件状态
    this.state = {
      // 数据请求状态
      reqState:ReqCode.Loading,
      // 数据请求错误标志
      dataErrorFlg:false,
      // 数据
      data:[],
      // 是否显示加载更多
      showMoreFlg:false,
      // 搜索条件
      params:{
        pageSize:6,
        pageIndex:0
      }
    };
  }

  getListContent () {
    let content;

    switch (this.state.reqState) {
      case ReqCode.Loading: {
        // 加载中状态
        content = GetHintContent(HintType.Loading);
        break;
      }
      case ReqCode.Error: {
        // 加载错误状态
        content = GetHintContent(HintType.Error);
        break;
      }
      case ReqCode.Ready: {
        // 数据准备ok状态
        if (this.state.data.length > 0) {
          content = (
            _.map(this.state.data, (v,k)=>{
              // 通过v.coverUrlWeb来做组件的key,这样才能避免条件切换的时候不刷新的问题
              return (
                <li key={k} className="item">
                  <a href={'/detail/'+DetailType.FollowVideo+'/'+v.id} target='_blank' >
                    <div className="photo-box">
                      <MediaItem
                        aspectRatio="3:2"
                        imageUrl={v.coverUrlWeb}
                        processType={EmImgProcessType.emGD_S_S}
                        width={300}
                      />
                      <i className="icon-video-play"></i>
                    </div>
                  </a>
                </li>
              )
            })
          )
        } else {
          content = GetHintContent(HintType.NoResult);
        }
        break;
      }
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

  handleMore(e) {
    e.preventDefault();
    let p = {};
    p = _.merge(p, this.state.params)
    let key = JSON.stringify(_.omit(p, ['pageSize','pageIndex']));
    this.queryData(key, p, true);
  }

  componentDidMount() {
    // 参数的初始状态
    let p = {};
    p = _.merge(p, this.state.params)
    // 组装缓存key
    let key = JSON.stringify(_.omit(p, ['pageSize','pageIndex']));
    this.queryData(key, p, false);
  }

  queryData(key, params, isChunk=false) {
    // 先从本地缓存里面查找数据
    if (this.cache[key] && !isChunk) {
      // 设置渲染标志
      this.renderFlg = true;
      // 从缓存里面直接取数据
      this.setState({
        reqState       : ReqCode.Ready,
        data           : this.cache[key].data,
        showMoreFlg    : this.cache[key].showMoreFlg,
        params         : this.cache[key].params,
        dataErrorFlg   : false,
      })
    } else {
      // 从网络请求数据
      let cfg = FollowVideoConfig.FollowVideoList
      // 加页请求
      params.pageIndex += 1;
      // 组装url
      let fetchUrl = cfg.buildQueryUrl(params,cfg.dataUrl)
      fetch(fetchUrl)
        .then(res => {return res.json()})
        .then(j => {
          // 设置渲染标志
          this.renderFlg=true;
          // 判断服务器应答结果
          if(j.success) {
            let t;
            // 是否需要合并老数据,适用于分页加载的情况
            if (isChunk) {
              t = this.state.data;
              t = t.concat(j.data);
            } else {
              t = j.data;
            }
            // 判断服务器数据是否加载完毕
            let m = (j.count > t.length) ? true : false;

            // 缓存数据
            let p = {}
            p.data = t;
            p.showMoreFlg = m;
            p.params = params;
            this.cache[key]=p;

            // 设置组件状态
            this.setState({
              reqState       : ReqCode.Ready,
              data           : t,
              showMoreFlg    : m,
              params         : params,
              dataErrorFlg   : false,
            })
          } else {
            // 数据请求错误
            if (isChunk) {
              // 分页请求数据失败的情况下不做处理
            } else {
              // 设置组件状态
              this.setState({
                reqState       : ReqCode.Error,
                data           : [],
                dataErrorFlg   : true,
              })
            }
          }
        })
        .catch(err => {
          console.log(err)
          // 设置渲染标志
          this.renderFlg=true;
          // 数据请求错误
          if (isChunk) {
            // 分页请求数据失败的情况下不做处理
          } else {
            // 设置组件状态
            this.setState({
              reqState       : ReqCode.Error,
              data           : [],
              dataErrorFlg   : true,
            })
          }
        });
    }
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
