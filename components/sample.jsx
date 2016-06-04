import React, { PropTypes } from 'react'
import _ from 'lodash'

import { MediaSlider } from './common/media-slider.jsx'
import { MediaItem, EmImgProcessType } from './common/media-item.jsx'
import { SampleConfig } from './config/sample-config'
import { DetailType } from '../src/utils/detail-type'
import { GetHintContent, HintType } from './common/hint'
import { ReqCode } from './common/code'

// 因为样片的搜索有特殊性,风格和场景的展示与类型挂钩,所以不能使用公共的过滤器组件
// 筛选组件
class Filter extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      sampleType:[{name:'婚纱摄影', sampleType:0},{name:'艺术照', sampleType:1},{name:'全家福', sampleType:2}],
      sampleIndexType:0,
      shootStyle:[{name:'全部', shootStyleId:-1}],
      shootStyleIndex:0,
      exterior:[{name:'全部', exteriorId:-1}],
      exteriorIndex:0,
      params:{
        "sampleType":{"id":0,"name":"婚纱摄影"},
        "shootStyleId":{"id":-1,"name":"全部"},
        "exteriorId":{"id":-1,"name":"全部"}
      }
    };
  }

  render () {
    return (
      <div className={"fixed-center-box sift-content-box "+this.props.kClass} >
        <div className="sift-center-box">
          <div className="sift-scrollView-box">
            <div className="content-box type">
              <div className="title">
                <i className="icon"></i>
                <span className="text">分类</span>
              </div>
              <div className="item-list-box">
                <ul className="item-list">
                  {
                    _.map(this.state.sampleType, (v,k)=>{
                      let handle = this.handelSel.bind(this, k, "sampleType", v.sampleType, v.name);
                      if (this.state.sampleIndexType == k) {
                        return (
                          <li key={k} className="item item-activate">
                            <span className="title" onClick={handle}>{v.name}</span>
                          </li>
                        )
                      } else {
                        return (
                          <li key={k} className="item">
                            <span className="title" onClick={handle}>{v.name}</span>
                          </li>
                        )
                      }
                    })
                  }
                </ul>
              </div>
            </div>
            {
              // 只有婚纱摄影才有风格选项
              this.state.sampleIndexType === 0 && (
                <div className="content-box style">
                  <div className="title">
                    <i className="icon"></i>
                    <span className="text">风格</span>
                  </div>
                  <div className="item-list-box">
                    <ul className="item-list">
                      {
                        _.map(this.state.shootStyle, (v,k)=>{
                          let handle = this.handelSel.bind(this, k, "shootStyleId", v.shootStyleId, v.name)
                          if (this.state.shootStyleIndex == k) {
                            return (
                              <li key={k} className="item item-activate">
                                <span className="title" onClick={handle}>{v.name}</span>
                              </li>
                            )
                          } else {
                            return (
                              <li key={k} className="item">
                                <span className="title" onClick={handle}>{v.name}</span>
                              </li>
                            )
                          }
                        })
                      }
                    </ul>
                  </div>
                </div>
              )
            }
            {
              // 只有婚纱摄影才有场景选项
              this.state.sampleIndexType === 0 && (
                <div className="content-box address">
                  <div className="title">
                    <i className="icon"></i>
                    <span className="text">场景</span>
                  </div>
                  <div className="item-list-box">
                    <ul className="item-list">
                      {
                        _.map(this.state.exterior, (v,k)=>{
                          let handle = this.handelSel.bind(this, k, "exteriorId", v.exteriorId, v.name)
                          if (this.state.exteriorIndex == k) {
                            return (
                              <li key={k} className="item item-activate">
                                <span className="title" onClick={handle}>{v.name}</span>
                              </li>
                            )
                          } else {
                            return (
                              <li key={k} className="item">
                                <span className="title" onClick={handle}>{v.name}</span>
                              </li>
                            )
                          }
                        })
                      }
                    </ul>
                  </div>
                </div>
              )
            }
          </div>
          <div className="button-box">
            <div className="confirm-button" onClick={this.handleSubmit.bind(this)}>确定</div>
            <div className="reset-button" onClick={this.handleReset.bind(this)}>清除条件</div>
          </div>
        </div>
      </div>
    )
  }

  handleSubmit(e) {
    e.preventDefault();
    // 点击确定的时候吧用户选中的条件反馈给父组件
    if (this.props.filterChangeHandle) {

      let filters = {}
      let filterContents = {}

      // 摄影类型
      filters.sampleType = this.state.params.sampleType.id;
      filterContents.sampleTypeName = this.state.params.sampleType.name;

      // 摄影风格
      if (this.state.params.shootStyleId.id != -1 && filters.sampleType == 0) {
        filters.shootStyleId = this.state.params.shootStyleId.id;
        filterContents.shootStyleName = this.state.params.shootStyleId.name;
      }

      // 外景地
      if (this.state.params.exteriorId.id != -1 && filters.sampleType == 0) {
        filters.exteriorId = this.state.params.exteriorId.id;
        filterContents.exteriorName = this.state.params.exteriorId.name;
      }

      this.props.filterChangeHandle(filters, filterContents)
    }
  }

  handleReset(e) {
    e.preventDefault();
    // 重置条件
    let p = {
      sampleType:{id:0,name:'婚纱摄影'},
      shootStyleId:{id:-1,name:'全部'},
      exteriorId:{id:-1,name:'全部'}
    }

    this.setState({sampleIndexType:0, shootStyleIndex:0, exteriorIndex:0, params:p})
  }

  handelSel(index, filterName, id, name, e) {
    e.preventDefault();
    // 获取选中的条件值
    let p = this.state.params;
    switch(filterName) {
      case "sampleType":
      {
        // 摄影类型
        p.sampleType = {id:id, name:name}
        this.setState({sampleIndexType:index, params:p})
        break;
      }
      case "shootStyleId":
      {
        // 摄影风格
        p.shootStyleId = {id:id, name:name}
        this.setState({shootStyleIndex:index, params:p})
        break;
      }
      case "exteriorId":
      {
        // 场景
        p.exteriorId = {id:id, name:name}
        this.setState({exteriorIndex:index, params:p})
        break;
      }
    }
  }

  componentDidMount() {
    // 获取风格条件
    {
      let cfg = SampleConfig['StyleFilter']
      let fetchUrl = cfg.buildUrl(null,cfg.dataUrl)
      fetch(fetchUrl)
        .then(res => {return res.json()})
        .then(j =>{
          if(j.success) {
            let tmpData = this.state.shootStyle;
            tmpData = tmpData.concat(j.data||[]);
            this.setState({shootStyle:tmpData})
          }
        })
    }

    // 获取外景地条件
    {
      let cfg = SampleConfig['ExteriorFilter']
      let fetchUrl = cfg.buildUrl(null,cfg.dataUrl)
      fetch(fetchUrl)
        .then(res => {return res.json()})
        .then(j =>{
          if(j.success) {
            let tmpData = this.state.exterior;
            tmpData = tmpData.concat(j.data||[]);
            this.setState({exterior:tmpData})
          }
        })
    }
  }
}

