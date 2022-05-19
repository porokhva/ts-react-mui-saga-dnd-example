import { ModalConfirm } from '@component/modals/modal-confirm'
import { useCallback } from 'react'

import { useAppDispatch } from '@/store'
import { launchesActions } from '@/store/launches'
import { MODAL_IDS } from '@/store/ui/types'

export const ModalConfirmMoveLaunch = () => {
  const dispatch = useAppDispatch()
  const onAction = useCallback(() => {
    dispatch(launchesActions.onConfirmChangeLaunchType({ confirmed: true }))
  }, [])

  const onClose = useCallback(() => {
    dispatch(launchesActions.onConfirmChangeLaunchType({ confirmed: false }))
  }, [])
  return (
    <ModalConfirm
      title={'Do you want to cancel your reservation?'}
      actionText={'Confirm'}
      modalId={MODAL_IDS.ASK_SHOULD_MOVE_LAUNCH_FROM_MY}
      onAction={onAction}
      onClose={onClose}
    />
  )
}
