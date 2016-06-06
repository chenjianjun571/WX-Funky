import React, { PropTypes } from 'react'
import _ from 'lodash'

import { MediaSlider } from './common/media-slider.jsx'
import { MediaItem, EmImgProcessType } from './common/media-item.jsx'
import { SuiteConfig } from './config/suite-config'
import { DetailType, ShowType } from '../src/utils/detail-type'
import { GetHintContent, HintType } from './common/hint'
import { ReqCode } from './common/code'
import { BaseShowDetail } from './common/detail.jsx'

class SuiteList extends BaseShowDetail {
  constructor (props) {
    super(props);
    // 渲染标志,控制组件是否渲染
    this.renderFlg=false;
    this.state = {
      // 数据请求状态
      reqState:ReqCode.Loading,
      // 数据请求错误标志
      dataErrorFlg:false,
      // 品牌列表数据
      data:[],
      // 是否显示加载更多
      showMoreFlg:false,
      // 搜索条件
      params:{
        pageSize:4,
        pageIndex:0
      }
    }
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
              let dataUrl=SuiteConfig.Base.baseUrl+'suite/detail/'+v.id;
              let onShowDetail=super.showDetail.bind(this, DetailType.Suite, ShowType.image, null, dataUrl)
              return (
                <li key={k} className="item" onClick={onShowDetail}>
                  <div className="photo-box">
                    <MediaItem
                      aspectRatio="3:2"
                      imageUrl={v.coverUrlWx || v.coverUrlWeb}
                      processType={EmImgProcessType.emGD_S_S}
                      height={400}
                    />
                  </div>
                  <div className="info-box">
                    <span className="title">{v.name}</span>
                    <span className="unit">RMB</span>
                    <span className="price">{v.salePrice}</span>
                  </div>
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
    p.pageSize = this.state.params.pageSize;
    p.pageIndex = this.state.params.pageIndex;
    this.queryData(p, true);
  }

  componentDidMount() {
    super.componentDidMount();
    let p = {}
    p.pageSize = this.state.params.pageSize;
    p.pageIndex = this.state.params.pageIndex;
    this.queryData(p, false)
  }

  queryData(params, isChunk=false) {
    // 从网络请求数据
    let cfg = SuiteConfig.SuiteList
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
          // 设置组件状态
          this.setState({
            reqState       : ReqCode.Ready,
            data           : t,
            showMoreFlg    : m,
            params         : params,
            dataErrorFlg   : false
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
              dataErrorFlg   : true
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
            dataErrorFlg   : true
          })
        }
      });
  }
}

class Suite extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className="hssy-suit-list-view">
        <div id='J_Detail'></div>
        <div className="top-logo-box">
          <div className="logo-box">
            <i className="icon-home-logo"></i>
            <i className="icon-home-word"></i>
          </div>
        </div>

        <MediaItem
          aspectRatio="1:-1"
          imageUrl={SuiteConfig.Banner[0].imageUrl}
          processType={EmImgProcessType.emGD_S_S}
        />

        <SuiteList />
      </div>
    )
  }

  componentDidMount() {}
}

export { Suite }
