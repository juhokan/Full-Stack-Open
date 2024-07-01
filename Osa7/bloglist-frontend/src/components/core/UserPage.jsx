import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getUser } from '../../requests'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material'

const UserPage = () => {
  const id = useParams().id

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn:() => getUser(id),
    retry: 1
  })

  return (
    <>
      {user &&
      <>
        <h3 className='display-name'>{user.name}</h3>
        <div className='username'>@{user.username}</div>
        <div className='username'>Total blogs: {user.blogs.length}</div>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {user && user.blogs && user.blogs.map(b =>
                <TableRow key={b.id}>
                  <TableCell>
                    <div>
                      <a href={`/${b.id}`}>{b.title}</a>
                      {b.author}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </>}
    </>
  )
}

export default UserPage