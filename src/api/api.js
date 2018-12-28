import base from './base'

export default class api extends base {
  /**
   * 返回可用地址
   */
  static getList(params) {
    const url = `${this.baseUrl}/beysong/weixin/test`
    return this.post(url, params).then(data => {
      return data
    })
  }
  /**
   * 新增地址
   */
  static save(address) {
    const url = `${
      this.baseUrl
    }/api/login?email=beysong@dev.com&password=sdfsdf`
    return this.post(url, {
      ...address,
      email: 'beysong@dev.com',
      password: 'sdfsdf'
    })
  }
  /**
   * 更新地址对象
   */
  static update(params) {
    const url = `${this.baseUrl}/api/signup`
    return this.post(url, params)
  }
  /**
   * 删除地址对象
   */
  static remove(params) {
    const url = `${this.baseUrl}/md_user_delete_addr`
    return this.post(url, params)
  }
}
