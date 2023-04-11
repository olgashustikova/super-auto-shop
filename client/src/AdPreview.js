import styled from 'styled-components'

const AdPreview = ({ ad }) => {
  return (
    <>
      <Container>
        <Image src={ad.imageUrl}></Image>
        <Configuration>
          <Row>{ad.make}</Row>
          <Row>{ad.model}</Row>
          <Price>{ad.price}$</Price>
        </Configuration>
        <AdditionalInformation>
          <Information>
            <Transmission>{ad.transmission}</Transmission>
            <Text>Transmission</Text>
          </Information>
          <Information>
            <Kilometres>{ad.kilometres}</Kilometres>
            <Text>Kilometres</Text>
          </Information>
          <Information>
            <BodyType>{ad.bodyType}</BodyType>
            <Text>Body Type</Text>
          </Information>
          <Information>
            <SellerType>{ad.sellerType}</SellerType>
            <Text>Seller Type</Text>
          </Information>
        </AdditionalInformation>
      </Container>
    </>
  )
}

const Container = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  width: 300px;
  height: 380px;
  overflow: hidden;
  text-align: center;
  background: white;
  border: 2px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  background-color: #f9f9f9;
`
const Image = styled.img`
  height: 60%;
  width: 100%;
`
const Configuration = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 35px;
  justify-content: center;
  font-size: 17px;
  color: #585858;
  font-weight: bold;
`
const AdditionalInformation = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  font-size: 14px;
  text-align: center;
  align-items: center;
  justify-content: space-around;
`
const Row = styled.div`
  margin-right: 5px;
`
const Price = styled.div`
  font-size: 20px;
`
const Information = styled.div`
  display: flex;
  flex-direction: column;
`
const Text = styled.div`
  font-size: 10px;
  margin-top: 5px;
`
const Transmission = styled.div`
  font-weight: 600;
`
const Kilometres = styled.div`
  font-weight: bold;
`
const BodyType = styled.div`
  font-weight: bold;
`
const SellerType = styled.div`
  font-weight: bold;
`

export default AdPreview
