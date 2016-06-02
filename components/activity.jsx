import React, { PropTypes } from 'react'
import _ from 'lodash'

import { ActivityConfig } from './config/activity-config'
import { MediaItem, EmImgProcessType } from './common/media-item.jsx'

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
      <div className="list-photo-box">
        <ul className="item-list">
          {
            _.map(imageListData, (v,k) => {
              return (
                <li key={k} className="item">
                  <MediaItem
                    aspectRatio="1:-1"
                    imageUrl={v.url}
                    linkUrl={v.linkUrl}
                    quality={90}
                    processType={EmImgProcessType.emGD_S_S}
                  />
                </li>
              )
            })
          }
        </ul>
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
            this.setState({
              data: j.data[0]
            })
          }
        })
    }
  }
}

export { Activity }
