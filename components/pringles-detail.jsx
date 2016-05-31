import React, { PropTypes } from 'react'
import _ from 'lodash'

import { MediaItem, EmImgProcessType } from './common/media-item.jsx'
import { PringlesDetailConfig } from './config/pringles-detail-config'

class PringlesDetail extends React.Component {
  constructor() {
    super();

    this.state = {
      data:[],
      className:''
    };
  }

  render () {
    return (
      <div className={"list-photo-box"+this.state.className}>
        <ul className="item-list">
          {
            _.map(this.state.data,(v,k)=>{
              return (
                <li key={k} className="item">
                  <MediaItem
                    aspectRatio="1:-1"
                    imageUrl={v}
                    quality={90}
                    processType={EmImgProcessType.emGD_S_S}
                    water={true}
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
    let cfg = PringlesDetailConfig['PringlesDetailUrl']
    let fetchUrl = cfg['buildUrl'](this.props.dataParams,cfg['dataUrl'])
    fetch(fetchUrl)
      .then(res => {return res.json()})
      .then(j =>{
        if(j.success && j.data.length > 0) {
          if (j.data[0].wxDetailImages && j.data[0].wxDetailImages !== '') {
            // wxDetailImages有值,说明是单片版
            this.setState({ data:JSON.parse(j.data[0].wxDetailImages), className:' photo-space' })
          } else {
            // 设计版
            this.setState({ data:JSON.parse(j.data[0].pcDetailImages), className:'' })
          }
        }
      })
  }
}

export { PringlesDetail }
