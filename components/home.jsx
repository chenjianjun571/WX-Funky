import React, { PropTypes } from 'react'
import _ from 'lodash'

import { MediaItem } from './common/media-item.jsx'

//http://api.video.taobao.com//video/embedVideo?vid=37754925&uid=2579307056&tid=1
//http://testimg.jsbn.com/index-2.mp4
class Home extends React.Component {

  render () {
    return (
      <div>
        <MediaItem videoUrl="http://api.video.taobao.com//video/embedVideo?vid=37754925&uid=2579307056&tid=1"
                   imageUrl="http://testimg.jsbn.com/weiyi.jpg"
                   height={600} width={400}
        />
      </div>
    )
  }

  componentDidMount () {
  }
}

export { Home }
