import React, { PropTypes } from 'react'
import _ from 'lodash'

import { DetailSlider } from './common/detail-slider.jsx'
import { MediaItem, EmImgProcessType } from './common/media-item.jsx'
import { DetailType, ShowType } from '../src/utils/detail-type'
import { GetHintContent, HintType } from './common/hint'
import { ReqCode } from './common/code'

class PriceInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showFlg: this.props.showFlg|false
    }
    this.optShowHandle = this.optShow.bind(this)
  }

  optShow() {
    this.setState({showFlg:!this.state.showFlg})
  }

  render() {
    const { data, fields=[] } = this.props
    let liClassName = ''
    let style = {}
    if (this.state.showFlg) {
      style.height = 31*(fields.length-2)
      liClassName = 'unfold'
    }
    let len = fields.length
    return (
      <li className={liClassName}>
        <div className="info-box" onClick={this.optShowHandle}>
          <span className="title">{data[fields[0].key]}</span>
          <div className="placeholder"></div>
          <span className="value">{data[fields[len-1].key]}</span>
          <span className="icon-arrow"></span>
        </div>
        <ul className="sub-list" style={style}>
          {
            _.map(fields, (v, k) => {
              if (k === 0 || k === len-1) {
                return null
              }

              return (
                <li key={k}>
                  <div className="info-box">
                    <span className="title">{v.name}</span>
                    <div className="placeholder"></div>
                    <span className="value">{data[v.key]}</span>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </li>
    )
  }
}

class PriceItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { title, dataList=[], fields, sumTotal } = this.props

    if (dataList.length <= 0) {
      return null
    }

    return (
      <div className="info-list">
        <div className="title-box">
          <i></i>
          <span>{title}</span>
        </div>
        <ul>
          {
            _.map(dataList, (v,k) => {
              if (k === 0) {
                return (
                  <PriceInfo key={k} showFlg={true} data={v} fields={fields} />
                )
              }

              return (
                <PriceInfo key={k} showFlg={false} data={v} fields={fields} />
              )
            })
          }
          <li className="sum-item">
            <div className="info-box">
              <span className="title">合计</span>
              <div className="placeholder"></div>
              <span className="value">{sumTotal}</span>
            </div>
          </li>
        </ul>
      </div>
    )
  }
}

class CasePrice extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showFlg: false
    }
    this.optShowHandle = this.optShow.bind(this)
    this.hideHandle = this.hide.bind(this)
  }

  optShow() {
    this.setState({showFlg:!this.state.showFlg})
  }

  hide() {
    this.setState({showFlg:false})
  }

  getAreaPrice(arrangeList) {
    let arrangeArea = {}

    _.each(arrangeList, (v) => {
      if (arrangeArea[v.areaName]) {
        arrangeArea[v.areaName].listData.push(v)
        arrangeArea[v.areaName].sumTotal += v.total
      } else {
        arrangeArea[v.areaName] = {
          listData: [],
          sumTotal: 0,
        }
      }
    })

    return arrangeArea
  }

  render() {
    const { totalPrice=0,
      executerPrice,
      executerList='[]',
      lightPrice,
      lightList='[]',
      flowerPrice,
      flowerList='[]',
      transportPrice,
      transportList='[]',
      arrangePrice,
      arrangeList='[]', } = this.props
    if (totalPrice <= 0) {
      return null
    }

    let arrangePriceList = this.getAreaPrice(JSON.parse(arrangeList))

    let className = 'cost-detail'
    if (this.state.showFlg) {
      className = 'cost-detail unfold'
    }
    return (
      <div className="case-cost">
        <div className="title">布置费用</div>
        <div className="button">
          <button className="money">
            <span className="unit">￥</span>
            <span className="price">{totalPrice}元</span>
          </button>
          <button className="detail" onClick={this.optShowHandle}>费用明细</button>
        </div>
        <div className={className}>
          <PriceItem title="执行人员"
                     sumTotal={executerPrice}
                     dataList={JSON.parse(executerList)}
                     fields={[
                     {name:'项目名称', key:'name'},
                     {name:'数量', key:'number'},
                     {name:'单位', key:'unit'},
                     {name:'单价(元)', key:'univalent'},
                     {name:'合计', key:'total'},]} />
          {
            _.map(arrangePriceList, (v, k) => {
              return (
                <PriceItem key={k} title={k}
                           sumTotal={v.sumTotal}
                           dataList={v.listData}
                           fields={[
                           {name:'项目名称', key:'name'},
                           {name:'数量', key:'number'},
                           {name:'单位', key:'unit'},
                           {name:'单价(元)', key:'univalent'},
                           {name:'合计', key:'total'},]} />
              )
            })
          }
          <PriceItem title="灯光舞美"
                     sumTotal={lightPrice}
                     dataList={JSON.parse(lightList)}
                     fields={[
                     {name:'项目名称', key:'name'},
                     {name:'规格',key: 'spec'},
                     {name:'数量', key:'number'},
                     {name:'单位', key:'unit'},
                     {name:'单价(元)', key:'univalent'},
                     {name:'合计', key:'total'},]} />
          <PriceItem title="花车花艺"
                     sumTotal={flowerPrice}
                     dataList={JSON.parse(flowerList)}
                     fields={[
                     {name:'项目名称', key:'name'},
                     {name:'规格',key: 'spec'},
                     {name:'数量', key:'number'},
                     {name:'单位', key:'unit'},
                     {name:'单价(元)', key:'univalent'},
                     {name:'合计', key:'total'},]} />
          <PriceItem title="运输费用"
                     sumTotal={transportPrice}
                     dataList={JSON.parse(transportList)}
                     fields={[
                     {name:'项目名称', key:'name'},
                     {name:'数量', key:'number'},
                     {name:'单位', key:'unit'},
                     {name:'单价(元)', key:'univalent'},
                     {name:'合计', key:'total'},]} />
          <button className="hide-cost" onClick={this.hideHandle}>
            <span>隐藏</span>
          </button>
        </div>
      </div>
    )
  }
}

