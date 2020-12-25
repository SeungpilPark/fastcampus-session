import axios from 'axios'

const headers = { 'X-Requested-With': 'XMLHttpRequest' }

axios.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  })

axios.interceptors.response.use(
  function (response) {
    const contentDisposition = response.headers && response.headers['content-disposition']
    if (contentDisposition) {
      const [matchedAttachedFile] = contentDisposition.split(';').filter(str => str.includes('filename'))
      if (matchedAttachedFile) {
        const [, filename] = matchedAttachedFile.split('=')

        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          const file = new Blob([response.data])
          window.navigator.msSaveOrOpenBlob(file, decodeURIComponent(filename))
        } else {
          const fileLink = document.createElement('a')
          fileLink.href = window.URL.createObjectURL(new Blob([response.data]))
          fileLink.setAttribute('download', decodeURIComponent(filename))
          document.body.appendChild(fileLink)
          fileLink.click()
          document.body.removeChild(fileLink)
        }
      }
    } else if (response.request.responseType === 'blob') {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
          response.data = JSON.parse(reader.result)
          resolve(
            // eslint-disable-next-line prefer-promise-reject-errors
            Promise.reject({
              exception: {
                code: response.data.code,
                message: response.data.message,
                messageCode: response.data.messageCode
              }
            }))
        }
        reader.onerror = (readerError) => {
          reject(readerError)
        }
        reader.readAsText(response.data)
      })
    }
    return response
  },
  function (error) {
    return Promise.reject(error)
  })

const promise = (method, uri, data = null, options = null) => {
  const config = {
    method: method,
    url: uri,
    ...options,
    headers: {
      ...headers,
      ...(options && options.headers)
    }
  }

  if (method.toUpperCase() === 'GET') {
    let index = 0
    for (const key in data) {
      const encodedParam = encodeURIComponent(data[key])
      if (index === 0) {
        config.url = config.url + '?' + key + '=' + encodedParam
      } else {
        config.url = config.url + '&' + key + '=' + encodedParam
      }
      index++
    }
    config.params = {}
  } else {
    config.data = data
  }
  return axios(config).then(response => {
    return Promise.resolve(response.data)
  }).catch(error => {
    return Promise.reject(error)
  })
}

export default {
  promise,
}
