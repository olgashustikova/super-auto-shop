import { Link } from 'react-router-dom'
import styled from 'styled-components'

const AdDetailsContent = ({ ad }) => {
  return (
    <>
      <Container>
        <Link to="/">
          <Button></Button>
        </Link>
        <Image src={ad.imageUrl}></Image>
        <Information>
          <Make>Make: {ad.make}</Make>
          <Model>Model: {ad.model}</Model>
        </Information>
        <Information>
          <Year>Year: {ad.year}</Year>
          <Price>Price: {ad.price}</Price>
        </Information>
        <Information>
          <Transmission>Transmission: {ad.transmission}</Transmission>
          <Kilometres>Kilometres: {ad.kilometres}</Kilometres>
        </Information>
        <Information>
          <BodyType>Body type: {ad.bodyType}</BodyType>
          <SellerType>Seller type: {ad.sellerType}</SellerType>
        </Information>
      </Container>
    </>
  )
}
export default AdDetailsContent

const Container = styled.div`
  margin-right: 20px;
  border: thin solid #d0d0d0;
  width: 1000px;
  height: 1000px;
  margin-left: 120px;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
`
const Image = styled.img`
  width: 60%;
  height: auto;
  margin-left: 20px;
  margin-top: 20px;
`
const Information = styled.div`
  display: flex;
  flex-direction: row;
  /* text-align: center;
  align-items: center;
  justify-content: start; */
  width: 600px;
  margin-left: 230px;
`
const Make = styled.div`
  margin-left: 120px;
  margin-top: 20px;
`
const Model = styled.div`
  margin-left: 80px;
  margin-top: 20px;
`
const Year = styled.div`
  margin-left: 120px;
  margin-top: 20px;
`
const Price = styled.div`
  margin-left: 100px;
  margin-top: 20px;
`
const Transmission = styled.div`
  margin-left: 115px;
  margin-top: 20px;
`
const Kilometres = styled.div`
  margin-left: 20px;
  margin-top: 20px;
`
const BodyType = styled.div`
  margin-left: 115px;
  margin-top: 20px;
`
const SellerType = styled.div`
  margin-left: 40px;
  margin-top: 20px;
`

const Button = styled.button`
  margin-top: 10px;
  margin-left: 10px;
  position: relative;
  width: 30px;
  height: 30px;
  border: 3px solid gray;
  border-radius: 50%;
  background-color: transparent;

  :after {
    position: absolute;
    top: 8px;
    left: 9px;
    content: '';
    display: block;
    width: 7px;
    height: 7px;
    border-left: 3px solid gray;
    border-bottom: 3px solid gray;
    transform: rotate(45deg);
  }
`
