import { nanoid } from 'nanoid'

import { pushNotification } from '@/store/ui'

export const NOTIFICATION_ERROR = 'ERROR'
export const NOTIFICATION_SUCCESS = 'SUCCESS'

const pushNotificationError = (args: any) => {
  return pushNotification({
    id: nanoid(20),
    type: NOTIFICATION_ERROR,
    ...args
  })
}

const pushNotificationSuccess = (args: any) => {
  return pushNotification({
    id: nanoid(20),
    type: NOTIFICATION_SUCCESS,
    ...args
  })
}

export { pushNotificationError, pushNotificationSuccess }
