import React, { PropTypes } from 'react'
import _ from 'lodash'

import { SupplyConfig } from './config/supply-config'
import { MediaItem, EmImgProcessType } from './common/media-item.jsx'
import { ConditionFilter } from './common/condition-filter.jsx'
import { DetailType, ShowType } from '../src/utils/detail-type'
import { ListContent } from './common/list-content.jsx'

class SupplyContent extends React.Component {
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
          <span className="title">婚礼用品</span>
        </div>

        <ConditionFilter filters={this.state.filters} renderFlg={this.state.renderFlg} filterChangeHandle={this.filterChangeHandle.bind(this)} />
        <ListContent params={this.state.params} type={DetailType.Supply} dataUrl={SupplyConfig.SupplyList.dataUrl} />
      </div>
    )
  }

  filterChangeHandle(params) {
    this.setState({params:params, renderFlg:false})
  }

  componentDidMount() {
    {
      // 获取用品类型条件
      let cfg = SupplyConfig.TypesCategory
      let fetchUrl = cfg.buildUrl(null,cfg.dataUrl)
      fetch(fetchUrl)
        .then(res => {return res.json()})
        .then(j =>{
          if(j.success) {
            let tmpData = [{name:'全部', weddingSuppliesTypeId:-1}].concat(j.data || []);
            this.initFilter(tmpData, 1)
          }
        })
    }

    {
      // 获取婚车品牌条件
      let cfg = SupplyConfig.BrandCategory
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
          kClass:"content-box supply-type",
          kName:"类型",
          selType:0, // 单选
          defaultIndex:0,// 默认选中第一个
          conditions:[]
        }

        p.conditions=_.map(tmpData, (v,k)=>{
          if (v.weddingSuppliesTypeId == -1) {
            return {
              name:v.name,
              external:{}
            }
          } else {
            return {
              name:v.name,
              external:{weddingSuppliesTypeId:v.typeId}
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

    this.setState({filters:this.conditions,renderFlg:true})
  }
}

class Supply extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      data:[]
    };
  }

  render () {
    return (
      <div className="supply-list-view">
        <div className="top-logo-box">
          <div className="logo-box">
            <i className="icon-home-logo"></i>
            <i className="icon-home-word"></i>
          </div>
        </div>

        <MediaItem
          aspectRatio="1:-1"
          imageUrl={SupplyConfig.Banner[0].imageUrl}
          processType={EmImgProcessType.emGD_S_S}
        />

        <SupplyContent />
      </div>
    )
  }

  componentDidMount() {}
}

export { Supply }
