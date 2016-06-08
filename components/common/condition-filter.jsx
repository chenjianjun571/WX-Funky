import React, { PropTypes } from 'react'
import _ from 'lodash'

/*
 let f =[
 {
   kClass          : "content-box price",
   kName           : "价位",
   selType         : 选择器类型0:单选 1:多选 默认是0
   defaultIndex    : 默认选中第几个(单选有效)
   conditions:[
     {
       name:"全部",
       isActive:true, //标识是否选中,仅selType为多选有效
       external:{}
     },
     {
       name:"5000-10,000",
       external:{minPrice:5000,maxPrice:10000}
     },
   ]
 }
 ]
*/
// 酒店搜索组件有单选和多选功能,单独处理
class ConditionFilter extends React.Component {
  constructor (props) {
    super(props);

    // 第一次渲染标志
    this.isFirstRender=false;
    this.state = {
      selShowClass:'',
      selContent:[],
      filters:[]
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
                                let selHandle = this.selHandle.bind(this, k, kk);
                                let kl = "item";
                                if (v.selType && v.selType == 1) {
                                  // 多选
                                  kl=(vv.isActive&&vv.isActive==true)?"item item-activate":"item"
                                } else {
                                  // 单选
                                  kl=(kk==v.kIndex)?"item item-activate":"item"
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
                <div className="reset-button" onClick={this.handleReset.bind(this)}>重置</div>
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
    // 对象直接赋值只是引用赋值,还是指向的是同一块内存,所以这里的赋值采用深拷贝
    let t = this.deepCopy(this.props.filters)
    // 重置条件
    _.each(t,(v,k)=>{
      if (v.selType && v.selType== 1) {
        // 多选,多选模式下只有根据conditions里面的v.isActive控制选中还是不选中
      } else {
        // 单选
        // 检查父组件有没有设置默认值
        if (v.defaultIndex) {
          v.kIndex=v.defaultIndex;
        } else {
          v.kIndex=0;
        }
      }
    })
    this.setState({filters:t})
  }

  handleSubmit(e) {
    e.preventDefault();
    let pP = {}
    let pN = []
    _.each(this.state.filters,(v,k)=>{
      if (v.selType && v.selType== 1) {
        // 多选
        _.each(v.conditions,(vv,kk)=>{
          if (vv.isActive && vv.isActive==true) {
            pP=_.merge(pP, vv.external)
            pN.push(vv.name)
          }
        })
      } else {
        // 单选
        pP=_.merge(pP, v.conditions[v.kIndex].external)
        pN.push(v.conditions[v.kIndex].name)
      }
    })

    this.setState({selShowClass:'', selContent:pN})

    if (this.props.filterChangeHandle) {
      this.props.filterChangeHandle(pP)
    }
  }

  selHandle(k, kk, e) {
    e.preventDefault();

    let t = this.state.filters;
    if (t[k].selType && t[k].selType== 1) {
      // 多选
      _.each(t[k].conditions,(v,j)=>{
        if (j==kk) {
          v.isActive=!v.isActive;
        }
      })
    } else {
      // 单选
      // 标注选择的是哪一类条件的哪一个选项
      t[k].kIndex=kk;
    }

    this.setState({filters:t})
  }

  componentDidMount() {
    let n = []
    // 对象直接赋值只是引用赋值,还是指向的是同一块内存,所以这里的赋值采用深拷贝
    let f = this.deepCopy(this.props.filters)
    _.each(f, (v,k)=>{
      if (v.selType && v.selType== 1) {
        // 多选
        _.each(v.conditions,(vv,jj)=>{
          if (vv.isActive && vv.isActive==true) {
            n.push(vv.name)
          }
        })
      } else {
        // 单选,检查默认值
        if (v.defaultIndex && v.defaultIndex > 0) {
          // 检查默认值
          v.kIndex=v.defaultIndex;
          n.push(v.conditions[v.defaultIndex].name)
        } else {
          v.kIndex = 0;
          n.push(v.conditions[0].name)
        }
      }
    })

    this.isFirstRender=true;
    this.setState({selContent:n, filters:f})
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.renderFlg) {
      let n = []
      // 对象直接赋值只是引用赋值,还是指向的是同一块内存,所以这里的赋值采用深拷贝
      let f = this.deepCopy(nextProps.filters)
      _.each(f, (v,k)=>{
        if (v.selType && v.selType== 1) {
          // 多选
          _.each(v.conditions,(vv,jj)=>{
            if (vv.isActive && vv.isActive==true) {
              n.push(vv.name)
            }
          })
        } else {
          // 单选,检查默认值
          if (v.defaultIndex && v.defaultIndex > 0) {
            // 检查默认值
            v.kIndex=v.defaultIndex;
            n.push(v.conditions[v.defaultIndex].name)
          } else {
            v.kIndex=0;
            n.push(v.conditions[0].name)
          }
        }
      })

      this.setState({selContent:n, filters:f})
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

  deepCopy(source) {
    let result={};
    for (var key in source) {
      result[key] = typeof source[key]==='object'? this.deepCopy(source[key]): source[key];
    }
    return result;
  }
}

export { ConditionFilter }
