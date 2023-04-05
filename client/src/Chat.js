import { useState } from 'react'
import ChatDetailsContent from './ChatDetailsContent'
import styled from 'styled-components'

const Chat = () => {
  const [chat, setChat] = useState(null)

  return (
    <Container>
      <Main>
        <Names>
          <Name>Ben</Name>
          <Name>Tim</Name>
          <Name>Rick</Name>
        </Names>
        <ChatDetailsContent chat={chat}></ChatDetailsContent>
      </Main>
    </Container>
  )
}

export default Chat

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
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
