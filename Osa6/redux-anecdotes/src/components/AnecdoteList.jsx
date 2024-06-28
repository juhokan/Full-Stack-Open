import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setMessage, emptyMessage } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const filteredAnecdotes = anecdotes.filter(anecdote =>
    filter === '' || anecdote.content.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedAnecdotes = filteredAnecdotes.slice().sort((a, b) => b.votes - a.votes);

  const handleVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote));
    dispatch(setMessage(`you voted ${anecdote.content}`));
    setTimeout(() => {
      dispatch(emptyMessage());
    }, 5000);
  };

  return (
    <>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  );
};

export default AnecdoteList;
