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
  useEffect(() => {
    fetch('/api/get-ads')
      .then((response) => response.json())
      .then((responseObject) => {
        setAds(responseObject.data)
      })
      .catch((err) => {
        shopContext.setError(err.message)
        navigate('/error')
      })
  }, [])
  return (
    <>
      <Main>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  background-color: lightgrey;
  height: 100%;
`
const Wrapper = styled.div`
  display: grid;
  margin-left: 160px;
  gap: 40px;
  margin-top: 100px;

  grid-template-columns: repeat(4, 300px);
`
const Loading = styled.div``
