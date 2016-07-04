import React, { PropTypes } from 'react'
import _ from 'lodash'

import { NetApi } from './net-api'
import { HintPopupBoxType } from './code'
import { Calendar } from './calendar.jsx'

const EmShowType = {
  Init:-1,
  Hotel:0,// 酒店详情页面需求提交
  HotelRequire:1// 酒店需求提交界面
}

class UserInfo extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      // 显示类型
      showType:props.showType,
      sexIndex:0,
      sexData:[
        {id:0, text:'男'},
        {id:1, text:'女'}
      ]
    }
  }

  init () {
  }

  render() {
    switch (this.state.showType) {
      case EmShowType.Hotel: {
        return (
          <div className="name-box">
            <input className="input-name" type="text" placeholder="请输入你的姓名" ref={(ref)=>this.contactName=ref}></input>
            <div className="radio-box">
              {
                _.map(this.state.sexData, (v,k)=>{
                  let handle = this.sexChecked.bind(this, v.id);
                  return (
                    <label key={k}>
                      <input name="sex" type="radio" onChange={handle} checked={this.state.sexIndex === v.id}></input>{v.text}
                    </label>
                  )
                })
              }
            </div>
          </div>
        )
      }
      case EmShowType.HotelRequire: {
        return (
          <li className="data-item">
            <div className="hint-box">
              <label className="hint-text">请输入您的个人信息</label>
            </div>
            <div className="data-box">
              <div className="info-box">
                <input type="text" placeholder="请输入你的姓名" ref={(ref)=>this.contactName=ref}></input>
                {
                  _.map(this.state.sexData, (v,k)=>{
                    let handle = this.sexChecked.bind(this, v.id);
                    return (
                      <label key={k}>
                        <input name="sex" type="radio" onChange={handle} checked={this.state.sexIndex === v.id}></input>{v.text}
                      </label>
                    )
                  })
                }
              </div>
            </div>
          </li>
        )
      }
      default: {
        return null
      }
    }
  }

  sexChecked(id, e) {
    // 不要去调用e.preventDefault();会阻止事件的传递,导致不能选中
    this.setState({sexIndex:id});
  }

  getValue() {
    return {
      contactName:this.contactName.value||'',
      gender:this.state.sexIndex,
    }
  }
}

class ContactInfo extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      // 显示类型
      showType:props.showType,
      // 是否显示倒计时,用于重新获取验证码
      showTimeFlg:false,
      // 获取验证码间隔时间
      timeNum:60,
      // 错误信息
      errMsg:'',
    }
  }

  init () {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }

    if (this.sms) {
      this.sms.value=''
    }

    this.setState({
      showTimeFlg:false,
      timeNum:60,
      errMsg:'',
    });
  }

  render() {
    switch (this.state.showType) {
      case EmShowType.Hotel: {
        return (
          <div>
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
            </div>
            {
              this.state.errMsg.length>0
                ? <div className="error">{this.state.errMsg}</div>
                : null
            }
          </div>
        )
      }
      case EmShowType.HotelRequire: {
        return (
          <li  className="data-item">
            <div className="hint-box">
              <label className="hint-text">请输入您的手机号</label>
              <i className="hint-icon">*</i>
            </div>
            <div className="data-box">
              <div className="phone-box">
                <input className="input-phone"
                       type="text"
                       maxlength="11"
                       placeholder="请输入您的手机号"
                       ref={(ref)=>this.phone=ref} ></input>
                <input className="input-pin"
                       type="text"
                       placeholder="请输入短信验证码"
                       maxlength="6"
                       ref={(ref)=>this.sms=ref} ></input>
                {
                  this.state.showTimeFlg
                    ? <button type="button" className="send-pin-btn invalid-btn" >{this.state.timeNum+'秒后重新获取'}</button>
                    : <button type="button" className="send-pin-btn invalid-btn" onClick={this.getSMS.bind(this)}>获取验证码</button>
                }
              </div>
            </div>
            {
              this.state.errMsg.length>0
                ? <div className="error">{this.state.errMsg}</div>
                : null
            }
          </li>
        )
      }
      default: {
        return null
      }
    }

  }

  setErr(msg) {
    this.setState({errMsg:msg});
  }

  getValue() {
    return {
      contact:this.phone.value,
      code:this.sms.value,
    }
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
          errMsg:'获取验证码失败,请稍后重试.'
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

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  }
}

class BookingTimeInfo extends React.Component {
  constructor (props) {
    super(props);
    // 现在时间
    let dateNow = new Date();
    let dateNowStr = dateNow.getFullYear()+'年'+(dateNow.getMonth()+1)+'月'+dateNow.getDate()+'日';
    this.state = {
      kClass:' hide',
      // 显示类型
      showType:props.showType,
      index:0,// 0:日历选择 1:还未确定选择
      bookingTime:dateNowStr,
    }
  }

