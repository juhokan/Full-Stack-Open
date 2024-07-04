import React from 'react'
import { NonSensitiveDiaryEntry } from '../model'

interface DiaryProps {
  readonly diary: NonSensitiveDiaryEntry
}

const Diary: React.FC<DiaryProps> = ({ diary }) => {
  return (
    <div>
      <h2>{diary.date}</h2>
      <p>visibility: {diary.visibility}</p>
      <p>weather: {diary.weather}</p>
    </div>
  )
}

export default Diary