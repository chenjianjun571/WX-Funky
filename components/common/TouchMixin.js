/**
 * Created by chenjianjun on 16/5/30.
 */

class TouchMixin {
  touchStart(ev){
    this.setState({
      startX:ev.touches[0].pageX,
      startY:ev.touches[0].pageY
    })
  }

  touchEnd(ev, i){
    this.setState({
      startX:"",
      startY:""
    })
    let index = -1;
    let direction = this.GetSlideDirection(this.state.startX, this.state.startY, ev.changedTouches[0].pageX, ev.changedTouches[0].pageY);
    switch(direction) {
      case 0:// "没滑动"
        break;
      case 1:// 向上
        break;
      case 2:// "向下"
        break;
      case 3:// "向左"
        index = i + 1;
        if (index >= this.state.data.length) {
          index = 0;
        }
        break;
      case 4:// "向右"
        index = i - 1;
        if (index < 0) {
          index = this.state.data.length - 1;
        }
        break;
      default:
    }
  }

  GetSlideAngle(dx, dy) {
    return Math.atan2(dy, dx) * 180 / Math.PI;
  }

  GetSlideDirection(startX, startY, endX, endY) {
    var dy = startY - endY;
    var dx = endX - startX;
    var result = 0;
    //如果滑动距离太短
    if(Math.abs(dx) < 5 && Math.abs(dy) < 5) {
      return result;
    }

    var angle = this.GetSlideAngle(dx, dy);
    if(angle >= -45 && angle < 45) {
      result = 4;
    }else if (angle >= 45 && angle < 135) {
      result = 1;
    }else if (angle >= -135 && angle < -45) {
      result = 2;
    }
    else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
      result = 3;
    }
    return result;
  }
}

export { TouchMixin }
