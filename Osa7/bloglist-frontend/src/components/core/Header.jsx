import React, { useEffect } from 'react'
import Notification from '../notifications/Notification'
import { UserContext } from '../../context'

const Header = () => {
  const { user } = React.useContext(UserContext)

  return (
    <>
      {user &&
        <div>
          <h2>Blogs</h2>
          <Notification />
        </div>}
    </>
  )
}

export default Header
