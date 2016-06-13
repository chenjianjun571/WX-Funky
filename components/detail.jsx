import React, { PropTypes } from 'react'
import _ from 'lodash'

import { DetailSlider } from './common/detail-slider.jsx'
import { MediaItem, EmImgProcessType } from './common/media-item.jsx'
import { DetailType, ShowType } from '../src/utils/detail-type'
import { GetHintContent, HintType } from './common/hint'
import { ReqCode } from './common/code'

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
      case DetailType.Movie:
      {
        return (
          <MediaItem
            imageUrl={this.state.data[0].coverUrlWeb}
            videoUrl={this.state.data[0].videoUrl}
          />
        )
      }
      case DetailType.FollowVideo:
      {
        return (
          <MediaItem
            imageUrl={this.state.data[0].coverUrlWeb}
            videoUrl={this.state.data[0].videoUrl}
          />
        )
      }
      case DetailType.F4:
      {
        // 四大金刚的数据是通过props传递进来的
        if (this.props.showType == ShowType.video) {
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
      case DetailType.FollowPhoto: {
        let list =  JSON.parse(this.state.data[0].pcDetailImages);
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
      case DetailType.Dress: {
        let list =  this.state.data;
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
                        imageUrl={v.imageUrl}
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
      case DetailType.Case: {
        if (this.state.data.length == 0) {
          return null;
        }
        let content = this.state.data[0];

        let f4Map = {
          '': '',
          1: '主持人',
          2: '化妆师',
          3: '摄影师',
          4: '摄像师',
          5: '双机摄影',
          6: '双机摄像',
        }
        let f4String = ''
        let standardWeddingString = content.personDescription || '';
        _.each(standardWeddingString.split(','), function(v,k) {
          f4String += (' ' + v);
        })

        let imgList = JSON.parse(content.pcDetailImages);

        return (
          <div className="case-detail-view">
            <div className="top-logo-box">
              <div className="logo-box">
                <i className="icon-home-logo"></i>
                <i className="icon-home-word"></i>
              </div>
            </div>
            <div className="text-info-box">
              <div className="header-box">
                <div className="cover-box">
                  <MediaItem
                    aspectRatio="3:2"
                    imageUrl={content.coverUrlWeb}
                    quality={95}
                    processType={EmImgProcessType.emGD_S_S}
                    height={300}
                  />
                </div>
                <h1 className="text-title">{content.name}</h1>
                <h3 className="text-content">{content.description}</h3>
              </div>
              <div className="theme-box">
                <div className="hint-box">
                  <span className="hint-title">主题属性</span>
                  <i className="hint-icon"></i>
                </div>
                <div className="theme-item theme-name">
                  <span className="text-hint">主题</span> <span className="text-content">{content.theme}</span>
                </div>
                <div className="theme-item theme-style">
                  <span className="text-hint">风格</span>
                  {
                    _.map(content.caseStyleName&&content.caseStyleName.split(',')||[],(v,k)=>{
                      return <span key={k} className="text-content">{v + ' '}</span>
                    })
                  }
                </div>
                <div className="theme-item theme-color">
                  <span className="text-hint">色系</span> <span className="text-content">{content.color}</span>
                </div>
              </div>
              <div className="price-box">
                <div className="hint-box">
                  <span className="hint-title">价格</span>
                  <i className="hint-icon"></i>
                </div>
                <div className="total-price">
                  <i className="icon-discount"></i>
                  <span className="price-discount">{'￥'+parseFloat(content.totalCost).toFixed(2)}</span>
                  <i className="icon-original"></i>
                  <span className="price-original">{'￥'+parseFloat(content.originalPrice).toFixed(2)}</span>
                </div>
                <h2><span className="text-hint">场景布置费用</span> <span class="text-content">{'￥'+parseFloat(content.senceCost).toFixed(2)}</span></h2>
                <h2>
                  <span className="text-hint">{($.trim(f4String) === '')?'婚礼人费用：':'婚礼人(' + f4String +') 费用：'}</span>
                  <span class="text-content">{'￥'+parseFloat(content.hdpcCost).toFixed(2)}</span>
                </h2>
              </div>
            </div>
            <div className="image-detail-box">
              <div className="hint-box">
                <span className="hint-title">现场实景</span>
                <i className="hint-icon"></i>
              </div>
              <div className="detail-list-box">
                <ul className="item-list">
                  {
                    _.map(imgList, (v,k)=>{
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
            </div>
          </div>
        )
      }
      case DetailType.Car:
      {
        let content = this.state.data[0];
        let params = content.parameter.split('|') || [];
        let detailImages = JSON.parse(content.pcDetailImages)
        return (
          <div className="car-detail-view">
            <div className="adv-header-box">
              <DetailSlider
                data={detailImages}
                aspectRatio="1:1"
                height={475}
              />
            </div>

            <div className="text-info-box ">
              <div className="name-box">
                <h1 className="title">{content.title}</h1>
                <h3 className="describe">{content.description}</h3>
              </div>
              <div className="price-box">
                <span className="price-discount">{'￥'+content.rentalPrice}</span>
                <span className="price-original">{'￥'+content.marketPrice}</span>
              </div>
              <div className="parameter-box">
                <div className="hint-box">
                  <span className="hint-title">产品参数</span>
                  <i className="hint-icon"></i>
                </div>
                <div className="parameter-info-box">
                  {
                    _.map(params, (v,k)=>{
                      let str=v.replace(/\r\n/ig,"");
                      return (
                        <span key={k}>{str}</span>
                      )
                    })
                  }
                </div>
              </div>
            </div>

            <div className="detail-info-box">
              <div className="hint-box">
                <span className="hint-title">产品信息</span>
                <i className="hint-icon"></i>
              </div>
              <div className='img-content-box' dangerouslySetInnerHTML={{__html:content.content}} ></div>
            </div>
          </div>
        )

        break;
      }
      case DetailType.Supply:
      {
        let content = this.state.data[0];
        let params = content.parameter.split('|') || [];
        let detailImages = JSON.parse(content.pcDetailImages)
        return (
          <div className="supply-detail-view">
            <div className="adv-header-box">
              <DetailSlider
                data={detailImages}
                aspectRatio="1:1"
                height={475}
              />
            </div>

            <div className="text-info-box ">
              <div className="name-box">
                <h1 className="title">{content.title}</h1>
                <h3 className="describe">{content.description}</h3>
              </div>
              <div className="price-box">
                <span className="price-discount">{'￥'+content.sellingPrice}</span>
                <span className="price-original">{'￥'+content.marketPrice}</span>
              </div>
              <div className="parameter-box">
                <div className="hint-box">
                  <span className="hint-title">产品参数</span>
                  <i className="hint-icon"></i>
                </div>
                <div className="parameter-info-box">
                  {
                    _.map(params, (v,k)=>{
                      let str=v.replace(/\r\n/ig,"");
                      return (
                        <span key={k}>{str}</span>
                      )
                    })
                  }
                </div>
              </div>
            </div>

            <div className="detail-info-box">
              <div className="hint-box">
                <span className="hint-title">产品信息</span>
                <i className="hint-icon"></i>
              </div>
              <div className='img-content-box' dangerouslySetInnerHTML={{__html:content.content}} ></div>
            </div>
          </div>
        )
      }
      case DetailType.Activity: {
        let list = JSON.parse(this.state.data[0].detailImages);
        return (
          <div className={"list-photo-box"}>
            <ul className="item-list">
              {
                _.map(list,(v,k)=>{
                  return (
                    <li key={k} className="item">
                      <MediaItem
                        aspectRatio="1:-1"
                        imageUrl={v.url}
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
      case DetailType.Hall: {
        let detailImages = JSON.parse(this.props.data.pcDetailImages);
        return (
          <div className={"list-photo-box photo-space"}>
            <ul className="item-list">
              {
                _.map(detailImages,(v,k)=>{
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
        //return (
        //  <div className="list-photo-box">
        //    <div id="gallery" className="pswp" tabindex="-1" role="dialog" aria-hidden="true">
        //      <div className="pswp__bg"></div>
        //      <div className="pswp__scroll-wrap">
        //        <div className="pswp__container">
        //          <div className="pswp__item"></div>
        //          <div className="pswp__item"></div>
        //          <div className="pswp__item"></div>
        //        </div>
        //        <div className="pswp__ui pswp__ui--hidden">
        //          <div className="pswp__top-bar">
        //            <div className="pswp__counter"></div>
        //            <button className="pswp__button pswp__button--close" title="Close (Esc)"></button>
        //            <button className="pswp__button pswp__button--share" title="Share"></button>
        //            <button className="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
        //            <button className="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
        //            <div className="pswp__preloader">
        //              <div className="pswp__preloader__icn">
        //                <div className="pswp__preloader__cut">
        //                  <div className="pswp__preloader__donut"></div>
        //                </div>
        //              </div>
        //            </div>
        //          </div>
        //          <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
        //            <div className="pswp__share-tooltip">
        //            </div>
        //          </div>
        //          <button className="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>
        //          <button className="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>
        //          <div className="pswp__caption">
        //            <div className="pswp__caption__center">
        //            </div>
        //          </div>
        //        </div>
        //      </div>
        //    </div>
        //  </div>
        //)
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
              reqState:ReqCode.Error,
              dataErrorFlg:true,
              data:[],
            })
          });
      }
    } else {
      // 只设置reqState,数据从props里面取
      this.setState({
        reqState:ReqCode.Ready
      })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.renderFlg;
  }

  componentDidUpdate() {
    //if (this.props.type == DetailType.Hall) {
    //  var pswpElement = document.querySelectorAll('.pswp')[0];
    //  // build items array
    //  let detailImages = JSON.parse(this.props.data.pcDetailImages);
    //  let items = _.map(detailImages, (v,k)=>{
    //    var dimension = v && v.split(/_(\d{1,4})x(\d{1,4})\.\w+g$/i);
    //    var src = v + '@90q|watermark=1&object=c2h1aXlpbi5wbmc&t=80&p=5&y=10&x=10';
    //    var w = dimension!=undefined&&dimension.length>2 ?parseInt(dimension[1]):-1;
    //    var h = dimension!=undefined&&dimension.length>2 ?parseInt(dimension[2]):-1;
    //    return {
    //      src:src,
    //      w:w,
    //      h:h
    //    }
    //  })
    //  let options = {
    //    index: 0,
    //    history:false,
    //    focus:false,
    //    closeEl:false,
    //    escKey:false,
    //    closeOnVerticalDrag:false,
    //    closeOnScroll:false,
    //    pinchToClose:false
    //  };
    //  this.gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    //  this.gallery.init();
    //}
  }

  componentWillUnmount () {
    //this.gallery.close();
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
