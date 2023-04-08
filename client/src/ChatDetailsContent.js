import styled from 'styled-components'
import { ShopContext } from './ShopContext'
import { useContext, useEffect, useState } from 'react'
import { Buffer } from 'buffer'

const ChatDetailsContent = ({ fromUserName }) => {
  const shopContext = useContext(ShopContext)
  const [chatText, setChatText] = useState('')
  const [messages, setMessages] = useState(null)

  useEffect(() => {
    fetch(`/api/get-chats-persons`, {
      headers: {
        Authorization: shopContext.prepareBasicHeader(),
      },
    })
      .then((response) => response.json())
      .then((responseObject) => {
        setMessages(responseObject.data)
      })
      .catch((err) => alert(err))
  }, [])

  const textInputOnCHange = (event) => {
    setChatText(event.target.value)
  }

  const handleSubmit = async () => {
    const encodedCredentials = Buffer.from(
      `${shopContext.currentUser}:${shopContext.currentPassword}`
    ).toString('base64')
    try {
      const response = await fetch('/api/add-chat', {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          text: chatText,
          to: 'Bit@test.com',
          from: shopContext.currentUser,
        }),
      })
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <Container>
        <Messages>
          <NameOfUser>Chat with Ben</NameOfUser>
          <Message>
            <NameOfUserInChat>Ben</NameOfUserInChat>
            <TextOfChat>How are you?</TextOfChat>
          </Message>
          <Message>
            <NameOfUserInChat>Me</NameOfUserInChat>
            <TextOfChat>Hi</TextOfChat>
          </Message>
          <Message>
            <NameOfUserInChat>Ben</NameOfUserInChat>
            <TextOfChat>Hello</TextOfChat>
          </Message>
        </Messages>

        <Bottom>
          <ChatInput onChange={textInputOnCHange} type="text"></ChatInput>
          <Button onClick={handleSubmit}>Ok</Button>
        </Bottom>
      </Container>
    </>
  )
}

export default ChatDetailsContent

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center;
  margin-top: 50px;
  height: 1200px;
  width: 100%;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif; */
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
  border-bottom: 1px solid grey;
`
const Messages = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
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
  background-color: #8ab375;
  color: white;
`
const Bottom = styled.div`
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
  background-color: #e5e5ea;
  border: hidden;
  flex: 1;
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
  font-weight: 400;
  font-size: 16px;
  /* margin-top: 40px; */
  background: #fff;
  color: #696969;
  box-shadow: 0 4px 14px 0 rgb(0 0 0 / 10%);
  transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
  :hover {
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 6px 20px rgb(93 93 93 / 23%);
  }
`
