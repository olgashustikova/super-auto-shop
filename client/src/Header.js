import { ShopContext } from './ShopContext'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useContext } from 'react'

const Header = () => {
  const shopContext = useContext(ShopContext)

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
            </User>

            <UserName>{shopContext.currentUser}</UserName>
          </>
        ) : (
          <Main>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Login>Login</Login>
            </Link>
            <Link to="/signup" style={{ textDecoration: 'none' }}>
              <Sign>Sign Up</Sign>
            </Link>
          </Main>
        )}
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 6vh;
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
const Login = styled.div`
  width: 120px;
  color: dimgrey;
`
const Sign = styled.div`
  width: 120px;
  color: dimgrey;
  text-align: center;
  margin-right: 70px;
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
  color: '#585858';
`
const Button = styled.button`
  outline: 0;
  cursor: pointer;
  border: none;
  padding: 0 40px;
  margin-left: 10px;
  height: 45px;
  line-height: 45px;
  border-radius: 7px;
  font-weight: 400;
  font-size: 16px;
  background: #fff;
  color: #696969;
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
  margin-left: 40px;
  background: #fff;
  color: #696969;
  box-shadow: 0 4px 14px 0 rgb(0 0 0 / 10%);
  transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
  :hover {
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 6px 20px rgb(93 93 93 / 23%);
  }
`
export default Header
