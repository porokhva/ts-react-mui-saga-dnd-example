import './styles.css'

import React, { FC, Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { NOTIFICATION_ERROR, NOTIFICATION_SUCCESS } from '@/store/helpers'
import { removeNotification, selectorNotifications } from '@/store/ui'

import { Portal } from '../Portal'

interface INotification {
  id?: string
  type: string
  title: string
  message: string
}

const Notification: React.FC<INotification> = props => {
  const { id, type, title, message } = props

  const dispatch = useDispatch()
  const [isShow, setIsShow] = useState(false)
  const [showTime, setShowTime] = useState(0)
  const [intervalID, setIntervalID] = useState(null)

  const handleStartTimer = () => {
    const id = setInterval(() => {
      setShowTime(prev => {
        if (prev < 100) {
          return prev + 0.5
        }

        clearInterval(id)
        return prev
      })
    }, 20)

    setIntervalID(id)
  }

  const handlePauseTimer = () => {
    clearInterval(intervalID)
  }

  const handleCloseNotification = () => {
    handlePauseTimer()
    setIsShow(true)
    setTimeout(() => {
      dispatch(
        removeNotification({
          id
        })
      )
    }, 400)
  }

  useEffect(() => {
    if (showTime === 100) {
      handleCloseNotification()
    }
  }, [showTime])

  useEffect(() => {
    handleStartTimer()
    return () => {
      clearInterval(intervalID)
    }
  }, [])

  return (
    <div
      onMouseEnter={handlePauseTimer}
      onMouseLeave={handleStartTimer}
      className={`notification-item text-white
      ${type === NOTIFICATION_SUCCESS && 'success'}
      ${type === NOTIFICATION_ERROR && 'error'}
      ${isShow ? 'exit' : ''}
      `}
    >
      {title && <h4>{title}</h4>}
      <p>{message}</p>
    </div>
  )
}

const NotificationProvider: FC = ({ children }) => {
  const state = useSelector(selectorNotifications)
  useEffect(() => {})
  return (
    <Fragment>
      <Portal selector={'#notifications'}>
        <div className={'notification-wrapper'}>
          {state?.map(note => {
            return <Notification key={note.id} {...note} />
          })}
        </div>
      </Portal>
      {children}
    </Fragment>
  )
}

export { NotificationProvider }
