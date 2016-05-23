import React, { PropTypes } from 'react'
import ShortId from 'shortid'
import _ from 'lodash'

class VideoItem extends React.Component {

  constructor() {
    super();
    this.state = {
      genId: ShortId.generate(),// 用来生成每个组件唯一的id便于视频初始化
      dataSetup: {}
    };
  }

  render() {
    if (this.props.videoUrl.includes('taobao.com')) {
      return (
        <div id={this.state.genId} style={{'width':this.props.width,'height':this.props.height}}>
          <h1>Loading TaobaoVideoJS...</h1>
        </div>
      )
    } else {
      return (
        <video
          width={this.props.width}
          height={this.props.height}
          poster={this.props.imageUrl}
          id={this.state.genId}
          src={this.props.videoUrl}
          type="video/mp4" />
      )
    }
  }

  componentDidMount() {
    if (this.props.videoUrl.includes('taobao.com')) {
      if (this.props.videoUrl.split('?').length === 2) {
        setTimeout(this.loadTBVideo(
          this.state.genId,
          this.props.videoUrl.split('?')[1],
          this.props.width,
          this.props.height,
          this.props.imageUrl
        ),0);
      } else {
        console.log('视频地址格式错误')
      }
    } else {
      if (this.props.videoUrl.endsWith('.mp4')) {
        //为了把初始化操作放到线程上去。
        setTimeout(this.loadVideo(this.state.genId, this.props.autoplay),0)
      } else {
        console.log('视频类型错误')
      }
    }
  }

  loadVideo(vid, autoPlay=false) {
    if (autoPlay) {
      // 自动播放
      return ()=>{
        MediaElement(vid, {success: (me)=> {
          me.muted=true
          me.loop = true
          me.play()
          me.addEventListener('ended',function(){
            me.play()
          })
        }})
      }
    } else {
      return ()=>{
        $('#'+vid).mediaelementplayer({
          pauseOtherPlayers: true,
          // force iPad's native controls
          iPadUseNativeControls: true,
          // force iPhone's native controls
          iPhoneUseNativeControls: true,
          // force Android's native controls
          AndroidUseNativeControls: true
        })
      }
    }
  }

  loadTBVideo(vid,videoUrl,width,height,posterUrl) {
    return ()=>{
      let queryJson = (vid,width,height,queryString)=>{
        let pairs = queryString.split('&');
        let result = {}
        _.each(pairs,(value,key)=>{
          let pair = value.split('=');
          result[pair[0]] = decodeURIComponent(pair[1] || '');
        })
        result['div'] = vid
        result['width'] = width || '100%'
        result['height'] = height || '100%'

        return _.pick(result,['vid','uid','tid','div','height','width'])
      }

      tb_player_object.embedPlayer(
        queryJson(vid,width,height,videoUrl),
        { autoplay:"false",
          poster:posterUrl },
        { wmode:"transparent",
          allowScriptAccess:"always",
          allowFullScreen:"true" });
    }
  }
}

class ImageItem extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    // 显示比例
    let aspectRatios = this.props.aspectRatio.split(':');
    // 宽度
    let width = this.props.width
    // 高度
    let height = this.props.height
    if (this.props.width) {
      if (aspectRatios[1] === '-1') {
        height = '100%'
      } else {
        height = parseInt(this.props.width*parseFloat(aspectRatios[1])/parseFloat(aspectRatios[0]))
      }
    } else if (this.props.height) {
      if (aspectRatios[0] === '-1') {
        width='100%'
      }else {
        width = parseInt(this.props.height*parseFloat(aspectRatios[0])/parseFloat(aspectRatios[1]))
      }
    } else {
      console.log('宽度或者高度缺失.');
      return null;
    }

    console.log('1.计算结果'+'+width:'+width+'|height:'+height)

    // 获取文件后缀名
    let fileExtend=''
    if (this.props.imageUrl) {
      fileExtend = this.props.imageUrl.substring(this.props.imageUrl.lastIndexOf('.')).toLowerCase();
    }
    // 图片服务只针对jpg类型才有效
    let imageOption='';
    if (fileExtend == '.jpg' || fileExtend == '.jpeg') {
      imageOption='@';
      if (width !== '100%') {
        imageOption = imageOption+width+'w_';
      }
      if (height !== '100%') {
        imageOption = imageOption+height+'h_';
      }
      imageOption = imageOption + '95q';
      imageOption =  this.props.water? (imageOption+'|watermark=1&object=c2h1aXlpbi5wbmc&t=80&p=5&y=10&x=10'):imageOption
    }

    let found = this.props.imageUrl.match(/_(\d{1,4})x(\d{1,4})\.\w+g$/i)
    let imageUrl = ''
    if (this.props.imageUrl && this.props.imageUrl !== '') {
      imageUrl = this.props.imageUrl + imageOption;
    }

    if (found && 3 === found.length) {
      width = parseInt(found[1])
      height = parseInt(found[2])
    }

    console.log('2.计算结果'+'+width:'+width+'|height:'+height)

    if (this.props.outerLink) {
      return (
        <a href={this.props.outerLink} className='img-box'>
          <div style={{'height':'100%'}} data-width={width} data-height={height}>
            <img src={imageUrl}  />
          </div>
        </a>
      )
    } else {
      return (
        <div style={{'height':height, 'width':width}}>
          <img src={imageUrl} />
        </div>
      )
    }
  }
}

class MediaItem extends React.Component {
  render () {
    if (this.props.videoUrl) {
      return <VideoItem {...this.props} />
    } else {
      return <ImageItem {...this.props} />
    }
  }
}

export { MediaItem }
