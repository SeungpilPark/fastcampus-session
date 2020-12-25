import api from './http'

const getSession = (data = null) => {
  return api.promise('GET', '/api/session', data)
}

const getCart = (data = null) => {
  return api.promise('GET', '/api/cart', data)
}

const addCart = (data = null) => {
  return api.promise('POST', '/api/cart', data)
}

export default {
  getSession,
  getCart,
  addCart
}
