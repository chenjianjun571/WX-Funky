/**
 * Created by chenjianjun on 16/6/3.
 */

const ReqCode = {
  Loading:1,// 加载
  Error:2,// 错误
  Ready:3,// 准备ok
}

const LoadingCode = {
  Loading:1,// 加载中
  Error:2,// 加载错误
  OK:3,// 加载ok
}

const HintPopupBoxType = {
  INIT_NONE:-1,// 初期值
  MAP:0,// 地图
  INTRODUCTION:1,// 介绍
  MENU:2,// 菜单
  CALENDAR:3,// 日历
  REQUIRE:4,// 需求提交
}

export { ReqCode, LoadingCode, HintPopupBoxType }
