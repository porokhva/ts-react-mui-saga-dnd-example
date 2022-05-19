import { rest } from 'msw'

import { SPACE_X_API_URL } from '@/services/api/config'
import { LaunchesApiEndpoints } from '@/services/api/launches/launches.service'

export const launchesHandlers = [
  rest.post(`${SPACE_X_API_URL}/${LaunchesApiEndpoints.updateOne}`, (req, res, ctx) => {
    return res(ctx.json({ ok: true }))
  })
]
