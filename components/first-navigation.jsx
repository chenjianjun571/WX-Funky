import React, { PropTypes } from 'react'
import _ from 'lodash'

import { FooterMenuConfig } from './config/menu-config.js'

class FirstNavigation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      className:''
    };
  }

  render () {
    let menuKey = this.props.parentKey || '/home';
    return (
      <div className="first-menu">
        {
          _.map(FooterMenuConfig, (v,k)=>{
            if (menuKey === k) {
              return (
                <li key={k} className="item item-activate">
                  <a href={k}>
                    <i className="icon icon-activate "></i>
                    <span className="title">{v.name}</span>
                  </a>
                </li>
              )
            } else {
              return (
                <li key={k} className="item">
                  <a href={k}>
                    <i className="icon icon-activate "></i>
                    <span className="title">{v.name}</span>
                  </a>
                </li>
              )
            }
          })
        }
        <li className="item" onClick={this.clickHandle.bind(this)}>
          <a>
            <i className="icon "></i>
            <span className="title">联系我们</span>
          </a>
          <div className={"dropdown-menu-box"+this.state.className}>
            <ul className="dropdown-menu">
              <li><a href="tel:400-015-9999">400客服</a></li>
              <li><a href="https://static.meiqia.com/dist/standalone.html?eid=12020" target='_blank'>在线客服</a></li>
            </ul>
          </div>
        </li>
      </div>
    )
  }

  clickHandle(e) {
    e.preventDefault();
    if(this.state.className.length > 0) {
      this.setState({className:''})
    } else {
      this.setState({className:' unfold'})
    }
  }
}

export { FirstNavigation }
