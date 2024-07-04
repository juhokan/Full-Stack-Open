import React from 'react'
import Diaries from './components/Diaries'
import DiaryForm from './components/DiaryForm'

const App: React.FC = () => {

  return (
    <>
      <DiaryForm />
      <Diaries />
    </>
  )
}

export default App
