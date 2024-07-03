import React from 'react'

interface HeaderProps {
  readonly name: string
}

const Header: React.FC<HeaderProps> = ({ name }) => {
  return (
    <h1>{name}</h1>
  )
}

export default Header
