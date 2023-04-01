import { useEffect, useState } from 'react'
import styled from 'styled-components'
import AdPreview from './AdPreview'
import { Link } from 'react-router-dom'

const Ads = () => {
  const [ads, setAds] = useState(null)
  useEffect(() => {
    fetch('/api/get-ads')
      .then((response) => response.json())
      .then((responseObject) => {
        setAds(responseObject.data)
      })
      .catch((err) => alert(err))
  }, [])
  return (
    <>
      <Main>
        {ads ? (
          <Wrapper>
            {ads.map((ad) => {
              return (
                <Link to={`/ad/${ad._id}`}>
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
  margin-top: 80px;
`
const Wrapper = styled.div`
  display: grid;
  margin-left: 160px;
  grid-template-columns: repeat(4, 300px);
`
const Loading = styled.div``
