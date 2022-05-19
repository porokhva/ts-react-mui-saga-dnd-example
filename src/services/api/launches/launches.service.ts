import BaseApi from '@/services/api/base.api'
import { DTOResLaunchesGetList, DTOResLaunchesGetOne } from '@/services/api/launches/dto'

export enum LaunchesApiEndpoints {
  getPastList = 'launches/past',
  getUpcomingList = 'launches/upcoming',
  updateOne = 'launches/',
  getOne = 'launches/:id'
}

class LaunchesService extends BaseApi {
  private endpoints = LaunchesApiEndpoints

  constructor() {
    super()
  }

  getPastList = (config = {}) => {
    return this.get<DTOResLaunchesGetList>(this.endpoints.getPastList, config)
  }
  getUpcomingList = (config = {}) => {
    return this.get<DTOResLaunchesGetList>(this.endpoints.getUpcomingList, config)
  }
  updateOne = (data: { newType: string; id: string }, config = {}) => {
    return this.post<{ newType: string }, { ok: boolean }>(this.endpoints.updateOne, data, config)
  }
  getOne = (id: string, config = {}) => {
    return this.get<DTOResLaunchesGetOne>(this.endpoints.getOne.replace(/:id/i, id), config)
  }
}

const launchesApiService = new LaunchesService()

export { launchesApiService }
