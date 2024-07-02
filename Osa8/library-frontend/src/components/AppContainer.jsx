import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Authors from './Authors'
import Books from './Books'
import MenuBar from './MenuBar'

const AppContainer = () => {
  return (
    <Router>
      <MenuBar />
      <Routes>
        <Route index element={<Authors />} />
        <Route path='/books' element={<Books />} />
      </Routes>
    </Router>
  )
}

export default AppContainer
