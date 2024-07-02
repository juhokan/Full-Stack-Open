import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Authors from './Authors'
import Books from './Books'
import MenuBar from './MenuBar'
import NewBook from './NewBook'
import Login from './Login'
import Recommendations from './Recommendations'

const AppContainer = () => {
  return (
    <Router>
      <MenuBar />
      <Routes>
        <Route index element={<Authors />} />
        <Route path='/books' element={<Books />} />
        <Route path='/add' element={<NewBook />} />
        <Route path='/login' element={<Login />} />
        <Route path='/recommendations' element={<Recommendations />} />
      </Routes>
    </Router>
  )
}

export default AppContainer
