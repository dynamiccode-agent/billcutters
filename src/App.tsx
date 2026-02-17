import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Booking from './pages/Booking'
import Expert from './pages/Expert'
import Chatbot from './components/Chatbot'

function AppContent() {
  const location = useLocation()
  const showChatbot = location.pathname !== '/expert'

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/expert" element={<Expert />} />
      </Routes>
      {showChatbot && <Chatbot />}
    </>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
