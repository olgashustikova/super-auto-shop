import HomePage from './HomePage'
import LoginPage from './LoginPage'
import SignUpPage from './SignUpPage'
import NewAdForm from './NewAdForm'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdDetails from './AdDetails'
import Chat from './Chat'
import Header from './Header'
import ErrorPage from './ErrorPage'
import styled from 'styled-components'

function App() {
  return (
    <BrowserRouter>
      <Main>
        <Header></Header>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ad/:adId" element={<AdDetails />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/add-form" element={<NewAdForm />} />
          <Route path="/chat/:fromUserName" element={<Chat />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </Main>
    </BrowserRouter>
  )
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`
export default App
