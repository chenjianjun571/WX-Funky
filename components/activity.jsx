import React, { PropTypes } from 'react'
import _ from 'lodash'

import { ActivityConfig } from './config/activity-config'
import { ImageItem, EmImgProcessType } from './common/media-item.jsx'

class Activity extends React.Component {
  constructor() {
    super();
    this.state = {
      data:{}
    };
  }

  render() {
    let imageListData = []
    imageListData = JSON.parse(this.state.data.detailImages || '[]')
    return(
      <div className="global-center-box">
        {
          _.map(imageListData, (v,k) => {
            let content = null;
            if(v.linkUrl && v.linkUrl !== '') {
              content = (
                <a href={v.linkUrl}>
                  <ImageItem imageUrl={v.url} quality={95} processType={EmImgProcessType.emGD_W_H} />
                </a>
              )
            } else {
              content = (
                <ImageItem imageUrl={v.url} quality={95} processType={EmImgProcessType.emGD_W_H} />
              )
            }
            return(
              <div key={k} className="box-img">
                {
                  content
                }
              </div>
            );
          })
        }
      </div>
    )
  }

  componentDidMount() {
    // 取到配置的获取婚纱类型数据的请求地址
    let params = this.props.dataParams;
    if (params && params.name) {
      fetch(ActivityConfig.ActiveData.baseUrl + ActivityConfig.ActiveData.dataUrl + params.name)
        .then(res => {return res.json()})
        .then(j=>{
          if(j.success && j.data.length > 0) {
            this.setState({data: j.data[0]})
          }
        })
    }
  }
}

export { Activity }
