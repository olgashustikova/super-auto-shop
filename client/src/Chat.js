import { useContext, useEffect, useState } from 'react'
import ChatDetailsContent from './ChatDetailsContent'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import { ShopContext } from './ShopContext'
import { useNavigate } from 'react-router-dom'

const Chat = () => {
  const { fromUserName } = useParams()
  const [chatPersons, setChatPersons] = useState(null)
  const shopContext = useContext(ShopContext)
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/api/get-chats-persons', {
      headers: {
        Authorization: shopContext.prepareBasicHeader(),
      },
    })
      .then((response) => response.json())
      .then((responseObject) => {
        setChatPersons(responseObject.data)
      })
      .catch((err) => {
        shopContext.setError(err.message)
        navigate('/error')
      })
  }, [])

  return (
    <Container>
      <Main>
        <Names>
          {chatPersons &&
            chatPersons.map((person) => (
              <Link
                to={`/chat/${person}`}
                style={{
                  textDecoration: 'none',
                  color: 'white',
                  textAlign: 'left',
                }}
              >
                <Name key={person}>{person}</Name>
              </Link>
            ))}
        </Names>
        {fromUserName && (
          <ChatDetailsContent fromUserName={fromUserName}></ChatDetailsContent>
        )}
      </Main>
    </Container>
  )
}

export default Chat

const Container = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  height: 90vh;
`
const Main = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  border: 1px solid grey;
`
const Names = styled.div`
  width: 25%;
  background-color: #a8a8a8;
  font-weight: bold;
  font-size: 20px;
  color: white;
`
const Name = styled.div`
  height: 7%;
  margin-top: 20px;
  border-bottom: 1px solid grey;
  margin-left: 20px;
`
