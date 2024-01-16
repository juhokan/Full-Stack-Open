import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({name, value}) => {
  if (name === 'positive') {
    return (
      <div>
        <p>{name} {value} %</p>
      </div>
    )
  }
  else {
    return (
      <div>
        <p>{name} {value}</p>
      </div>
    )
  }
}

const Statistics = ({good, neutral, bad, total, average}) => {
  if (total > 0) {
    return (
      <div>
            <StatisticLine name={'good'} value={good}/>
            <StatisticLine name={'neutral'} value={neutral}/>
            <StatisticLine name={'bad'} value={bad}/>
            <StatisticLine name={'all'} value={total}/>
            <StatisticLine name={'average'} value={average/total}/>
            <StatisticLine name={'positive'} value={good/total}/>
      </div>
    )
  }
  else {
    return (
      <p>No feedback given</p>
    )
  }
}


const App = () => {
  // tallenna napit omaan tilaansa
  const headerFeedback = 'give feedback'
  const headerStatistics = 'statistics'
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [average, setAverage] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
    console.log('pressed good')
    setAverage(average + 1)
    setTotal(total + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    console.log('pressed neutral')
    setTotal(total + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
    console.log('pressed bad')
    setAverage(average - 1)
    setTotal(total + 1)
  }

  return (
    <div>
      <h1>{headerFeedback}</h1>
      <Button handleClick={handleGood} text={'good'}/>
      <Button handleClick={handleNeutral} text={'neutral'}/>
      <Button handleClick={handleBad} text={'bad'}/>
      <h1>{headerStatistics}</h1>
      <Statistics good={good} neutral={neutral} bad={bad} average={average} total={total}/>
    </div>
  )
}

export default App
