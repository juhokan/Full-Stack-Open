import { useEffect } from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { getAnecdotes, updateAnecdote } from './requests';
import { useContext } from "react";
import MessageContext from './context';

const App = () => {
  const queryClient = useQueryClient();
  const [message, messageDispatch] = useContext(MessageContext);

  useEffect(() => {
    console.log(message)
  }, [message]);

  const { mutate } = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
      messageDispatch({
        type: "MESSAGE",
        payload: `anecdote ${response.content} was voted`,
      });
      console.log('ass')
      setTimeout(() => {
        messageDispatch({
          type: "RESET",
        });
      }, 3000);
    },
  });

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  });

  console.log(JSON.parse(JSON.stringify(result)));

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>anecdote service is not available due to problems in the server</div>;
  }

  const anecdotes = result.data;

  const handleVote = (anecdote) => {
    mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification message={message}/>
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
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
    </div>
  );
};

export default App;
