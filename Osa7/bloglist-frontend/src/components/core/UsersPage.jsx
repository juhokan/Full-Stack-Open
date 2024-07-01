import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../../requests'

const UsersPage = () => {
  const { data: users, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    retry: 1
  })

  if (isLoading) {
    return <div>loading data...</div>
  }

  if (isError) {
    return <div>blog service is not available due to problems in the server</div>
  }

  return (
    <div>
      {users && users.map(u => (
        <div key={u.id}>
          <a href={`/users/${u.id}`}>{u.name}</a>
          <div> has {u.blogs.length} blogs</div>
        </div>
      ))}
    </div>
  )
}

export default UsersPage