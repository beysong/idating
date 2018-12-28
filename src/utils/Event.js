const WxNotificationCenter = require('./WxNotificationCenter.js')

export default class Event {
  // 首页数据
  static HOME_MAIN = 'HOME_MAIN';
  static KEYS_LIST = 'KEYS_LIST';
  static DOORS_LIST = 'DOORS_LIST';
  static ADDRESS_LIST = 'ADDRESS_LIST';
  static SELECTED_KEYS = 'SELECTED_KEYS';
  static SELECTED_ROOM = 'SELECTED_ROOM';
  static UPDATA_MEETING_DETAIL = 'UPDATA_MEETING_DETAIL';
  static UPDATE_INVITE_LIST = 'UPDATE_INVITE_LIST';
  static UPDATE_INVITE_DETAIL = 'UPDATE_INVITE_DETAIL';
  static SELECTED_ADDRESS = 'SELECTED_ADDRESS';

  static listen(eventName, callback, observer) {
    // 先移除监听
    this.remove(eventName, observer)
    WxNotificationCenter.addNotification(eventName, callback, observer)
  }

  static emit(eventName, params) {
    WxNotificationCenter.postNotificationName(eventName, params)
  }

  static remove(eventName, observer) {
    WxNotificationCenter.removeNotification(eventName, observer)
  }
}
