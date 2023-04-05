import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import ChatDetailsContent from './ChatDetailsContent'
import styled from 'styled-components'

const Chat = () => {
  const [chat, setChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [inputTo, setInputTo] = useState('')

  return (
    <Container>
      <ChatDetailsContent chat={chat}></ChatDetailsContent>
    </Container>
  )
}

export default Chat

const Container = styled.div``
