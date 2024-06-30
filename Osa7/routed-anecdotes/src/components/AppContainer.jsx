import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Anecdotes from './Anecdotes'
import About from './About'
import CreateNew from './CreateNew'
import Menu from './Menu'
import Anecdote from './Anecdote'

const AppContainer = () => {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path='/'>
          <Route index element={<Anecdotes />} />
          <Route path=':id' element={<Anecdote />} />
        </Route>
        <Route path='/about' element={<About />} />
        <Route path='/create' element={<CreateNew />} />
      </Routes>
    </Router>
  )
}

export default AppContainer
