import { ShopContext } from './ShopContext'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useContext } from 'react'

// Header line of the website
const Header = () => {
  const shopContext = useContext(ShopContext)

  const signOut = () => {
    shopContext.setCurrentUser(null)
  }

  return (
    <>
      <Wrapper>
        <Link to="/">
          <ButtonHome>Home</ButtonHome>
        </Link>
        {shopContext.currentUser ? (
          <>
            <User>
              <Link
                to="/add-form"
                style={{ textDecoration: 'none', color: '#585858' }}
              >
                <Button>Add new ad</Button>
              </Link>
              <Link
                to="/chat"
                style={{ textDecoration: 'none', color: '#585858' }}
              >
                <Button>My messages</Button>
              </Link>
              <Button onClick={signOut}>Sign Out</Button>
            </User>
            <UserName>{shopContext.currentUser}</UserName>
          </>
        ) : (
          <Main>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button>Login</Button>
            </Link>
            <Link to="/signup" style={{ textDecoration: 'none' }}>
              <Button>Sign Up</Button>
            </Link>
          </Main>
        )}
        <Title>Super auto-shop</Title>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: row;
  height: 6vh;
  margin-top: 20px;
`
const Main = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  width: 100%;
  background-color: white;
  font-size: 25px;
  font-weight: bold;
`
const User = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
`
const UserName = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  margin-left: 200px;
  height: 70px;
  width: 55%;
  margin-top: 17px;
  color: #585858;
  font-weight: bold;
  margin-right: 20px;
  font-size: 23px;
`
const Button = styled.button`
  cursor: pointer;
  border: none;
  margin-left: 10px;
  height: 45px;
  width: 150px;
  line-height: 15px;
  border-radius: 7px;
  font-weight: bold;
  font-size: 16px;
  background: #fff;
  color: #585858;
  box-shadow: 0 4px 14px 0 rgb(0 0 0 / 10%);
  transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
  :hover {
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 6px 20px rgb(93 93 93 / 23%);
  }
`
const ButtonHome = styled.button`
  outline: 0;
  cursor: pointer;
  border: none;
  padding: 0 56px;
  height: 45px;
  line-height: 45px;
  border-radius: 7px;
  font-size: 16px;
  font-weight: bold;
  margin-left: 40px;
  background: #fff;
  color: #585858;
  box-shadow: 0 4px 14px 0 rgb(0 0 0 / 10%);
  transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
  :hover {
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 6px 20px rgb(93 93 93 / 23%);
  }
`
const Title = styled.div`
  color: #747471;
  font-family: 'Open Sans Condensed', sans-serif;
  font-size: 60px;
  font-weight: 700;
  text-align: left;
  width: 100%;
  text-transform: uppercase;
`
export default Header
