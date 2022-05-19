import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { closeCurrentModal, selectorCurrentModalId } from '@/store/ui'
import { MODAL_IDS } from '@/store/ui/types'

interface IModalConfirm {
  onAction: () => void
  onClose?: () => void
  title: string
  actionText: string
  modalId: MODAL_IDS
}

export const ModalConfirm: React.FC<IModalConfirm> = props => {
  const { modalId, onAction, children, onClose, actionText = 'Ok', title, ...other } = props

  const currentModalId = useSelector(selectorCurrentModalId)
  const dispatch = useDispatch()
  const closeModal = () => dispatch(closeCurrentModal())

  const handleCancel = () => {
    closeModal()
    onClose && onClose()
  }

  const handleOk = () => {
    onAction()

    closeModal()
  }

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth='xs'
      open={modalId === currentModalId}
      {...other}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleOk}>{actionText}</Button>
      </DialogActions>
    </Dialog>
  )
}
