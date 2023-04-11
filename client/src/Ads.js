import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import AdPreview from './AdPreview'
import { Link } from 'react-router-dom'
import { ShopContext } from './ShopContext'
import { useNavigate } from 'react-router-dom'

const Ads = () => {
  const shopContext = useContext(ShopContext)
  const [ads, setAds] = useState(null)
  const navigate = useNavigate()
  const [make, setMake] = useState('')
  const [minPrise, setMinPrice] = useState(0)
  const [maxPrise, setMaxPrice] = useState(0)
  const [bodyType, setBodyType] = useState('')
  const [maxKm, setMaxKm] = useState(0)

  const [searchChangeSwitch, setSearchChangeSwitch] = useState(false)

  const search = () => {
    setSearchChangeSwitch(!searchChangeSwitch)
  }

  const onMakeChange = (event) => {
    setMake(event.target.value)
  }

  const onMinPriceChange = (event) => {
    setMinPrice(parseInt(event.target.value))
  }

  const onMaxPriceChange = (event) => {
    setMaxPrice(parseInt(event.target.value))
  }

  const onBodyTypeChange = (event) => {
    setBodyType(event.target.value)
  }

  const onMaxKmChange = (event) => {
    setMaxKm(parseInt(event.target.value))
  }

  useEffect(() => {
    let query = '/api/get-ads'
    let queryParams = []
    if (make) {
      queryParams.push(`make=${make}`)
    }
    if (minPrise) {
      queryParams.push(`minPrise=${minPrise}`)
    }
    if (maxPrise) {
      queryParams.push(`maxPrise=${maxPrise}`)
    }
    if (maxKm) {
      queryParams.push(`maxKm=${maxKm}`)
    }
    if (bodyType) {
      queryParams.push(`bodyType=${bodyType}`)
    }

    if (queryParams.length > 0) {
      query += `?${queryParams.join('&')}`
    }
    fetch(query)
      .then((response) => response.json())
      .then((responseObject) => {
        setAds(responseObject.data)
      })
      .catch((err) => {
        shopContext.setError(err.message)
        navigate('/error')
      })
  }, [searchChangeSwitch])
  return (
    <>
      <Main>
        <Row>
          <Label>make</Label>
          <Input onChange={onMakeChange}></Input>
          <Label>min price</Label>
          <Input onChange={onMinPriceChange}></Input>
          <Label>max price</Label>
          <Input onChange={onMaxPriceChange}></Input>
          <Label>max km</Label>
          <Input onChange={onMaxKmChange}></Input>
          <Label>body type</Label>
          <Input onChange={onBodyTypeChange}></Input>
          <Button onClick={search}>Search</Button>
        </Row>
        {ads ? (
          <Wrapper>
            {ads.map((ad) => {
              return (
                <Link
                  to={`/ad/${ad._id}`}
                  style={{ textDecoration: 'none', color: '#585858' }}
                >
                  <AdPreview ad={ad} key={ad._id}></AdPreview>
                </Link>
              )
            })}
          </Wrapper>
        ) : (
          <Loading>LOADING</Loading>
        )}
      </Main>
    </>
  )
}

export default Ads

const Main = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  background-color: lightgrey;
  height: 100%;
  padding-bottom: 70px;
`
const Wrapper = styled.div`
  display: grid;
  gap: 80px;
  margin-top: 60px;
  grid-template-columns: repeat(4, 300px);
`
const Loading = styled.div``

const Row = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #a8a8a8;
  width: 100%;
`
const Label = styled.div`
  height: 35px;
  text-align: center;
  align-items: center;
  margin-top: 12px;
  margin-left: 10px;
  margin-right: 5px;
  color: #404040;
  font-weight: 600;
`
const Input = styled.input`
  height: 25px;
  margin-top: 9px;
  border-radius: 7px;
  box-shadow: 0 4px 14px 0 rgb(0 0 0 / 10%);
  border: none;
`
const Button = styled.button`
  margin-left: 20px;
  flex-direction: row;
  outline: 0;
  cursor: pointer;
  border: none;
  height: 25px;
  margin-top: 9px;
  border-radius: 7px;
  font-size: 16px;
  text-align: center;
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
