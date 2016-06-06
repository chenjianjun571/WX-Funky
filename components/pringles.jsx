import React, { PropTypes } from 'react'
import _ from 'lodash'

import { MediaSlider } from './common/media-slider.jsx'
import { MediaItem, EmImgProcessType } from './common/media-item.jsx'
import { PringlesConfig } from './config/pringles-config'
import { DetailType, ShowType } from '../src/utils/detail-type'
import { GetHintContent, HintType } from './common/hint'
import { ReqCode } from './common/code'
import { BaseShowDetail } from './common/detail.jsx'

class BestPringles extends BaseShowDetail {
  constructor (props) {
    super(props);

    this.state = {
      data:[]
    };
  }

  render () {
    return (
      <div className="list-box list-new-pringles">
        <ul className="item-list">
          {
            _.map(this.state.data, (v,k)=>{
              let dataUrl=PringlesConfig.Base.baseUrl+'pringles/detail/'+v.id;
              let onShowDetail=super.showDetail.bind(this, DetailType.Pringles, ShowType.image, null, dataUrl)
              return (
                <li key={k} className="item" onClick={onShowDetail}>
                  <MediaItem
                    aspectRatio="2:3"
                    imageUrl={v.coverUrlWeb}
                    processType={EmImgProcessType.emGD_S_S}
                    height={600}
                    quality={95}
                  />
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }

  componentDidMount() {
    let cfg = PringlesConfig.BestPringles
    let fetchUrl = cfg.buildUrl(null,cfg.dataUrl)
    fetch(fetchUrl)
      .then(res => {return res.json()})
      .then(j =>{
        if(j.success && j.data.length > 0) {
          this.setState({data:j.data})
        }
      })
  }
}

class SeasonList extends React.Component {
  constructor (props) {
    super(props);
    // 渲染标志,控制组件是否渲染
    this.renderFlg=false;
    // 标识是否是第一次渲染
    this.first = true;
    this.state = {
      // 分季列表
      data:[],
      // 表示当前展示的分季索引
      index:0
    };
  }

  getListContent () {
    let content={};
    if (this.state.data.length > 0) {
      let style = {width: "calc(( (100vw - 10px * (3 + 1))/3 + 10px) * (" + this.state.data.length +" + 2) - 10px)"};
      content.list = (
        <ul className="item-list" style={style}>
          {
            _.map(this.state.data, (v,k)=>{
              let kClass = "item";
              if (this.state.index==k) {
                kClass = "item activate";
                content.seasonActivateName = v.name;
              }
              return (
                <li key={k} className={kClass} onClick={this.handleClick.bind(this,k,v.seasonId)}>
                  <div className="photo-box">
                    <MediaItem
                      aspectRatio="3:2"
                      imageUrl={v.coverUrlWeb}
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
      )
    } else {
      content.list = null;
      content.seasonActivateName = ""
    }

    return content
  }

  componentDidUpdate() {
    // 渲染完成以后做的一些dom操作
    if (this.first) {
      // 第一次渲染,需要做一些操作
      let $allItem=$(".list-season .item-list .item");
      var $lastItem=$(".list-season .item-list .item:last-child");
      var $itemList=$(".list-season .item-list");

      if ($($allItem).length > 0){
        var maxLength =  $($allItem).length;
        var itemWidth=($(window).width() - (10 * (3 + 1)))/3;
        var $itemListWidth=((itemWidth+10) * maxLength) - 10;
        var space=itemWidth+10;
        var offset=0;
        if (maxLength >= 2){
          space = ($itemListWidth - itemWidth * maxLength)/(maxLength + 2) +  itemWidth;
        }
        $allItem.map(function(){
          $(this).attr("data-left", offset);
          offset = offset + space;
        });
      }
      this.first = false;
    } else {
      var toOffsetLeft = $(".list-season .item-list .item.activate").attr("data-left") ;
      var time = (Math.abs($(".list-season").scrollLeft() - toOffsetLeft)/300)*500;
      $(".list-season").animate({scrollLeft:toOffsetLeft},time)
    }
  }

  render() {
    let listContent = this.getListContent();
    return (
      <div className="season-box">
        <div className="list-box list-season" >
          {
            listContent.list
          }
        </div>
        <div className="activate-info">
          <span className="text-title">{listContent.seasonActivateName}</span>
        </div>
        <i className="icon"></i>
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.renderFlg;
  }

  componentDidMount() {
    let cfg = PringlesConfig.SeasonList
    let fetchUrl = cfg.buildUrl(null,cfg.dataUrl)
    fetch(fetchUrl)
      .then(res => {return res.json()})
      .then(j =>{
        if(j.success && j.data.length > 0) {
          this.renderFlg=true;
          this.setState({data:j.data, index:0})
          // 通知父组件更新
          if (this.props.changeHandle) {
            this.props.changeHandle(j.data[0].seasonId)
          }
        }
      })
  }

  handleClick(i,seasonId,e) {
    e.preventDefault();
    if (i == this.state.index) {
      this.renderFlg=false;
    } else {
      this.renderFlg=true;
      this.setState({index:i},()=>{this.renderFlg=false;})
      // 通知父组件更新
      if (this.props.changeHandle) {
        this.props.changeHandle(seasonId)
      }
    }
  }
}


class PringlesContent extends BaseShowDetail {
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
      // 列表数据
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
          content = (
            _.map(this.state.data, (v,k)=>{
              let dataUrl=PringlesConfig.Base.baseUrl+'pringles/detail/'+v.id;
              let onShowDetail=super.showDetail.bind(this, DetailType.Pringles, ShowType.image, null, dataUrl)
              return (
                <li key={k} className="item" onClick={onShowDetail}>
                  <MediaItem
                    aspectRatio="2:3"
                    imageUrl={v.coverUrlWeb}
                    processType={EmImgProcessType.emGD_S_S}
                    height={600}
                    quality={95}
                  />
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
          <span className="title">客片分季欣赏</span>
        </div>

        <SeasonList changeHandle={this.changeHandle.bind(this)} />

        <div className="list-box list-pringles">
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

  changeHandle(seasonId) {
    // 设置渲染标志
    this.renderFlg = true;
    if (this.cache[seasonId]) {
      // 从缓存里面直接取数据
      this.setState({
        reqState       : ReqCode.Ready,
        data           : this.cache[seasonId].data,
        showMoreFlg    : this.cache[seasonId].showMoreFlg,
        params         : this.cache[seasonId].params,
        dataErrorFlg   : false,
      })
    } else {
      let p = {}
      p.pageSize = this.state.params.pageSize;
      p.pageIndex = 0;
      // 赋值礼服类型
      p.seasonId = seasonId;
      // 设置加载中状态
      this.setState({
        reqState       : ReqCode.Loading,
        data           : [],
        showMoreFlg    : false,
        dataErrorFlg   : false,
      })
      // 请求数据
      this.queryData(seasonId, p, false)
    }
  }

  handleMore(e) {
    e.preventDefault();
    let p = {};
    p.pageSize = this.state.params.pageSize;
    p.pageIndex = this.state.params.pageIndex;
    p.seasonId = this.state.params.seasonId;
    this.queryData(this.state.params.seasonId, p, true);
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
      let cfg = PringlesConfig.PringlesList
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

class Pringles extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className="pringles-list-view">
        <div id='J_Detail'></div>
        <div className="top-logo-box">
          <div className="logo-box">
            <i className="icon-home-logo"></i>
            <i className="icon-home-word"></i>
          </div>
        </div>
        <MediaItem
          aspectRatio="1:-1"
          imageUrl={PringlesConfig.Banner[0].imageUrl}
          processType={EmImgProcessType.emGD_S_S}
        />
        <BestPringles />
        <PringlesContent />
      </div>
    )
  }
}

export { Pringles }
