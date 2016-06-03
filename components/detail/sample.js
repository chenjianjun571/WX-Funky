/**
 * Created by chenjianjun on 16/6/2.
 */
import _ from 'lodash'
import { MediaItem, EmImgProcessType } from '../common/media-item.jsx'

const sample = (data)=>{
  let list =  JSON.parse(data[0].pcDetailImages);
  let kClass = '';
  //let kClass = ' photo-space';

  return (
    <div className={"list-photo-box" + kClass}>
      <ul className="item-list">
        {
          _.map(list,(v,k)=>{
            return (
              <li key={k} className="item">
                <MediaItem
                  aspectRatio="1:-1"
                  imageUrl={v}
                  quality={90}
                  processType={EmImgProcessType.emGD_S_S}
                  water={true}
                />
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export { sample }
