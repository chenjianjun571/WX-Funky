import React, { PropTypes } from 'react'
import _ from 'lodash'

import { MediaSlider } from './common/media-slider.jsx'
import { MediaItem, EmImgProcessType } from './common/media-item.jsx'
import { SchemeConfig } from './config/scheme-config'
import { DetailType, ShowType } from '../src/utils/detail-type'
import { ListContent } from './common/list-content.jsx'

class BestCases extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      data:[]
    };
  }

  render () {
    return (
      <div>
        <a href="/case">
          <div className="title-box-style-1">
            <div className="banner">
              <i></i>
              <span>幸福可以绽放的如此耀眼</span>
            </div>
            <span className="title">最佳案例</span>
          </div>
        </a>
        <ListContent params={{pageIndex:1,pageSize:6}}
                     customData={{listClass:" list-case"}}
                     type={DetailType.Case}
                     showMore={false}
                     dataUrl={SchemeConfig.BestCasesHot.dataUrl} />
        <a href="/case">
          <div className="more-button">
            <div className="button-box">
              <span className="icon"></span>
              <span className="title">更多案例</span>
            </div>
          </div>
        </a>

      </div>
    )
  }

  componentDidMount() {
    let url = SchemeConfig['BestCasesHot'].baseUrl+SchemeConfig['BestCasesHot'].dataUrl;
    fetch(url)
      .then(res => {return res.json()})
      .then(j =>{
        if(j.success && j.data.length > 0) {
          this.setState({ data:j.data })
        }
      })
  }
}

class F4Hot extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
        <a href="/f4">
          <div className="title-box-style-1">
            <div className="banner">
              <i></i>
              <span>幸福可以绽放的如此耀眼</span>
            </div>
            <span className="title">婚礼人</span>
          </div>
        </a>

        <div className="list-box list-f4">
          <ul className="item-list">
            <li className="item">
              <a href="/f4?tab=dresser">
                <div className="photo-box"><i className="icon"></i></div>
                <div className="info-box">
                  <span className="text-title">化妆师</span>
                  <span className="text-subtitle">A makeup artist</span>
                </div>
              </a>
            </li>
            <li className="item">
              <a href="/f4?tab=host">
                <div className="photo-box"><i className="icon"></i></div>
                <div className="info-box">
                  <span className="text-title">主持人</span>
                  <span className="text-subtitle">The host</span>
                </div>
              </a>
            </li>
            <li className="item">
              <a href="/f4?tab=photographer">
                <div className="photo-box"><i className="icon"></i></div>
                <div className="info-box">
                  <span className="text-title">摄影师</span>
                  <span className="text-subtitle">The photographer</span>
                </div>
              </a>
            </li>
            <li className="item">
              <a href="/f4?tab=camera">
                <div className="photo-box"><i className="icon"></i></div>
                <div className="info-box">
                  <span className="text-title">摄像师</span>
                  <span className="text-subtitle">The cameraman</span>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

class SupplyCarHot extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      data:[]
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
          <span className="title">婚礼用品&婚礼租车</span>
        </div>
        <div className="list-box list-supplies list-car">
          <ul className="item-list">
            {
              _.map(this.state.data, (v,k)=>{
                return (
                  <li key={k} className="item">
                    <MediaItem
                      aspectRatio="2:3"
                      imageUrl={v.coverUrlWx || v.coverUrlWeb}
                      linkUrl={v.linkUrl}
                      processType={EmImgProcessType.emGD_S_S}
                      width={400}
                    />
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    )
  }

  componentDidMount() {
    let url = SchemeConfig['SupplyCarHot'].baseUrl+SchemeConfig['SupplyCarHot'].dataUrl;
    fetch(url)
      .then(res => {return res.json()})
      .then(j =>{
        if(j.success && j.data.length > 0) {
          this.setState({ data:j.data })
        }
      })
  }
}

class Scheme extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      data:[]
    };
  }

  render () {
    return (
      <div className="hqdz-home-view">
        <div className="top-logo-box">
          <div className="logo-box">
            <i className="icon-home-logo"></i>
            <i className="icon-home-word"></i>
          </div>
        </div>

        <div className="adv-header-box">
          <MediaSlider
            dataUrl={SchemeConfig['MediaSlider'].baseUrl+SchemeConfig['MediaSlider'].dataUrl}
            aspectRatio={SchemeConfig['MediaSlider'].aspectRatio}
            height={SchemeConfig['MediaSlider'].height}
          />
        </div>

        <BestCases />
        <F4Hot />
        <SupplyCarHot />

        <div className="title-box-style-1">
          <div className="banner">
            <i></i>
            <span>幸福可以绽放的如此耀眼</span>
          </div>
          <span className="title">专业服务团队</span>
        </div>
        <div className="layout-banner-box layout-space-box">
          <img src="//img2.jsbn.com/static/team/team-hqdz_01.jpg@85q"/>
          <img src="//img2.jsbn.com/static/team/team-hqdz_02.jpg@85q"/>
          <img src="//img2.jsbn.com/static/team/team-hqdz_03.jpg@85q"/>
          <img src="//img2.jsbn.com/static/team/team-hqdz_04.jpg@85q"/>
          <img src="//img2.jsbn.com/static/team/team-hqdz_05.jpg@85q"/>
          <img src="//img2.jsbn.com/static/team/team-hqdz_06.jpg@85q"/>
        </div>

      </div>
    )
  }

  componentDidMount() {
  }
}

export { Scheme }