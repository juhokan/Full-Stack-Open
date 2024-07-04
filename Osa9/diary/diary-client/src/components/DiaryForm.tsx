import React, { useState } from 'react'
import { NewDiaryEntry, Visibility, Weather } from '../model'
import diaries from '../services/diaries'


const WeatherForm = () => {
  const [comment, setComment] = React.useState<string>('')
  const [weather, setWeather] = useState<Weather | null>(null)
  const [visibility, setVisibility] = useState<Visibility | null>(null)
  const [date, setDate] = useState<string>('')

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value)
  }

  const handleWeatherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeather(event.target.value as Weather)
  }

  const handleVisibilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVisibility(event.target.value as Visibility)
  }

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (comment && weather && visibility && date ) {
      const newDiary: NewDiaryEntry = {
        comment: comment,
        weather: weather,
        visibility: visibility,
        date: date
      }
      diaries.create(newDiary)
      setComment('')
      setWeather(null)
      setVisibility(null)
      setDate('')
    }
    else {
      const missing: string[] = []
      if (!comment) missing.push('Comment')
      if (!weather) missing.push('Weather')
      if (!visibility) missing.push('Visibility')
      if (!date) missing.push('Date')
      
      window.alert(`Following fields are empty: ${missing.join(', ')}`)
    }
  }

  return (
    <>
      <h1>Add new entry</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Comment:</label>
          <input
            value={comment}
            type='text'
            onChange={handleCommentChange}
          />
        </div>
        <div>
          <label>Select Weather:</label>
          {Object.values(Weather).map((w, i) => (
            <label key={i}>
              <input
                type='radio'
                value={w}
                checked={weather === w}
                onChange={handleWeatherChange}
              />
              {w}
            </label>
          ))}
        </div>
        <div>
          <label>Select Visibility:</label>
          {Object.values(Visibility).map((v, i) => (
            <label key={i}>
              <input
                type='radio'
                value={v}
                checked={visibility === v}
                onChange={handleVisibilityChange}
              />
              {v}
            </label>
          ))}
        </div>
        <div>
          <label>Select Date:</label>
          <input
            type='date'
            value={date}
            onChange={handleDateChange}
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </>
  )
}

export default WeatherForm
