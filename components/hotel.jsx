import React, { PropTypes } from 'react'
import _ from 'lodash'

import { MediaSlider } from './common/media-slider.jsx'
import { HotelConfig } from './config/hotel-config'
import { ConditionFilter } from './common/condition-filter.jsx'
import { DetailType, ShowType } from '../src/utils/detail-type'
import { ListContent } from './common/list-content.jsx'

class HotelContent extends React.Component {
  constructor (props) {
    super(props);
    this.conditions=[];
    this.state = {
      renderFlg:false,
      filters:[],
      params:{
        pageSize:4,
        pageIndex:0,
        sort:'price',
        order:'desc',
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
          <span className="title">婚宴预订</span>
        </div>

        <ConditionFilter filters={this.state.filters} renderFlg={this.state.renderFlg} filterChangeHandle={this.filterChangeHandle.bind(this)} />
        <ListContent params={this.state.params} type={DetailType.Hotel} dataUrl={HotelConfig.HotelList.dataUrl} />
      </div>
    )
  }

  filterChangeHandle(params) {
    // 默认值
    params.sort='price';
    params.order='desc';
    if (JSON.stringify(params) != JSON.stringify(this.state.params)) {
      this.setState({params:params, renderFlg:false})
    }
  }

  componentDidMount() {
    {
      // 获取地区
      let cfg = HotelConfig.HotelDistrict
      let fetchUrl = cfg.buildUrl(null,cfg.dataUrl)
      fetch(fetchUrl)
        .then(res => {return res.json()})
        .then(j =>{
          if(j.success) {
            let tmpData = [{name:'全部', id:-1}].concat(j.data || []);
            this.initFilter(tmpData, 1)
          }
        })
    }

    {
      // 获取酒店类型
      let cfg = HotelConfig.HotelType
      let fetchUrl = cfg.buildUrl(null,cfg.dataUrl)
      fetch(fetchUrl)
        .then(res => {return res.json()})
        .then(j =>{
          if(j.success) {
            let tmpData = [{name:'全部', typeId:-1}].concat(j.data || []);
            this.initFilter(tmpData, 2)
          }
        })
    }
  }

  initFilter (tmpData, type) {
    switch (type) {
      case 1:// 酒店区域
      {
        let p = {
          kClass:"content-box hotel-address",
          kName:"区域",
          selType:0, // 单选
          defaultIndex:0,// 默认选中第一个
          conditions:[]
        }

        p.conditions=_.map(tmpData, (v,k)=>{
          if (v.id == -1) {
            return {
              name:v.name,
              external:{}
            }
          } else {
            return {
              name:v.name,
              external:{cityId:v.id}
            }
          }
        })

        this.conditions.push(p);

        break;
      }
      case 2:{// 酒店类型
        let p = {
          kClass:"content-box hotel-class",
          kName:"分类",
          selType:0, // 单选
          defaultIndex:0,// 默认选中第一个
          conditions:[]
        }

        p.conditions=_.map(tmpData, (v,k)=>{
          if (v.typeId == -1) {
            return {
              name:v.name,
              external:{}
            }
          } else {
            return {
              name:v.name,
              external:{hotelType:v.typeId}
            }
          }
        })

        this.conditions.push(p);

        break;
      }
    }

    if (this.conditions.length < 2) {
      return;
    }

    // 组装桌数条件
    let p1 = {
      kClass:"content-box hotel-table",
      kName:"桌数",
      selType:0, // 单选
      defaultIndex:0,// 默认选中第一个
      conditions:[
        {
          name:"全部",
          external:{}
        },
        {
          name:"10桌以下",
          external:{minTable:0, maxTable:10}
        },
        {
          name:"10至20桌",
          external:{minTable:10,maxTable:20}
        },
        {
          name:"20至30桌",
          external:{minTable:20,maxTable:30}
        },
        {
          name:"30至40桌",
          external:{minTable:30,maxTable:40}
        },
        {
          name:"40至50桌",
          external:{minTable:40,maxTable:50}
        },
        {
          name:"50桌以上",
          external:{minTable:50,maxTable:99999}
        }
      ]
    }
    // 组装价格
    let p2 = {
      kClass:"content-box price",
      kName:"价位",
      selType:0, // 单选
      defaultIndex:0,// 默认选中第一个
      conditions:[
        {
          name:"全部",
          external:{}
        },
        {
          name:"2000元以下",
          external:{minPrice:0,maxPrice:2000}
        },
        {
          name:"2000至3000元",
          external:{minPrice:2000,maxPrice:3000}
        },
        {
          name:"3000至4000元",
          external:{minPrice:3000,maxPrice:4000}
        },
        {
          name:"4000元以上",
          external:{minPrice:4000,maxPrice:99999}
        }
      ]
    }
    // 组装优惠和折扣
    let p3 = {
      kClass:"content-box hotel-discount",
      kName:"折扣",
      selType:1, // 多选
      conditions:[
        {
          name:"礼包",
          isActive:false,
          external:{isGift:1}
        },
        {
          name:"优惠",
          isActive:false,
          external:{isDiscount:1}
        }
      ]
    }

    this.conditions.push(p1);
    this.conditions.push(p2);
    this.conditions.push(p3);

    this.setState({filters:this.conditions,renderFlg:true})
  }
}


class Hotel extends React.Component {
  constructor (props) {
    super(props);
    this.showFlg=false;
    this.state = {
      data:[]
    };
  }

  render () {
    return (
      <div className="hyyd-home-view">
        <div className="top-logo-box">
          <div className="logo-box">
            <i className="icon-home-logo"></i>
            <i className="icon-home-word"></i>
          </div>
        </div>
        <div className="adv-header-box">
          <MediaSlider
            dataUrl={HotelConfig['MediaSlider'].baseUrl+HotelConfig['MediaSlider'].dataUrl}
            aspectRatio={HotelConfig['MediaSlider'].aspectRatio}
            height={HotelConfig['MediaSlider'].height}
          />
        </div>

        <HotelContent />
      </div>
    )
  }

  componentDidMount() {
  }
}

export { Hotel }