class Detail extends React.Component {
  constructor (props) {
    super(props);
    // 渲染标志
    this.renderFlg=true;
    // 缓存
    this.cache={};
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
        //let kClass = ' photo-space';
        //if (this.state.data[0].wxDetailImages && this.state.data[0].wxDetailImages !== '') {
        //  // 单片
        //  list = JSON.parse(this.state.data[0].wxDetailImages);
        //  kClass = ' photo-space';
        //} else {
        //  // 设计版
        //  list = JSON.parse(this.state.data[0].pcDetailImages);
        //  kClass = '';
        //}
        let kClass = '';
        list = JSON.parse(this.state.data[0].pcDetailImages);
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
        let f4String = ''
        let standardWeddingString = content.personDescription || '';
        _.each(standardWeddingString.split(','), function(v,k) {
          f4String += (' ' + v);
        })

        let imgList = JSON.parse(content.pcDetailImages||'');

        return (
          <div className="case-detail-view">
            <div className="top-logo-box">
              <div className="logo-box">
                <i className="icon-home-logo"></i>
                <i className="icon-home-word"></i>
              </div>
            </div>
            <div className="text-info-box">
              <div className="cover-box">
                <MediaItem
                  aspectRatio="3:2"
                  imageUrl={content.coverUrlWeb}
                  quality={95}
                  processType={EmImgProcessType.emGD_S_S}
                  height={300}
                />
              </div>
              <div className="info-box">
                <h1 className="text-title">{content.name}</h1>
                <span className="text-content">{content.description}</span>
                <ul className="label-box style">
                  <li className="title">风格:</li>
                  {
                    _.map(content.caseStyleName && content.caseStyleName.split(',')||[],(v,k) => {
                      if (v === '') {
                        return null
                      }
                      return <li key={k}>{v}</li>
                    })
                  }
                </ul>
                <ul className="label-box color">
                  <li className="title">色系:</li>
                  {
                    _.map(content.color && content.color.split(',')||[], (v,k) => {
                      if (v === '') {
                        return null
                      }
                      return <li key={k}>{v}</li>
                    })
                  }
                </ul>
                {
                  content.caseType
                    ?
                    <ul className="label-box type">
                      <li className="title">类型:</li>
                      {
                        content.caseType === 1
                          ?
                          <li>套系</li>
                          :
                          <li>定制</li>
                      }
                    </ul>
                    :
                    null
                }
                <CasePrice {...content} />
              </div>
              {
                //<div className="price-box">
                //  <div className="hint-box">
                //    <span className="hint-title">价格</span>
                //    <i className="hint-icon"></i>
                //  </div>
                //  <div className="total-price">
                //    <i className="icon-discount"></i>
                //    <span className="price-discount">{'￥'+parseFloat(content.totalCost).toFixed(2)}</span>
                //    <i className="icon-original"></i>
                //    <span className="price-original">{'￥'+parseFloat(content.originalPrice).toFixed(2)}</span>
                //  </div>
                //  <h2><span className="text-hint">场景布置费用</span> <span class="text-content">{'￥'+parseFloat(content.senceCost).toFixed(2)}</span></h2>
                //  <h2>
                //    <span className="text-hint">{($.trim(f4String) === '')?'婚礼人费用：':'婚礼人(' + f4String +') 费用：'}</span>
                //    <span class="text-content">{'￥'+parseFloat(content.hdpcCost).toFixed(2)}</span>
                //  </h2>
                //</div>
              }
            </div>
            <div className="image-detail-box">
              <div className="title">现场实景</div>
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
          <div className="detail-scrollView">
            {
              this.getContent()
            }
          </div>
        )
        break;
      }
    }

    return content;
  }


  render () {
    // 判断是否需要渲染
    if (!this.props.showFlg) {
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
    ReactDOM.render(<Detail showFlg={false}></Detail>,document.getElementById('J_Detail'))
    // 添加回退事件监听
    window.addEventListener('popstate', this.onPopState);
  }

  componentWillUnmount() {
    // 移除监听事件
    window.removeEventListener('popstate', this.onPopState);
  }

  handlePopState(ev) {
    if(location.hash.indexOf("#detail") < 0) {
      // 用户回退,浏览器取消了锚点
      // 关闭详情页面,这里是渲染成一个null标签
      ReactDOM.render(<Detail showFlg={false}></Detail>,document.getElementById('J_Detail'))
    }
  }

  showDetail(detailType, showType, data, dataUrl=null) {
    // 设置锚点,显示详情页面
    location.hash = "detail";
    ReactDOM.render(
      <Detail showFlg={true} type={detailType} showType={showType} data={data} dataUrl={dataUrl} />,
      document.getElementById('J_Detail'))
  }
}

export { BaseShowDetail }
