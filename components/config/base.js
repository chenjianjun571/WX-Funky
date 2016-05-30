import _ from 'lodash'

const BaseConfig = {
  baseUrl:'/api/',
  buildUrl:function(params,urlTemplate){
    let paramsUrl = urlTemplate
    if (_.size(params)>0 && paramsUrl) {
      /**
       例如url为: /sample/:id/:typeId
       传入的参数为: {id:123,typeId:2343}
       **/
      _.each(params,(v,k)=>{
        paramsUrl = paramsUrl.replace(':'+k,v)
      })
    }
    return BaseConfig.baseUrl + paramsUrl
  },
  buildQueryUrl:function(params,url){
    let paramsUrl = url
    if (_.size(params)>0 && paramsUrl) {
      /**
       例如url为: /sample
       传入的参数为: {id:123,typeId:2343}
       /sample?id=123&typeId=2343
       **/
      paramsUrl += '?';
      let first = true;
      _.each(params,(v,k)=>{
        if (v != -1) {
          if(first) {
            paramsUrl += k+'='+v;
            first=false;
          } else {
            paramsUrl += '&'+k+'='+v;
          }
        }
      })
    }
    return BaseConfig.baseUrl + paramsUrl
  },
}

export { BaseConfig }
