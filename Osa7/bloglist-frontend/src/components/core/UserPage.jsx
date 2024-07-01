import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getUser } from '../../requests'
import axios from 'axios'

const URL = 'http://localhost:3003/api/users'

const UserPage = () => {
  const id = useParams().id
  const [user, setUser] = React.useState(null)

  useEffect(() => {
    const getUser = async () => {
      const u = await axios.get(`${URL}/${id}`)
      if (u) {
        setUser(u.data)
      }
    }
    getUser()
  }, [])

  return (
    <div>
      {user && user.name}
    </div>
  )
}

export default UserPage