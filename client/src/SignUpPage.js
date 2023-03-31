import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'

const SignUpPage = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const firstNameChangeHandler = (event) => {
    setFirstName(event.target.value)
  }
  const lastNameChangeHandler = (event) => {
    setLastName(event.target.value)
  }
  const emailChangeHandler = (event) => {
    setEmail(event.target.value)
  }
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value)
  }
  const submitHandler = () => {
    fetch('/api/login-user', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      }),
    }).then((res) => alert.res)
  }

  return (
    <>
      <Wrapper>
        <LabelOfFirstName>First Name</LabelOfFirstName>
        <FirstName onChange={firstNameChangeHandler}></FirstName>
        <LabelOfLastName>Last Name</LabelOfLastName>
        <LastName onChange={lastNameChangeHandler}></LastName>
        <LabelOfEmail>Email</LabelOfEmail>
        <Email onChange={emailChangeHandler}></Email>
        <LabelOfPassword>Password</LabelOfPassword>
        <Password onChange={passwordChangeHandler}></Password>
        <Login onClick={submitHandler}>Login</Login>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  margin-top: 180px;
  margin-bottom: 70px;
`
const LabelOfFirstName = styled.div`
  margin-bottom: 10px;
`
const FirstName = styled.input`
  width: 180px;
  justify-content: center;
  margin-bottom: 40px;
  height: 30px;
`
const LabelOfLastName = styled.div`
  margin-bottom: 10px;
`
const LastName = styled.input`
  width: 180px;
  justify-content: center;
  margin-bottom: 40px;
  height: 30px;
`
const LabelOfEmail = styled.div`
  margin-bottom: 10px;
`
const Email = styled.input`
  width: 180px;
  justify-content: center;
  margin-bottom: 40px;
  height: 30px;
`
const LabelOfPassword = styled.div`
  margin-bottom: 10px;
`
const Password = styled.input`
  width: 180px;
  justify-content: center;
  margin-bottom: 40px;
  height: 30px;
`
const Login = styled.button`
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
  color: #696969;
  box-shadow: 0 4px 14px 0 rgb(0 0 0 / 10%);
  transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
  :hover {
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 6px 20px rgb(93 93 93 / 23%);
  }
`

export default SignUpPage
