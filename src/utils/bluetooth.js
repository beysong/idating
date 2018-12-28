import wepy from 'wepy'

export default class BlueTooth {
  static writeStringToPrinter(s, did, sid, cid) {
    console.log('0000------3')
    let maxChunk = 20 // Default is 20 bytes per write to characteristic
    let platform =
      wepy.$instance.globalData.sysInfo.model.indexOf('iPhone X') === -1
        ? 'android'
        : 'ios'

    if (platform == 'ios') {
      maxChunk = 20 // 20 bytes per write to characteristic works for iOS
    } else if (platform == 'android') {
      maxChunk = 20 // Adjusting for Android
    }
    let str = s
    if (str.length <= maxChunk) {
      this.writeStrToCharacteristic(str, did, sid, cid)
    } else {
      str = s + '\r\n'
      // Need to partion the string and write one chunk at a time.
      let j = 0
      let subStr = ''
      for (let i = 0; i < str.length; i += maxChunk) {
        if (i + maxChunk <= str.length) {
          subStr = str.substring(i, i + maxChunk)
        } else {
          subStr = str.substring(i, str.length)
        }

        if (platform == 'ios') {
          this.writeStrToCharacteristic(subStr, did, sid, cid) // iOS doesn't need the delay during each write
        } else {
          // Android needs delay during each write.
          setTimeout(
            this.writeStrToCharacteristic,
            250 * j,
            subStr,
            did,
            sid,
            cid
          ) // Adjust the delay if needed
          j++
        }
      }
    }
  }
  static writeStrToCharacteristic(str, did, sid, cid) {
    // Convert str to ArrayBuff and write to printer
    let buffer = new ArrayBuffer(str.length)
    let dataView = new DataView(buffer)
    for (var i = 0; i < str.length; i++) {
      dataView.setUint8(i, str.charAt(i).charCodeAt())
    }

    console.log('1-1:', buffer)
    // Write buffer to printer
    wx.writeBLECharacteristicValue({
      deviceId: did,
      serviceId: sid,
      characteristicId: cid,
      value: buffer,
      success: function(res) {
        console.log('write success:', res)
        console.log('write success buffer:', buffer)
      },
      fail: function(res) {
        console.log('write fail:', res)
      }
    })
  }
}
