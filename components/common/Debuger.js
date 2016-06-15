/**
 * Created by chenjianjun on 16/6/15.
 */
const DebugPost = (body, callback)=>{
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

  fetch('/debuger', init)
    .then(res=>{return res.json()})
    .then(j=>{callback(null, j)})
    .catch(function(err){callback(err.message);})
}

export { DebugPost }