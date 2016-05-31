import React, { PropTypes } from 'react'
import _ from 'lodash'

import { MediaSlider } from './common/media-slider.jsx'
import { MediaItem, EmImgProcessType } from './common/media-item.jsx'
import { PringlesConfig } from './config/pringles-config'
import { TouchMixin } from './common/TouchMixin'

class Season extends React.Component {

  constructor (props) {
    super(props);
    this.cache = new Map()
    this.state = {
      season:[],
      index:0,
      data:[]
    };
  }

  render () {
    let seasonActivateName="";
    return (
      <div>
        <div className="season-box">
          <div className="list-box list-season" >
            <ul className="item-list" style={{width: "calc(( (100vw - 10px * (3 + 1))/3 + 10px) * (" + this.state.season.length +" + 2) - 10px)"}}>
              {
                _.map(this.state.season, (v,k)=>{
                  let kClass = "item";
                  if (this.state.index==k) {
                    kClass = "item activate";
                    seasonActivateName = v.name;
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
          </div>
          <div className="activate-info">
            <span className="text-title">{seasonActivateName}</span>
          </div>
          <i className="icon"></i>
        </div>

        <div className="list-box list-pringles">
          <ul className="item-list">
            {
              _.map(this.state.data, (v,k)=>{
                return (
                  <li key={k} className="item">
                    <a href={'/pringles/'+v.id} target='_blank' >
                      <MediaItem
                        aspectRatio="2:3"
                        imageUrl={v.coverUrlWeb}
                        processType={EmImgProcessType.emGD_S_S}
                        height={600}
                        quality={95}
                      />
                    </a>
                  </li>
                )
              })
            }
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
          this.queryData(0, j.data[0].seasonId, j.data)
        }
      })
  }

  handleClick(i,seasonId,e) {
    e.preventDefault();
    this.queryData(i, seasonId);
  }

  queryData(i, seasonId, season=null) {

    let ready = ()=>{
      var toOffsetLeft = $(".list-season .item-list .item.activate").attr("data-left") ;
      var time = (Math.abs($(".list-season").scrollLeft() - toOffsetLeft)/300)*500;
      $(".list-season").animate({scrollLeft:toOffsetLeft},time)
    }

    let cfg = PringlesConfig['PringlesSeasonList']
    let fetchUrl = cfg.buildQueryUrl({seasonId:seasonId},cfg.dataUrl)
    // 先从本地缓存里面查找,早不到才去网络请求
    if (this.cache[fetchUrl]) {
      this.setState({data:this.cache[fetchUrl], index:i},ready)
    } else {
      fetch(fetchUrl)
        .then(res => {return res.json()})
        .then(j =>{
          if(j.success) {
            this.cache[fetchUrl]=j.data;
            if (season) {
              // 第一次设置的时候需要通过脚本把每个item的位置确定
              this.setState({data:j.data, season:season, index:i},()=>{
                var $allItem=$(".list-season .item-list .item");
                var $season=$(".list-season");
                var $firstItem=$(".list-season .item-list .item:first");
                if ($($allItem).length > 0){
                  var space=$($firstItem).offset().left;
                  var maxLength =  $($allItem).length;
                  var offset=0;
                  if (maxLength >= 2){
                    space = $($allItem[maxLength - 1]).offset().left - $($allItem[maxLength - 2]).offset().left ;
                  }
                  $allItem.map(function(){
                    $(this).attr("data-left", offset);
                    offset = offset + space;
                  });
                }
              })
            } else {
              this.setState({data:j.data,index:i},ready)
            }
          }
        })
    }
  }
}

class BestPringles extends React.Component {
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
              return (
                <li key={k} className="item">
                  <a href={'/pringles/'+v.id} target='_blank' >
                    <MediaItem
                      aspectRatio="2:3"
                      imageUrl={v.coverUrlWeb}
                      processType={EmImgProcessType.emGD_S_S}
                      height={600}
                      quality={95}
                    />
                  </a>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }

  componentDidMount() {
    let cfg = PringlesConfig['Best']
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

        <MediaItem
          aspectRatio="1:-1"
          imageUrl={PringlesConfig['Banner'][0].imageUrl}
          processType={EmImgProcessType.emGD_S_S}
        />

        <BestPringles />

        <div className="title-box-style-1">
          <div className="banner">
            <i></i>
            <span>幸福可以绽放的如此耀眼</span>
          </div>
          <span className="title">客片分季欣赏</span>
        </div>

        <Season />
      </div>
    )
  }

  componentDidMount() {
  }
}

export { Pringles }
