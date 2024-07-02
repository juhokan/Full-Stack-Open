import React, { useContext, useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'
import { TokenContext } from '../context'

const CURRENT_USER = gql`
  query {
    me {
      favoriteGenre
    }
  }
`

const Recommendations = () => {
  const { token } = useContext(TokenContext)

  const { data: userData, loading, error } = useQuery(CURRENT_USER, {
    context: {
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    },
    pollInterval: 100
  })

  console.log(userData)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <h2>Recommendations</h2>
      <p>Favorite Genre: {userData.me.favoriteGenre}</p>
    </div>
  )
}

export default Recommendations
