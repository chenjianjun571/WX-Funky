/**
 * Created by chenjianjun on 16/3/29.
 */
const NetApi = {
  //Fetch 请求默认是不带 cookie 的，需要设置 fetch(url, {credentials: 'include'})
  post(url, body, callback) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let init = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
      credentials:"include",
      mode: 'cors',
      cache: 'default'
    };

    fetch(url, init)
      .then(res=>{return res.json()})
      .then(j=>{callback(null, j)})
      .catch(function(err){callback(err.message);})
  },

  get(url, callback) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let init = {
      method: 'GET',
      headers: headers,
      credentials:"include",
      mode: 'cors',
      cache: 'default'
    };

    fetch(url, init)
      .then(res=>{return res.json()})
      .then(j=>{callback(null, j)})
      .catch(function(err){callback(err.message);})
  }
}

export { NetApi }

