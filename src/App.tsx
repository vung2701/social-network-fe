import './App.css'
import { Routes, Route } from 'react-router-dom'
import AppLayout from './layouts/Layout/Layout'
import Home from './pages/Home/Home'

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="feed" element={<div>Feed Page</div>} />
        <Route path="chat" element={<div>Chat Page</div>} />
        <Route path="profile" element={<div>Profile Page</div>} />
      </Route>
    </Routes>
  )
}

export default App
