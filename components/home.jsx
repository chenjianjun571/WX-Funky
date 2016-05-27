import React, { PropTypes } from 'react'
import _ from 'lodash'

import { MediaSlider } from './common/media-slider.jsx'
import { HomeConfig } from './config/home-config'

class Home extends React.Component {

  render () {
    return (
      <div className="home-view">

        <div className="adv-header-box">
          <MediaSlider
            dataUrl={HomeConfig['MediaSlider'].baseUrl+HomeConfig['MediaSlider'].dataUrl}
            aspectRatio={HomeConfig['MediaSlider'].aspectRatio}
            height={HomeConfig['MediaSlider'].height}
          />
        </div>

        <div className="menu-box">
          <ul className="menu-list">
            <li className="menu-item">
              <a href="/shot">
                <span className="title">婚纱摄影</span>
                <span className="desc">拍摄优惠多多</span>
                <span className="menu-icon  "></span>
              </a>
            </li>

            <li className="menu-item">
              <a href="/scheme">
                <span className="title">婚礼定制</span>
                <span className="desc">给最美的新娘</span>
                <span className="menu-icon  "></span>
              </a>
            </li>
            <li className="menu-item">
              <a href="http://mtrip.jsbn.com" target="_blank">
                <span className="title">金色旅拍</span>
                <span className="desc"></span>
                <span className="menu-icon"></span>
              </a>
            </li>
            <li className="menu-item">
              <a href="/hotel">
                <span className="title">婚宴预订</span>
                <span className="desc"></span>
                <span className="menu-icon"></span>
              </a>
            </li>
            <li className="menu-item">
              <a href="http://www.chinad9.com/" target="_blank">
                <span className="title">婚戒钻石</span>
                <span className="desc"></span>
                <span className="menu-icon"></span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }

  componentDidMount () {
  }
}

export { Home }
