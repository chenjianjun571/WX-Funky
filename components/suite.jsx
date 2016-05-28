import React, { PropTypes } from 'react'
import _ from 'lodash'

import { MediaSlider } from './common/media-slider.jsx'
import { MediaItem, EmImgProcessType } from './common/media-item.jsx'
import { SuiteConfig } from './config/suite-config'

class SuiteList extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      data:[],
      showMoreFlg:true,
      pageSize:3,
      pageIndex:1
    }
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
          {
            _.map(this.state.data, (v,k)=>{
              return (
                <li key={k} className="item">
                  <a href={"/suite/"+v.id} target='_blank' >
                    <div className="photo-box">
                      <MediaItem
                        aspectRatio="3:2"
                        imageUrl={v.coverUrlWx || v.coverUrlWeb}
                        processType={EmImgProcessType.emGD_S_S}
                        height={400}
                      />
                    </div>
                    <div className="info-box">
                      <span className="title">{v.name}</span>
                      <span className="unit">RMB</span>
                      <span className="price">{v.salePrice}</span>
                    </div>
                  </a>
                </li>
              )
            })
          }
        </ul>
        {
          moreButton
        }
      </div>
    )
  }

  handle(e) {
    e.preventDefault();
    let cfg = SuiteConfig['SuiteList']
    let params = {
      pageSize:3,
      pageIndex:this.state.pageIndex+1
    }
    let fetchUrl = cfg.buildUrl(params, cfg.dataUrl)
    fetch(fetchUrl)
      .then(res => {return res.json()})
      .then(j =>{
        if(j.success && j.data.length > 0) {
          let tmpData = this.state.data;
          tmpData = tmpData.concat(j.data);
          if (j.count > tmpData.length) {
            this.setState({ data:tmpData, pageIndex:params.pageIndex, pageSize:params.pageSize, showMoreFlg:true})
          } else {
            this.setState({ data:tmpData, pageIndex:params.pageIndex, pageSize:params.pageSize, showMoreFlg:false})
          }
        }
      })
  }

  componentDidMount() {
    let cfg = SuiteConfig['SuiteList']
    let fetchUrl = cfg.buildUrl(cfg.params,cfg.dataUrl)
    fetch(fetchUrl)
      .then(res => {return res.json()})
      .then(j =>{
        if(j.success && j.data.length > 0) {
          if (j.count > j.data.length) {
            this.setState({ data:j.data, pageIndex:cfg.params.pageIndex, pageSize:cfg.params.pageSize, showMoreFlg:true})
          } else {
            this.setState({ data:j.data, pageIndex:cfg.params.pageIndex, pageSize:cfg.params.pageSize, showMoreFlg:false})
          }
        }
      })
  }
}

class Suite extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className="hssy-suit-list-view">
        <div className="top-logo-box">
          <div className="logo-box">
            <i className="icon-home-logo"></i>
            <i className="icon-home-word"></i>
          </div>
        </div>

        <div className="adv-header-box">
          <MediaSlider
            dataUrl={SuiteConfig['MediaSlider'].baseUrl+SuiteConfig['MediaSlider'].dataUrl}
            aspectRatio={SuiteConfig['MediaSlider'].aspectRatio}
            height={SuiteConfig['MediaSlider'].height}
          />
        </div>

        <MediaItem
          aspectRatio="1:-1"
          imageUrl={SuiteConfig['Banner'][0].imageUrl}
          processType={EmImgProcessType.emGD_S_S}
        />

        <SuiteList />
      </div>
    )
  }

  componentDidMount() {}
}

export { Suite }
