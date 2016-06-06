import React, { PropTypes } from 'react'
import _ from 'lodash'

import { SupplyConfig } from './config/supply-config'
import { MediaItem, EmImgProcessType } from './common/media-item.jsx'
import { ConditionFilter } from './common/condition-filter.jsx'
import { DetailType, ShowType } from '../src/utils/detail-type'
import { GetHintContent, HintType } from './common/hint'
import { ReqCode } from './common/code'
import { BaseShowDetail } from './detail.jsx'

class SupplyList extends BaseShowDetail {
  constructor (props) {
    super(props);
    // 渲染标志,控制组件是否渲染
    this.renderFlg=false;
    // 缓存对象
    this.cache=new Map();
    // 组件状态
    this.state = {
      // 数据请求状态
      reqState:ReqCode.Loading,
      // 数据请求错误标志
      dataErrorFlg:false,
      // 数据
      data:[],
      // 是否显示加载更多
      showMoreFlg:false,
      // 搜索条件
      params:{
        pageSize:6,
        pageIndex:0
      }
    };
  }

  getListContent () {
    let content;

    switch (this.state.reqState) {
      case ReqCode.Loading: {
        // 加载中状态
        content = GetHintContent(HintType.Loading);
        break;
      }
      case ReqCode.Error: {
        // 加载错误状态
        content = GetHintContent(HintType.Error);
        break;
      }
      case ReqCode.Ready: {
        // 数据准备ok状态
        if (this.state.data.length > 0) {
          content = (
            _.map(this.state.data, (v,k)=>{
              let dataUrl=SupplyConfig.Base.baseUrl+'weddingsupplies/detail/'+v.id;
              let onShowDetail=super.showDetail.bind(this, DetailType.Supply, ShowType.image, null, dataUrl)
              return (
                <li key={k+''+v.id} className="item" onClick={onShowDetail}>
                  <div className="photo-box">
                    <MediaItem
                      aspectRatio="1:1"
                      imageUrl={v.coverUrlWeb}
                      processType={EmImgProcessType.emGD_S_S}
                      width={300}
                    />
                  </div>
                  <div className="info-box">
                    <i className="img-title"></i>
                    <span className="text-title">{v.title}</span>
                    <span className="price-discount">{'￥'+v.sellingPrice}</span>
                    <span className="price-original">{'￥'+v.marketPrice}</span>
                  </div>
                </li>
              )
            })
          )
        } else {
          content = GetHintContent(HintType.NoResult);
        }
        break;
      }
    }

    return content;
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
    let listContent = this.getListContent();
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
    let key = JSON.stringify(nextProps.params)
    // 设置渲染标志
    this.renderFlg = true;
    // 组装key
    if (this.cache[key]) {
      // 从缓存里面直接取数据
      this.setState({
        reqState       : ReqCode.Ready,
        data           : this.cache[key].data,
        showMoreFlg    : this.cache[key].showMoreFlg,
        params         : this.cache[key].params,
        dataErrorFlg   : false
      })
    } else {
      let p = {}
      p.pageSize = this.state.params.pageSize;
      p.pageIndex = 0;
      p = _.merge(p, nextProps.params)
      // 设置加载中状态
      this.setState({
        reqState       : ReqCode.Loading,
        data           : [],
        showMoreFlg    : false,
        dataErrorFlg   : false
      })
      // 请求数据
      this.queryData(key, p, false)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.renderFlg;
  }

  handleMore(e) {
    e.preventDefault();
    let p = {};
    p = _.merge(p, this.state.params)
    let key = JSON.stringify(_.omit(p, ['pageSize','pageIndex']));
    this.queryData(key, p, true);
  }

  componentDidMount() {
    super.componentDidMount();
    // 参数的初始状态
    let p = {};
    p = _.merge(p, this.state.params)
    // 组装缓存key
    let key = JSON.stringify(_.omit(p, ['pageSize','pageIndex']));
    this.queryData(key, p, false);
  }

  queryData(key, params, isChunk=false) {
    // 先从本地缓存里面查找数据
    if (this.cache[key] && !isChunk) {
      // 设置渲染标志
      this.renderFlg = true;
      // 从缓存里面直接取数据
      this.setState({
        reqState       : ReqCode.Ready,
        data           : this.cache[key].data,
        showMoreFlg    : this.cache[key].showMoreFlg,
        params         : this.cache[key].params,
        dataErrorFlg   : false,
      })
    } else {
      // 从网络请求数据
      let cfg = SupplyConfig.SupplyList
      // 加页请求
      params.pageIndex += 1;
      // 组装url
      let fetchUrl = cfg.buildQueryUrl(params,cfg.dataUrl)
      fetch(fetchUrl)
        .then(res => {return res.json()})
        .then(j => {
          // 设置渲染标志
          this.renderFlg=true;
          // 判断服务器应答结果
          if(j.success) {
            let t;
            // 是否需要合并老数据,适用于分页加载的情况
            if (isChunk) {
              t = this.state.data;
              t = t.concat(j.data);
            } else {
              t = j.data;
            }
            // 判断服务器数据是否加载完毕
            let m = (j.count > t.length) ? true : false;

            // 缓存数据
            let p = {}
            p.data = t;
            p.showMoreFlg = m;
            p.params = params;
            this.cache[key]=p;

            // 设置组件状态
            this.setState({
              reqState       : ReqCode.Ready,
              data           : t,
              showMoreFlg    : m,
              params         : params,
              dataErrorFlg   : false,
            })
          } else {
            // 数据请求错误
            if (isChunk) {
              // 分页请求数据失败的情况下不做处理
            } else {
              // 设置组件状态
              this.setState({
                reqState       : ReqCode.Error,
                data           : [],
                dataErrorFlg   : true,
              })
            }
          }
        })
        .catch(err => {
          console.log(err)
          // 设置渲染标志
          this.renderFlg=true;
          // 数据请求错误
          if (isChunk) {
            // 分页请求数据失败的情况下不做处理
          } else {
            // 设置组件状态
            this.setState({
              reqState       : ReqCode.Error,
              data           : [],
              dataErrorFlg   : true,
            })
          }
        });
    }
  }
}

class SupplyContent extends React.Component {
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
          <span className="title">婚礼用品</span>
        </div>

        <ConditionFilter filters={this.state.filters} renderFlg={this.state.renderFlg} filterChangeHandle={this.filterChangeHandle.bind(this)} />
        <SupplyList params={this.state.params} />
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
          kClass:"content-box type",
          kName:"类型",
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
