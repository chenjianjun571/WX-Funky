import React, { PropTypes } from 'react'
import _ from 'lodash'

import { MenuConfig } from './config/menu-config.js'

class SecondNavigation extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      menus:[],
      className:''
    };
  }

  render () {
    if (this.state.menus.length > 0) {
      return (
        <div className={"secondly-menu"+this.state.className}>
          <div className="menu-box">
            <ul className="list-item">
              {
                _.map(this.state.menus,(v,k)=>{
                  if (v.menu == this.props.menuKey) {
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
            <div className="open-button" onClick={this.handle.bind(this)}>
              <div className="info-box">
                <i className="icon"></i>
                {
                  _.map(this.state.menus,(v,k)=>{
                    if (v.menu == this.props.menuKey) {
                      return (
                        <span key={k} className="title">{v.name}</span>
                      )
                    }
                  })
                }
                <div className="bg-box"></div>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return null
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
    console.log(this.props.parentKey)
    console.log(this.props.menuKey)
    if (MenuConfig[this.props.parentKey]) {
      this.setState({ menus:MenuConfig[this.props.parentKey]})
    }
  }
}

SecondNavigation.propTypes = {
  'parentKey':PropTypes.string,
  'menuKey':PropTypes.string
};

SecondNavigation.defaultProps = {
  'parentKey':'',
  'menuKey':''
};

export { SecondNavigation }
