import React, { useContext } from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import { ShopContext } from './ShopContext'
import { useNavigate } from 'react-router-dom'

// That component is new ad Form, performs basic validation and sends POST request to create an ad
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
  const [description, setDescription] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [errors, setErrors] = useState({})

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
  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value)
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
    const errorsObject = {}
    if (make === '') {
      errorsObject.make = 'Make is required'
    }
    if (model === '') {
      errorsObject.model = 'Model is required'
    }
    if (year === '' || isNaN(year)) {
      errorsObject.year = 'Year is required'
    }
    if (price === '' || isNaN(price)) {
      errorsObject.price = 'Price is required'
    }
    if (transmission === '') {
      errorsObject.transmission = 'Transmission is required'
    }
    if (kilometres === '' || isNaN(kilometres)) {
      errorsObject.kilometres = 'Kilometres is required'
    }
    if (bodyType === '') {
      errorsObject.bodyType = 'Body type is required'
    }
    if (sellerType === '') {
      errorsObject.sellerType = 'Seller type is required'
    }
    if (description === '') {
      errorsObject.description = 'Description is required'
    }
    if (imageFile === null) {
      errorsObject.imageFile = 'Image is required'
    }
    setErrors(errorsObject)
    if (Object.keys(errorsObject).length > 0) {
      return
    }

    const formData = new FormData()
    formData.append('make', make)
    formData.append('model', model)
    formData.append('year', year)
    formData.append('price', price)
    formData.append('transmission', transmission)
    formData.append('kilometres', kilometres)
    formData.append('bodyType', bodyType)
    formData.append('sellerType', sellerType)
    formData.append('description', description)
    formData.append('image', imageFile)

    try {
      const response = await fetch('/api/add-ad', {
        headers: {
          Authorization: shopContext.prepareBasicHeader(),
        },
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      navigate('/')
      console.log(data)
    } catch (error) {
      shopContext.setError(error.message)
      navigate('/error')
    }
  }
  return (
    <>
      <Main>
        <Wrapper onSubmit={submitHandler}>
          <Field>
            <Label>Make</Label>
            <FieldError>
              <Configuration onChange={makeChangeHandler}></Configuration>
              {errors.make && <Error className="error">{errors.make}</Error>}
            </FieldError>
          </Field>
          <Field>
            <Label>Model</Label>
            <FieldError>
              <Configuration onChange={modelChangeHandler}></Configuration>
              {errors.model && <Error className="error">{errors.model}</Error>}
            </FieldError>
          </Field>
          <Field>
            <LabelOfYear>Year</LabelOfYear>
            <FieldError>
              <Configuration onChange={yearChangeHandler}></Configuration>
              {errors.year && <Error className="error">{errors.year}</Error>}
            </FieldError>
          </Field>
          <Field>
            <LabelOfPrice>Price</LabelOfPrice>
            <FieldError>
              <Configuration onChange={priceChangeHandler}></Configuration>
              {errors.price && <Error className="error">{errors.price}</Error>}
            </FieldError>
          </Field>
          <Field>
            <LabelOfTransmission>Transmission</LabelOfTransmission>
            <FieldError>
              <Configuration
                onChange={transmissionChangeHandler}
              ></Configuration>
              {errors.transmission && (
                <Error className="error">{errors.transmission}</Error>
              )}
            </FieldError>
          </Field>
          <Field>
            <LabelOfKilometres>Kilometres</LabelOfKilometres>
            <FieldError>
              <Configuration onChange={kilometresChangeHandler}></Configuration>
              {errors.kilometres && (
                <Error className="error">{errors.kilometres}</Error>
              )}
            </FieldError>
          </Field>
          <Field>
            <LabelOfBodyType>Body type</LabelOfBodyType>
            <FieldError>
              <Configuration onChange={bodyTypeChangeHandler}></Configuration>
              {errors.bodyType && (
                <Error className="error">{errors.bodyType}</Error>
              )}
            </FieldError>
          </Field>
          <Field>
            <LabelOfSellerType>Seller type</LabelOfSellerType>
            <FieldError>
              <Configuration onChange={sellerTypeChangeHandler}></Configuration>
              {errors.sellerType && (
                <Error className="error">{errors.sellerType}</Error>
              )}
            </FieldError>
          </Field>
          <Field>
            <LabelOfImage>Image</LabelOfImage>
            <FieldError>
              <Configuration
                type="file"
                onChange={imageChangeHandler}
              ></Configuration>
              {errors.imageFile && (
                <Error className="error">{errors.imageFile}</Error>
              )}
            </FieldError>
          </Field>
          <Field>
            <LabelOfDescription>Description</LabelOfDescription>
            <FieldError>
              <Description
                onChange={descriptionChangeHandler}
                rows="7"
                cols="35"
              ></Description>
              {errors.description && (
                <Error className="error">{errors.description}</Error>
              )}
            </FieldError>
          </Field>

          <Login type="submit" value="add" />
        </Wrapper>
      </Main>
    </>
  )
}
const Main = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 70px;
  width: 600px;
  height: 950px;
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
  margin-top: 10px;
  color: #585858;
  font-weight: bold;
`
const Label = styled.div`
  margin-right: 40px;
`
const Configuration = styled.input`
  width: 180px;
  justify-content: center;
  margin-bottom: 30px;
  height: 30px;
`
const LabelOfYear = styled.div`
  margin-right: 50px;
`
const LabelOfPrice = styled.div`
  margin-bottom: 20px;
  margin-right: 50px;
`
const LabelOfTransmission = styled.div``

const LabelOfKilometres = styled.div`
  margin-right: 20px;
`
const LabelOfBodyType = styled.div`
  margin-right: 20px;
`
const LabelOfSellerType = styled.div`
  margin-right: 20px;
`
const LabelOfDescription = styled.div`
  margin-top: 40px;
  margin-right: 10px;
`
const Description = styled.textarea`
  margin-bottom: 40px;
`
const LabelOfImage = styled.div`
  margin-right: 43px;
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
  margin-left: 100px;
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
const FieldError = styled.div`
  display: flex;
  flex-direction: column;
`
const Error = styled.div`
  margin-top: -30px;
  margin-bottom: 15px;
  font-size: 12px;
  color: red;
`

export default NewAdForm
