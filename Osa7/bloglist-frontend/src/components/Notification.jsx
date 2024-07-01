import React, { useContext } from 'react'
import { NotificationContext } from '../context'

const Notification = () => {
  const { message, type } = useContext(NotificationContext)

  if (message === null) {
    return null
  }

  return <div className={type}>{message}</div>
}

export default Notification