  init () {
    // 现在时间
    let dateNow = new Date();
    let dateNowStr = dateNow.getFullYear()+'年'+(dateNow.getMonth()+1)+'月'+dateNow.getDate()+'日';
    this.setState({
      kClass:' hide',
      index:0,// 0:日历选择 1:还未确定选择
      bookingTime:dateNowStr,
    });
  }

  render() {
    return (
      <li  className="data-item">
        <div className="hint-box">
          <label className="hint-text">请选择你的婚期</label>
        </div>
        <div className="data-box">
          <div className="date-box">
            <div className={this.state.index===0?"btn-group checked":"btn-group"}
                 ref={(ref)=>this.booking=ref}
                 onClick={this.clickChecked.bind(this, 0)} >
              <button type="button" className="btn ">
                <span className="title">{this.state.bookingTime}</span>
                <i className="icon-font">&#xe607;</i>
              </button>
            </div>
            <div className={this.state.index===0?"btn-group":"btn-group checked"}
                 onClick={this.clickChecked.bind(this, 1)} >
              <button type="button" className="btn ">
                <span className="title">还不确定</span>
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className={"fixed-popup-show-box"+this.state.kClass}>
            <div className="title-box">
              <span className="title">选择档期</span>
            </div>
            <div className="close-box" onClick={this.onHide.bind(this)}>
              <span className="icon"></span>
            </div>
            <div className="popup-content-box">
              <Calendar onDateChange={this.onDateChange.bind(this)} />
            </div>
          </div>
        </div>
      </li>
    )
  }

  componentDidMount() {
    this.setState({index:1});
  }

  onDateChange(dateStr) {
    this.setState({kClass:' hide', bookingTime:dateStr});
  }

  onHide(e) {
    e.preventDefault();
    this.setState({kClass:' hide'});
  }

  clickChecked(index, e) {
    e.preventDefault();
    if (index == 0) {
      this.setState({kClass:'', index:index});
    } else {
      this.setState({kClass:' hide', index:index});
    }
  }

  getValue() {
    if (this.state.index == 1) {
      return {
        bookingTime:'',
      }
    } else {
      return {
        bookingTime:this.state.bookingTime,
      }
    }
  }
}

