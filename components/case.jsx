import React, { PropTypes } from 'react'
import _ from 'lodash'

import { CaseConfig } from './config/case-config'
import { MediaItem, EmImgProcessType } from './common/media-item.jsx'
import { ConditionFilter } from './common/condition-filter.jsx'
import { DetailType } from '../src/utils/detail-type'
import { noResult } from './common/no_result'
import { loading } from './common/loading'

class CaseList extends React.Component {
  constructor (props) {
    super(props);
    this.renderFlg=false;
    this.cache=new Map();
    this.state = {
      data:[],
      showMoreFlg:true,
      params:{
        pageSize:6,
        pageIndex:0
      }
    };
  }

  render () {
    let moreButton = null;
    if (this.state.showMoreFlg) {
      moreButton = (
        <div className="more-button" onClick={this.handleMore.bind(this)}>
          <div className="button-box">
            <span className="icon"></span>
            <span className="title">点击加载</span>
          </div>
        </div>
      )
    }
    let listContent = null;
    if (this.state.data.length > 0) {
      listContent = (
        _.map(this.state.data, (v,k)=>{
          // 通过v.coverUrlWeb来做组件的key,这样才能避免条件切换的时候不刷新的问题
          return (
            <li key={k} className="item">
              <a href={'/detail/'+DetailType.Case+'/'+v.id} target='_blank' >
                <MediaItem
                  aspectRatio="3:2"
                  imageUrl={v.coverUrlWeb}
                  processType={EmImgProcessType.emGD_S_S}
                  width={300}
                />
              </a>
            </li>
          )
        })
      )
    } else if (this.renderFlg) {
      // 没有搜索结果的时候显示
      listContent = noResult()
    } else {
      // 初始化的时候显示加载图标
      listContent = loading()
    }
    return (
      <div className="list-box">
        <ul className="item-list">
          {
            listContent
          }
        </ul>
        {
          moreButton
        }
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    // 设置不渲染,最后由数据请求回来以后修改是否渲染
    this.renderFlg=false;
    // 组装参数,比较参数变化
    let p = _.merge(nextProps.params, {pageSize:this.state.params.pageSize, pageIndex:this.state.params.pageIndex})
    // 比较接收到的参数是否有变化
    if (JSON.stringify(p) !== JSON.stringify(this.state.params)) {
      // 重新赋值页码
      p.pageIndex = 0;
      this.queryData(p,false);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.renderFlg;
  }

  queryData(params, isChunk) {
    let cfg = CaseConfig.CaseList
    params.pageIndex += 1;
    let fetchUrl = cfg.buildQueryUrl(params,cfg.dataUrl)
    console.log(fetchUrl)
    fetch(fetchUrl)
      .then(res => {return res.json()})
      .then(j =>{
        if(j.success) {
          let tmpData;
          if (isChunk) {
            tmpData = this.state.data;
            tmpData = tmpData.concat(j.data);
          } else {
            tmpData = j.data;
          }
          // 设置渲染标志
          this.renderFlg=true;
          if (j.count > tmpData.length) {
            this.setState({data:tmpData, params:params, showMoreFlg:true})
          } else {
            this.setState({data:tmpData, params:params, showMoreFlg:false})
          }
        }
      })
  }

  handleMore(e) {
    e.preventDefault();
    this.queryData(this.state.params,true);
  }

  componentDidMount() {
    this.queryData(this.state.params,false);
  }
}

class CaseContent extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      renderFlg:true,
      filters:[],
      params:{}
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
        <CaseList params={this.state.params} />
      </div>
    )
  }

  filterChangeHandle(params) {
    this.setState({params:params, renderFlg:false})
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
      kClass:"content-box style",
      kName:"风格",
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
      conditions:[
        {
          name:"全部",
          external:{}
        },
        {
          name:"5000-10,000",
          external:{minPrice:5000,maxPrice:10000}
        },
        {
          name:"10,000-15,000",
          external:{minPrice:10000,maxPrice:15000}
        },
        {
          name:"15,000-20,000",
          external:{minPrice:15000,maxPrice:20000}
        },
        {
          name:"20,000-30,000",
          external:{minPrice:20000,maxPrice:30000}
        },
        {
          name:"30,000-50,000",
          external:{minPrice:30000,maxPrice:50000}
        },
        {
          name:"50,000-100,000",
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