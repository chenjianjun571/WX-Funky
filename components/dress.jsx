import React, { PropTypes } from 'react'
import _ from 'lodash'

import { MediaItem, EmImgProcessType } from './common/media-item.jsx'
import { DressConfig } from './config/dress-config'
import { DetailType, ShowType } from '../src/utils/detail-type'
import { GetHintContent, HintType } from './common/hint'
import { ReqCode } from './common/code'
import { BaseShowDetail } from './detail.jsx'

class DressContent extends BaseShowDetail {
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
      // 礼服类型列表
      dressType:[],
      // 选中的礼服类型tab
      dressTypeIndex:0,
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
          let dressType = this.state.dressType[this.state.dressTypeIndex].typeId;
          content = (
            _.map(this.state.data, (v,k)=>{
              // 为了防止不同tab切换的时候key冲突
              let key=''+this.state.dressTypeIndex+'-'+k
              // 因为路由的详情是/detail/:type/:id 所以没有ID需要补全一个id(用brandId补全)
              let dataUrl=DressConfig.Base.baseUrl+'dress/dress_list?brandId='+v.brandId+'&typeId='+dressType;
              let onShowDetail=super.showDetail.bind(this, DetailType.Dress, ShowType.image, null, dataUrl)
              return (
                <li key={k} className="item" onClick={onShowDetail}>
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
        </div>
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
    let index = this.state.dressTypeIndex;
    let typeId = this.state.dressType[index].typeId;
    let p = {};
    p.pageSize = this.state.params.pageSize;
    p.pageIndex = this.state.params.pageIndex;
    p.typeId = this.state.params.typeId;
    this.queryData(typeId, index, p, true);
  }

  typeChangeHandle(i, typeId, e) {
    e.preventDefault();
    // 设置渲染标志
    this.renderFlg = true;
    if (this.cache[typeId]) {
      // 从缓存里面直接取数据
      this.setState({
        reqState       : ReqCode.Ready,
        data           : this.cache[typeId].data,
        showMoreFlg    : this.cache[typeId].showMoreFlg,
        params         : this.cache[typeId].params,
        dataErrorFlg   : false,
        dressTypeIndex : i,
      })
    } else {
      let p = {}
      p.pageSize = this.state.params.pageSize;
      p.pageIndex = 0;
      // 赋值礼服类型
      p.typeId = typeId;
      // 设置加载中状态
      this.setState({
        reqState       : ReqCode.Loading,
        data           : [],
        showMoreFlg    : false,
        dataErrorFlg   : false,
        dressTypeIndex : i,
      })
      // 请求数据
      this.queryData(typeId, i, p, false)
    }
  }

  componentDidMount() {
    super.componentDidMount();
    // 获取婚纱礼服类型列表
    let cfg = DressConfig.DressType
    let fetchUrl = cfg.buildUrl(null,cfg.dataUrl)
    fetch(fetchUrl)
      .then(res => {return res.json()})
      .then(j =>{
        if(j.success && j.data.length > 0) {
          this.setState({dressType:j.data, dressTypeIndex:0})
          // 请求品牌数据
          let p = {}
          p.pageSize = this.state.params.pageSize;
          p.pageIndex = this.state.params.pageIndex;
          p.typeId = j.data[0].typeId;
          this.queryData(j.data[0].typeId, 0, p, false)
        }
      })
  }

  queryData(key, typeIndex, params, isChunk=false) {
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
        dressTypeIndex : typeIndex,
      })
    } else {
      // 从网络请求数据
      let cfg = DressConfig.DressBrand
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
              dressTypeIndex : typeIndex,
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
                dressTypeIndex : typeIndex,
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
              dressTypeIndex : typeIndex,
            })
          }
        });
    }
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
