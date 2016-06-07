import React, { PropTypes } from 'react'
import _ from 'lodash'

import { MovieConfig } from './config/movie-config'
import { MediaItem, EmImgProcessType } from './common/media-item.jsx'
import { DetailType, ShowType } from '../src/utils/detail-type'
import { ListContent } from './common/list-content.jsx'

class MovieContent extends React.Component {

  constructor (props) {
    super(props);
    // 组件状态
    this.state = {
      // 微电影类型列表
      movieType:[{name:"爱情MV", typeId:1}, {name:"爱情微电影", typeId:2}, {name:"婚纱纪实MV", typeId:3}],
      // 选中的微电影类型
      movieTypeIndex:0,
      // 搜索条件
      params:{
        pageSize:2,
        pageIndex:0,
        videoType:1,
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
          <span className="title">微电影</span>
        </div>
        <div className="nav-placeholder">
          <div className="option-group-nav">
            <div className="option-group-box">
              <ul className="option-group">
                {
                  _.map(this.state.movieType, (v,k)=>{
                    let kClass= (k==this.state.movieTypeIndex) ? "option activate" : "option"
                    return (
                      <li key={k} className={kClass} onClick={this.typeChangeHandle.bind(this, k, v.typeId)}>
                        <span className="title">{v.name}</span>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
        </div>

        <ListContent params={this.state.params} type={DetailType.Movie} dataUrl={MovieConfig.MovieList.dataUrl} />
      </div>
    )
  }

  typeChangeHandle(i, typeId, e) {
    e.preventDefault();

    if (i == this.state.movieTypeIndex) {
      return;
    }

    let p = {}
    p.pageSize = this.state.params.pageSize;
    p.pageIndex = this.state.params.pageIndex;
    p.videoType = typeId;

    this.setState({params:p, movieTypeIndex:i});
  }

  componentDidMount() {
  }
}

class Movie extends React.Component {
  constructor (props) {
    super(props);
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

        <MovieContent />
      </div>
    )
  }

  componentDidMount() {}
}

export { Movie }

