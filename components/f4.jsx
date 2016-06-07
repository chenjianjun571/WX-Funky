import React, { PropTypes } from 'react'
import _ from 'lodash'

import { F4Config } from './config/f4-config'
import { ConditionFilter } from './common/condition-filter.jsx'
import { MediaItem, EmImgProcessType } from './common/media-item.jsx'
import { DetailType, ShowType } from '../src/utils/detail-type'
import { ListContent } from './common/list-content.jsx'

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
        pageSize:6,
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
          <span className="title">婚礼人</span>
        </div>

        <ConditionFilter filters={this.state.filters} renderFlg={this.state.renderFlg} filterChangeHandle={this.filterChangeHandle.bind(this)} />
        {
          this.state.dataUrl.length >0
            ? <ListContent params={this.state.params}
                           type={DetailType.F4}
                           isShuffle={true}
                           customData={{typeName:this.state.typeName, workType:this.state.workType}}
                           dataUrl={this.state.dataUrl} />
            : null
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

    let p = {};
    p.pageIndex=this.state.params.pageIndex;
    p.pageSize=this.state.params.pageSize;
    switch(this.props.dataParams.tab) {
      case "host":
      {
        p.type=1;
        // 设置状态
        this.setState({params:p, filters:f, renderFlg:true, typeName:'主持人', workType:'video', dataUrl:'f4/host'})
        break;
      }
      case "dresser":
      {
        // 设置默认条件是第几个选中,不设置是第0个选中
        f[0].active=1;
        p.type=2;
        // 设置状态
        this.setState({params:p, filters:f, renderFlg:true, typeName:'化妆师', workType:'image', dataUrl:'f4/dresser'})
        break;
      }
      case "photographer":
      {
        // 设置默认条件是第几个选中,不设置是第0个选中
        f[0].active=2;
        p.type=3;
        // 设置状态
        this.setState({params:p, filters:f, renderFlg:true, typeName:'摄影师', workType:'image', dataUrl:'f4/photographer'})
        break;
      }
      case "camera":
      {
        // 设置默认条件是第几个选中,不设置是第0个选中
        f[0].active=3;
        p.type=4;
        // 设置状态
        this.setState({params:p, filters:f, renderFlg:true, typeName:'摄像师', workType:'video', dataUrl:'f4/camera'})
        break;
      }
      default:
      {
        p.type=1;
        // 设置状态
        this.setState({params:p, filters:f, renderFlg:true, typeName:'主持人', workType:'video', dataUrl:'f4/host'})
        break;
      }
    }
  }

  initFilter () {
    // 设置type: 1:主持人 2:化妆师 3:摄影师 4:摄像师
    // 婚礼人类型
    let f = [];
    let p1 = {
      kClass:"content-box f4-type",
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
