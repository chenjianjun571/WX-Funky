import React, { PropTypes } from 'react'
import ShortId from 'shortid'
import _ from 'lodash'

/*
 imageUrl:视频封面地址
 videoUrl:视频地址
 width:显示宽度
 height:显示高度
 * */
class VideoItem extends React.Component {

  constructor() {
    super();
    this.state = {
      genId: ShortId.generate(),// 用来生成每个组件唯一的id便于视频初始化
      dataSetup: {}
    };
  }

  render() {
    if (this.props.width && this.props.height && this.props.videoUrl) {
      if (this.props.videoUrl.includes('taobao.com')) {
        return (
          <div id={this.state.genId} style={{'width':this.props.width,'height':this.props.height}}>
            <h1></h1>
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
    } else {
      return null
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

/*
图片处理方式
 0.不做限定,自由显示
 1.固定高度，宽度自适应 0o_0l_200h_90q.src
 2.固定宽度，高度自适应 0o_0l_200w_90q.src
 3.限定宽高，按长边缩放 0e_0o_0l_200h_200w_90q.src
 4.限定宽高，按短边缩放 1e_0o_0l_200h_200w_90q.src
 5.按长边缩放，缩略填充 4e_0o_0l_200h_200w_90q.src
 6.按短边缩放，居中裁剪 1e_1c_0o_0l_200h_200w_90q.src
* */
/*
 图片处理方式枚举
 * */
const EmImgProcessType = {
  emGD_NONE:0,
  emGD_H_W:1,
  emGD_W_H:2,
  emGD_HW_L:3,
  emGD_HW_S:4,
  emGD_L_S:5,
  emGD_S_S:6
}

/*
 imageUrl:图片地址
 width:显示宽度
 height:显示高度
 quality:图片质量
 processType:图片处理方式
 water:是否打水印
* */
class ImageItem extends React.Component {

  render() {

    let imageUrl = ''
    if (this.props.imageUrl && this.props.imageUrl !== '') {
      // 宽度
      let width = this.props.width
      // 高度
      let height = this.props.height
      // 图片质量
      let quality = this.props.quality || '70'

      // 获取文件后缀名,图片服务只针对jpg类型才有效
      let fileExtend = this.props.imageUrl.substring(this.props.imageUrl.lastIndexOf('.')).toLowerCase();
      // 图片处理参数
      let imageOption = '';

      if (fileExtend == '.jpg' || fileExtend == '.jpeg') {
        switch (this.props.processType) {
          case EmImgProcessType.emGD_NONE:
          {
            // 不做限定,自由显示
            break;
          }
          case EmImgProcessType.emGD_H_W:
          {
            // 固定高度，宽度自适应
            if (height !== '100%') {
              imageOption += '@0o_0l_' + height + 'h_' + quality + 'q.src'
            } else {
              imageOption += '@' + quality + 'q.src'
            }
            break;
          }
          case EmImgProcessType.emGD_W_H:
          {
            // 固定宽度，高度自适应
            if (width !== '100%') {
              imageOption += '@0o_0l_' + width + 'w_' + quality + 'q.src'
            } else {
              imageOption += '@' + quality + 'q.src'
            }
            break;
          }
          case EmImgProcessType.emGD_HW_L:
          {
            // 限定宽高，按长边缩放 0e_0o_0l_200h_200w_90q.src
            if (height !== '100%' && width !== '100%') {
              imageOption += '@0e_0o_0l_' + height + 'h_' + width + 'w_' + quality + 'q.src'
            } else {
              imageOption += '@' + quality + 'q.src'
            }
            break;
          }
          case EmImgProcessType.emGD_HW_S:
          {
            // 限定宽高，按短边缩放 1e_0o_0l_200h_200w_90q.src
            if (height !== '100%' && width !== '100%') {
              imageOption += '@1e_0o_0l_' + height + 'h_' + width + 'w_' + quality + 'q.src'
            } else {
              imageOption += '@' + quality + 'q.src'
            }
            break;
          }
          case EmImgProcessType.emGD_L_S:
          {
            // 按长边缩放，缩略填充 4e_0o_0l_200h_200w_90q.src
            if (height !== '100%' && width !== '100%') {
              imageOption += '@4e_0o_0l_' + height + 'h_' + width + 'w_' + quality + 'q.src'
            } else {
              imageOption += '@' + quality + 'q.src'
            }
            break;
          }
          case EmImgProcessType.emGD_S_S:
          {
            // 按短边缩放，居中裁剪 1e_1c_0o_0l_200h_200w_90q.src
            if (height !== '100%' && width !== '100%') {
              imageOption += '@1e_1c_0o_0l_' + height + 'h_' + width + 'w_' + quality + 'q.src'
            } else {
              imageOption += '@' + quality + 'q.src'
            }
            break;
          }
          default:
          {
            imageOption += '@' + quality + 'q.src'
            break;
          }
        }

        if (this.props.water) {
          imageOption += '|watermark=1&object=c2h1aXlpbi5wbmc&t=80&p=5&y=10&x=10'
        }
      }

      imageUrl = this.props.imageUrl + imageOption;
    }

    if (this.props.linkUrl && this.props.linkUrl.length > 0) {
      return (
        <a href={this.props.linkUrl} style={{fontSize:0}}>
          <img src={imageUrl}/>
        </a>
      )
    } else {
      return (
        <img src={imageUrl}/>
      )
    }
  }
}

class MediaItem extends React.Component {

  render () {

    let width;
    let height;

    if (this.props.videoUrl && this.props.videoUrl.length > 0) {

      width = this.props.width || '100%'
      height = this.props.height || '100%'

      return (<VideoItem {...this.props} height={height} width={width} />)
    } else {

      let factors = this.props.aspectRatio.split(':')
      width = this.props.width;
      height = this.props.height;

      if (factors[0] === '-1' || factors[1] === '-1') {
        width = '100%';
        height = '100%';
      } else {
        if (width) {
          height = parseInt(width*parseFloat(factors[1])/parseFloat(factors[0]))
        } else if(height) {
          width = parseInt(height*parseFloat(factors[0])/parseFloat(factors[1]))
        } else {
          console.log('高度或者宽度必须指定一个啊.');
          return null;
        }
      }

      return (<ImageItem {...this.props} height={height} width={width} />)
    }
  }
}

export { MediaItem, EmImgProcessType }
