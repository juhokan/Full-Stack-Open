import React from 'react'

interface TotalProps {
  readonly total: number
}

const Total: React.FC<TotalProps> = ({ total }) => {
  return (
    <p>Number of exercises {total}</p>
  )
}

export default Total