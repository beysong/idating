import {
  getStore
} from 'wepy-redux'
import {
  SAVE
} from './types/cache'

const store = getStore()
// 是否调试
const IS_DEBUG = false

/**
 * 构造取值器
 */
const get = key => {
  return (state) => {
    return state.cache[key]
  }
}

/**
 * 保存数据
 */
const save = (key, data) => {
  if (IS_DEBUG) {
    console.info(`[store] save key=${key}, data=`, data)
  }
  store.dispatch({
    type: SAVE,
    payload: {
      key: key,
      value: data
    }
  })
}

export default {
  get,
  save,
}
