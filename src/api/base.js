import wepy from 'wepy'
import http from '../utils/Http'

export default class base {
  static baseUrl = wepy.$instance.globalData.baseUrl;
  static uploadUrl = wepy.$instance.globalData.uploadUrl;
  static get = http.get.bind(http);
  static put = http.put.bind(http);
  static post = http.post.bind(http);
  static delete = http.delete.bind(http);
  static upload = http.upload.bind(http);
}
