import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import AdDetailsContent from './AdDetailsContent'

const AdDetails = () => {
  const navigate = useNavigate()
  const { adId } = useParams()
  const [ad, setAd] = useState(null)
  useEffect(() => {
    fetch(`api/ad/${adId}`)
      .then((res) => res.json())
      .then((responseOject) => {
        setTweet(responseOject.ad)
      })
      .catch((error) => navigate('/error'))
  }, [])
  return !tweet ? (
    <Loading>LOADING</Loading>
  ) : (
    <AdDetailsContent ad={ad}></AdDetailsContent>
  )
}
export default AdDetails
