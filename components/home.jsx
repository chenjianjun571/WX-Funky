import React, { PropTypes } from 'react'
import _ from 'lodash'

import { VideoItem, ImageItem, EmImgProcessType } from './common/media-item.jsx'

//http://api.video.taobao.com//video/embedVideo?vid=37754925&uid=2579307056&tid=1
//http://testimg.jsbn.com/index-2.mp4
//http://testimg.jsbn.com/venus/followvideoseason/20160516/14633659281236406_1920x1098.jpg
class Home extends React.Component {

  render () {
    return (
      <div>
        <div>
          <p>不处理</p>
          <VideoItem
            imageUrl="http://testimg.jsbn.com/venus/followvideoseason/20160516/14633659281236406_1920x1098.jpg"
            videoUrl="http://testimg.jsbn.com/index-2.mp4"
            height={600}
            width={400}
          />
        </div>
        <div>
          <p>固定高度，宽度自适应</p>
          <ImageItem
            imageUrl="http://testimg.jsbn.com/venus/followvideoseason/20160516/14633659281236406_1920x1098.jpg"
            height={200}
            processType={EmImgProcessType.emGD_H_W}
          />
        </div>
        <div>
          <p>固定宽度，高度自适应</p>
          <ImageItem
            aspectRatio='3:2'
            imageUrl="http://testimg.jsbn.com/venus/followvideoseason/20160516/14633659281236406_1920x1098.jpg"
            width={300}
            processType={EmImgProcessType.emGD_W_H}
          />
        </div>
        <div>
          <p>限定宽高，按长边缩放</p>
          <ImageItem
            aspectRatio='3:2'
            imageUrl="http://testimg.jsbn.com/venus/followvideoseason/20160516/14633659281236406_1920x1098.jpg"
            width={300}
            height={200}
            processType={EmImgProcessType.emGD_HW_L}
          />
        </div>
        <div>
          <p>限定宽高，按短边缩放</p>
          <ImageItem
            aspectRatio='3:2'
            imageUrl="http://testimg.jsbn.com/venus/followvideoseason/20160516/14633659281236406_1920x1098.jpg"
            width={300}
            height={200}
            processType={EmImgProcessType.emGD_HW_S}
          />
        </div>
        <div>
          <p>按长边缩放，缩略填充</p>
          <ImageItem
            aspectRatio='3:2'
            imageUrl="http://testimg.jsbn.com/venus/followvideoseason/20160516/14633659281236406_1920x1098.jpg"
            width={300}
            height={200}
            processType={EmImgProcessType.emGD_L_S}
          />
        </div>
        <div>
          <p>按短边缩放，居中裁剪</p>
          <ImageItem
            aspectRatio='3:2'
            imageUrl="http://testimg.jsbn.com/venus/followvideoseason/20160516/14633659281236406_1920x1098.jpg"
            width={300}
            height={200}
            processType={EmImgProcessType.emGD_S_S}
          />
        </div>
      </div>
    )
  }

  componentDidMount () {
    console.log(window.screen.width)
    console.log(window.screen.availWidth)
  }
}

export { Home }
