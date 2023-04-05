import { useState } from 'react'
import ChatDetailsContent from './ChatDetailsContent'
import styled from 'styled-components'

const Chat = () => {
  const [chat, setChat] = useState(null)

  return (
    <Container>
      <ChatDetailsContent chat={chat}></ChatDetailsContent>
    </Container>
  )
}

export default Chat

const Container = styled.div``
