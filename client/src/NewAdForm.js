import React, { useContext } from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import { Buffer } from 'buffer'
import { ShopContext } from './ShopContext'
import { useNavigate } from 'react-router-dom'

const NewAdForm = () => {
  const shopContext = useContext(ShopContext)
  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [year, setYear] = useState('')
  const [price, setPrice] = useState('')
  const [transmission, setTransmission] = useState('')
  const [kilometres, setKilometres] = useState('')
  const [bodyType, setBodyType] = useState('')
  const [sellerType, setSellerType] = useState('')
  const [imageFile, setImageFile] = useState(null)

  const navigate = useNavigate()
  const makeChangeHandler = (event) => {
    setMake(event.target.value)
  }
  const modelChangeHandler = (event) => {
    setModel(event.target.value)
  }
  const yearChangeHandler = (event) => {
    setYear(event.target.value)
  }
  const priceChangeHandler = (event) => {
    setPrice(event.target.value)
  }
  const transmissionChangeHandler = (event) => {
    setTransmission(event.target.value)
  }
  const kilometresChangeHandler = (event) => {
    setKilometres(event.target.value)
  }
  const bodyTypeChangeHandler = (event) => {
    setBodyType(event.target.value)
  }
  const sellerTypeChangeHandler = (event) => {
    setSellerType(event.target.value)
  }
  const imageChangeHandler = (event) => {
    if (event.target.type === 'file') {
      setImageFile(event.target.files[0])
    } else {
      alert('Error, you should image of your car')
    }
  }
  const submitHandler = async (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('make', make)
    formData.append('model', model)
    formData.append('year', year)
    formData.append('price', price)
    formData.append('transmission', transmission)
    formData.append('kilometres', kilometres)
    formData.append('bosyType', bodyType)
    formData.append('sellerType', sellerType)
    formData.append('image', imageFile)

    const encodedCredentials = Buffer.from(
      `${shopContext.currentUser}:${shopContext.currentPassword}`
    ).toString('base64')

    try {
      const response = await fetch('/api/add-ad', {
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
      <Main>
        <Wrapper onSubmit={submitHandler}>
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
          <Field>
            <LabelOfSellerType>Seller type</LabelOfSellerType>
            <SellerType type="file" onChange={imageChangeHandler}></SellerType>
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
const Wrapper = styled.form`
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
