import React, { PropTypes } from 'react'
import _ from 'lodash'

import { MenuConfig } from './config/menu-config.js'

class SecondNavigation extends React.Component {

  constructor() {
    super();

    this.state = {
      menus:[],
      className:''
    };
  }

  render () {
    if (this.state.menus.length > 0) {
      let menuKey = this.props.menuKey || this.state.menus[0]
      return (
        <div className={"secondly-menu"+this.state.className}>
          <div className="menu-box">
            <ul className="list-item">
              {
                _.map(this.state.menus,(v,k)=>{
                  if (v == menuKey) {
                    return (
                      <li key={k} className="item item-activate">
                        <a href={v.link}>
                          <i className="icon"></i>
                          <span className="title">{v.name}</span>
                        </a>
                      </li>
                    )
                  } else {
                    return (
                      <li key={k} className="item">
                        <a href={v.link}>
                          <i className="icon"></i>
                          <span className="title">{v.name}</span>
                        </a>
                      </li>
                    )
                  }
                })
              }
            </ul>
            <div className="open-button" onClick={this.handle.bind(this)}></div>
          </div>
        </div>
      )
    } else {
      return null
    }
  }

  getDefaultProps() {
    return {
      'parentKey':''
    }
  }

  handle(e) {
    e.preventDefault();
    if(this.state.className.length > 0) {
      this.setState({className:''})
    } else {
      this.setState({className:' fold'})
    }
  }

  componentDidMount() {
    if (MenuConfig[this.props.parentKey]) {
      this.setState({menus:MenuConfig[this.props.parentKey]})
    }
  }
}

export { SecondNavigation }
