import HomePage from './HomePage'
import LoginPage from './LoginPage'
import SignUpPage from './SignUpPage'
import NewAdForm from './NewAdForm'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdDetails from './AdDetails'
import Chat from './Chat'
import Header from './Header'

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ad/:adId" element={<AdDetails />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/add-form" element={<NewAdForm />} />
        <Route path="/chat/:fromUserName" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
