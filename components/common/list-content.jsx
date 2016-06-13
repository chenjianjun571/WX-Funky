import React, { PropTypes } from 'react'
import _ from 'lodash'

import { MediaItem, EmImgProcessType } from './media-item.jsx'
import { DetailType, ShowType } from '../../src/utils/detail-type'
import { BaseConfig } from '../config/base'
import { GetHintContent, HintType } from './hint'
import { ReqCode } from './code'
import { BaseShowDetail } from '../detail.jsx'

/**
 * 本控件的属性介绍props
 * type:参考DetailType类型
 * dataUrl:数据请求的url
 * customData:定制数据,一些特殊组件传递的参数,{}
 * showMore:是否显示加载更多 默认是true
 * isShuffle:是否打乱顺序显示数据,默认是不打乱
 * params:url请求参数
 */
class ListContent extends BaseShowDetail {
  constructor (props) {
    super(props);
    // 渲染标志,控制组件是否渲染
    this.renderFlg=false;
    // 缓存对象
    this.cache=new Map();
    // 组件状态
    this.state = {
      // 数据请求状态
      reqState:ReqCode.Loading,
      // 数据请求错误标志
      dataErrorFlg:false,
      // 数据
      data:[],
      // 是否显示加载更多
      showMoreFlg:false,
      // 搜索条件
      params:{
        pageIndex:0
      }
    };
  }

