import wepy from 'wepy'
import Tips from '../utils/Tips'

// HTTP工具类
export default class http {
  static async request(method, url, data, loading) {
    if (wepy.$instance.globalData.auth['token']) {
      if (data) {
        data.token = wepy.$instance.globalData.auth['token']
      } else {
        data = {
          token: wepy.$instance.globalData.auth['token']
        }
      }
    }
    const param = {
      url: url,
      method: method,
      data: data
    }
    if (loading) {
      Tips.loading()
    }
    console.info(`[http]request url=${url}`)
    try {
      const res = await wepy.request(param)
      Tips.loaded()
      if (this.isSuccess(res)) {
        if (res.statusCode === 401) {
          if (
            /* eslint no-undef: 0 */
            getCurrentPages()
              .slice(-1)
              .pop().route !== 'pages/login'
          ) {
            wepy.navigateTo({
              url: '/pages/login'
            })
          }
        } else if (res.statusCode !== 200) {
          if (res.data.msg) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
          }
        }
        return res.data
      } else {
        Tips.toast('网络错误')
      }
    } catch (e) {
      console.log('e', e)
      Tips.loaded()
      if (e.errMsg) {
        wx.showToast({
          title: e.errMsg,
          icon: 'none',
          duration: 2000
        })
      }
    }
  }
  static async wxUpload(url, params = {}, loading) {
    if (loading) {
      Tips.loading()
    }
    if (params.file_path === undefined) {
      console.log('无效的文件')
      Tips.loaded()
      return false
    }
    const uploadResult = await wepy.uploadFile({
      url: url,
      filePath: params.file_path,
      formData: params.query,
      name: 'file'
    })
    Tips.loaded()
    return uploadResult
  }
  /**
   * 判断请求是否成功
   */
  static isSuccess(res) {
    const wxCode = res.statusCode
    console.log('res http', res)
    // 微信请求错误
    if (wxCode !== 200 && wxCode !== 401) {
      return false
    }
    const wxData = res.data
    return !!wxData
  }

  /**
   * 异常
   */
  static requestException(res) {
    const error = {}
    error.statusCode = res.statusCode
    const serverData = res.data
    if (serverData) {
      error.serverCode = serverData.status
      error.msg = serverData.msg
      error.serverData = serverData
    }
    return error
  }

  static get(url, data, loading = true) {
    return this.request('GET', url, data, loading)
  }

  static put(url, data, loading = true) {
    return this.request('PUT', url, data, loading)
  }

  static post(url, data, loading = true) {
    return this.request('POST', url, data, loading)
  }

  static patch(url, data, loading = true) {
    return this.request('PATCH', url, data, loading)
  }

  static delete(url, data, loading = true) {
    return this.request('DELETE', url, data, loading)
  }
  static upload(url, data, loading = true) {
    return this.wxUpload(url, data, loading)
  }
}
