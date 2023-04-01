import styled from 'styled-components'

const AdPreview = ({ ad }) => {
  return (
    <>
      <Container>
        <Image src={ad.imageUrl}></Image>
        <Information>
          <Make>Make: {ad.make}</Make>
          <Model>Model: {ad.model}</Model>
          <Price>Price: {ad.price}</Price>
        </Information>
      </Container>
    </>
  )
}

const Container = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  width: 500px;
  height: 450px;
  overflow: hidden;
  text-align: center;
  /* margin-top: 40px; */
`
const Image = styled.img`
  text-align: center;
  align-items: center;
  width: 60%;
  height: 60%;
  margin-left: -50%;
  margin-right: 40px;
  /* display: inline-block; */
`
const Information = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  text-align: left;
`
const Make = styled.div``
const Model = styled.div``
const Price = styled.div``

export default AdPreview
