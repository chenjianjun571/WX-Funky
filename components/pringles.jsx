import React, { PropTypes } from 'react'
import _ from 'lodash'

import { MediaItem, EmImgProcessType } from './common/media-item.jsx'
import { PringlesConfig } from './config/pringles-config'
import { DetailType, ShowType } from '../src/utils/detail-type'
import { GetHintContent, HintType } from './common/hint'
import { ReqCode } from './common/code'
import { BaseShowDetail } from './detail.jsx'
import { ListContent } from './common/list-content.jsx'

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
    super.componentDidMount();
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
      let style = {width: "calc(((100vw - 10px * (3 + 1))/3 + 10px) * ("+this.state.data.length+" + 2) - 10px)"};
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

class PringlesContent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      params:{
        pageSize:4,
        pageIndex:0,
        seasonId:null
      }
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
          <span className="title">客片分季欣赏</span>
        </div>
        <SeasonList changeHandle={this.changeHandle.bind(this)} />
        {
          this.state.params.seasonId !== null
            ? <ListContent params={this.state.params} customData={{listClass:" list-pringles"}}
                           type={DetailType.Pringles} dataUrl={PringlesConfig.PringlesList.dataUrl} />
            : null
        }
      </div>
    )
  }

  changeHandle(seasonId) {
    let p = {};
    p.pageSize = this.state.params.pageSize;
    p.pageIndex = this.state.params.pageIndex;
    p.seasonId = seasonId;
    this.setState({params:p});
  }
}

class Pringles extends React.Component {
  constructor (props) {
    super(props);
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