// 筛选条件栏组件
class FilterContent extends React.Component {
  constructor (props) {
    super(props);
    this.first=true;
    this.state = {
      kClass:"",
      content:{
        sampleTypeName:'婚纱摄影'
      }
    }
  }

  render () {
    return (
      <div className="nav-placeholder">
        <div id="fixedNav" className="sift-nav">
          <div className="sift-nav-box">
            <div className="sift-list-box">
              <ul className="sift-list">
                {
                  _.map(this.state.content, (v,k)=>{
                    return (
                      <li key={k} className="item "><span className="text">{v}</span></li>
                    )
                  })
                }
              </ul>
            </div>
            <div className="sift-button" onClick={this.handle.bind(this)}>
              <span className="icon"></span>
              <span className="text">筛选</span>
            </div>
            <Filter kClass={this.state.kClass} filterChangeHandle={this.filterChangeHandle.bind(this)} />
          </div>
        </div>
      </div>
    )
  }

  handle(e) {
    e.preventDefault();
    this.setState({kClass:" show-sift"})
  }

  filterChangeHandle(filters, filterContents) {
    if (this.props.filterChangeHandle) {
      this.props.filterChangeHandle(filters)
    }
    this.setState({kClass:"", content:filterContents})
  }

  componentWillReceiveProps(nextProps) {
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.content.sampleTypeName == nextState.content.sampleTypeName
      && this.state.content.shootStyleName == nextState.content.shootStyleName
      && this.state.content.exteriorName == nextState.content.exteriorName
      && this.state.kClass == nextState.kClass
    ) {
      return false;
    } else {
      return true;
    }
  }

  componentDidUpdate() {
    // 渲染完成以后做的一些dom操作
    if (this.first) {
      // 第一次渲染,需要做一些操作
      var topMain = $("#fixedNav").offset().top
      $(".scrollView").scroll(function () {
        if ($(".scrollView").scrollTop() > topMain) {
          $("#fixedNav").addClass("fixed_top_nav");
        } else {
          $("#fixedNav").removeClass("fixed_top_nav");
        }
      });
      this.first = false;
    }
  }

  componentDidMount() {
  }
}

