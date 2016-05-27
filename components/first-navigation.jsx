import React, { PropTypes } from 'react'
import _ from 'lodash'

import { FooterMenuConfig } from './config/menu-config.js'

class FirstNavigation extends React.Component {
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
        <li className="item">
          <a href="tel:400-015-9999">
            <i className="icon "></i>
            <span className="title">400直拨</span>
          </a>
        </li>
      </div>
    )
  }
}

export { FirstNavigation }
