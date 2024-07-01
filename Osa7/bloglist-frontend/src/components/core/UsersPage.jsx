import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../../requests'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material'

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
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {users && users.map(u =>
              <TableRow key={u.id}>
                <TableCell>
                  <div>
                    <a href={`/users/${u.id}`}>{u.name}</a>
                    <div className='username'>Total blogs: {u.blogs.length}</div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UsersPage