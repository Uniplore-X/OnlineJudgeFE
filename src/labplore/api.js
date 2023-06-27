import axios from 'axios'
import utils from '@/utils/utils'

axios.defaults.baseURL = '/api'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.xsrfCookieName = 'csrftoken'

export function wplogin(){
  redirect_wplogin()
}

async function redirect_wplogin(){
  let res = await ajax('labplore/redirect_wplogin', 'get')
  console.log(res)
}

function ajax (url, method, options) {
  if (options !== undefined) {
    var {params = {}, data = {}} = options
  } else {
    params = data = {}
  }
  return new Promise((resolve, reject) => {
    axios({
      url,
      method,
      params,
      data
    }).then(res => {
      // API正常返回(status=20x), 是否错误通过有无error判断
      if (res.data.error !== null) {
        reject(res)
      } else {
        resolve(res)
      }
    }, res => {
      reject(res)
    })
  })
}
