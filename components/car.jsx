import React, { PropTypes } from 'react'
import _ from 'lodash'

import { CarConfig } from './config/car-config'
import { MediaItem, EmImgProcessType } from './common/media-item.jsx'
import { ConditionFilter } from './common/condition-filter.jsx'
import { DetailType, ShowType } from '../src/utils/detail-type'
import { ListContent } from './common/list-content.jsx'

class CarContent extends React.Component {
  constructor (props) {
    super(props);
    this.conditions=new Array();
    this.state = {
      renderFlg:true,
      filters:[],
      params:{
        pageSize:4,
        pageIndex:0
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
          <span className="title">婚礼用车</span>
        </div>

        <ConditionFilter filters={this.state.filters} renderFlg={this.state.renderFlg} filterChangeHandle={this.filterChangeHandle.bind(this)} />
        <ListContent params={this.state.params} type={DetailType.Car} dataUrl={CarConfig.CarList.dataUrl} />
      </div>
    )
  }

  filterChangeHandle(params) {
    if (JSON.stringify(params) != JSON.stringify(this.state.params)) {
      this.setState({params:params, renderFlg:false})
    }
  }

  componentDidMount() {
    {
      // 获取婚车车型条件
      let cfg = CarConfig.ModelCategory
      let fetchUrl = cfg.buildUrl(null,cfg.dataUrl)
      fetch(fetchUrl)
        .then(res => {return res.json()})
        .then(j =>{
          if(j.success) {
            let models = _.map(j.data || [], (v,k)=>{
              return _.pick(v,['name','modelsId'])
            });
            let tmpData = [{name:'全部', modelsId:-1}].concat(models);
            this.initFilter(tmpData, 1)
          }
        })
    }

    {
      // 获取婚车品牌条件
      let cfg = CarConfig.BrandCategory
      let fetchUrl = cfg.buildUrl(null,cfg.dataUrl)
      fetch(fetchUrl)
        .then(res => {return res.json()})
        .then(j =>{
          if(j.success) {
            let tmpData = [{name:'全部', brandId:-1}].concat(j.data || []);
            this.initFilter(tmpData, 2)
          }
        })
    }

  }

  initFilter (tmpData, type) {
    switch (type) {
      case 1:// 车型
      {
        let p = {
          kClass:"content-box car-type",
          kName:"车型",
          selType:0, // 单选
          defaultIndex:0,// 默认选中第一个
          conditions:[]
        }

        p.conditions=_.map(tmpData, (v,k)=>{
          if (v.modelsId == -1) {
            return {
              name:v.name,
              external:{}
            }
          } else {
            return {
              name:v.name,
              external:{modelsId:v.modelsId}
            }
          }
        })

        this.conditions.push(p);

        break;
      }
      case 2:{
        let p = {
          kClass:"content-box brand",
          kName:"品牌",
          selType:0, // 单选
          defaultIndex:0,// 默认选中第一个
          conditions:[]
        }

        p.conditions=_.map(tmpData, (v,k)=>{
          if (v.brandId == -1) {
            return {
              name:v.name,
              external:{}
            }
          } else {
            return {
              name:v.name,
              external:{brandId:v.brandId}
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

    // 组装价格条件
    let p1 = {
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
          name:"1000以下",
          external:{minPrice:0,maxPrice:999}
        },
        {
          name:"1000-2000",
          external:{minPrice:1000,maxPrice:2000}
        },
        {
          name:"2000-3000",
          external:{minPrice:2000,maxPrice:3000}
        },
        {
          name:"3000以上",
          external:{minPrice:3000,maxPrice:99999}
        }
      ]
    }
    // 组装类别
    let p2 = {
      kClass:"content-box car-category",
      kName:"类别",
      selType:0, // 单选
      defaultIndex:0,// 默认选中第一个
      conditions:[
        {
          name:"全部",
          external:{}
        },
        {
          name:"单车",
          external:{carNature:1}
        },
        {
          name:"车队",
          external:{carNature:0}
        }
      ]
    }
    this.conditions.push(p1);
    this.conditions.push(p2);

    this.setState({filters:this.conditions,renderFlg:true})
  }
}


class Car extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      data:[]
    };
  }

  render () {
    return (
      <div className="car-list-view">
        <div className="top-logo-box">
          <div className="logo-box">
            <i className="icon-home-logo"></i>
            <i className="icon-home-word"></i>
          </div>
        </div>

        <MediaItem
          aspectRatio="1:-1"
          imageUrl={CarConfig.Banner[0].imageUrl}
          processType={EmImgProcessType.emGD_S_S}
        />

        <CarContent />
      </div>
    )
  }

  componentDidMount() {}
}

export { Car }
