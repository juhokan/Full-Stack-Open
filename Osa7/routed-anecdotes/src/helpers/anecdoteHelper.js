export const anecdoteById = (id, anecdotes) => {
  return anecdotes.find(a => String(a.id) === id);
}
  