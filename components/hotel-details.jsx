import React, { PropTypes } from 'react'
import _ from 'lodash'

import { BaseConfig } from './config/base'
import { MediaItem, EmImgProcessType } from './common/media-item.jsx'
import { DetailType, ShowType } from '../src/utils/detail-type'
import { BaseShowDetail } from './detail.jsx'
import { MapLocation } from './common/map-location.jsx'
import { DetailSlider } from './common/detail-slider.jsx'
import { Calendar } from './common/calendar.jsx'
import { NetApi } from './common/net-api'

class DiscountInfo extends BaseShowDetail {
  constructor (props) {
    super(props);
    this.state = {
    };
  }

  render () {
    let giftUrl=BaseConfig.baseUrl+'activity/detail/libao';
    let onShowGiftDetail=super.showDetail.bind(this, DetailType.Activity, ShowType.image, null, giftUrl)

    return (
      <section className="items gift-items">
        <ul className="list-box info-list">
          <li className="item" onClick={onShowGiftDetail}>
            <div className="title-box">
              <i className="left-icon icon-text">预订有礼</i>
              <span className="title">下单立享万元品质大礼包</span>
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
                      imageUrl={v.coverUrlWeb}
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

const HintPopupBoxType = {
  INIT_NONE:-1,// 初期值
  MAP:0,// 地图
  INTRODUCTION:1,// 介绍
  MENU:2,// 菜单
  CALENDAR:3,// 日历
  REQUIRE:4,// 需求提交
}

class RequireBoxView extends React.Component {
  constructor (props) {
    super(props);
    this.intervalId=null;
    this.state = {
      showFlg:props.showFlg||false,
      // 酒店名称
      hotelName:props.hotelName||'',
      // 档期时间
      dataStr:props.dataStr||'',
      // 错误信息
      errMsg:'',
      // 是否显示倒计时,用于重新获取验证码
      showTimeFlg:false,
      // 获取验证码间隔时间
      timeNum:60,
      // 控制提交按钮的点击
      commitFlg:true,
    }
  }

  render () {

    if (!this.state.showFlg) {
      return null;
    }

    let contentText = null;
    if (this.props.dataStr && this.props.dataStr.length > 0) {
      contentText = (
        <div className="text">
          <strong>为了帮你准确查询：</strong>
          <span >{this.props.dataStr}</span>
          <strong>该酒店的档期情况，请完善下面的内容，便于我们的工作人员即时与您联系并介绍该酒店的实时档期信息。</strong>
        </div>
      )
    } else {
      contentText = (
        <div className="text">
          <strong>为了更高效的为你预约该场地，请完善下面的内容，便于我们的工作人员即时与您联系。</strong>
        </div>
      )
    }
    return (
      <div className="detail-scrollView">
        <div className="data-input-view">
          <div className="center-content-box">
            <div className="name">
              <span className="hotel-name">{this.props.hotelName}</span>
            </div>
            {
              contentText
            }
            <div className="phone-box">
              <label className="not-null-label">*</label>
              <input className="input-phone"
                     type="text"
                     maxlength="11"
                     placeholder="请输入您的手机号"
                     ref={(ref)=>this.phone=ref} ></input>
            </div>
            <div className="pin-box">
              <label className="not-null-label">*</label>
              <input className="input-pin"
                     type="text"
                     placeholder="请输入短信验证码"
                     maxlength="6"
                     ref={(ref)=>this.sms=ref} ></input>
              {
                this.state.showTimeFlg
                  ? <div className="send-pin-btn invalid-btn" >{this.state.timeNum+'秒后重新获取'}</div>
                  : <div className="send-pin-btn" onClick={this.getSMS.bind(this)}>获取验证码</div>
              }
              {
                this.state.showTimeFlg
                  ? <div className="send-pin-btn invalid-btn" >{this.state.timeNum+'秒后重新获取'}</div>
                  : <div className="send-pin-btn" onClick={this.getSMS.bind(this)}>获取验证码</div>
              }
            </div>
            {
              this.state.errMsg.length > 0
                ? <div className="error">{this.state.errMsg}</div>
                : null
            }
            {
              this.state.commitFlg
                ? <div className="confirm-btn" onClick={this.commit.bind(this)}><span>提交</span></div>
                : <div className="confirm-btn invalid-btn">
                <span>提交</span>
                <div className="icon-box">
                  <img src="http://img2.jsbn.com/static/loading.gif" />
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    )
  }

  getSMS(e) {
    e.preventDefault();

    let phone = this.phone.value;
    if (phone.length !== 11) {
      this.setState({
        errMsg:'请输入正确的手机号'
      })
      return;
    }

    if(!(/^1[3|4|5|7|8]\d{9}$/.test(phone))) {
      this.setState({
        errMsg:'请输入正确的手机号'
      })
      return;
    }

    this.setState({
      errMsg:''
    })

    NetApi.post('/bus/sms', {contact:phone}, (err, j)=>{
      if (err) {
        this.setState({
          errMsg:'获取验证码失败,请稍后重试.',
          showTimeFlg:false,
          timeNum:60,
        })
      }
    })

    this.setState({showTimeFlg:true});
    this.intervalId = setInterval(()=>{
      let i = this.state.timeNum;
      if (--i < 0) {
        this.setState({timeNum:60, showTimeFlg:false})
        if (this.intervalId) {
          clearInterval(this.intervalId)
        }
      } else {
        this.setState({timeNum:i})
      }
    }, 1000);
  }

  commit(e) {
    e.preventDefault();
    // 电话号码
    let phoneValue = this.phone.value;
    // 短信验证码
    let smsValue = this.sms.value;
    if(!(/^1[3|4|5|7|8]\d{9}$/.test(phoneValue))) {
      this.setState({
        errMsg:'请输入正确的手机号码'
      })
    } else if (!(/\d{6}$/.test(smsValue))) {
      this.setState({
        errMsg:'请输入正确的验证码'
      })
    } else {
      let body={
        code:smsValue,
        contact:phoneValue,
        remark:'',
        contactName:'',
        gender:0,
        bookingTime:this.props.dataStr||'',
        place:'',
        tableNum:'',
        hotelName:'',
      }
      // 设置在请求回来之前不能提交
      this.setState({
        commitFlg:false,
        errMsg:'',
      })
      NetApi.post('/bus/hotelSurvey', body, (err, j)=>{
        if (err) {
          this.setState({
            commitFlg:true,
            errMsg:err
          })
        } else {
          console.log(JSON.stringify(j))
          if (!j.success) {
            this.setState({
              commitFlg:true,
              errMsg:j.message
            })
          } else {
            // 提交成功
            console.log('提交成功')
          }
        }
      })
    }
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId=null
    }
  }

  setData(showFlg, hotelName, dataStr) {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId=null
    }

    if (this.state.showFlg !== showFlg) {
      this.setState({
        showFlg:showFlg,
        hotelName:hotelName,
        dataStr:dataStr,
        errMsg:'',
        showTimeFlg:false,
        timeNum:60,
        commitFlg:true,
      })
    }
  }

  componentDidMount() {
  }
}

class HintPopupBox extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      // 介绍框类样式
      boxClass:' hide',
      // 介绍框标题
      boxTitle:'',
      // 介绍框类型
      boxType:-1,
    }
  }

  getContent () {
    let content=null;

    switch (this.state.boxType) {
      case HintPopupBoxType.MENU: {
        if (this.state.boxData.length > 0) {
          content = (
            <div className="menu-suit-box">
              <ol className="menu-list">
                {
                  _.map(this.state.boxData, (v,k)=>{
                    return (
                      <li key={k}>{'.'+v.name}</li>
                    )
                  })
                }
              </ol>
            </div>
          )
        } else {
          content = (
            <div className="menu-suit-box">
              <span className="text-hint">*该酒店未提供菜肴，请以店谈为准</span>
            </div>
          )
        }
        break;
      }
      case HintPopupBoxType.MAP: {
        content = (
          <MapLocation latitude={this.state.boxData.latitude} longitude={this.state.boxData.longitude} />
        )
        break;
      }
      case HintPopupBoxType.INTRODUCTION: {
        content = (
          <ul className="item-list">
            <li className="item">
              <div className="info-box">
                <span className="text-content">{this.state.boxData}</span>
              </div>
            </li>
          </ul>
        )
        break;
      }
      case HintPopupBoxType.CALENDAR: {
        content = (
          <Calendar {...this.props} />
        )
        break;
      }
      default: {
        break;
      }
    }

    return content;
  }

  render () {
    return (
      <div className={"fixed-popup-show-box"+this.state.boxClass}>
        <div className="title-box">
          <span className="title">{this.state.boxTitle}</span>
        </div>
        <div className="close-box" onClick={this.onHide.bind(this)}>
          <span className="icon"></span>
        </div>
        <div className="popup-content-box">
          {
            this.getContent()
          }
        </div>
      </div>
    )
  }

  onHide(e) {
    e.preventDefault();
    this.setState({boxClass:' hide'});
  }

  setData(showFlg, boxTitle, boxType, boxData) {
    if (!showFlg) {
      if (this.state.boxClass !== ' hide') {
        this.setState({boxClass:' hide'});
      }
    } else {
      this.setState({boxClass:'', boxTitle:boxTitle, boxType:boxType, boxData:boxData})
    }
  }
}

