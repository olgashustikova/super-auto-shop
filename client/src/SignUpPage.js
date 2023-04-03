import React, { useContext } from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import { ShopContext } from './ShopContext'

const SignUpPage = () => {
  const shopContext = useContext(ShopContext)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})

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
  const submitHandler = async (event) => {
    event.preventDefault()
    const errorsObject = {}
    if (firstName === '') {
      errorsObject.firstName = 'First name is required'
    }
    if (lastName === '') {
      errorsObject.lastName = 'Last name is required'
    }
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
    const formData = new FormData()
    formData.append('firstName', firstName)
    formData.append('lastname', lastName)
    formData.append('email', email)
    formData.append('password', password)

    const encodedCredentials = Buffer.from(
      `${shopContext.currentUser}:${shopContext.currentPassword}`
    ).toString('base64')
    try {
      const response = await fetch('/api/login-user', {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
        },
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <Wrapper>
        <LabelOfFirstName>First Name</LabelOfFirstName>
        <FirstName onChange={firstNameChangeHandler}></FirstName>
        {errors.firstName && (
          <Error className="error">{errors.firstName}</Error>
        )}
        <LabelOfLastName>Last Name</LabelOfLastName>
        <LastName onChange={lastNameChangeHandler}></LastName>
        {errors.lastName && <Error className="error">{errors.lastName}</Error>}
        <LabelOfEmail>Email</LabelOfEmail>
        <Email onChange={emailChangeHandler}></Email>
        {errors.email && <Error className="error">{errors.email}</Error>}
        <LabelOfPassword>Password</LabelOfPassword>
        <Password onChange={passwordChangeHandler}></Password>
        {errors.password && <Error className="error">{errors.password}</Error>}
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
  margin-top: 50px;
  margin-bottom: 70px;
  margin-left: 650px;
  width: 500px;
  height: 650px;
  justify-content: center;
  border: 2px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  background-color: #f9f9f9;
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
  margin-top: 30px;
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
const Error = styled.div`
  margin-top: -35px;
  margin-bottom: 15px;
  font-size: 12px;
  color: red;
`

export default SignUpPage
