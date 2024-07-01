import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getUser } from '../../requests'
import axios from 'axios'

const URL = 'http://localhost:3003/api/users'

const UserPage = () => {
  const id = useParams().id

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn:() => getUser(id),
    retry: 1
  })

  return (
    <div>
      {user && user.name}
    </div>
  )
}

export default UserPage