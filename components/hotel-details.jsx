import React, { PropTypes } from 'react'
import _ from 'lodash'

import { BaseConfig } from './config/base'
import { MediaItem, EmImgProcessType } from './common/media-item.jsx'
import { DetailType, ShowType } from '../src/utils/detail-type'
import { BaseShowDetail } from './detail.jsx'
import { MapLocation } from './common/map-location.jsx'
import { DetailSlider } from './common/detail-slider.jsx'

class DiscountInfo extends BaseShowDetail {
  constructor (props) {
    super(props);
    this.state = {
    };
  }

  render () {
    let giftUrl=BaseConfig.baseUrl+'activity/detail/libao';
    let onShowGiftDetail=super.showDetail.bind(this, DetailType.Activity, ShowType.image, null, giftUrl)

    let discountUrl=BaseConfig.baseUrl+'activity/detail/zuhe';
    let onShowDiscountDetail=super.showDetail.bind(this, DetailType.Activity, ShowType.image, null, discountUrl)
    return (
      <section className="items gift-items">
        <ul className="list-box info-list">
          <li className="item" onClick={onShowGiftDetail}>
            <div className="title-box">
              <i className="left-icon icon-text">[预订有礼]</i>
              <span className="title">下单立享万元大礼包</span>
              <i className="right-icon icon-arrow"></i>
            </div>
          </li>
          <li className="item" onClick={onShowDiscountDetail}>
            <div className="title-box">
              <i className="left-icon icon-text">[组合优惠]</i>
              <span className="title">下单立享组合优惠</span>
              <i className="right-icon icon-arrow"></i>
            </div>
          </li>
        </ul>
      </section>
    )
  }

  componentDidMount() {
    super.componentDidMount();
  }
}

class HallInfo extends BaseShowDetail {
  constructor (props) {
    super(props);
    this.state = {
      // 菜单明显
      banquetHall: props.banquetHall||[],
    };
  }

