/**
 * Created by chenjianjun on 16/5/21.
 */
//import React from 'react'
//import ReactDOM from 'react-dom'

class DomUtils {

  ownerDocument (componentOrElement) {
    let element = ReactDOM.findDOMNode(componentOrElement);
    return (element && element.ownerDocument) || document;
  }

  ownerWindow (element) {
    let doc = ownerDocument(element);
    return doc.defaultView || doc.parentWindow || window;
  }

  scrollTop (element, value) {
    if (!element) {
      return;
    }

    var hasScrollTop = 'scrollTop' in element;

    if (value === undefined) {
      return (hasScrollTop ? element.scrollTop : element.pageYOffset);
    }

    hasScrollTop ? element.scrollTop = value : element.scrollTo(element.scrollX, value);
  }

  offset (element) {
    if (element) {
      var rect = element.getBoundingClientRect();
      var body = document.body;
      var clientTop = element.clientTop || body.clientTop || 0;
      var clientLeft = element.clientLeft || body.clientLeft || 0;
      var scrollTop = window.pageYOffset || element.scrollTop;
      var scrollLeft = window.pageXOffset || element.scrollLeft;

      return {
        top: rect.top + scrollTop - clientTop,
        left: rect.left + scrollLeft - clientLeft
      };
    }

    return null;
  }

  position (element) {
    return {
      left: element.offsetLeft,
      top: element.offsetTop
    };
  }
}

export { DomUtils }
