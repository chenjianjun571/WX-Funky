import React, { PropTypes } from 'react'
import _ from 'lodash'

import { MediaSlider } from './common/media-slider.jsx'
import { MediaItem, EmImgProcessType } from './common/media-item.jsx'
import { ShotConfig } from './config/shot-config'
import { DetailType, ShowType } from '../src/utils/detail-type'
import { ListContent } from './common/list-content.jsx'

class NewActivity extends React.Component {
  constructor() {
    super();

    this.state = {
      data:[]
    };
  }

  render() {
    return(
      <div>
        <a href="/suite">
          <div className="title-box-style-1">
            <div className="banner">
              <i></i>
              <span>幸福可以绽放的如此耀眼</span>
            </div>
            <span className="title">套系报价</span>
          </div>
        </a>

        <div className="list-box list-suit">
          <ul className="item-list">
            {
              _.map(this.state.data,(v,k)=>{
                return(
                  <li key={k} className="item suit-box">
                    <div className="photo-box">
                      <MediaItem
                        aspectRatio="2:1"
                        imageUrl={v.coverUrlWx || v.coverUrlWeb}
                        linkUrl={v.linkUrl}
                        processType={EmImgProcessType.emGD_S_S}
                        height={200}
                      />
                    </div>
                    <div className="info-box">
                      <i className="img-title"></i>
                      <span className="text-title">{v.name}</span>
                      <span className="text-content">{v.description}</span>
                    </div>
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
    let url = ShotConfig['NewActivityHot'].baseUrl+ShotConfig['NewActivityHot'].dataUrl;
    fetch(url)
      .then(res => {return res.json()})
      .then(j =>{
        if(j.success && j.data.length > 0) {
          this.setState({ data:j.data })
        }
      })
  }
}

class BestPringles extends React.Component {
  constructor() {
    super();

    this.state = {
      data:[]
    };
  }

  render() {
    return(
      <div>
        <a href="/pringles">
          <div className="title-box-style-1">
            <div className="banner">
              <i></i>
              <span>幸福可以绽放的如此耀眼</span>
            </div>
            <span className="title">最佳客片欣赏</span>
          </div>
        </a>
        <ListContent params={{pageIndex:1,pageSize:4}}
                     customData={{listClass:" list-pringles"}}
                     type={DetailType.Pringles}
                     showMore={false}
                     dataUrl={ShotConfig.BestPringlesHot.dataUrl} />
        <a href="/pringles">
          <div className="more-button">
            <div className="button-box">
              <span className="icon"></span>
              <span className="title">更多客片</span>
            </div>
          </div>
        </a>

      </div>
    )
  }
}

class BestSample extends React.Component {

  constructor() {
    super();

    this.state = {
      data:[]
    };
  }

  render () {
    return (
      <div>
        <a href="/sample">
          <div className="title-box-style-1">
            <div className="banner">
              <i></i>
              <span>幸福可以绽放的如此耀眼</span>
            </div>
            <span className="title">最佳样片欣赏</span>
          </div>
        </a>
        <ListContent params={{pageIndex:1,pageSize:4}}
                     customData={{listClass:" list-sample"}}
                     type={DetailType.Sample}
                     showMore={false}
                     dataUrl={ShotConfig.BestSampleHot.dataUrl} />

        <a href="/sample">
          <div className="more-button">
            <div className="button-box">
              <span className="icon"></span>
              <span className="title">更多样片</span>
            </div>
          </div>
        </a>

      </div>
    )
  }
}

class Shot extends React.Component {
  render () {
    return (
      <div className="hssy-home-view">
        <div className="top-logo-box">
          <div className="logo-box">
            <i className="icon-home-logo"></i>
            <i className="icon-home-word"></i>
          </div>
        </div>
        <div className="adv-header-box">
          <MediaSlider
            dataUrl={ShotConfig['MediaSlider'].baseUrl+ShotConfig['MediaSlider'].dataUrl}
            aspectRatio={ShotConfig['MediaSlider'].aspectRatio}
            height={ShotConfig['MediaSlider'].height}
          />
        </div>
        <BestSample />
        <BestPringles />
        <NewActivity />
      </div>
    )
  }
}

export { Shot }
