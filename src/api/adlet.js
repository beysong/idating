import base from './base'

/**
 *  地址服务类
 */
export default class adlet extends base {
  /**
   * 返回可用地址
   */
  static getList(params) {
    const url = `${this.baseUrl}/beysong/weixin/adlet`
    return this.get(url, params).then(data => {
      return data
    })
  }
  /**
   * 返回可用地址
   */
  static getDetail(params) {
    const url = `${this.baseUrl}/md_user_get_addr_detail`
    return this.get(url, params).then(data => {
      return data
    })
  }
}
