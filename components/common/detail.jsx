import React, { PropTypes } from 'react'
import _ from 'lodash'
import { MediaItem, EmImgProcessType } from './media-item.jsx'
import { DetailType } from '../../src/utils/detail-type'
import { GetHintContent, HintType } from './hint'
import { ReqCode } from './code'

class Detail extends React.Component {
  constructor (props) {
    super(props);
    // 渲染标志
    this.renderFlg=true;
    // 缓存
    this.cache=new Map();
    // 状态
    this.state = {
      // 数据请求状态
      reqState:ReqCode.Loading,
      // 数据请求错误标志
      dataErrorFlg:false,
      // 数据
      data:{}
    }
  }

  getContent() {
    switch (this.props.type) {
      case DetailType.F4:
      {
        // 四大金刚的数据是通过props传递进来的
        if (this.props.showType == 1) {
          // 四大金刚作品的视频显示
          return (
            <MediaItem
              imageUrl={this.props.data.coverUrlWeb}
              videoUrl={this.props.data.videoUrl}
            />
          )
        } else {
          // 四大金刚作品的图集显示
          let list = JSON.parse(this.props.data.pcDetailImages)
          let kClass = ' photo-space';
          return (
            <div className={"list-photo-box" + kClass}>
              <ul className="item-list">
                {
                  _.map(list,(v,k)=>{
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
        break;
      }
      case DetailType.Suite: {
        // 套系的详情数据是通过网络请求过来的
        let su = JSON.parse(this.state.data[0].pcDetailImages);
        return (
          <div className="list-photo-box">
            <ul className="item-list">
              {
                _.map(su.pc_detailImages,(v,k)=>{
                  return (
                    <li key={k} className="item">
                      <MediaItem
                        aspectRatio="1:-1"
                        imageUrl={v}
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
      case DetailType.Sample: {
        let list =  JSON.parse(this.state.data[0].pcDetailImages);
        let kClass = '';
        //let kClass = ' photo-space';
        return (
          <div className={"list-photo-box" + kClass}>
            <ul className="item-list">
              {
                _.map(list,(v,k)=>{
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
      case DetailType.Pringles: {
        let list = [];
        let kClass = ' photo-space';
        if (this.state.data[0].wxDetailImages && this.state.data[0].wxDetailImages !== '') {
          // 单片
          list = JSON.parse(this.state.data[0].wxDetailImages);
          kClass = ' photo-space';
        } else {
          // 设计版
          list = JSON.parse(this.state.data[0].pcDetailImages);
          kClass = '';
        }
        return (
          <div className={"list-photo-box" + kClass}>
            <ul className="item-list">
              {
                _.map(list,(v,k)=>{
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
      default:
      {
        return null;
      }
    }
  }

  getShow () {
    let content=null;

    switch (this.state.reqState) {
      case ReqCode.Loading: {
        // 加载中状态
        content = (
          <div className="fixed-full-box">
            {
              GetHintContent(HintType.Loading)
            }
          </div>
        )
        break;
      }
      case ReqCode.Error: {
        // 加载错误状态
        content = (
          <div className="fixed-full-box">
            {
              GetHintContent(HintType.Error)
            }
          </div>
        )
        break;
      }
      case ReqCode.Ready: {
        // 数据准备ok状态
        content = (
          <div className="fixed-full-box">
            <div className="detail-scrollView">
              {
                this.getContent()
              }
            </div>
          </div>
        )
        break;
      }
    }

    return content;
  }


  render () {
    // 判断是否需要渲染
    if (this.props.showFlg==false) {
      return null
    }

    return this.getShow();
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    // 设置渲染标志
    this.renderFlg=true;

    let dataUrl = nextProps.dataUrl;
    if (dataUrl && dataUrl.length > 0) {
      // 从缓存里面查找
      if (this.cache[dataUrl]) {
        this.setState({
          reqState:ReqCode.Ready,
          data:this.cache[dataUrl].data,
        })
      } else {
        // 设置加载状态
        this.setState({
          reqState:ReqCode.Loading,
          data:[],
        })

        // 请求数据
        fetch(dataUrl)
          .then(res => {return res.json()})
          .then(j => {
            // 判断服务器应答结果
            if(j.success) {
              // 缓存数据
              let p = {}
              p.data = j.data;
              this.cache[dataUrl]=p;

              // 设置组件状态
              this.setState({
                reqState:ReqCode.Ready,
                data:j.data
              })
            } else {
              // 数据请求错误
              this.setState({
                dataErrorFlg:true,
                data:[],
              })
            }
          })
          .catch(err => {
            console.log('detail:'+err)
            // 数据请求错误
            this.setState({
              dataErrorFlg:true,
              data:[],
            })
          });
      }
    } else {
      this.setState({
        reqState:ReqCode.Ready
      })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.renderFlg;
  }
}

Detail.defaultProps = {
  'showFlg':false,
  'workType':'',
  'data':{}
};

/**
 * props:
 *       showFlg  : true or false  default:false
 *       type     : 参考../../src/utils/detail-type的值
 *       showType : 1:视频 2:图片
 *       date     : {} 数据对象
 *       dataUrl  : 数据请求地址,如果没有就会使用data这个属性的数据
 */
class BaseShowDetail extends React.Component {
  constructor (props) {
    super(props);
    // 监听回退按钮
    this.onPopState = this.handlePopState.bind(this);
  }

  componentDidMount() {
    // 初期化渲染详情页面
    ReactDOM.render(<Detail showFlg={false} />,document.getElementById('J_Detail'))
    // 添加回退事件监听
    window.addEventListener('popstate', this.onPopState);
  }

  componentWillUnmount() {
    // 移除监听事件
    window.removeEventListener('popstate', this.onPopState);
  }

  handlePopState(ev) {
    if(location.hash.indexOf("#detail") < 0) {
      // 关闭详情页面,这里是渲染成一个null标签
      ReactDOM.render(<Detail showFlg={false} />,document.getElementById('J_Detail'))
    }
  }

  showDetail(detailType, showType, data, dataUrl=null) {
    // 设置锚点,显示详情页面
    location.hash = "detail";
    ReactDOM.render(<Detail showFlg={true} type={detailType} showType={showType} data={data} dataUrl={dataUrl} />,document.getElementById('J_Detail'))
  }
}

export { BaseShowDetail }
