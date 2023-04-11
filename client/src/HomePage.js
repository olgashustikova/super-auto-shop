import React from 'react'
import styled from 'styled-components'
import Ads from './Ads'

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
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
`
export default HomePage
