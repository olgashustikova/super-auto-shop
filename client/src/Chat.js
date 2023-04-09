import { useContext, useEffect, useState } from 'react'
import ChatDetailsContent from './ChatDetailsContent'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import { ShopContext } from './ShopContext'

const Chat = () => {
  const { fromUserName } = useParams()
  const [chatPersons, setChatPersons] = useState(null)
  const shopContext = useContext(ShopContext)

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
      .catch((err) => alert(err))
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
                  textAlign: 'center',
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
  display: flex;
  flex-direction: column;
  height: 90vh;
  font-family: Arial, Helvetica, sans-serif;
`
const Main = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  border: 1px solid grey;
`
const Names = styled.div`
  /* overflow-y: scroll; */
  width: 25%;
  background-color: #585858;
  color: white;
`
const Name = styled.div`
  height: 7%;
  margin-top: 15px;
  border-bottom: 1px solid grey;
`
