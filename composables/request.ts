import type { UseFetchOptions } from 'nuxt/app'
const toast = useToast()

type Methods = 'GET' | 'POST' | 'DELETE' | 'PUT';

interface RequestOptions<T = any> extends UseFetchOptions<CommonRes<T>> {
  // 是否显示loading
  loading?: boolean;
  // loading提示文案
  loadingText?: string;
  // 是否忽略全局错误提示
  ignoreErrMsg?: boolean;
  // 后端业务成功的code
  resolveCode?: string | number;
  // 请求成功是否立即关闭loading
  hideLoadingNow?: boolean;
}

class UseFetchData {
  // 状态码非200的错误提示
  requestErrorTip: Record<string, string> = {
    400: '参数错误',
    401: '没有访问权限',
    403: '服务器拒绝访问',
    404: '请求地址错误',
    500: '服务器故障'
  }

  // 状态码200但是业务处理失败的错误提示
  getErrorTip (response: any) {
    return (
      response._data?.data?.msg ||
      response._data?.data?.message ||
      response._data?.data?.error ||
      response._data?.data?.errorMessage ||
      response._data?.msg ||
      response._data?.message ||
      response._data?.error ||
      response._data?.errorMessage ||
      'error'
    )
  }

  request<T = any> (url: string, method: Methods, opts?: RequestOptions<T>) {
    const {
      ...restOpts
    } = opts || {}
    const config = useRuntimeConfig()
    return useFetch(url, {
      baseURL: `${config.public.baseURL || ''}`,
      method,
      ...restOpts,
      // 拦截器
      onRequest: () => {},
      onResponse: () => {},
      onRequestError: ({ error }) => {
        if (error.message !== 'The user aborted a request.') {
          toast.add({ title: error.message })
        }
      },
      onResponseError: ({ response }) => {
        toast.add({ title: this.requestErrorTip[`${response.status}`] })
      }
    })
  }

  get<T> (url: string, query?: Record<string, any>, opts?: RequestOptions) {
    return this.request<T>(url, 'GET', { ...opts, query })
  }

  post<T> (url: string, body?: Record<string, any>, opts?: RequestOptions) {
    return this.request<T>(url, 'POST', { ...opts, body })
  }

  put<T> (url: string, body?: Record<string, any>, opts?: RequestOptions) {
    return this.request<T>(url, 'PUT', { ...opts, body })
  }

  delete<T> (url: string, query?: Record<string, any>, opts?: RequestOptions) {
    return this.request<T>(url, 'DELETE', { ...opts, query })
  }
}

export const useFetchData = new UseFetchData()
