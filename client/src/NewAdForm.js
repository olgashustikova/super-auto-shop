import React, { useContext } from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import { Buffer } from 'buffer'
import { ShopContext } from './ShopContext'
import { useNavigate } from 'react-router-dom'

const NewAdForm = () => {
  const shopContext = useContext(ShopContext)
  const [formState, setFormState] = useState({
    make: '',
    model: '',
    year: 0,
    price: 0,
    transmission: '',
    kilometres: 0,
    bodyType: '',
    sellerType: '',
  })

  const navigate = useNavigate()
  const makeChangeHandler = (event) => {
    setFormState({ make: event.target.value })
  }
  const modelChangeHandler = (event) => {
    setFormState({ model: event.target.value })
  }
  const yearChangeHandler = (event) => {
    setFormState({ year: event.target.value })
  }
  const priceChangeHandler = (event) => {
    setFormState({ price: event.target.value })
  }
  const transmissionChangeHandler = (event) => {
    setFormState({ transmission: event.target.value })
  }
  const kilometresChangeHandler = (event) => {
    setFormState({ kilometres: event.target.value })
  }
  const bodyTypeChangeHandler = (event) => {
    setFormState({ bodyType: event.target.value })
  }
  const sellerTypeChangeHandler = (event) => {
    setFormState({ sellerType: event.target.value })
  }
  const submitHandler = () => {
    // const encodedCredentials = Buffer.from(`${email}:${password}`).toString(
    //   'base64'
    // )
    //   fetch('/api/login-user', {
    //     headers: {
    //       Authorization: `Basic ${encodedCredentials}`,
    //     },
    //   })
    //     .then((response) => response.json())
    //     .then((responseObject) => {
    //       if (responseObject.status === 200) {
    //         shopContext.setCurrentUser(email)
    //         shopContext.setCurrentPassword(password)
    //         navigate(`/`)
    //         alert('ALL GOOD')
    //       } else {
    //         alert(
    //           `ERROR with status: ${responseObject.status} and message: ${responseObject.error}`
    //         )
    //       }
    //     })
    //     .catch((err) => alert('ERROR: ' + err))
  }
  return (
    <>
      <Main>
        <Wrapper>
          <Field>
            <LabelOfMake>Make</LabelOfMake>
            <Make onChange={makeChangeHandler}></Make>
          </Field>
          <Field>
            <LabelOfModel>Model</LabelOfModel>
            <Model onChange={modelChangeHandler}></Model>
          </Field>
          <Field>
            <LabelOfYear>Year</LabelOfYear>
            <Year onChange={yearChangeHandler}></Year>
          </Field>
          <Field>
            <LabelOfPrice>Price</LabelOfPrice>
            <Price onChange={priceChangeHandler}></Price>
          </Field>
          <Field>
            <LabelOfTransmission>Transmission</LabelOfTransmission>
            <Transmission onChange={transmissionChangeHandler}></Transmission>
          </Field>
          <Field>
            <LabelOfKilometres>Kilometres</LabelOfKilometres>
            <Kilometres onChange={kilometresChangeHandler}></Kilometres>
          </Field>
          <Field>
            <LabelOfBodyType>Body type</LabelOfBodyType>
            <BodyType onChange={bodyTypeChangeHandler}></BodyType>
          </Field>
          <Field>
            <LabelOfSellerType>Seller type</LabelOfSellerType>
            <SellerType onChange={sellerTypeChangeHandler}></SellerType>
          </Field>

          <Login onClick={submitHandler}>Login</Login>
        </Wrapper>
      </Main>
    </>
  )
}
const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  margin-top: 140px;
  margin-bottom: 70px;
  width: 500px;
  justify-content: center;
  border: 2px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  background-color: #f9f9f9;
`
const Field = styled.div`
  display: flex;
  flex-direction: row;
`
const LabelOfMake = styled.div`
  margin-right: 40px;
  margin-top: 20px;
`
const Make = styled.input`
  width: 180px;
  justify-content: center;
  margin-bottom: 30px;
  height: 30px;
  margin-top: 20px;
`
const LabelOfModel = styled.div`
  margin-right: 40px;
`
const Model = styled.input`
  width: 180px;
  justify-content: center;
  margin-bottom: 30px;
  height: 30px;
`
const LabelOfYear = styled.div`
  margin-right: 50px;
`
const Year = styled.input`
  width: 180px;
  justify-content: center;
  margin-bottom: 30px;
  height: 30px;
`
const LabelOfPrice = styled.div`
  margin-bottom: 20px;
  margin-right: 50px;
`
const Price = styled.input`
  width: 180px;
  justify-content: center;
  margin-bottom: 30px;
  height: 30px;
`
const LabelOfTransmission = styled.div``
const Transmission = styled.input`
  width: 180px;
  justify-content: center;
  margin-bottom: 30px;
  height: 30px;
`
const LabelOfKilometres = styled.div`
  margin-right: 20px;
`
const Kilometres = styled.input`
  width: 180px;
  justify-content: center;
  margin-bottom: 30px;
  height: 30px;
`
const LabelOfBodyType = styled.div`
  margin-right: 20px;
`
const BodyType = styled.input`
  width: 180px;
  justify-content: center;
  margin-bottom: 30px;
  height: 30px;
`
const LabelOfSellerType = styled.div`
  margin-right: 20px;
`
const SellerType = styled.input`
  width: 180px;
  justify-content: center;
  margin-bottom: 30px;
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
  margin-left: 100px;
  background: #fff;
  color: #696969;
  box-shadow: 0 4px 14px 0 rgb(0 0 0 / 10%);
  transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
  :hover {
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 6px 20px rgb(93 93 93 / 23%);
  }
`

export default NewAdForm
