import HomePage from './HomePage'
import LoginPage from './LoginPage'
import SignUpPage from './SignUpPage'
import NewAdForm from './NewAdForm'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdDetails from './AdDetails'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ad/:adId" element={<AdDetails />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/add-form" element={<NewAdForm />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
