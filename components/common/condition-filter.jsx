import React, { PropTypes } from 'react'
import _ from 'lodash'

// 筛选组件
class ConditionFilter extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      selContent:[],
      filters: []
    }
  }

  render () {
    let kClass="fixed-center-box sift-content-box ";
    if (this.state.showFlg) {
      kClass="fixed-center-box sift-content-box show-sift";
    }
    return (
      <div className="nav-placeholder">
        <div id="fixedNav" className="sift-nav">
          <div className="sift-nav-box">
            <div className="sift-list-box">
              <ul className="sift-list">
                {
                  _.map(this.state.selContent, (v,k)=>{
                    return (
                      <li key={k} className="item "><span className="text">{v}</span></li>
                    )
                  })
                }
              </ul>
            </div>
            <div className="sift-button" onClick={this.showHandle.bind(this)}>
              <span className="icon"></span>
              <span className="text">筛选</span>
            </div>

            <div className={kClass} >
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
                                  let kl = (kk==v.kIndex)?"item item-activate":"item"
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
      </div>
    )
  }

  showHandle(e) {
    e.preventDefault();
    this.setState({showFlg:true});
  }

  selHandle(k, kk, e) {
    e.preventDefault();
    let t = this.state.filters;
    t[k].kIndex=kk;
    this.setState({filters:t})
  }

  handleReset(e) {
    e.preventDefault();
    let t = this.state.filters;
    _.each(t,(v,k)=>{
      v.kIndex=0;
    })
    this.setState({filters:t})
  }

  handleSubmit(e) {
    e.preventDefault();
    let pP = {}
    let pN = []
    _.each(this.state.filters,(v,k)=>{
      pP=_.merge(pP, v.conditions[v.kIndex].external)
      pN[k]=v.conditions[v.kIndex].name
    })
    this.setState({showFlg:false, selContent:pN})
    if (this.props.filterChangeHandle) {
      this.props.filterChangeHandle(pP)
    }
  }

  /*
  * */
  componentDidMount() {
    let n = []
    let f = this.props.filters;
    _.each(f, (v,k)=>{
      if (v.conditions && v.conditions.length>0) {
        v.kIndex=0;
        n[k]=v.conditions[0].name
      }
    })
    this.setState({selContent:n, filters:f}, ()=>{
      $(document).ready(function(){
        var topMain= $("#fixedNav").offset().top
        $(".scrollView").scroll(function(){
          if ($(".scrollView").scrollTop()>topMain){
            $("#fixedNav").addClass("fixed_top_nav");
          }else{
            $("#fixedNav").removeClass("fixed_top_nav");
          }
        });
      });
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.renderFlg) {
      let n = []
      let f = nextProps.filters
      _.each(f, (v,k)=>{
        if (v.conditions && v.conditions.length>0) {
          v.kIndex=0;
          n[k]=v.conditions[0].name
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
}

export { ConditionFilter }