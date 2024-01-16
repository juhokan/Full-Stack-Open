import { useState } from 'react'


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const headerFeedback = 'give feedback'
  const headerStatistics = 'statistics'
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
    console.log('pressed good')
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    console.log('pressed neutral')
  }

  const handleBad = () => {
    setBad(bad + 1)
    console.log('pressed bad')
  }

  return (
    <div>
      <h1>{headerFeedback}</h1>
      <Button handleClick={handleGood} text={'good'}/>
      <Button handleClick={handleNeutral} text={'neutral'}/>
      <Button handleClick={handleBad} text={'bad'}/>
      <h1>{headerStatistics}</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}

export default App