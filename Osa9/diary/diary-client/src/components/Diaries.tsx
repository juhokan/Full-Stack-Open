import React, { useState, useEffect } from 'react'
import { NonSensitiveDiaryEntry } from '../model'
import diaries from '../services/diaries'
import Diary from './Diary'

const Diaries: React.FC = () => {
  const [diaryEntries, setDiaryEntries] = useState<NonSensitiveDiaryEntry[] | null>(null)

  const getData = async () => {
    try {
      const d = await diaries.getAll()
      setDiaryEntries(d)
    } catch (error) {
      console.error('Error fetching data', error)
    }
  }

  useEffect(() => {
    getData()
  }, [])
  return (
    <div>
      <h1>Diary entries</h1>
      {diaryEntries && diaryEntries.map(d => (
        <Diary key={d.id} diary={d}/>
      ))}
    </div>
  )
}

export default Diaries