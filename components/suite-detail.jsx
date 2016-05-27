import React, { PropTypes } from 'react'
import _ from 'lodash'

import { MediaItem, EmImgProcessType } from './common/media-item.jsx'
import { SuiteDetailConfig } from './config/suite-detail-config'

class SuiteDetail extends React.Component {
  constructor() {
    super();

    this.state = {
      data:[]
    };
  }

  render () {
    return (
      <div className="list-photo-box" >
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
                    width={1200}
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
    let cfg = SuiteDetailConfig['SuiteDetailUrl']
    let fetchUrl = cfg['buildUrl'](this.props.dataParams,cfg['dataUrl'])
    fetch(fetchUrl)
      .then(res => {return res.json()})
      .then(j =>{
        if(j.success && j.data.length > 0) {
          if (j.data[0].wxDetailImages && j.data[0].wxDetailImages !== '') {
            this.setState({ data:JSON.parse(j.data[0].wxDetailImages) })
          } else {
            this.setState({ data:JSON.parse(j.data[0].pcDetailImages) })
          }
        }
      })
  }
}

export { SuiteDetail }
