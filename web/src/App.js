import React, { useEffect, useState } from 'react';
import io from 'socket.io-client'

const socket = io.connect('http://localhost:5000')
// const socket = io.connect('http://192.168.0.7:5000')

function App() {
  const [msg, setMsg] = useState('')
  const [chat, setChat] = useState([])
  const [nickname, setNickname] = useState('')

  const handleChange = e => {
    switch (e.target.name) {
      case 'nickname':
        setNickname(e.target.value)
        break;
      case 'msg':
        setMsg(e.target.value)
        break
      default:
        console.error('invalid name tag')
        break;
    }
  }

  const handleSubmit = () => {
    socket.emit('chat message', { nickname, msg })
    setMsg('')
  }

  const renderChat = () => {
    return chat.map(({ nickname, msg }, idx) => (
      <div key={idx}>
        <span style={{ color: 'green', marginRight: '10px' }}>{nickname}:</span>
        <span>{msg}</span>
      </div>
    ))
  }

  useEffect(() => {
    socket.on('chat message', ({ nickname, msg }) => {
      setChat([...chat, { nickname, msg }])
    })
  }, [chat])

  return (
    <div>
      <span>Nickname</span>
      <input
        name='nickname'
        onChange={handleChange}
        value={nickname}
      />
      <span>Message</span>
      <input
        name='msg'
        onChange={handleChange}
        value={msg}
      />
      <button onClick={handleSubmit}>Enviar</button>
      <div>{renderChat()}</div>
    </div>
  );
}

export default App;
