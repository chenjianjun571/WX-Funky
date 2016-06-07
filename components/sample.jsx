import React, { PropTypes } from 'react'
import _ from 'lodash'

import { MediaSlider } from './common/media-slider.jsx'
import { MediaItem, EmImgProcessType } from './common/media-item.jsx'
import { SampleConfig } from './config/sample-config'
import { DetailType, ShowType } from '../src/utils/detail-type'
import { GetHintContent, HintType } from './common/hint'
import { ReqCode } from './common/code'
import { BaseShowDetail } from './detail.jsx'
import { ListContent } from './common/list-content.jsx'

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
            <div className="content-box wedding-class">
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
                <div className="content-box wedding-style">
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
                <div className="content-box wedding-address">
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
    if (this.first) {
      return true;
    }

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
    this.state = {
      params:{
        pageSize:4,
        pageIndex:0,
        sampleType:0
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
          <span className="title">样片欣赏</span>
        </div>
        <FilterContent filterChangeHandle={this.changeHandle.bind(this)} />
        <ListContent params={this.state.params} type={DetailType.Sample} dataUrl={SampleConfig.SampleList.dataUrl} />
      </div>
    )
  }

  componentDidMount() {
  }

  changeHandle(params) {
    // 组装参数
    let p = {}
    if (params.sampleType == 0) {
      // 婚纱摄影
      _.merge(p, {sampleType:params.sampleType})
      _.merge(p, {shootStyleId:params.shootStyleId})
      _.merge(p, {exteriorId:params.exteriorId})
    } else {
      // 艺术照和全家福
      _.merge(p, {sampleType:params.sampleType})
    }
    p.pageSize = this.state.params.pageSize;
    p.pageIndex = this.state.params.pageIndex;
    this.setState({params:p});
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
