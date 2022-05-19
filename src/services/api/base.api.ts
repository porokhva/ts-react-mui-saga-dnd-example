import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

import { SPACE_X_API_URL } from '@/services/api/config'

class BaseApi {
  private readonly baseApiUrl: string = SPACE_X_API_URL

  service = axios.create({
    baseURL: this.baseApiUrl,
    timeout: 60000,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  constructor(config: { baseUrl?: string } = {}) {
    if (config.baseUrl) {
      this.baseApiUrl = config.baseUrl
    }
    this.service.interceptors.request.use(requestInterceptionConfigOverride)
    this.service.interceptors.request.use(
      response => responseInterceptionConfigOverride(response),
      error => {
        return Promise.reject({
          error: error,
          message: error?.message ?? ''
        })
      }
    )
  }

  protected get<P>(suffix: string, config?: AxiosRequestConfig): Promise<AxiosResponse<P>> {
    return this.service.get<P>(`${this.baseApiUrl}/${suffix}`, config)
  }

  protected post<R, P>(suffix: string, payload: R, config: AxiosRequestConfig = {}): Promise<AxiosResponse<P>> {
    return this.service.post<P>(`${this.baseApiUrl}/${suffix}`, payload, config)
  }

  protected put<R, P>(suffix: string, payload: R): Promise<AxiosResponse<P>> {
    return this.service.put<P>(`${this.baseApiUrl}/${suffix}`, payload)
  }

  protected delete<P>(suffix: string): Promise<AxiosResponse<P>> {
    return this.service.delete<P>(`${this.baseApiUrl}/${suffix}`)
  }
}

export default BaseApi

export function isServerError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined
}

const responseInterceptionConfigOverride = async (response: AxiosRequestConfig) => {
  return response
}

function requestInterceptionConfigOverride(config: AxiosRequestConfig) {
  // config.headers["ch-language"] = storageService.getItem(LANG_KEY);
  return {
    ...config
  }
}
