import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Ads from './Ads'
import { ShopContext } from './ShopContext'

const HomePage = () => {
  const shopContext = useContext(ShopContext)
  return (
    <>
      <Wrapper>
        <Header>
          {shopContext.currentUser ? (
            <Div>{shopContext.currentUser}</Div>
          ) : (
            <Main>
              <Link to="/login">
                <Login>Login</Login>
              </Link>
              <Link to="/signup">
                <Sign>Sign Up</Sign>
              </Link>
            </Main>
          )}
        </Header>
        <Ads></Ads>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: -75px;
`
const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  margin-top: 80px;
`
const Login = styled.div`
  margin-right: 30px;
  width: 120px;
`
const Sign = styled.div`
  width: 120px;
`
const Main = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 400px;
`
const Div = styled.div``

export default HomePage
