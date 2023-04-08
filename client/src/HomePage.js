import React from 'react'
import styled from 'styled-components'
import Ads from './Ads'
import Header from './Header'

const HomePage = () => {
  return (
    <>
      <Wrapper>
        <Ads></Ads>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 1300px;
`
export default HomePage