class MenuInfo extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      // 菜单明显
      setMealDetail: props.setMealDetail||'',
    };
  }

  render () {
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
      </div>
    )
  }

  onShowMenu(title, menuList, e) {
    e.preventDefault();
    if (this.props.optPopupBox) {
      this.props.optPopupBox(true, title, HintPopupBoxType.MENU, menuList);
    }
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
    };
  }

  render () {
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
      </div>
    )
  }

  onShowDress(title, latitude, longitude, e) {
    e.preventDefault();
    if (this.props.optPopupBox) {
      this.props.optPopupBox(true, title, HintPopupBoxType.MAP, {latitude:latitude, longitude:longitude});
    }
  }

  onShowIntroduction(title, boxContent, e) {
    e.preventDefault();
    if (this.props.optPopupBox) {
      this.props.optPopupBox(true, title, HintPopupBoxType.INTRODUCTION, boxContent);
    }
  }
}

class HotelTools extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className="hotel-bottom-btn-box">
        <a className="service-box" href="https://static.meiqia.com/dist/standalone.html?eid=12020">
          <i className="icon icon-service"></i>
          <span>在线客服</span>
        </a>
        <a className="phone-box" href="tel:400-015-9999">
          <i className="icon icon-phone"></i>
          <span>联系商家</span>
        </a>
        <a className="schedule-box" onClick={this.click.bind(this,1)}>
          <span>查询档期</span>
        </a>
        <a className="see-area-box" onClick={this.click.bind(this,2)}>
          <span>预约看店</span>
        </a>
      </div>
    )
  }

  click(type, e) {
    e.preventDefault();
    console.log(':::::'+type)
    if (type === 1) {
      if (this.props.optPopupBox) {
        this.props.optPopupBox(true, '档期查询', HintPopupBoxType.CALENDAR, null);
      }
    } else {
      if (this.props.optPopupRequire) {
        this.props.optPopupRequire(null);
      }
    }
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
    let optPopupBoxHandle = this.optPopupBox.bind(this);
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
        <HotelInfo {...this.state.data} optPopupBox={optPopupBoxHandle} />
        <HallInfo {...this.state.data} />
        <MenuInfo {...this.state.data} optPopupBox={optPopupBoxHandle} />
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

  /*
   boxTitle:介绍框标题
   boxType:介绍框类型
  * */
  optPopupBox(showFlg, boxTitle=null, boxType=null, boxData=null) {
    this.hintPopupBox.setData(showFlg, boxTitle, boxType, boxData);
  }

  optPopupRequire(dateStr=null) {
    this.onDateChange(dateStr);
  }

  componentDidUpdate() {
    // 初期化渲染详情页面
    ReactDOM.render(<HintPopupBox
      ref={(ref)=>{this.hintPopupBox=ref}}
      onDateChange={this.onDateChange.bind(this)} />,
      document.getElementById('J_PopupBox_1'))
    // 在线需求提交
    ReactDOM.render(<RequireBoxView
      ref={(ref)=>{this.requireBoxView=ref}}/>,
      document.getElementById('J_Detail_PopupBox'))
    // 在线工具栏
    ReactDOM.render(<HotelTools
      ref={(ref)=>{this.hotelTools=ref}}
      optPopupBox={this.optPopupBox.bind(this)}
      optPopupRequire={this.optPopupRequire.bind(this)} />,
      document.getElementById('J_Nav_First'))
  }

  onDateChange(dateStr) {
    // 隐藏
    this.hintPopupBox.setData(false, null, null, null);
    // 显示在线需求提交
    this.requireBoxView.setData(true, this.state.data.name, dateStr);
  }
}

export { HotelDetails }
