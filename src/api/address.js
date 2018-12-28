import base from './base'

/**
 *  地址服务类
 */
export default class address extends base {
  /**
   * 返回可用地址
   */
  static getList(params) {
    const url = `${this.baseUrl}/md_user_get_addr_list`
    return this.get(url, params).then(data => {
      return data
    })
  }
  /**
   * 获取附近位置
   */
  static getNear(params) {
    const url = `${this.baseUrl}/md_get_tx_map_api`
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
  /**
   * 返回默认的可用地址
   */
  static async defaultAvailable(goodsList) {
    const { available } = await this.available(goodsList)
    if (available == null || available.length < 1) {
      return null
    }
    const address = available.find(item => item.isDefault === 1)
    if (address) {
      return this._processAddress(address)
    } else {
      return this._processAddress(available[0])
    }
  }
  /**
   * 新增地址
   */
  static save(address) {
    const url = `${this.baseUrl}/md_user_set_addr`
    return this.post(url, address)
  }
  /**
   * 更新地址对象
   */
  static update(params) {
    const url = `${this.baseUrl}/md_user_update_addr`
    return this.post(url, params)
  }
  /**
   * 设置默认
   */
  static setDefault(id) {
    const url = `${this.baseUrl}/addresses/${id}/default`
    return this.put(url)
  }
  /**
   * 删除地址对象
   */
  static remove(params) {
    const url = `${this.baseUrl}/md_user_delete_addr`
    return this.post(url, params)
  }
  /**
   * 处理地址数据
   */
  static _processAddress(data) {
    if (data) {
      const { fullAddress, province, city, country } = data
      data.simpleAddress = fullAddress
        .replace(province, '')
        .replace(city, '')
        .replace(country, '')
      data.sexText = ''
      if (data.sex === 1) {
        data.sexText = '先生'
      } else if (data.sex === 2) {
        data.sexText = '女士'
      }
    }
    return data
  }
}
