import React, { PropTypes } from 'react'
import _ from 'lodash'

import { MediaSlider } from './common/media-slider.jsx'
import { MediaItem, EmImgProcessType } from './common/media-item.jsx'
import { SampleConfig } from './config/sample-config'

// 筛选组件
class Filter extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      sampleType:[{name:'婚纱摄影', sampleType:0},{name:'艺术照', sampleType:1},{name:'全家福', sampleType:2}],
      sampleIndex:0,
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
      <div className="fixed-center-box">
        <div className="sift-content-box">
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
                      if (this.state.sampleIndex == k) {
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
    // 提交
    if (this.props.filterChangeHandle) {
      let filters = {}
      let filterContents = {}

      // 摄影类型
      filters.sampleType = this.state.params.sampleType.id;
      filterContents.sampleTypeName = this.state.params.sampleType.name;
      // 摄影风格
      if (this.state.params.shootStyleId.id != -1) {
        filters.shootStyleId = this.state.params.shootStyleId.id;
        filterContents.shootStyleName = this.state.params.shootStyleId.name;
      }
      // 外景地
      if (this.state.params.exteriorId.id != -1) {
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
    this.setState({sampleIndex:0, shootStyleIndex:0, exteriorIndex:0, params:p})
  }

  handelSel(index, filterName, id, name, e) {
    e.preventDefault();
    let p = this.state.params;
    switch(filterName) {
      case "sampleType":
      {
        // 摄影类型
        p.sampleType = {id:id, name:name}
        this.setState({sampleIndex:index, params:p})
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
          if(j.success && j.data.length > 0) {
            let tmpData = this.state.shootStyle;
            let style = _.map(j.data || [], (v,k)=>{
              return _.pick(v,['name','shootStyleId'])
            });
            tmpData = tmpData.concat(style);
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
          if(j.success && j.data.length > 0) {
            let tmpData = this.state.exterior;
            let exterior = _.map(j.data || [], (v,k)=>{
              return _.pick(v,['name','exteriorId'])
            });
            tmpData = tmpData.concat(exterior);
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

    this.state = {
      data:[]
    };
  }

  render () {
    return (
      <div id="fixedNav" className="sift-nav">
        <div className="sift-nav-box">
          <div className="sift-title">
            {
              //this.props.sampleTypeName && (<span className="text">{this.props.sampleTypeName}</span>)
            }
            {
              //this.props.shootStyleName && (<span className="text">{this.props.shootStyleName}</span>)
            }
            {
              //this.props.exteriorName && (<span className="text">{this.props.exteriorName}</span>)
            }
          </div>

          <div className="item-list-box">
            <ul className="item-list">
              {
                this.props.sampleTypeName || (<li className="item "><span className="text">{this.props.sampleTypeName}</span></li>)
              }
              {
                this.props.shootStyleName || (<li className="item "><span className="text">{this.props.shootStyleName}</span></li>)
              }
              {
                this.props.exteriorName || (<li className="item "><span className="text">{this.props.exteriorName}</span></li>)
              }
            </ul>
          </div>


          <div className="sift-button">
            <span className="icon"></span>
            <span className="text">筛选</span>
          </div>
        </div>
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.sampleTypeName == nextProps.sampleTypeName
      && this.props.shootStyleName == nextProps.shootStyleName
      && this.props.exteriorName == nextProps.exteriorName
    ) {
      return false;
    } else {
      return true;
    }
  }
}

class SampleList extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      data:[],
      showMoreFlg:true,
      params:{
        pageSize:4,
        pageIndex:0,
        sampleType:0,
        shootStyleId:-1,
        exteriorId:-1
      }
    };
  }

  render () {
    let moreButton = null;
    if (this.state.showMoreFlg) {
      moreButton = (
        <div className="more-button" onClick={this.handle.bind(this)}>
          <div className="button-box">
            <span className="icon"></span>
            <span className="title">点击加载</span>
          </div>
        </div>
      )
    }
    return (
      <div className="list-box">
        <ul className="item-list">
          <li className="item">
            {
              _.map(this.state.data, (v,k)=>{
                return (
                  <a key={k} href={'/sample/'+v.id} target='_blank' >
                    <MediaItem
                      aspectRatio="2:3"
                      imageUrl={v.coverUrlWx || v.coverUrlWeb}
                      processType={EmImgProcessType.emGD_S_S}
                      height={300}
                    />
                  </a>
                )
              })
            }
          </li>
        </ul>
        {
          moreButton
        }
      </div>
    )
  }

  handle(e) {
    e.preventDefault();
    let cfg = SampleConfig['SampleList']
    let fetchUrl = cfg.buildUrl(this.props.params,cfg.dataUrl)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params)
    this.setState({
      params:_.merge(this.props.params, nextProps.params)
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    // 条件改变会导致重新渲染组件
    if (nextState.params.pageIndex !== this.state.params.pageIndex) {
      return true;
    }
  }

  componentDidMount() {
    //let cfg = SampleConfig['SampleList']
    //let fetchUrl = cfg.buildUrl(cfg.params,cfg.dataUrl)
    //fetch(fetchUrl)
    //  .then(res => {return res.json()})
    //  .then(j =>{
    //    if(j.success && j.data.length > 0) {
    //      if (j.count > j.data.length) {
    //        this.setState({ data:j.data, pageIndex:1, pageSize:4, showMoreFlg:true})
    //      } else {
    //        this.setState({ data:j.data, pageIndex:1, pageSize:4, showMoreFlg:false})
    //      }
    //    }
    //  })
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

        <div className="adv-header-box">
          <MediaSlider
            dataUrl={SampleConfig['MediaSlider'].baseUrl+SampleConfig['MediaSlider'].dataUrl}
            aspectRatio={SampleConfig['MediaSlider'].aspectRatio}
            height={SampleConfig['MediaSlider'].height}
          />
        </div>

        <FilterContent sampleTypeName="婚纱摄影" shootStyleName="九龙滨江" />
        <Filter filterChangeHandle={this.filterChangeHandle.bind(this)} />
        <SampleList />
      </div>
    )
  }

  filterChangeHandle(filters, filterContents) {
    console.log(filters)
    console.log(filterContents)
  }

  componentDidMount() {
    $(document).ready(function(){
      $(".scrollView").scroll(function(){
        if ($(".scrollView").scrollTop() > $("#fixedNav").offset().top) {
          $("#fixedNav").addClass("fixed_top_nav");
        } else {
          $("#fixedNav").removeClass("fixed_top_nav");
        }
      });
    });
  }
}

export { Sample }
