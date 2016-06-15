import React, { PropTypes } from 'react'
import _ from 'lodash'

import { CaseConfig } from './config/case-config'
import { MediaItem, EmImgProcessType } from './common/media-item.jsx'
import { ConditionFilter } from './common/condition-filter.jsx'
import { DetailType, ShowType } from '../src/utils/detail-type'
import { ListContent } from './common/list-content.jsx'

class CaseContent extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      renderFlg:true,
      filters:[],
      params:{
        pageSize:8,
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
          <span className="title">案例欣赏</span>
        </div>

        <ConditionFilter filters={this.state.filters} renderFlg={this.state.renderFlg} filterChangeHandle={this.filterChangeHandle.bind(this)} />
        <ListContent params={this.state.params} type={DetailType.Case} dataUrl={CaseConfig.CaseList.dataUrl} />
      </div>
    )
  }

  filterChangeHandle(params) {
    if (JSON.stringify(params) != JSON.stringify(this.state.params)) {
      this.setState({params:params, renderFlg:false})
    }
  }

  componentDidMount() {
    // 获取风格条件
    let cfg = CaseConfig.StyleFilter
    let fetchUrl = cfg.buildUrl(null,cfg.dataUrl)
    fetch(fetchUrl)
      .then(res => {return res.json()})
      .then(j =>{
        if(j.success) {
          let tmpData = [{name:'全部', caseStyleId:-1}].concat(j.data || []);
          this.initFilter(tmpData)
        }
      })
  }

  initFilter (tmpData) {
    // 组装风格条件
    let f = [];
    let p1 = {
      kClass:"content-box case-style",
      kName:"风格",
      selType:0, // 单选
      defaultIndex:0,// 默认选中第一个
      conditions:[]
    }
    p1.conditions=_.map(tmpData, (v,k)=>{
      if (v.caseStyleId == -1) {
        return {
          name:v.name,
          external:{}
        }
      } else {
        return {
          name:v.name,
          external:{styleId:v.caseStyleId}
        }
      }
    })
    // 组装价格条件
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
          name:"5000至10,000",
          external:{minPrice:5000,maxPrice:10000}
        },
        {
          name:"10,000至15,000",
          external:{minPrice:10000,maxPrice:15000}
        },
        {
          name:"15,000至20,000",
          external:{minPrice:15000,maxPrice:20000}
        },
        {
          name:"20,000至30,000",
          external:{minPrice:20000,maxPrice:30000}
        },
        {
          name:"30,000至50,000",
          external:{minPrice:30000,maxPrice:50000}
        },
        {
          name:"50,000至100,000",
          external:{minPrice:50000,maxPrice:100000}
        },
        {
          name:"100,000以上",
          external:{minPrice:100000,maxPrice:9999999}
        }
      ]
    }
    f.push(p1);
    f.push(p2);
    this.setState({filters:f,renderFlg:true})
  }
}

class Case extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      data:[]
    };
  }

  render () {
    return (
      <div className="case-list-view">
        <div className="top-logo-box">
          <div className="logo-box">
            <i className="icon-home-logo"></i>
            <i className="icon-home-word"></i>
          </div>
        </div>

        <MediaItem
          aspectRatio="1:-1"
          imageUrl={CaseConfig.Banner[0].imageUrl}
          processType={EmImgProcessType.emGD_S_S}
        />

        <CaseContent />
      </div>
    )
  }

  componentDidMount() {
  }
}

export { Case }