class PlaceInfo extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      // 显示类型
      showType:props.showType,
      index:0,
      data:[
        {id:-1,name:'未确定'}
      ]
    }
  }

  init () {
    this.setState({
      index:0,
    });
  }

  render() {
    return (
      <li  className="data-item">
        <div className="hint-box">
          <label className="hint-text">您的婚礼会在哪个区办呢</label>
        </div>
        <div className="data-box">
          <ul className="option-group">
            {
              _.map(this.state.data,(v,k)=>{
                let handle = this.onChecked.bind(this, k);
                return (
                  <li key={k}
                      className={k===this.state.index?"option checked":"option"}
                      data-radio-name="area" onClick={handle}>
                    <span>{v.name}</span>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </li>
    )
  }

  onChecked(k, e) {
    e.preventDefault();
    this.setState({index:k})
  }

  componentDidMount() {
    // 获取区域
    NetApi.get('/api/hotelDistrict/all', (err,j)=>{
      if (!err) {
        if(j.success) {
          j.data.push({id:-1,name:'未确定'});
          this.setState({index:j.data.length-1, data:j.data})
        }
      }
    })
  }

  getValue() {
    let id = this.state.data[this.state.index].id;
    if (id == -1) {
      return {
        place:'',
      }
    } else {
      return {
        place:''+id,
      }
    }
  }
}

class TableNumInfo extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      // 显示类型
      showType:props.showType,
      index:5,
      data:[
        {name:'10桌以下'},
        {name:'10至20桌'},
        {name:'20至30桌'},
        {name:'30至40桌'},
        {name:'40桌以上'},
        {name:'未确定'}
      ]
    }
  }

  init () {
    this.setState({
      index:5,
    });
  }

  render() {
    return (
      <li  className="data-item">
        <div className="hint-box">
          <label className="hint-text">请选择你的桌数</label>
        </div>
        <div className="data-box">
          <ul className="option-group">
            {
              _.map(this.state.data, (v,k)=>{
                let handle = this.onChecked.bind(this, k);
                return (
                  <li key={k} className={k===this.state.index?"option checked":"option"} data-radio-name="table" onClick={handle}>
                    <span>{v.name}</span>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </li>
    )
  }

  onChecked(k, e) {
    e.preventDefault();
    this.setState({index:k})
  }

  getValue() {
    return {
      tableNum:this.state.data[this.state.index].name,
    }
  }
}

class RemarkInfo extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      // 显示类型
      showType:props.showType,
    }
  }

  init () {
  }

  render() {
    switch (this.state.showType) {
      case EmShowType.Hotel: {
        return (
          <div className="desc-box">
            <textarea className="input-desc" placeholder="备注" ref={(ref)=>this.remark=ref}></textarea>
          </div>
        )
      }
      case EmShowType.HotelRequire: {
        return (
          <li className="data-item">
            <div className="hint-box">
              <label className="hint-text">您还有别的需求请填写在这里:</label>
            </div>
            <div className="data-box">
              <textarea placeholder="备注" ref={(ref)=>this.remark=ref}></textarea>
            </div>
          </li>
        )
      }
      default: {
        return null
      }
    }

  }

  getValue() {
    return {
      remark:this.remark.value||'',
    }
  }
}

class RequireHotelComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      kClass:' hide',
      // 控制提交按钮的点击
      commitFlg:true,
      // 提交成功标识
      commitSucFlg:false,
      // 显示类型
      showType:props.showType,
      // 结果提示消息
      resultHint:'',
      // 酒店名称
      hotelName:props.hotelName||'',
      // 档期时间
      dataStr:props.dataStr||'',
    }
  }

  getRequireContent () {
    let content = null;
    switch (this.state.showType) {
      // 酒店详情页面提交需求
      case EmShowType.Hotel: {
        let contentText = null;
        if (this.state.dataStr && this.state.dataStr.length > 0) {
          contentText = (
            <div>
              <div className="top-box">
                <div className="close" onClick={this.close.bind(this)}></div>
                <span>查询档期</span>
              </div>
              <div className="name">
                <span className="hotel-name">{this.state.hotelName}</span>
              </div>
              <div className="text">
                <strong>&emsp;&emsp;为了帮你准确查询：</strong>
                <span >{this.state.dataStr}</span>
                <strong>该酒店的档期情况，请完善下面的内容，便于我们的工作人员即时与您联系并介绍该酒店的实时档期信息。</strong>
              </div>
            </div>
          )
        } else {
          contentText = (
            <div>
              <div className="top-box">
                <div className="close" onClick={this.close.bind(this)}></div>
                <span>预约看店</span>
              </div>
              <div className="name">
                <span className="hotel-name">{this.state.hotelName}</span>
              </div>
              <div className="text">
                <strong>&emsp;&emsp;为了更高效的为你预约该场地，请完善下面的内容，便于我们的工作人员即时与您联系。</strong>
              </div>
            </div>
          )
        }

        return (
          <div className={"detail-scrollView"+this.state.kClass}>
            <div className="data-input-view">
              {
                contentText
              }
              <ContactInfo ref={(ref)=>this.contactInfo=ref} showType={this.state.showType} />
              <UserInfo ref={(ref)=>this.userInfo=ref} showType={this.state.showType} />
              <RemarkInfo ref={(ref)=>this.remarkInfo=ref} showType={this.state.showType} />
              {
                this.state.resultHint.length > 0
                  ? <div className="error">{this.state.resultHint}</div>
                  : null
              }
              {
                this.state.commitFlg
                  ? <div className="confirm-btn" onClick={this.commit.bind(this)} >确  定</div>
                  : <div className="confirm-btn loading-state">确  定</div>
              }
              <div className="cancel-btn " onClick={this.close.bind(this)}>取  消</div>
            </div>
          </div>
        )

        break;
      }
      case EmShowType.HotelRequire: {
        return (
          <div className="scrollView">
            <div className="hotel-need-view">
              <div className="top-logo-box">
                <div className="logo-box">
                  <i className="icon-home-logo"></i>
                  <i className="icon-home-word"></i>
                </div>
              </div>
              <div className="tjxq-form">
                <div className="header-box" >
                  <h2 className="title">金色百年婚宴预定需求提交</h2>
                  <span className="desc-text">
                    在金色百年婚宴预订服务平台，已接入包括重庆第一婚宴品牌芭菲嘉宴等上百家婚宴酒店，
                    我们的统筹师对这些酒店的了解程度、对婚宴本身的专业知识和丰富的婚宴预定经验，
                    能帮你轻松预定到如你所愿的酒店。简单填写以下表格，剩下的交给统筹师搞定，
                    服务免费，还有万元品质大礼包可以拿哟，赶快行动吧！
                  </span>
                </div>
                <ul className="data-item-list">
                  <UserInfo ref={(ref)=>this.userInfo=ref} showType={this.state.showType} />
                  <ContactInfo ref={(ref)=>this.contactInfo=ref} showType={this.state.showType} />
                  <BookingTimeInfo ref={(ref)=>this.bookingTimeInfo=ref} showType={this.state.showType} />
                  <PlaceInfo ref={(ref)=>this.placeInfo=ref} showType={this.state.showType} />
                  <TableNumInfo ref={(ref)=>this.tableNumInfo=ref} showType={this.state.showType} />
                  <RemarkInfo ref={(ref)=>this.remarkInfo=ref} showType={this.state.showType} />
                </ul>
                <div className="footer-box">
                  {
                    this.state.resultHint.length > 0
                      ? <div ><p>{this.state.resultHint}</p></div>
                      : null
                  }
                  {
                    this.state.commitFlg
                      ? <input type="submit" className="btn-submit" onClick={this.commit.bind(this)} value="提交"></input>
                      : <input type="submit" className="btn-submit loading-state" onClick={this.commit.bind(this)} value="提交"></input>
                  }
                </div>
              </div>
            </div>
          </div>
        )
        break;
      }
      default:{
        break;
      }
    }

    return content;
  }

  getResultContent () {
    let content = null;

    switch (this.state.showType) {
      case EmShowType.Hotel: {
        content = (
          <div className={"detail-scrollView"+this.state.kClass}>
            <div className="data-input-view">
              <div className="top-box">
                <div className="close" onClick={this.close.bind(this)}></div>
              </div>
              <div className="center-content-box">
                <div><p>{this.state.resultHint}</p></div>
              </div>
            </div>
          </div>
        )
        break;
      }
      case EmShowType.HotelRequire: {
        content = (
          <div className="scrollView">
            <div className="hotel-need-view">
              <div className="top-logo-box">
                <div className="logo-box">
                  <i className="icon-home-logo"></i>
                  <i className="icon-home-word"></i>
                </div>
              </div>
              <div className="tjxq-form">
                <div className="center-content-box">
                  <div><p>{this.state.resultHint}</p></div>
                </div>
              </div>
            </div>
          </div>
        )
        break;
      }
      default:{
        break;
      }
    }

    return content;
  }

  render () {
    if (this.state.commitSucFlg) {
      return this.getResultContent();
    } else {
      return this.getRequireContent();
    }
  }

  commit(e) {
    e.preventDefault();
    // 电话号码
    let phoneValue = this.contactInfo.getValue().contact;
    // 短信验证码
    let smsValue = this.contactInfo.getValue().code;
    if(!(/^1[3|4|5|7|8]\d{9}$/.test(phoneValue))) {
      this.contactInfo.setErr('请输入正确的手机号码');
    } else if (!(/\d{6}$/.test(smsValue))) {
      this.contactInfo.setErr('请输入正确的验证码');
    } else {
      let body={
        code:smsValue,
        contact:phoneValue,
        remark:(this.remarkInfo && this.remarkInfo.getValue().remark)||'',
        contactName:(this.userInfo && this.userInfo.getValue().contactName)||'',
        gender:(this.userInfo && this.userInfo.getValue().gender)||0,
        bookingTime:(this.bookingTimeInfo && this.bookingTimeInfo.getValue().bookingTime)||'',
        place:(this.placeInfo && this.placeInfo.getValue().place)||'',
        tableNum:(this.tableNumInfo && this.tableNumInfo.getValue().tableNum)||'',
        hotelName:'',
      }

      this.contactInfo.setErr('');
      // 设置在请求回来之前不能提交
      this.setState({
        commitFlg:false,
      })
      NetApi.post('/bus/hotelSurvey', body, (err, j)=>{
        if (err) {
          this.setState({
            commitFlg:true,
            resultHint:err
          })
        } else {
          if (!j.success) {
            this.setState({
              commitFlg:true,
              resultHint:j.message
            })
          } else {
            this.setState({
              commitSucFlg:true,
              commitFlg:true,
              resultHint:'提交成功，金色百年感谢您的信任与支持，稍后我们的工作人员会与您联系!',
            })
          }
        }
      })
    }
  }

  close(e) {
    e.preventDefault();
    this.setState({
      kClass:' hide'
    });
  }

  setData(showFlg, hotelName, dataStr) {

    if (showFlg) {
      this.setState({
        kClass:'',
        hotelName:hotelName,
        dataStr:dataStr,
        commitFlg:true,
        commitSucFlg:false,
        resultHint:'',
      },()=>{
        // 清除组件状态
        this.contactInfo && this.contactInfo.init();
        this.remarkInfo && this.remarkInfo.init();
        this.userInfo && this.userInfo.init();
        this.bookingTimeInfo && this.bookingTimeInfo.init();
        this.placeInfo && this.placeInfo.init();
        this.tableNumInfo && this.tableNumInfo.init();
      })
    } else {
      this.setState({
        kClass:' hide',
        hotelName:hotelName,
        dataStr:dataStr,
        commitFlg:true,
        commitSucFlg:false,
        resultHint:'',
      })
    }
  }
}

export { RequireHotelComponent, EmShowType }
