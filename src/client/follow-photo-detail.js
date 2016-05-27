/**
 * Created by chenjianjun on 16/5/27.
 */
import { FollowPhotoDetail } from '../../components/follow-photo-detail.jsx'
import { FirstNavigation } from '../../components/first-navigation.jsx'
import { SecondNavigation } from '../../components/second-navigation.jsx'
import 'es6-promise'
import 'fetch-detector'
import 'fetch-ie8'

// 从J_Matrix标签获取传入的参数
let paramsString = document.getElementById('J_Matrix').attributes['data-params'].nodeValue || '{}'
let params = JSON.parse(paramsString)

/*渲染本模块的菜单*/
ReactDOM.render(<SecondNavigation menuKey={params.menuKey} parentKey={params.parentKey} />, document.getElementById('J_Nav_Second'))
ReactDOM.render(<FirstNavigation parentKey={params.parentKey} />, document.getElementById('J_Nav_First'))
ReactDOM.render(<FollowPhotoDetail dataParams={params} />,document.getElementById('J_Main'))
