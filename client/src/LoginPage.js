import React, { useContext } from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import { Buffer } from 'buffer'
import { ShopContext } from './ShopContext'
import { useNavigate } from 'react-router-dom'

// On login page we add username and password to the header
// (in the format of basic auth) and send request to the server
// If the request is success we save current user password and user to the context
// in order to keep user for a while
const LoginPage = () => {
  const shopContext = useContext(ShopContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [errors, setErrors] = useState({})

  const emailChangeHandler = (event) => {
    setEmail(event.target.value)
  }
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value)
  }
  const submitHandler = async (event) => {
    event.preventDefault()
    const errorsObject = {}
    if (email === '') {
      errorsObject.email = 'Email is required'
    }
    if (password === '') {
      errorsObject.password = 'Password is required'
    }
    setErrors(errorsObject)
    if (Object.keys(errorsObject).length > 0) {
      return
    }
    const encodedCredentials = Buffer.from(`${email}:${password}`).toString(
      'base64'
    )
    try {
      const response = await fetch('/api/login-user', {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
        },
        method: 'GET',
      })
      const data = await response.json()
      if (data.status == 200) {
        shopContext.setCurrentUser(email)
        shopContext.setCurrentPassword(password)
        navigate('/')
      } else {
        shopContext.setError(data.error)
        navigate('/error')
      }
    } catch (error) {
      shopContext.setError(error.message)
      navigate('/error')
    }
  }
  return (
    <>
      <Wrapper onSubmit={submitHandler}>
        <Label>Email</Label>
        <Email onChange={emailChangeHandler}></Email>
        {errors.email && <Error className="error">{errors.email}</Error>}
        <Label>Password</Label>
        <Password type="password" onChange={passwordChangeHandler}></Password>
        {errors.password && <Error className="error">{errors.password}</Error>}
        <Login type="submit" value="Login" />
      </Wrapper>
    </>
  )
}

const Wrapper = styled.form`
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin-top: 70px;
  margin-bottom: 70px;
  margin-left: 700px;
  border: 2px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  background-color: #f9f9f9;
  width: 500px;
  height: 350px;
  color: #585858;
  font-weight: bold;
`
const Label = styled.div`
  margin-bottom: 10px;
`
const Email = styled.input`
  width: 180px;
  justify-content: center;
  margin-bottom: 40px;
  height: 30px;
`
const Password = styled.input`
  width: 180px;
  justify-content: center;
  margin-bottom: 40px;
  height: 30px;
`
const Login = styled.input`
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
  background: #fff;
  color: #585858;
  font-weight: bold;
  box-shadow: 0 4px 14px 0 rgb(0 0 0 / 10%);
  transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
  :hover {
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 6px 20px rgb(93 93 93 / 23%);
  }
`
const Error = styled.div`
  margin-top: -35px;
  margin-bottom: 15px;
  font-size: 12px;
  color: red;
`

export default LoginPage
