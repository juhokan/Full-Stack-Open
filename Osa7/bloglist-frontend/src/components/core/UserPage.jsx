import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getUser } from '../../requests'

const UserPage = () => {
  const id = useParams().id

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn:() => getUser(id),
    retry: 1
  })

  return (
    <>
      <h2>{user && user.name}</h2>
      <h3>added blogs</h3>
      {user && user.blogs && user.blogs.map(b => (
        <li key={b.id}>{b.title}</li>
      ))}
    </>
  )
}

export default UserPage