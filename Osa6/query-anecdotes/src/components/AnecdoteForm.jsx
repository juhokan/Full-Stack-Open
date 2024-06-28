import { useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnecdote } from '../requests';
import MessageContext from '../context';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const [message, messageDispatch] = useContext(MessageContext);

  const { mutate } = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
      messageDispatch({
        type: "MESSAGE",
        payload: 'new anecdote added',
      });
      setTimeout(() => {
        messageDispatch({
          type: "RESET",
        });
      }, 3000);
    },
    onError: () => {
      messageDispatch({
        type: "MESSAGE",
        payload: 'error adding anecdote',
      });
      setTimeout(() => {
        messageDispatch({
          type: "RESET",
        });
      }, 3000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value.trim();
    if (content) {
      const newAnecdote = { content, votes: 0 };
      event.target.anecdote.value = '';
      mutate(newAnecdote);
    }
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
