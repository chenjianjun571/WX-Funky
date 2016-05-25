/**
 * Created by chenjianjun on 16/3/16.
 */
import { Activity } from '../../components/activity.jsx'
import { FooterNavigation } from '../../components/footer-navigation.jsx'
import 'es6-promise'
import 'fetch-detector'
import 'fetch-ie8'

// 从J_Matrix标签获取传入的参数
let paramsString = document.getElementById('J_Matrix').attributes['data-params'].nodeValue || '{}'
let params = JSON.parse(paramsString)

/*渲染本模块的菜单*/
ReactDOM.render(<Activity dataParams={params} />,document.getElementById('J_Main'))
ReactDOM.render(<FooterNavigation menuKey={params.parentKey} />, document.getElementById('J_Nav'))
