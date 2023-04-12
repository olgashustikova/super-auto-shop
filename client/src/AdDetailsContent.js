import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ShopContext } from './ShopContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

// Detailed ad contect
const AdDetailsContent = ({ ad }) => {
  const shopContext = useContext(ShopContext)
  const navigate = useNavigate()

  const deleteAd = async () => {
    try {
      const response = await fetch(`/api/delete-ad/${ad._id}`, {
        headers: {
          Authorization: shopContext.prepareBasicHeader(),
        },
        method: 'DELETE',
      })
      const data = await response.json()
      if (data.status === 200) {
        navigate('/')
      } else {
        navigate('/error')
      }
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Container>
        <Image src={ad.imageUrl}></Image>
        <Information>
          <Year>{ad.year}</Year>
          <Make>{ad.make}</Make>
          <Model>{ad.model}</Model>
          <BodyType>{ad.bodyType}</BodyType>
        </Information>
        <Information>
          <Price>$ {ad.price}</Price>
        </Information>
        <Information>
          <Transmission>
            <Row1>Transmission:</Row1>
            <Row2>{ad.transmission}</Row2>{' '}
          </Transmission>
          <Kilometres>
            <Row1>Kilometres:</Row1>
            <Row2>{ad.kilometres} km</Row2>
          </Kilometres>
          <SellerType>
            <RowSeller>Seller:</RowSeller>
            <Row2> {ad.userName}</Row2>
            <Buttons>
              {shopContext.currentUser &&
                shopContext.currentUser != ad.userName && (
                  <Link to={`/chat/${ad.userName}`}>
                    <Button>Send message</Button>
                  </Link>
                )}
              {shopContext.currentUser &&
                shopContext.currentUser == ad.userName && (
                  <Button onClick={deleteAd}>Delete</Button>
                )}
            </Buttons>
          </SellerType>
        </Information>
        <Description>
          <Row1Description>Description:</Row1Description>
          <Row2> {ad.description}</Row2>
        </Description>
      </Container>
    </>
  )
}
export default AdDetailsContent

const Container = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 1300px;
  text-align: center;
`
const Image = styled.img`
  width: 60%;
  height: auto;
  margin-top: 20px;
`
const Information = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  width: 900px;
  font-size: 30px;
  color: #585858;
  font-weight: bold;
`
const Make = styled.div`
  margin-top: 40px;
  margin-left: 10px;
`
const Model = styled.div`
  margin-top: 40px;
`
const Year = styled.div`
  margin-top: 40px;
  margin-right: 20px;
`
const Price = styled.div`
  margin-top: 20px;
  font-size: 30px;
  font-weight: bold;
`
const Transmission = styled.div`
  margin-top: 20px;
  font-size: 20px;
  margin-right: 40px;
`
const Row1 = styled.div`
  font-weight: 600;
  font-size: 20px;
`
const RowSeller = styled.div`
  font-weight: 600;
  font-size: 20px;
  margin-right: 360px;
`
const Row2 = styled.div`
  font-size: 17px;
  text-align: left;
  margin-top: 5px;
`
const Kilometres = styled.div`
  margin-right: 40px;
  margin-top: 20px;
`
const BodyType = styled.div`
  margin-top: 40px;
  margin-left: 20px;
`
const SellerType = styled.div`
  margin-left: 20px;
  margin-top: 20px;
`
const Row1Description = styled.div`
  margin-bottom: 20px;
  font-weight: 600;
  font-size: 30px;
  color: #585858;
  font-weight: bold;
`
const Description = styled.div`
  margin-top: 20px;
  text-align: left;
  width: 900px;
  line-height: 1.5;
  margin-bottom: 50px;
  color: #585858;
  font-weight: bold;
`
const Button = styled.button`
  margin-left: 200px;
  flex-direction: row;
  outline: 0;
  cursor: pointer;
  border: none;
  padding: 0 56px;
  height: 45px;
  line-height: 45px;
  border-radius: 7px;
  font-weight: 200;
  font-size: 16px;
  background: #fff;
  font-size: 20px;
  color: #585858;
  font-weight: bold;
  box-shadow: 0 4px 14px 0 rgb(0 0 0 / 10%);
  transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
  :hover {
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 6px 20px rgb(93 93 93 / 23%);
  }
`
const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -40px;
`
