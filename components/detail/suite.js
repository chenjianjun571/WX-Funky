/**
 * Created by chenjianjun on 16/6/2.
 */
import _ from 'lodash'
import { MediaItem, EmImgProcessType } from '../common/media-item.jsx'

const suite = (data)=>{
  let su = JSON.parse(data[0].pcDetailImages);
  return (
    <div className="list-photo-box">
      <ul className="item-list">
        {
          _.map(su.pc_detailImages,(v,k)=>{
            return (
              <li key={k} className="item">
                <MediaItem
                  aspectRatio="1:-1"
                  imageUrl={v}
                  quality={90}
                  processType={EmImgProcessType.emGD_S_S}
                />
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export { suite }
