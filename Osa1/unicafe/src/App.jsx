import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({good, neutral, bad, total, average}) => {
  if (total > 0) {
    return (
      <div>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {total}</p>
        <p>average {average / total}</p>
        <p>positive {(good / total) * 100}%</p>
      </div>
    );
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
