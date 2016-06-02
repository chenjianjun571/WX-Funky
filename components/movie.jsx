import React, { PropTypes } from 'react'
import _ from 'lodash'

import { MediaSlider } from './common/media-slider.jsx'
import { MediaItem, EmImgProcessType } from './common/media-item.jsx'
import { MovieConfig } from './config/movie-config'
import { DetailType } from '../src/utils/detail-type'

class MoveFilter extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      filter:[
        {name:"爱情MV", type:1, params:{videoType:1}},
        {name:"爱情微电影", type:2, params:{videoType:2}},
        {name:"婚纱纪实MV", type:3, params:{videoType:3}}
      ],
      index:0
    };
  }

  render () {
    return (
      <div className="nav-placeholder">
        <div className="option-group-nav">
          <div className="option-group-box">
            <ul className="option-group">
              {
                _.map(this.state.filter, (v,k)=>{
                  let kClass= (k==this.state.index) ? "option activate" : "option"
                  return (
                    <li key={k} className={kClass} onClick={this.selHandle.bind(this, k, v.type, v.params)}>
                      <span className="title">{v.name}</span>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }

  selHandle (i, type, params, e) {
    e.preventDefault();
    if (this.props.filterChange) {
      this.props.filterChange(type, params)
    }
    this.setState({index:i})
  }

  componentWillReceiveProps(nextProps) {}

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.index !== this.state.index) {
      return true;
    }

    return false;
  }
}

class MovieList extends React.Component {
  constructor (props) {
    super(props);
    this.cache = new Map();
    this.state = {
      data:[],
      type:1,// 1:爱情MV 2:爱情微电影 3:婚纱纪实MV
      showMoreFlg:false,
      params:{
        pageSize:4,
        pageIndex:1,
        videoType:1
      }
    };
  }

  render () {
    return (
      <div>
        <MoveFilter filterChange={this.filterChange.bind(this)} />
        <div className="list-box">
          <ul className="item-list">
            {
              _.map(this.state.data, (v,k)=>{
                let key=''+this.state.type+'-'+k
                return (
                  <li key={key} className="item">
                    <div className="photo-box">
                      <MediaItem
                        imageUrl={v.coverUrlWeb+'@1e_1c_0o_0l_200h_300w_90q'}
                        videoUrl={v.videoUrl}
                        width="100%"
                        height="100%"
                      />
                    </div>
                    <div className="info-box">
                      <span className="text-title">{v.name}</span>
                    </div>
                  </li>
                )
              })
            }
          </ul>
          {
            this.state.showMoreFlg ?
              <div className="more-button" onClick={this.showMore.bind(this)}>
                <div className="button-box">
                  <span className="icon"></span>
                  <span className="title">更多视频</span>
                </div>
              </div>
              : null
          }
        </div>
      </div>
    )
  }

  showMore(e) {
    e.preventDefault();
    let p = this.state.params;
    p.pageIndex += 1;
    this.queryData(this.state.type, p, true);
  }

  filterChange(type, params) {
    if (this.cache[type] && this.cache[type].data.length > 0) {
      this.setState({
        data:this.cache[type].data,
        type:type,
        params:this.cache[type].params,
        showMoreFlg:this.cache[type].showMoreFlg})
    } else {
      let p = _.merge(params, {pageSize:4,pageIndex:1}, false)
      this.queryData(type, p, false)
    }
  }

  componentDidMount() {
    this.queryData(1, this.state.params, false)
  }

  queryData(type, params, isChunk) {
    let cfg = MovieConfig['Movie']
    let fetchUrl = cfg.buildQueryUrl(params,cfg.dataUrl)

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
          let moreFlg= (j.count > tmpData.length) ? true : false;
          console.log(moreFlg)
          // 把数据缓存起来
          let td = {}
          td.data = tmpData;
          td.showMoreFlg = moreFlg;
          td.params = params;
          this.cache[type]=td;
          this.setState({data:tmpData, params:params, type:type, showMoreFlg:moreFlg})
        }
      })
  }
}

class Movie extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      data:[]
    };
  }

  render () {
    return (
      <div className="micro-movie-list-view">
        <div className="top-logo-box">
          <div className="logo-box">
            <i className="icon-home-logo"></i>
            <i className="icon-home-word"></i>
          </div>
        </div>

        <MediaItem
          aspectRatio="1:-1"
          imageUrl={MovieConfig['Banner'][0].imageUrl}
          processType={EmImgProcessType.emGD_S_S}
        />

        <MovieList />

      </div>
    )
  }

  componentDidMount() {}
}

export { Movie }
