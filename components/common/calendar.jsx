/*
日历组件
* */
import React, { PropTypes } from 'react'
import _ from 'lodash'

class Calendar extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      indexMonth:0,// 偏移月份
      shoMonthNum:1,// 显示的月份数
    };
  }

  render() {
    // 开始时间,外部传入
    let startTime = new Date();
    // 装载显示的月数明细
    let itemsContent = [];
    // 现在时间
    let dateNow = new Date();
    let dateNowStr = dateNow.getFullYear()+'年'+(dateNow.getMonth()+1)+'月'+dateNow.getDate()+'日';
    for(let n=0;n<this.state.shoMonthNum;n++) {
      // 循环完成一个月
      let rows = [];
      let newDate = new Date(startTime.getFullYear(), startTime.getMonth()+1+n+this.state.indexMonth, 0);
      // 本月月份开始是星期几
      let week = new Date(startTime.getFullYear(), startTime.getMonth()+n+this.state.indexMonth, 1).getDay();
      if (week == 0) {
        week = 7;
      }
      // 本月天数
      let counts = newDate.getDate();
      // 本月行数
      let rowCounts = Math.ceil((counts+week-1)/7);
      // 主key
      let lKey=newDate.toDateString();
      for(let i=0;i<rowCounts;i++) {//state-today  state-select
        let days = [];

        for(let j=(i*7)+1;j<((i+1)*7)+1;j++){
          let dayNum=j-week+1;
          if(dayNum>0&&j<counts+week) {
            let dateObj = new Date(startTime.getFullYear(), startTime.getMonth()+n+this.state.indexMonth, dayNum);
            let dateStr = dateObj.getFullYear()+'年'+(dateObj.getMonth()+1)+'月'+dayNum+'日';
            let onDateChangeHandle = this.onDateChange.bind(this, dateStr);

            if (dateNowStr == dateStr) {
              // 当前日期
              days.push(
                <td key={''+lKey+i+j} className="day-number state-today"><span>{dayNum}</span></td>
              )
            } else {
              // 当前日期小于今天则不添加事件,变化
              if(dateNow > dateObj) {
                days.push(
                  <td key={''+lKey+i+j} className="before-day-number"><span>{dayNum}</span></td>
                )
              } else {
                days.push(
                  <td key={''+lKey+i+j} className="day-number" onClick={onDateChangeHandle}><span>{dayNum}</span></td>
                )
              }
            }
          } else {
            days.push(
              <td key={''+lKey+i+j} className="day-null "></td>
            )
          }
        }
        rows.push(
          <tr key={''+lKey+i}>
            {days}
          </tr>
        )
      }
      // 装载内容
      itemsContent.push(
        {
          head:(
            <div className="date-title-box">
              <span className="date-year">{newDate.getFullYear()}年</span>
              <span className="date-month">{newDate.getMonth()+1}月</span>
            </div>),
          body:(
            <table className="datepicker-calendar">
              <thead>
                <tr>
                  <th className="work-date"><span >一</span></th>
                  <th className="work-date"><span >二</span></th>
                  <th className="work-date"><span >三</span></th>
                  <th className="work-date"><span >四</span></th>
                  <th className="work-date"><span >五</span></th>
                  <th className="rest-date"><span >六</span></th>
                  <th className="rest-date"><span >日</span></th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </table>),
        }
      )
    }

    return (
      <div className="datepicker-box" style={{width:'100%'}}>
        <div className="datepicker">
          {
            _.map(itemsContent,(v,k)=>{
              return (
                <div key={k} className="datepicker-group">
                  <div className="datepicker-header">
                    <div className="left-btn-box" onClick={this.onPrev.bind(this)}>
                      <span className="icon-left-btn"></span>
                    </div>
                    {
                      v.head
                    }
                    <div className="right-btn-box" onClick={this.onNext.bind(this)}>
                      <span class="icon-right-btn"></span>
                    </div>
                  </div>
                  {
                    v.body
                  }
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }

  onPrev(e) {
    e.preventDefault();
    this.setState({indexMonth:this.state.indexMonth-1})
  }

  onNext(e) {
    e.preventDefault();
    this.setState({indexMonth:this.state.indexMonth+1})
  }

  onDateChange(dateStr, e) {
    e.preventDefault();
    if (this.props.onDateChange) {
      this.props.onDateChange(dateStr);
    }
  }
}

export { Calendar }
