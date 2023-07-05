import axios from 'axios'
import utils from '@/utils/utils'

axios.defaults.baseURL = '/api'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.headers.common['Cache-Control'] = 'no-cache'

export function labploreLogin () {
  redirectWplogin()
}

export function checkLogin (relogin = false) {
  return ajax('labplore/check_login', 'get', {
    params: {
      relogin
    }
  })
}

async function redirectWplogin () {
  let params = {
    return_uri: window.location.href.replace('re_login=true', '')
  }
  let res = await ajax('labplore/redirect_wplogin', 'get', {
    params
  })
  console.log(res)
  window.location.href = res.authorize_uri
}

function ajax (url, method, options) {
  let params = {}
  let data = {}
  let headers = {}
  if (options !== undefined) {
    params = options.params || {}
    data = options.data || {}
    headers = options.headers || {}
  }
  return new Promise((resolve, reject) => {
    axios({
      url,
      method,
      params,
      data,
      headers
    }).then(res => {
      // API正常返回(status=20x), 是否错误通过有无error判断
      if (res.data.error !== null) {
        reject(res.data)
        if (res.data.data.startsWith('Please login')) {
          labploreLogin()
        }
      } else {
        resolve(res.data.data)
      }
    }, res => {
      reject(res)
    })
  })
}
