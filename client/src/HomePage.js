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
        {' '}
        {shopContext.currentUser ? (
          <>
            <User>
              <Div>{shopContext.currentUser}</Div>
              <AdForm>
                <Link
                  to="/add-form"
                  style={{ textDecoration: 'none', color: '#585858' }}
                >
                  Add new ad
                </Link>
              </AdForm>
            </User>
          </>
        ) : (
          <Header>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Login>Login</Login>
            </Link>
            <Link to="/signup" style={{ textDecoration: 'none' }}>
              <Sign>Sign Up</Sign>
            </Link>
          </Header>
        )}
        <Ads></Ads>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 1300px;
`
const Header = styled.div`
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: right;
  width: 100%;
  background-color: white;
  font-size: 25px;
  font-weight: bold;
`
const Login = styled.div`
  margin-right: 20px;
  width: 120px;
  color: dimgrey;
  margin-top: 50px;
`
const Sign = styled.div`
  width: 120px;
  color: dimgrey;
  margin-top: 50px;
  text-align: center;
  margin-right: 70px;
`
const User = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
`
const Div = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  margin-right: 40px;
  height: 70px;
  margin-top: 50px;
  color: '#585858';
`
const AdForm = styled.button`
  margin-right: 240px;
  display: inline-block;
  outline: 0;
  cursor: pointer;
  border: none;
  padding: 0 56px;
  height: 45px;
  line-height: 45px;
  border-radius: 7px;
  font-weight: 400;
  font-size: 16px;
  margin-top: 40px;
  background: #fff;
  color: #696969;
  box-shadow: 0 4px 14px 0 rgb(0 0 0 / 10%);
  transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
  :hover {
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 6px 20px rgb(93 93 93 / 23%);
  }
`

export default HomePage
