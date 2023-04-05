import { Link } from 'react-router-dom'
import styled from 'styled-components'

const ChatDetailsContent = ({ chat }) => {
  return (
    <>
      <Container>
        <Main>
          <Names>
            <Name>Ben</Name>
            <Name>Tim</Name>
            <Name>Rick</Name>
          </Names>

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
        </Main>
        <Bottom>
          <Button>Ok</Button>
        </Bottom>
      </Container>
    </>
  )
}
export default ChatDetailsContent

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  height: 1300px;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
`
const Main = styled.div`
  display: flex;
  flex-direction: row;
  height: 500px;
  width: 600px;
  border: 1px solid grey;
`
const Names = styled.div`
  overflow-y: scroll;
  width: 60%;
  background-color: #585858;
  color: white;
`
const Name = styled.div`
  height: 7%;
  margin-top: 15px;
  border-bottom: 1px solid grey;
`
const NameOfUserInChat = styled.div`
  padding-bottom: 20px;
`
const TextOfChat = styled.div``
const NameOfUser = styled.div`
  text-align: left;
  padding-top: 10px;
  padding-left: 10px;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid grey;
`
const Messages = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
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
  width: 600px;
  height: 50px;
  background-color: #e5e5ea;
`
const Button = styled.button`
  display: inline-block;
  margin-left: 467px;
  outline: 0;
  cursor: pointer;
  border: none;
  padding: 0 56px;
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
