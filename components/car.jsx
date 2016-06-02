import React, { PropTypes } from 'react'
import _ from 'lodash'

import { CarConfig } from './config/car-config'
import { MediaItem, EmImgProcessType } from './common/media-item.jsx'
import { ConditionFilter } from './common/condition-filter.jsx'
import { DetailType } from '../src/utils/detail-type'

class CarList extends React.Component {
  constructor (props) {
    super(props);
    this.renderFlg=true;
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
              <a href={'/detail/'+DetailType.Car+'/'+v.id} target='_blank' >
                <div className="photo-box">
                  <MediaItem
                    aspectRatio="3:2"
                    imageUrl={v.coverUrlWeb}
                    processType={EmImgProcessType.emGD_S_S}
                    width={300}
                  />
                </div>
                <div className="info-box">
                  <i className="img-title"></i>
                  <span className="text-title">{v.title}</span>
                  <span className="price-discount">{'$'+v.rentalPrice}</span>
                  <span className="price-original">{'$'+v.marketPrice}</span>
                </div>
              </a>
            </li>
          )
        })
      )
    } else {
      return (
        <p>无搜索结果</p>
      )
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
    let cfg = CarConfig.CarList
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

class CarContent extends React.Component {
  constructor (props) {
    super(props);
    this.conditions=new Array();
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
          <span className="title">婚礼用车</span>
        </div>

        <ConditionFilter filters={this.state.filters} renderFlg={this.state.renderFlg} filterChangeHandle={this.filterChangeHandle.bind(this)} />
        <CarList params={this.state.params} />
      </div>
    )
  }

  filterChangeHandle(params) {
    this.setState({params:params, renderFlg:false})
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
            let brand = _.map(j.data || [], (v,k)=>{
              return _.pick(v,['name','brandId'])
            });
            let tmpData = [{name:'全部', brandId:-1}].concat(brand);
            this.initFilter(tmpData, 2)
          }
        })
    }

  }

  initFilter (tmpData, type) {
    switch (type) {
      case 1:// 车型
      {
        let f = [];
        let p = {
          kClass:"content-box type",
          kName:"车型",
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
        f[0]=p;
        this.conditions = this.conditions.concat(f);

        break;
      }
      case 2:{
        let f = [];
        let p = {
          kClass:"content-box brand",
          kName:"品牌",
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
        f[0]=p;
        this.conditions = this.conditions.concat(f);

        break;
      }
    }

    if (this.conditions.length < 2) {
      return;
    }

    let f1 = [];
    // 组装价格条件
    let p1 = {
      kClass:"content-box price",
      kName:"价位",
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
    f1[0]=p1;
    // 组装类别
    let p2 = {
      kClass:"content-box type",
      kName:"类别",
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
    f1[1]=p2;

    this.conditions = this.conditions.concat(f1);
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
