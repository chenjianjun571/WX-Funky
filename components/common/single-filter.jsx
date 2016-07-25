import React, { PropTypes } from 'react'
import _ from 'lodash'

/*
 let f =[{
   kClass          : "content-box price",
   kName           : "价位",
   conditions:[{
     name:"全部",
     external:{}
   },
   {
     name:"5000-10,000",
     external:{minPrice:5000,maxPrice:10000}
   }]
 }]
 */

class SingleFilter extends React.Component {

  constructor (props) {
    super(props);
    // 第一次渲染标志
    this.isFirstRender=false;
    this.state = {
      // 通过设置class来控制选项的选中和非选中状态
      selShowClass:'',
      // 选中的条件名称,用于展示在筛选标题栏上
      selContent:[],
      // 筛选条件,参考顶部说明注释
      filters:[],
      // 选中的选项标记
      filterIndex:''
    };
  }

  render () {
    return (
      <div className="nav-placeholder">
        <div id="fixedNav" className="sift-nav">

          <div className="sift-nav-box">
            <div className="sift-list-box">
              <ul className="sift-list">
                {
                  _.map(this.state.selContent, (v,k)=>{
                    if ( v != '全部' ) {
                      return (
                        <li key={k} className="item ">
                          <span className="text">{v}</span>
                        </li>
                      )
                    } else {
                      return null
                    }
                  })
                }
              </ul>
            </div>
            <div className="sift-button" onClick={this.showHandle.bind(this)}>
              <span className="icon"></span>
              <span className="text">筛选</span>
            </div>
          </div>

          <div className={"fixed-center-box sift-content-box"+this.state.selShowClass}>
            <div className="sift-center-box">

              <div className="sift-scrollView-box">
                {
                  _.map(this.state.filters, (v,k)=>{
                    return (
                      <div key={k} className={v.kClass}>
                        <div className="title">
                          <i className="icon"></i>
                          <span className="text">{v.kName}</span>
                        </div>
                        <div className="item-list-box">
                          <ul className="item-list">
                            {
                              _.map(v.conditions, (vv,kk)=>{
                                let selHandle = this.selHandle.bind(this, vv.index);
                                let kl = "item";
                                if (vv.index === this.state.filterIndex) {
                                  kl = "item item-activate"
                                }

                                return (
                                  <li key={kk} className={kl}>
                                    <span className="title" onClick={selHandle}>{vv.name}</span>
                                  </li>
                                )
                              })
                            }
                          </ul>
                        </div>
                      </div>
                    )
                  })
                }
              </div>

              <div className="button-box">
                <div className="confirm-button" onClick={this.handleSubmit.bind(this)}>确定</div>
                <div className="reset-button" onClick={this.handleReset.bind(this)}>清除条件</div>
              </div>

            </div>
          </div>

        </div>
      </div>
    )
  }

  showHandle(e) {
    e.preventDefault();
    this.setState({selShowClass:' show-sift'});
  }

  handleReset(e) {
    e.preventDefault();
    this.setState({filterIndex:'0-0'})
  }

  handleSubmit(e) {
    e.preventDefault();
    let pP = {}
    let pN = []
    _.each(this.state.filters,(v,k)=>{
      _.each(v.conditions, (vv, kk)=>{
        if (vv.index === this.state.filterIndex) {
          pP=_.merge(pP, vv.external)
          pN.push(vv.name)
        }
      })
    })

    this.setState({selShowClass:'', selContent:pN})

    if (this.props.filterChangeHandle) {
      this.props.filterChangeHandle(pP)
    }
  }

  selHandle(index, e) {
    e.preventDefault();
    this.setState({filterIndex:index})
  }

  componentDidMount() {
    let n = []
    // 对象直接赋值只是引用赋值,还是指向的是同一块内存,所以这里使用merge可以返回一个拷贝对象
    let f = [];
    f = _.merge(f, this.props.filters);
    _.each(f, (v,k)=>{
      _.each(v.conditions, (vv, kk)=>{
        vv.index=''+k+'-'+kk
      })
    })

    this.isFirstRender=true;
    this.setState({selContent:n, filters:f, filterIndex:'0-0'})
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.renderFlg) {
      let n = []
      // 对象直接赋值只是引用赋值,还是指向的是同一块内存,所以这里使用merge可以返回一个拷贝对象
      let f = [];
      f = _.merge(f, nextProps.filters);
      _.each(f, (v,k)=>{
        _.each(v.conditions, (vv, kk)=>{
          vv.index=''+k+'-'+kk
        })
      })

      this.setState({selContent:n, filters:f, filterIndex:'0-0'})
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.renderFlg && nextProps.renderFlg == false) {
      return false;
    }
    return true;
  }

  componentDidUpdate() {
    // 客户端第一次渲染的时候才做处理
    if (this.isFirstRender) {
      let topMain= $("#fixedNav").offset().top
      $(".scrollView").scroll(function(){
        if ($(".scrollView").scrollTop()>topMain){
          $("#fixedNav").addClass("fixed_top_nav");
        }else{
          $("#fixedNav").removeClass("fixed_top_nav");
        }
      });
      this.isFirstRender = false;
    }
  }
}

export { SingleFilter }
