import { showNavigationBarLoading, hideNavigationBarLoading, request } from '@tarojs/taro'

const ENV_CONFIG = {
  baseUrl: 'https://www.v2ex.com/api'
}

export interface PlainObject {
  [key: string]: any;
}

interface IOption extends PlainObject {
  noloading?: boolean
}

export interface IRequest {
  get(url: string, data: PlainObject, option?: any)
  post(url: string, data: PlainObject, option?: any)
  put(url: string, data: PlainObject, option?: any)
  delete(url: string, data: PlainObject, option?: any)
}

export type HttpMethods =
  | 'OPTIONS'
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'TRACE'
  | 'CONNECT'

const adapter = (adapter): IRequest => {

  const showLoading = showNavigationBarLoading,
        hideLoading = hideNavigationBarLoading

  const _methods: HttpMethods[] = ['GET', 'POST', 'PUT', 'DELETE']

  const requests: IRequest = _methods.reduce((prev, method) => {

    const http = (url: string, data: PlainObject, option?: IOption) => {
      const _option: IOption = { ...option }
      const isLoading = !(_option && _option.noloading)
      _option && delete _option.noloading

      const config: request.Param = {
        url: `${ENV_CONFIG.baseUrl}${url}`,
        header: {
          'content-type': method === 'POST'
            ? 'application/x-www-form-urlencoded'
            : 'application/json'
        },
        data,
        method,
        ..._option,
      }

      const p = new Promise(async (resolve, reject) => {
        try {
          isLoading && showLoading()
          const { data: res } = await adapter(config)
          handleError(res)
          resolve(res)
          isLoading && hideLoading()
        } catch (e) {
          reject(e)
          isLoading && hideLoading()
        }
      })

      return p
    }

    return {
      ...prev,
      [method.toLowerCase()]: http
    }

  }, {} as IRequest)

  return requests

  function handleError(res) {
    if (res.data) {
      const code  = res.data.code
      if (code >= 400) {
        throw Error('NETWORK ERROR.')
      }
      if (code === 401) {
        throw Error('LOGIN TIMEOUT')
      }
      if (code === 403) {
        throw Error('CONNECT ERROR')
      }
    }
  }
}

export default adapter(request)
