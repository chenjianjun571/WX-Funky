/**
 * Created by chenjianjun on 16/6/3.
 * 提示组件
 */
import React from 'react'

const HintType = {
  Loading:1,// 加载
  NoResult:2,// 无数据
  Error:3,// 错误
}

const GetHintContent = (type, msg)=>{

  switch (type) {
    case HintType.Loading: {
      return (
        <div className="load-hint-box">
          <i className="icon loading"></i>
          <span className="text-hint">{msg || "数据加载中...."}</span>
        </div>
      )
    }
    case HintType.NoResult: {
      return (
        <div className="load-hint-box">
          <i className="icon loaded"></i>
          <span className="text-hint">{msg || "小主,换个条件吧~~"}</span>
        </div>
      )
    }
    case HintType.Error: {
      return (
        <div className="load-hint-box">
          <i className="icon loaded"></i>
          <span className="text-hint">{msg || "小主,好像出问题了~~"}</span>
        </div>
      )
    }
  }

  return null
}

export { GetHintContent , HintType }
