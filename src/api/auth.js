import base from './base'
import wepy from 'wepy'
import store from '../store/utils'
// import WxUtils from '../utils/WxUtils'

/**
 * 权限服务类
 */
export default class auth extends base {
  /**
   * 获取用户信息
   */
  static async user(param = {
    redirect: false
  }, userInfo, session) {
    // 获取用户信息
    const rawUser = userInfo != null ? userInfo : await wepy.getUserInfo()
    // 检查是否通过
    // await this.checkUserInfo(rawUser);
    // 解密信息
    const {
      body
    } = await this.decodeUserInfo(rawUser, session)
    // 保存登录信息
    await this.setConfig('user', body)
    await this.doLogin()
    store.save('user', body)
    return true
  }

  /**
   * 服务端检查数据完整性
   */
  static async checkUserInfo(rawUser) {
    const url = `${this.baseUrl}/auth/check_userinfo`
    const param = {
      rawData: rawUser.rawData,
      signature: rawUser.signature,
      thirdSession: this.getConfig('third_session'),
    }
    return await this.get(url, param)
  }

  /**
   * 服务端解密用户信息
   */
  static async decodeUserInfo(rawUser, session) {
    const url = `${this.baseUrl}/md_user_login`
    const param = {
      encryptedData: rawUser.encryptedData,
      iv: rawUser.iv,
      rawData: rawUser.rawData,
      signature: rawUser.signature,
      user_rand_num: session,
      // token: this.getConfig('token'),
    }
    return await this.post(url, param)
  }

  /**
   * 执行登录操作
   */
  static async doLogin() {
    const {
      code
    } = await wepy.login()
    const {
      body
    } = await this.authLogin(code)
    // console.log(body)
    await this.setConfig('token', body.token || '')
    await this.setConfig('uid', body.uid || '')
    await this.setConfig('role', body.role || '')
    await this.setConfig('mobile', body.mobile || '')
    await this.setConfig('is_auth', body.is_auth || '') // 是否有unionid
    await this.setConfig('session_key', body.user_rand_num || '') // session key
    // await this.login()
    return body
  }

  /**
   * 获取会话
   */
  static async authLogin(jsCode) {
    const url = `${this.baseUrl}/md_save_user_info`
    return await this.get(url, {
      js_code: jsCode
    })
  }

  /**
   * 获取权限值
   */
  static getConfig(key) {
    return wepy.$instance.globalData.auth[key]
  }

  /**
   * 检查是否存在权限制
   */
  static hasConfig(key) {
    const value = this.getConfig(key)
    return value != null && value != ''
  }

  /**
   * 设置权限值
   */
  static async setConfig(key, value) {
    await wepy.setStorage({
      key: key,
      data: value
    })
    wepy.$instance.globalData.auth[key] = value
  }

  /**
   * 删除权限值
   */
  static async removeConfig(key) {
    console.info(`[auth] clear auth config [${key}]`)
    wepy.$instance.globalData.auth[key] = null
    await wepy.removeStorage({
      key: key
    })
  }
}
