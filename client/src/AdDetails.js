import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import AdDetailsContent from './AdDetailsContent'
import styled from 'styled-components'
import { ShopContext } from './ShopContext'

const AdDetails = () => {
  const { adId } = useParams()
  const [ad, setAd] = useState(null)
  const navigate = useNavigate()
  const shopContext = useContext(ShopContext)
  useEffect(() => {
    fetch(`/api/get-ad/${adId}`)
      .then((res) => res.json())
      .then((responseOject) => {
        setAd(responseOject.data)
      })
      .catch((error) => {
        shopContext.setError(error.message)
        navigate('/error')
      })
  }, [])
  return !ad ? (
    <Loading>LOADING</Loading>
  ) : (
    <AdDetailsContent ad={ad}></AdDetailsContent>
  )
}
export default AdDetails

const Loading = styled.div``
