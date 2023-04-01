import styled from 'styled-components'

const AdDetailsContent = ({ ad }) => {
  return (
    <>
      <Container>
        <Link to="/">
          <Button></Button>
        </Link>
        <Link to={`/profile/${tweet.author.handle}`}>
          <Header>
            <Avatar src={tweet.author.avatarSrc}></Avatar>
            <Information>
              <Name>{tweet.author.displayName}</Name>
              <Handle>@{tweet.author.handle}</Handle>
            </Information>
          </Header>
        </Link>
        <Status>{tweet.status}</Status>
        {tweet.media.map((item) => {
          return <Image key={item.url} src={item.url}></Image>
        })}
        <Joined>
          <Moment format="LT ll">{tweet.author.joined}</Moment>
        </Joined>
      </Container>
      <Footer>
        <TweetFooter tweet={tweet} />
      </Footer>
    </>
  )
}
export default AdDetailsContent

const Container = styled.div`
  margin-right: 20px;
  border: thin solid #d0d0d0;
  width: 1000px;
  height: 850px;
  margin-left: 50px;
  font-family: Arial, Helvetica, sans-serif;
  margin-right: 120px;
`
const Header = styled.div`
  display: flex;
  flex-direction: row;
`
const Avatar = styled.img`
  width: 8%;
  height: 8%;
  border-radius: 50%;
  margin-left: 20px;
  margin-top: 20px;
`
const Information = styled.div`
  margin-top: 30px;
  margin-left: 20px;
`
const Name = styled.div`
  font-size: 23px;
  font-weight: 600;
`
const Handle = styled.div`
  font-size: 16px;
  color: #686464;
  margin-top: 3px;
  font-weight: 600;
`
const Status = styled.div`
  margin-top: 15px;
  margin-left: 20px;
  font-size: 30px;
  font-weight: 500;
  max-width: 850px;
  word-wrap: break-word;
`
const Image = styled.img`
  margin-top: 15px;
  width: 870px;
  height: 60%;
  border-radius: 20px;
  border: solid #999999;
  margin-left: 12px;
  margin-bottom: 20px;
`
const Joined = styled.div`
  margin-left: 20px;
  font-size: 23px;
  color: #686464;
`
const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border: thin solid #d0d0d0;
  width: 1000px;
  height: 90px;
  margin-right: 69px;
`

const Button = styled.button`
  margin-top: 10px;
  margin-left: 10px;
  position: relative;
  width: 30px;
  height: 30px;
  border: 3px solid gray;
  border-radius: 50%;
  background-color: transparent;

  :after {
    position: absolute;
    top: 8px;
    left: 9px;
    content: '';
    display: block;
    width: 7px;
    height: 7px;
    border-left: 3px solid gray;
    border-bottom: 3px solid gray;
    transform: rotate(45deg);
  }
`
