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
              <a href="/scheme">
                <div className="info-box">
                  <span className="title">婚礼定制</span>
                  <span className="desc">十二大婚礼风格</span>
                  <span className="desc">3D漫游场景</span>
                </div>
                <span className="menu-icon"></span>
              </a>
            </li>
            <li className="menu-item">
              <a href="/shot">
                <div className="info-box">
                  <span className="title">婚纱摄影</span>
                  <span className="desc">实景影棚</span>
                  <span className="desc">无任何隐形消费</span>
                </div>
                <span className="menu-icon"></span>
              </a>
            </li>
            <li className="menu-item">
              <a href="/dress">
                <div className="info-box">
                  <span className="title">婚纱礼服</span>
                  <span className="desc">提供全球婚纱品牌</span>
                  <span className="desc">免费试穿完美嫁衣</span>
                </div>
                <span className="menu-icon"></span>
              </a>
            </li>
            <li className="menu-item">
              <a href="/hotel">
                <div className="info-box">
                  <span className="title">婚宴预订</span>
                  <span className="desc">提供上百家婚宴</span>
                  <span className="desc">酒店预选服务</span>
                </div>
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