  render () {
    return (
      <section className="items hall-items">
        <div className="section-title">宴会厅</div>
        <ul className="list-box hall-list">
          {
            _.map(this.state.banquetHall, (v,k)=>{
              let onShowHallDetail=super.showDetail.bind(this, DetailType.Hall, ShowType.image, v, null)
              return (
                <li key={k} className="item hall" onClick={onShowHallDetail}>
                  <div className="photo-box">
                    <MediaItem
                      aspectRatio="3:2"
                      imageUrl={v.coverUrlWx || v.coverUrlWeb}
                      processType={EmImgProcessType.emGD_S_S}
                      height={400}
                    />
                  </div>
                  <div className="info-box">
                    <div className="title-box">
                      <span className="text">{v.name}</span>
                    </div>
                    <div className="table-box">
                      <span className="hint">桌数</span>
                      <span className="text">{v.maxTableNum+'桌'}</span>
                    </div>
                    <div className="price-box">
                      <span className="hint">低消</span>
                      <span className="text">{v.lowestConsumption+'元/桌'}</span>
                    </div>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </section>
    )
  }

  componentDidMount() {
    super.componentDidMount();
  }
}

class MenuInfo extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      // 菜单明显
      setMealDetail: props.setMealDetail||'',
      // 介绍框类
      boxClass:' hide',
      // 介绍框标题
      boxTitle:'',
      // 介绍框内容
      menuList:[],
    };
  }

  render () {
    let menuContent = null;
    if (this.state.menuList.length > 0) {
      menuContent = (
        <ol className="menu-list">
          {
            _.map(this.state.menuList, (v,k)=>{
              return (
                <li key={k}>{'.'+v.name}</li>
              )
            })
          }
        </ol>
      )
    } else {
      menuContent = (<span className="text-hint">*该酒店未提供菜肴，请以店谈为准</span>)
    }
    // 菜单明显
    let setMealDetail = JSON.parse(this.state.setMealDetail)
    return (
      <div>
        <section className="items menu-suit-items">
          <div className="section-title">婚宴菜单</div>
          <ul className="list-box menu-suit-list">
            {
              _.map(setMealDetail, (v,k)=>{
                let onShowMenu = this.onShowMenu.bind(this, v.name, v.dishesList);
                return (
                  <li key={k} className="item menu-suit" onClick={onShowMenu}>
                    <div className="title-box">
                      <span className="title">{v.name}</span>
                      <span className="subtitle">{'￥'+v.price+'元/桌'}</span>
                      <i className="right-icon icon-arrow"></i>
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </section>

        <div className={"fixed-popup-show-box"+this.state.boxClass}>
          <div className="title-box">
            <span className="title">菜单套系</span>
          </div>
          <div className="close-box" onClick={this.onHide.bind(this)}>
            <span className="icon"></span>
          </div>
          <div className="popup-content-box">
            <div className="menu-suit-box">
              {
                menuContent
              }
            </div>
          </div>
        </div>
      </div>
    )
  }

  onShowMenu(title, menuList, e) {
    e.preventDefault();
    this.setState({boxClass:'', boxTitle:title, menuList:menuList});
  }

  onHide(e) {
    e.preventDefault();
    this.setState({boxClass:' hide'});
  }
}

class HotelInfo extends React.Component {
  constructor (props) {
    super(props);

    let ad = props.address||'';
    if (props.address.length > 6) {
      ad = props.address.substring(0, props.address.length - 5);
    }
    ad+='****'

    this.state = {
      // 酒店地址
      address:ad,
      // 经度
      latitude:props.latitude||0,
      // 纬度
      longitude:props.longitude||0,
      // 酒店详情介绍
      introduction:props.introduction||'',
      // 电话
      tell:'400-015-9999',
      // 介绍框类
      boxClass:' hide',
      // 介绍框标题
      boxTitle:'',
      // 介绍框内容
      boxContent:'',
      // 显示类型 0:内容 1:地图
      type:0
    };
  }

  render () {

    // 介绍框显示内容
    let content = null;
    if (this.state.boxClass.length == '') {
      if (this.state.type == 0) {
        content = (
          <ul className="item-list">
            <li className="item">
              <div className="info-box">
                <span className="text-content">{this.state.boxContent}</span>
              </div>
            </li>
          </ul>
        )
      } else {
        content = (
          <MapLocation latitude={this.state.latitude} longitude={this.state.longitude} />
        )
      }
    }

    return (
      <div>
        <section className="items info-items">
          <ul className="list-box info-list">
            <li className="item" onClick={this.onShowDress.bind(this, '酒店地址', this.state.latitude, this.state.longitude)}>
              <div className="title-box">
                <i className="left-icon icon-address"></i>
                <span className="title">{this.state.address}</span>
                <i className="right-icon icon-arrow"></i>
              </div>
            </li>
            <li className="item" onClick={this.onShowIntroduction.bind(this, '酒店介绍', this.state.introduction)}>
              <div className="title-box">
                <i className="left-icon icon-detail"></i>
                <span className="title">酒店详情介绍</span>
                <i className="right-icon icon-arrow"></i>
              </div>
            </li>
            <li className="item phone-item">
              <a href="tel:400-015-9999">
                <div className="title-box">
                  <i className="left-icon icon-phone"></i>
                  <span className="title">{this.state.tell}</span>
                  <span className="subtitle">联系商家</span>
                  <i className="right-icon icon-arrow"></i>
                </div>
              </a>
            </li>
          </ul>
        </section>

        <div className={"fixed-popup-show-box"+this.state.boxClass}>
          <div className="title-box">
            <span className="title">{this.state.boxTitle}</span>
          </div>
          <div className="close-box" onClick={this.onHide.bind(this)}>
            <span className="icon"></span>
          </div>
          <div className="popup-content-box">
            {
              content
            }
          </div>
        </div>
      </div>
    )
  }

  onShowDress(title, latitude, longitude, e) {
    e.preventDefault();
    this.setState({boxClass:'', boxTitle:title, latitude:latitude, longitude:longitude, type:1});
  }

  onShowIntroduction(title, boxContent, e) {
    e.preventDefault();
    this.setState({boxClass:'', boxTitle:title, boxContent:boxContent, type:0});
  }

  onHide(e) {
    e.preventDefault();
    this.setState({boxClass:' hide'});
  }
}

/*
 http://cq.jsbn.com/api/hotel/detail/2864
* */
class HotelDetails extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      data:{
      },
    };
  }

  render () {
    if (!this.state.data.pcDetailImages) {
      return null;
    }
    let detailImages = JSON.parse(this.state.data.pcDetailImages)
    return (
      <div className="hotel-detail-view">
        <div className="top-logo-box">
          <div className="logo-box">
            <i className="icon-home-logo"></i>
            <i className="icon-home-word"></i>
          </div>
        </div>

        <div className="adv-header-box">
          <DetailSlider
            data={detailImages}
            aspectRatio="3:2"
            height={460}
          />
        </div>

        <div className="head-info-box ">
          <div className="name-box">
            <span className="text">{this.state.data.name}</span>
          </div>
          <div className="price-box">
            <span className="text">{'￥'+this.state.data.lowestConsumption+'-'+this.state.data.highestConsumption+'/桌'}</span>
          </div>
        </div>

        <DiscountInfo />
        <HotelInfo {...this.state.data} />
        <HallInfo {...this.state.data} />
        <MenuInfo {...this.state.data} />

      </div>
    )
  }

  componentDidMount() {
    // 获取酒店ID
    let id = this.props.dataParams.id;
    if (id && parseInt(id)>0) {
      let url = BaseConfig.baseUrl+"hotel/detail/"+id;
      // 请求数据
      fetch(url)
        .then(res => {return res.json()})
        .then(j =>{
          if(j.success && j.data.length > 0) {
            this.setState({data:j.data[0]});
          }
        })
    }
  }

  componentDidUpdate() {
  }
}

export { HotelDetails }
