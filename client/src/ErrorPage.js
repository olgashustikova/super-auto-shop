import styled from 'styled-components'
import { ShopContext } from './ShopContext'
import { useContext } from 'react'

const ErrorPage = () => {
  const shopContext = useContext(ShopContext)
  return (
    <>
      <Container>
        <Error>An error has occured:</Error>
        <Error>{shopContext.error}</Error>
      </Container>
    </>
  )
}

export default ErrorPage

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Error = styled.div`
  margin-top: 70px;
  margin-bottom: 50px;
  font-size: 35px;
  font-weight: bold;
`