  getListContent () {
    let content = {
      listData: null,
      moreButton: null
    };

    let moreHint = "";
    switch (this.state.reqState) {
      case ReqCode.Loading: {
        // 判断是否有数据
        if (this.state.data.length > 0) {
          // 有数据的情况下是点击加载更多产生的渲染
          moreHint="数据加载中...."
        } else {
          // 加载中状态
          content.listData = GetHintContent(HintType.Loading);
        }

        break;
      }
      case ReqCode.Error: {
        // 判断是否有数据
        if (this.state.data.length > 0) {
          // 有数据的情况下是点击加载更多产生的渲染
          moreHint="加载失败,请稍后重试"
        } else {
          // 加载错误状态
          content.listData = GetHintContent(HintType.Error);
        }

        break;
      }
      case ReqCode.Ready: {
        // 数据准备ok状态
        if (this.state.data.length > 0) {
          moreHint=""
        } else {
          content.listData = GetHintContent(HintType.NoResult);
        }

        break;
      }
    }

    // 渲染加载更多按钮区域
    if (this.state.showMoreFlg) {
      content.moreButton = (
        <div className="more-button" onClick={this.handleMore.bind(this)}>
          <div className="hint-box">
            <span className="hint-title">{moreHint}</span>
            <i className="hint-icon"></i>
          </div>
          <div className="button-box">
            <span className="icon"></span>
            <span className="title">点击加载</span>
          </div>
        </div>
      )
    } else {
      content.moreButton = null;
    }

    if (content.listData !== null) {
      return content;
    }

    // 渲染列表数据
    switch(this.props.type)
    {
      case DetailType.Suite:
      {
        content.listData = (
          _.map(this.state.data, (v,k)=>{
            let dataUrl=BaseConfig.baseUrl+'suite/detail/'+v.id;
            let onShowDetail=super.showDetail.bind(this, DetailType.Suite, ShowType.image, null, dataUrl)
            return (
              <li key={k} className="item" onClick={onShowDetail}>
                <div className="photo-box">
                  <MediaItem
                    aspectRatio="3:2"
                    imageUrl={v.coverUrlWx || v.coverUrlWeb}
                    processType={EmImgProcessType.emGD_S_S}
                    height={400}
                  />
                </div>
                <div className="info-box">
                  <span className="title">{v.name}</span>
                  <span className="unit">RMB</span>
                  <span className="price">{v.salePrice}</span>
                </div>
              </li>
            )
          })
        )

        break;
      }
      case DetailType.Pringles:
      {
        content.listData = (
          _.map(this.state.data, (v,k)=>{
            let dataUrl=BaseConfig.baseUrl+'pringles/detail/'+v.id;
            let onShowDetail=super.showDetail.bind(this, DetailType.Pringles, ShowType.image, null, dataUrl)
            return (
              <li key={k+''+v.id} className="item" onClick={onShowDetail}>
                <div className="photo-box">
                  <MediaItem
                    aspectRatio="2:3"
                    imageUrl={v.coverUrlWeb}
                    processType={EmImgProcessType.emGD_S_S}
                    height={600}
                    quality={95}
                  />
                </div>
              </li>
            )
          })
        )

        break;
      }
      case DetailType.Sample:
      {
        content.listData = (
          _.map(this.state.data, (v,k)=>{
            let dataUrl=BaseConfig.baseUrl+'sample/detail/'+v.id;
            let onShowDetail=super.showDetail.bind(this, DetailType.Sample, ShowType.image, null, dataUrl)
            return (
              <li key={k+''+v.id} className="item" onClick={onShowDetail}>
                <div className="photo-box">
                  <MediaItem
                    aspectRatio="2:3"
                    imageUrl={v.coverUrlWx || v.coverUrlWeb}
                    processType={EmImgProcessType.emGD_S_S}
                    height={300}
                    quality={95}
                  />
                </div>
              </li>
            )
          })
        )

        break;
      }
      case DetailType.Movie:
      {
        content.listData = (
          _.map(this.state.data, (v,k)=>{
            // 为了防止不同tab切换的时候key冲突
            let dataUrl=BaseConfig.baseUrl+'video/detail/'+v.id;
            let onShowDetail=super.showDetail.bind(this, DetailType.Movie, ShowType.video, null, dataUrl)
            return (
              <li key={k+''+v.id} className="item" onClick={onShowDetail}>
                <div className="photo-box">
                  <MediaItem
                    aspectRatio="3:2"
                    imageUrl={v.coverUrlWeb}
                    processType={EmImgProcessType.emGD_S_S}
                    width={300}
                  />
                  <i className="icon-video-play"></i>
                </div>
              </li>
            )
          })
        )

        break;
      }
      case DetailType.Case:
      {
        content.listData = (
          _.map(this.state.data||[], (v,k)=>{
            let dataUrl=BaseConfig.baseUrl+'cases/detail/'+v.id;
            let onShowDetail=super.showDetail.bind(this, DetailType.Case, ShowType.image, null, dataUrl)
            return (
              <li key={k+''+v.id} className="item" onClick={onShowDetail}>
                <div className="photo-box">
                  <MediaItem
                    aspectRatio="3:2"
                    imageUrl={v.coverUrlWeb}
                    processType={EmImgProcessType.emGD_S_S}
                    width={300}
                  />
                </div>
              </li>
            )
          })
        )

        break;
      }
      case DetailType.Car:
      {
        content.listData = (
          _.map(this.state.data||[], (v,k)=>{
            let dataUrl=BaseConfig.baseUrl+'car/detail/'+v.id;
            let onShowDetail=super.showDetail.bind(this, DetailType.Car, ShowType.image, null, dataUrl)
            return (
              <li key={k+''+v.id} className="item" onClick={onShowDetail}>
                <div className="photo-box">
                  <MediaItem
                    aspectRatio="3:2"
                    imageUrl={v.coverUrlWeb}
                    processType={EmImgProcessType.emGD_S_S}
                    width={300}
                  />
                </div>
                <div className="info-box">
                  <i className="img-title"></i>
                  <span className="text-title">{v.title}</span>
                  <span className="price-discount">{'￥'+v.rentalPrice}</span>
                  <span className="price-original">{'￥'+v.marketPrice}</span>
                </div>
              </li>
            )
          })
        )

        break;
      }
      case DetailType.Supply:
      {
        content.listData = (
          _.map(this.state.data||[], (v,k)=>{
            let dataUrl=BaseConfig.baseUrl+'weddingsupplies/detail/'+v.id;
            let onShowDetail=super.showDetail.bind(this, DetailType.Supply, ShowType.image, null, dataUrl)
            return (
              <li key={k+''+v.id} className="item" onClick={onShowDetail}>
                <div className="photo-box">
                  <MediaItem
                    aspectRatio="1:1"
                    imageUrl={v.coverUrlWeb}
                    processType={EmImgProcessType.emGD_S_S}
                    width={300}
                  />
                </div>
                <div className="info-box">
                  <i className="img-title"></i>
                  <span className="text-title">{v.title}</span>
                  <span className="price-discount">{'￥'+v.sellingPrice}</span>
                  <span className="price-original">{'￥'+v.marketPrice}</span>
                </div>
              </li>
            )
          })
        )

        break;
      }
      case DetailType.FollowPhoto:
      {
        content.listData = (
          _.map(this.state.data, (v,k)=>{
            let dataUrl=BaseConfig.baseUrl+'followPhoto/detail/'+v.id;
            let onShowDetail=super.showDetail.bind(this, DetailType.FollowPhoto, ShowType.image, null, dataUrl)
            return (
              <li key={k} className="item" onClick={onShowDetail}>
                <div className="photo-box">
                  <MediaItem
                    aspectRatio="3:2"
                    imageUrl={v.coverUrlWeb}
                    processType={EmImgProcessType.emGD_S_S}
                    width={300}
                  />
                </div>
              </li>
            )
          })
        )

        break;
      }
      case DetailType.FollowVideo:
      {
        content.listData = (
          _.map(this.state.data||[], (v,k)=>{
            let dataUrl=BaseConfig.baseUrl+'followVideo/detail/'+v.id;
            let onShowDetail=super.showDetail.bind(this, DetailType.FollowVideo, ShowType.video, null, dataUrl)
            return (
              <li key={k} className="item" onClick={onShowDetail}>
                <div className="photo-box">
                  <MediaItem
                    aspectRatio="3:2"
                    imageUrl={v.coverUrlWeb}
                    processType={EmImgProcessType.emGD_S_S}
                    width={300}
                  />
                  <i className="icon-video-play"></i>
                </div>
              </li>
            )
          })
        )

        break;
      }
      case DetailType.Dress:
      {
        let dressType = this.props.customData.dressType;
        content.listData = (
          _.map(this.state.data||[], (v,k)=>{
            let dataUrl=BaseConfig.baseUrl+'dress/dress_list?brandId='+v.brandId+'&typeId='+dressType;
            let onShowDetail=super.showDetail.bind(this, DetailType.Dress, ShowType.image, null, dataUrl)
            return (
              <li key={k+''+v.brandId} className="item" onClick={onShowDetail}>
                <div className="photo-box">
                  <MediaItem
                    aspectRatio="3:2"
                    imageUrl={v.coverUrlWeb}
                    processType={EmImgProcessType.emGD_S_S}
                    width={600}
                  />
                </div>
                <div className="info-box">
                  <span className="text-title">{v.name}</span>
                </div>
              </li>
            )
          })
        )

        break;
      }
      case DetailType.F4:
      {
        content.listData = (
          _.map(this.state.data||[], (v,k)=>{
            // 价格描述
            let priceRemark=null;
            if (v.priceRemark && v.priceRemark !== '') {
              let ls = v.priceRemark.split && v.priceRemark.split('|') || []
              priceRemark = (
                <div className="price-intro-box">
                  <span className="text-hint">浮动价格</span>
                  {
                    _.map(ls, (v,k) => {
                      return (
                        <span key={k}>{v}</span>
                      );
                    })
                  }
                </div>
              )
            }

            // 个人描述
            let description=null;
            if (v.description && v.description !== "") {
              description = (
                <div className="intro-box">
                  <span className="text-hint">个人简介</span>
                  <span className="text-content">{v.description}</span>
                </div>
              )
            }

            return (
              <li key={k+''+v.id} className="item f4-item">
                <div className="head-image-box">
                  <MediaItem
                    aspectRatio="1:1"
                    imageUrl={v.photoUrl}
                    processType={EmImgProcessType.emGD_S_S}
                    width={200}
                  />
                </div>
                <div className="info-box">
                  <div className="name-box">
                    <span className="text-hint">{this.props.customData.typeName}</span>
                    <span className="text-content">{v.nickName}</span>
                  </div>
                  <div className="price-box">
                    <span className="text-content">{'￥'+v.salePrice}</span>
                  </div>
                  {
                    priceRemark
                  }
                  {
                    description
                  }
                </div>
                <div className="photo-box">
                  {
                    _.map(v.workList && v.workList.slice(0,2), (v, k) => {
                      // 显示详情处理句柄
                      if (this.props.customData.workType=='video') {
                        let onShowDetail=super.showDetail.bind(this, DetailType.F4, ShowType.video, v)
                        return (
                          <div key={k} className="img-box" onClick={onShowDetail}>
                            <MediaItem
                              aspectRatio="3:2"
                              imageUrl={v.coverUrlWeb}
                              processType={EmImgProcessType.emGD_S_S}
                              width={300}
                            />
                            <i className="icon-video-play"></i>
                          </div>
                        )
                      } else {
                        let onShowDetail=super.showDetail.bind(this, DetailType.F4, ShowType.image, v)
                        return (
                          <div key={k} className="img-box" onClick={onShowDetail}>
                            <MediaItem
                              aspectRatio="2:3"
                              imageUrl={v.coverUrlWeb}
                              processType={EmImgProcessType.emGD_S_S}
                              width={200}
                            />
                          </div>
                        )
                      }
                    })
                  }
                </div>
              </li>
            )
          })
        )

        break;
      }
      case DetailType.Hotel:
      {
        content.listData = (
          _.map(this.state.data||[], (v,k)=>{
            //let dataUrl=BaseConfig.baseUrl+'dress/dress_list?brandId='+v.brandId+'&typeId='+dressType;
            //let onShowDetail=super.showDetail.bind(this, DetailType.Hotel, ShowType.image, null, dataUrl)
            //<li key={k+'v.id'} className="item " onClick={onShowDetail}>
            let detailUrl = "/hotel/"+v.id;
            return (
              <a key={k+''+v.id} href={detailUrl} target="_blank" >
                <li className="item ">
                  <div className="photo-box">
                    <MediaItem
                      aspectRatio="3:2"
                      imageUrl={v.coverUrlWeb}
                      processType={EmImgProcessType.emGD_S_S}
                      width={200}
                    />
                  </div>
                  <div className="info-box">
                    <div className="title-box">
                      <span className="text-title">{v.name}</span>
                    <span className="icon-box">
                      {
                        (v.isGift&&v.isGift==1) ? <i className="icon-gift"></i> : null
                      }
                      {
                        (v.isDiscount&&v.isDiscount==1) ? <i className="icon-discount"></i> : null
                      }
                    </span>
                    </div>
                    <div className="type-box">
                      <span className="text">{v.typeName}</span>
                    </div>
                    <div className="table-box" >
                      <strong className="text-hint">桌数：</strong>
                      <b className="text-title">{v.banquetHalNum}</b>
                      <span className="text-content">个宴会厅，容纳</span>
                      <b className="text-title">{v.maxTableNum}</b>
                      <span className="text-content">桌</span>
                    </div>
                    <div className="addr-box" >
                      <strong className="text-hint">位置：</strong>
                      <span className="text-content" >{v.address}</span>
                    </div>
                    <div className="price-box">
                      <span className="text">{'￥'+v.lowestConsumption+'-'+v.highestConsumption}</span>
                    </div>
                  </div>
                </li>
              </a>
            )
          })
        )

        break;
      }
    }

    return content;
  }

