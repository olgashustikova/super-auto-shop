import styled from 'styled-components'
import { ShopContext } from './ShopContext'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ChatDetailsContent = ({ fromUserName }) => {
  const shopContext = useContext(ShopContext)
  const [chatText, setChatText] = useState('')
  const [chatMessages, setChatMessages] = useState(null)
  const [messageSendSwitch, setMessageSendSwitch] = useState(false)
  const navigate = useNavigate()

  const [timerChanged, setTimerChanged] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimerChanged((prevValue) => !prevValue)
    }, 10000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    fetch(`/api/get-chat/?otherUser=${fromUserName}`, {
      headers: {
        Authorization: shopContext.prepareBasicHeader(),
      },
    })
      .then((response) => response.json())
      .then((responseObject) => {
        setChatMessages(responseObject.data)
      })
      .catch((err) => {
        shopContext.setError(err.message)
        navigate('/error')
      })
  }, [messageSendSwitch, fromUserName, timerChanged])

  const textInputOnCHange = (event) => {
    setChatText(event.target.value)
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/add-chat', {
        headers: {
          Authorization: shopContext.prepareBasicHeader(),
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          text: chatText,
          to: fromUserName,
          from: shopContext.currentUser,
        }),
      })
      const data = await response.json()
      console.log(data)
      setMessageSendSwitch(!messageSendSwitch)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <Container>
        <Messages>
          <NameOfUser>Chat with {fromUserName}</NameOfUser>
          {chatMessages &&
            chatMessages.map((item) => {
              return (
                <Message
                  color={item.from === fromUserName ? '#ffffcc' : '#B8B8B8'}
                >
                  <NameOfUserInChat>{item.from}</NameOfUserInChat>
                  <TextOfChat>{item.text}</TextOfChat>
                </Message>
              )
            })}
        </Messages>
        <BottomLine>
          <ChatInput onChange={textInputOnCHange} type="text"></ChatInput>
          <Button onClick={handleSubmit}>Ok</Button>
        </BottomLine>
      </Container>
    </>
  )
}

export default ChatDetailsContent

const Container = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`
const NameOfUserInChat = styled.div`
  padding-bottom: 20px;
`
const TextOfChat = styled.div``
const NameOfUser = styled.div`
  text-align: left;
  padding-top: 10px;
  padding-left: 10px;
  height: 80px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* border-bottom: 1px solid grey; */
  color: #585858;
  font-weight: bold;
  font-size: 20px;
`
const Messages = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: scroll;
`
const Message = styled.div`
  border: 1px solid grey;
  align-self: flex-end;
  text-align: left;
  width: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 20px;
  margin-right: 20px;
  height: 65px;
  padding: 10px;
  border-radius: 4px;
  background-color: ${(props) => props.color};
  color: #404040;
`
const BottomLine = styled.div`
  border-bottom: 1px solid grey;
  border-right: 1px solid grey;
  border-left: 1px solid grey;
  height: 50px;
  background-color: #e5e5ea;
  display: flex;
  flex-direction: row;
`
const ChatInput = styled.input`
  height: 44px;
  background-color: #b8b8b8;
  border: hidden;
  flex: 1;
  font-size: 17px;
`
const Button = styled.button`
  width: 140px;
  display: inline-block;
  outline: 0;
  cursor: pointer;
  border: none;
  height: 50px;
  line-height: 45px;
  border-radius: 7px;
  font-size: 16px;
  background: #fff;
  color: #585858;
  font-weight: bold;
  box-shadow: 0 4px 14px 0 rgb(0 0 0 / 10%);
  transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
  :hover {
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 6px 20px rgb(93 93 93 / 23%);
  }
`
