import React, { PropTypes } from 'react'
import _ from 'lodash'

import { F4Config } from './config/f4-config'
import { MediaItem, EmImgProcessType } from './common/media-item.jsx'
import { ConditionFilter } from './common/condition-filter.jsx'
import { DetailType, ShowType } from '../src/utils/detail-type'
import { GetHintContent, HintType } from './common/hint'
import { ReqCode } from './common/code'
import { BaseShowDetail } from './detail.jsx'

/*
F4的list没有提到list_content是因为这个数据结果在展示的时候需要打乱展示,所以没有做提取
* */
class F4List extends BaseShowDetail {
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
        pageSize:4,
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
          // 四大金刚展示需要把结果打乱
          content = (
            _.map(this.state.data, (v,k)=>{
              // 价格描述
              let priceRemark=null;
              if (v.priceRemark && v.priceRemark !== '') {
                let ls = v.priceRemark.split && v.priceRemark.split('|') || []
                priceRemark = (
                  <div className="price-intro-box">
                    <span className="text-hint">浮动价格</span>
                    {
                      _.map(ls, (v,k) => {
                        return (
                          <span key={k}>{v}</span>
                        );
                      })
                    }
                  </div>
                )
              }

              // 个人描述
              let description=null;
              if (v.description && v.description !== "") {
                description = (
                  <div className="intro-box">
                    <span className="text-hint">个人简介</span>
                    <span className="text-content">{v.description}</span>
                  </div>
                )
              }

              return (
                <li key={k} className="item f4-item">
                  <div className="head-image-box">
                    <MediaItem
                      aspectRatio="1:1"
                      imageUrl={v.photoUrl}
                      processType={EmImgProcessType.emGD_S_S}
                      width={200}
                    />
                  </div>
                  <div className="info-box">
                    <div className="name-box">
                      <span className="text-hint">{this.props.typeName}</span>
                      <span className="text-content">{v.nickName}</span>
                    </div>
                    <div className="price-box">
                      <span className="text-content">{'￥'+v.salePrice}</span>
                    </div>
                    {
                      priceRemark
                    }
                    {
                      description
                    }
                  </div>
                  <div className="photo-box">
                    {
                      _.map(v.workList && v.workList.slice(0,2), (v, k) => {
                        // 显示详情处理句柄
                        if (this.props.workType=='video') {
                          let onShowDetail=super.showDetail.bind(this, DetailType.F4, ShowType.video, v)
                          return (
                            <div key={k} className="img-box" onClick={onShowDetail}>
                              <MediaItem
                                aspectRatio="3:2"
                                imageUrl={v.coverUrlWeb}
                                processType={EmImgProcessType.emGD_S_S}
                                width={300}
                              />
                              <i className="icon-video-play"></i>
                            </div>
                          )
                        } else {
                          let onShowDetail=super.showDetail.bind(this, DetailType.F4, ShowType.image, v)
                          return (
                            <div key={k} className="img-box" onClick={onShowDetail}>
                              <MediaItem
                                aspectRatio="2:3"
                                imageUrl={v.coverUrlWeb}
                                processType={EmImgProcessType.emGD_S_S}
                                width={200}
                              />
                            </div>
                          )
                        }
                      })
                    }
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
      // 从缓存里面直接取数据 _.shuffle 把数据打乱
      this.setState({
        reqState       : ReqCode.Ready,
        data           : _.shuffle(this.cache[key].data),
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
      this.queryData(key, p, nextProps.dataUrl, false)
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
    this.queryData(key, p, this.props.dataUrl, true);
  }

  componentDidMount() {
    // 调用父类的componentDidMount
    super.componentDidMount();
    // 参数的初始状态
    let p = {};
    _.merge(p, this.state.params)
    _.merge(p, this.props.params)
    // 组装缓存key
    let key = JSON.stringify(_.omit(p, ['pageSize','pageIndex']));
    this.queryData(key, p, this.props.dataUrl, false);
  }

  componentWillUnmount() {
    super.componentWillUnmount();
  }

  queryData(key, params, url,isChunk=false) {
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
      let cfg = F4Config.F4List
      // 加页请求
      params.pageIndex += 1;
      // 组装url
      let fetchUrl = cfg.buildQueryUrl(params, url)
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
              t = _.shuffle(t);
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

class F4Content extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      renderFlg:true,
      filters:[],
      typeName:'',
      workType:'',
      dataUrl:'',
      params:{
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
          <span className="title">婚礼人</span>
        </div>

        <ConditionFilter filters={this.state.filters} renderFlg={this.state.renderFlg} filterChangeHandle={this.filterChangeHandle.bind(this)} />
        {
          this.state.dataUrl.length >0 && <F4List params={this.state.params} typeName={this.state.typeName} workType={this.state.workType} dataUrl={this.state.dataUrl} />
        }
      </div>
    )
  }

  filterChangeHandle(params) {
    switch(params.type) {
      case 1:// 主持人
      {
        this.setState({params:params, renderFlg:false, typeName:'主持人', workType:'video', dataUrl:'f4/host'})
        break;
      }
      case 2:// 化妆师
      {
        this.setState({params:params, renderFlg:false, typeName:'化妆师', workType:'image', dataUrl:'f4/dresser'})
        break;
      }
      case 3:// 摄影师
      {
        this.setState({params:params, renderFlg:false, typeName:'摄影师', workType:'image', dataUrl:'f4/photographer'})
        break;
      }
      case 4:// 摄像师
      {
        this.setState({params:params, renderFlg:false, typeName:'摄像师', workType:'video', dataUrl:'f4/camera'})
        break;
      }
    }
  }

  componentDidMount() {
    let f= this.initFilter()
    switch(this.props.dataParams.tab) {
      case "host":
      {
        // 设置状态
        this.setState({params:{type:1}, filters:f, renderFlg:true, typeName:'主持人', workType:'video', dataUrl:'f4/host'})
        break;
      }
      case "dresser":
      {
        // 设置默认条件是第几个选中,不设置是第0个选中
        f[0].active=1;
        // 设置状态
        this.setState({params:{type:2}, filters:f, renderFlg:true, typeName:'化妆师', workType:'image', dataUrl:'f4/dresser'})
        break;
      }
      case "photographer":
      {
        // 设置默认条件是第几个选中,不设置是第0个选中
        f[0].active=2;
        // 设置状态
        this.setState({params:{type:3}, filters:f, renderFlg:true, typeName:'摄影师', workType:'image', dataUrl:'f4/photographer'})
        break;
      }
      case "camera":
      {
        // 设置默认条件是第几个选中,不设置是第0个选中
        f[0].active=3;
        // 设置状态
        this.setState({params:{type:4}, filters:f, renderFlg:true, typeName:'摄像师', workType:'video', dataUrl:'f4/camera'})
        break;
      }
      default:
      {
        // 设置状态
        this.setState({params:{type:1}, filters:f, renderFlg:true, typeName:'主持人', workType:'video', dataUrl:'f4/host'})
        break;
      }
    }
  }

  initFilter () {
    // 设置type: 1:主持人 2:化妆师 3:摄影师 4:摄像师
    // 婚礼人类型
    let f = [];
    let p1 = {
      kClass:"content-box style",
      kName:"类型",
      conditions:[
        {
          name:"主持人",
          external:{type:1}
        },
        {
          name:"化妆师",
          external:{type:2}
        },
        {
          name:"摄影师",
          external:{type:3}
        },
        {
          name:"摄像师",
          external:{type:4}
        }
      ]
    }

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
          name:"1500元以下",
          external:{minPrice:0,maxPrice:1500}
        },
        {
          name:"1500-2000元",
          external:{minPrice:1500,maxPrice:2000}
        },
        {
          name:"2000-2500元",
          external:{minPrice:2000,maxPrice:2500}
        },
        {
          name:"2500元以上",
          external:{minPrice:2500,maxPrice:99999}
        },
        {
          name:"30,000-50,000",
          external:{minPrice:30000,maxPrice:50000}
        }
      ]
    }
    f.push(p1);
    f.push(p2);
    return f;
  }
}

class F4 extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      data:[]
    };
  }

  render () {
    return (
      <div className="f4-list-view">
        <div className="top-logo-box">
          <div className="logo-box">
            <i className="icon-home-logo"></i>
            <i className="icon-home-word"></i>
          </div>
        </div>

        <MediaItem
          aspectRatio="1:-1"
          imageUrl={F4Config.Banner[0].imageUrl}
          processType={EmImgProcessType.emGD_S_S}
        />

        <F4Content {...this.props} />
      </div>
    )
  }

  componentDidMount() {
  }
}

export { F4 }