  render () {
    let kClass = (this.props.customData && this.props.customData.listClass) ? this.props.customData.listClass : ""
    let listContent = this.getListContent();
    return (
      <div className={"list-box" + kClass}>
        <ul className="item-list">
          {
            listContent.listData
          }
        </ul>
        {
          // 如果外部组件不需要显示加载更多则不显示
          this.props.showMore==true ? listContent.moreButton : null
        }
      </div>
    )
  }

  componentDidMount() {
    super.componentDidMount();
    // 参数的初始状态,设置初期化请求参数
    let p = {};
    p = _.merge(p, this.props.params)
    // 组装缓存key
    let key = JSON.stringify(_.omit(p, ['pageSize','pageIndex']));
    this.queryData(key, p, this.props.dataUrl, false, this.props.isShuffle);
  }

  componentWillReceiveProps(nextProps) {
    let params = _.omit(nextProps.params, ['pageSize','pageIndex'])
    let key = JSON.stringify(params)
    // 设置渲染标志
    this.renderFlg = true;
    // 组装key
    if (this.cache[key]) {
      // 从缓存里面直接取数据
      if (nextProps.isShuffle) {
        this.setState({
          reqState       : ReqCode.Ready,
          data           : _.shuffle(this.cache[key].data),
          showMoreFlg    : this.cache[key].showMoreFlg,
          params         : this.cache[key].params,
          dataErrorFlg   : false
        })
      } else {
        this.setState({
          reqState       : ReqCode.Ready,
          data           : this.cache[key].data,
          showMoreFlg    : this.cache[key].showMoreFlg,
          params         : this.cache[key].params,
          dataErrorFlg   : false
        })
      }
    } else {
      let p = {}
      p.pageSize = this.props.params.pageSize||this.state.params.pageSize||6;
      p.pageIndex = 0;
      p = _.merge(p, params)
      // 设置加载中状态
      this.setState({
        reqState       : ReqCode.Loading,
        data           : [],
        showMoreFlg    : false,
        dataErrorFlg   : false
      })
      // 请求数据
      this.queryData(key, p, nextProps.dataUrl, false, nextProps.isShuffle)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.renderFlg;
  }

  handleMore(e) {
    e.preventDefault();

    // 设置渲染标志
    this.renderFlg = true;
    // 设置加载中状态
    this.setState({
      reqState       : ReqCode.Loading,
      showMoreFlg    : true,
      dataErrorFlg   : false,
    })

    let p = {};
    p = _.merge(p, this.state.params)
    let key = JSON.stringify(_.omit(p, ['pageSize','pageIndex']));
    this.queryData(key, p, this.props.dataUrl, true, this.props.isShuffle);
  }

  componentWillUnmount() {
    super.componentWillUnmount();
  }

  queryData(key, params, dataUrl, isChunk=false, isShuffle=false) {
    // 先从本地缓存里面查找数据
    if (this.cache[key] && !isChunk) {
      // 设置渲染标志
      this.renderFlg = true;
      // 从缓存里面直接取数据
      if (isShuffle) {
        this.setState({
          reqState       : ReqCode.Ready,
          data           : _.shuffle(this.cache[key].data),
          showMoreFlg    : this.cache[key].showMoreFlg,
          params         : this.cache[key].params,
          dataErrorFlg   : false,
        })
      } else {
        this.setState({
          reqState       : ReqCode.Ready,
          data           : this.cache[key].data,
          showMoreFlg    : this.cache[key].showMoreFlg,
          params         : this.cache[key].params,
          dataErrorFlg   : false,
        })
      }
    } else {
      // 加页请求
      params.pageIndex += 1;
      // 组装url
      let fetchUrl = BaseConfig.buildQueryUrl(params, dataUrl)
      fetch(fetchUrl)
        .then(res => {return res.json()})
        .then(j => {
          // 设置渲染标志
          this.renderFlg=true;
          // 判断服务器应答结果
          if(j.success) {
            let t;
            // 是否需要合并老数据,适用于分页加载的情况
            if (isChunk) {
              t = this.state.data;
              t = t.concat(j.data);
            } else {
              t = j.data;
              if (isShuffle) {
                t = _.shuffle(t);
              }
            }
            // 判断服务器数据是否加载完毕
            let m = (j.count > t.length) ? true : false;

            // 缓存数据
            let p = {}
            p.data = t;
            p.showMoreFlg = m;
            p.params = params;
            this.cache[key]=p;

            // 设置组件状态
            this.setState({
              reqState       : ReqCode.Ready,
              data           : t,
              showMoreFlg    : m,
              params         : params,
              dataErrorFlg   : false,
            })
          } else {
            // 数据请求错误
            if (isChunk) {
              // 分页请求数据失败的情况下
              // 设置组件状态
              this.setState({
                reqState       : ReqCode.Error,
                showMoreFlg    : true,
                dataErrorFlg   : true,
              })
            } else {
              // 设置组件状态
              this.setState({
                reqState       : ReqCode.Error,
                data           : [],
                dataErrorFlg   : true,
              })
            }
          }
        })
        .catch(err => {
          console.log(err)
          // 设置渲染标志
          this.renderFlg=true;
          // 数据请求错误
          if (isChunk) {
            // 分页请求数据失败的情况下
            // 设置组件状态
            this.setState({
              reqState       : ReqCode.Error,
              showMoreFlg    : true,
              dataErrorFlg   : true,
            })
          } else {
            // 设置组件状态
            this.setState({
              reqState       : ReqCode.Error,
              data           : [],
              dataErrorFlg   : true,
            })
          }
        });
    }
  }
}

ListContent.defaultProps = {
  // 列表类型,参考DetailType定义
  type:-1,
  // 数据请求的url地址
  dataUrl:'',
  // 用户自定义的一些特殊数据
  customData:{},
  // 是否显示加载更多
  showMore:true,
  // 显示数据的时候是否打乱显示
  isShuffle:false,
  // url请求参数
  params:{
    pageSize:0
  }
}

export { ListContent }