class SampleContent extends React.Component {
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
      // 列表数据
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
          content = (
            _.map(this.state.data, (v,k)=>{
              return (
                <li key={k} className="item">
                  <a href={'/detail/'+DetailType.Sample+'/'+v.id} target='_blank' >
                    <MediaItem
                      aspectRatio="2:3"
                      imageUrl={v.coverUrlWx || v.coverUrlWeb}
                      processType={EmImgProcessType.emGD_S_S}
                      height={300}
                      quality={95}
                    />
                  </a>
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
      <div>
        <div className="title-box-style-1">
          <div className="banner">
            <i></i>
            <span>幸福可以绽放的如此耀眼</span>
          </div>
          <span className="title">样片欣赏</span>
        </div>
        <FilterContent filterChangeHandle={this.changeHandle.bind(this)} />
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
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.renderFlg;
  }

  changeHandle(params) {
    // 组装缓存key
    let k = {}
    k = _.merge(k, {sampleType:params.sampleType})
    if (params.shootStyleId) {
      k = _.merge(k, {shootStyleId:params.shootStyleId})
    }
    if (params.exteriorId) {
      k = _.merge(k, {exteriorId:params.exteriorId})
    }
    let key = JSON.stringify(k)
    console.log('change:'+key)
    // 设置渲染标志
    this.renderFlg = true;
    if (this.cache[key]) {
      console.log(this.cache[key].data.length)
      // 从缓存里面直接取数据
      this.setState({
        reqState       : ReqCode.Ready,
        data           : this.cache[key].data,
        showMoreFlg    : this.cache[key].showMoreFlg,
        params         : this.cache[key].params,
        dataErrorFlg   : false,
      })
    } else {
      let p = {}
      p.pageSize = this.state.params.pageSize;
      p.pageIndex = 0;
      // 判断搜索条件
      p.sampleType = params.sampleType;
      if (params.shootStyleId) {
        p.shootStyleId = params.shootStyleId;
      }
      if (params.exteriorId) {
        p.exteriorId = params.exteriorId;
      }
      // 设置加载中状态
      this.setState({
        reqState       : ReqCode.Loading,
        data           : [],
        showMoreFlg    : false,
        dataErrorFlg   : false,
      })
      // 请求数据
      this.queryData(key, p, false)
    }
  }

  handleMore(e) {
    e.preventDefault();
    let p = {};
    p.pageSize = this.state.params.pageSize;
    p.pageIndex = this.state.params.pageIndex;
    // 判断搜索条件
    p.sampleType = this.state.params.sampleType;
    if (this.state.params.shootStyleId) {
      p.shootStyleId = this.state.params.shootStyleId;
    }
    if (this.state.params.exteriorId) {
      p.exteriorId = this.state.params.exteriorId;
    }
    // 组装缓存key
    let k = {}
    k = _.merge(k, {sampleType:p.sampleType})
    if (p.shootStyleId) {
      k = _.merge(k, {shootStyleId:p.shootStyleId})
    }
    if (p.exteriorId) {
      k = _.merge(k, {exteriorId:p.exteriorId})
    }
    let key = JSON.stringify(k)
    console.log('more:'+key)
    this.queryData(key, p, true);
  }

  componentDidMount() {
    // 参数的初始状态
    let p = {};
    p.pageSize = this.state.params.pageSize;
    p.pageIndex = this.state.params.pageIndex;
    p.sampleType = 0;
    // 组装缓存key
    let key = JSON.stringify({sampleType:0})
    console.log('init:'+key)
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
      let cfg = SampleConfig.SampleList
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

class Sample extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className="sample-list-view">
        <div className="top-logo-box">
          <div className="logo-box">
            <i className="icon-home-logo"></i>
            <i className="icon-home-word"></i>
          </div>
        </div>

        <MediaItem
          aspectRatio="1:-1"
          imageUrl={SampleConfig['Banner'][0].imageUrl}
          processType={EmImgProcessType.emGD_S_S}
        />

        <SampleContent />
      </div>
    )
  }
}

export { Sample }
