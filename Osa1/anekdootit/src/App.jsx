import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const NewAnecdote = ({anecdote}) => {
  return (
    <div>
      <p>{anecdote}</p>
    </div>
  )
}

function mostVoted(points) {
  let mostVotedIndex = 0;
  let largestNum = points[0]

  for (let i = 1; i < points.length; i++) {
      if (points[i] > largestNum) {
          mostVotedIndex = i;
          largestNum = points[i]
      }
  }
  return mostVotedIndex;
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  const selectIndex = () => {
    const min = Math.ceil(0);
    const max = Math.floor(anecdotes.length - 1);
    const newIndex = Math.floor(Math.random() * (max - min + 1)) + min
    setSelected(newIndex)
  }

  const handleVote = ({index}) => {
    const newPoints = [...points];
    newPoints[selected] += 1;
    setPoints(newPoints);
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <NewAnecdote anecdote={anecdotes[selected]}/>
      <p>has {points[selected]} votes</p>
      <Button handleClick={handleVote} text={'vote'}/>
      <Button handleClick={selectIndex} text='next anecdote'/>
      <h1>Anecdote with most votes</h1>
      <NewAnecdote anecdote={anecdotes[mostVoted(points)]}/>
    </div>
  )
}

export default App