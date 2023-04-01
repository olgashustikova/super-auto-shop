import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import AdDetailsContent from './AdDetailsContent'
import styled from 'styled-components'

const AdDetails = () => {
  const navigate = useNavigate()
  const { adId } = useParams()
  const [ad, setAd] = useState(null)
  useEffect(() => {
    fetch(`/api/get-ad/${adId}`)
      .then((res) => res.json())
      .then((responseOject) => {
        setAd(responseOject.data)
      })
      //.catch((error) => navigate('/error'))
      .catch((error) => alert(error))
  }, [])
  return !ad ? (
    <Loading>LOADING</Loading>
  ) : (
    <AdDetailsContent ad={ad}></AdDetailsContent>
  )
}
export default AdDetails

const Loading = styled.div``
