const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', socket => {
  const { id } = socket.client
  console.log(`user connected: ${id}`)

  socket.on('chat message', ({ nickname, msg }) => {
    io.emit(
      'chat message',
      { nickname, msg },
      // JSON.parse(`{ "id": "${id}", "msg": "${msg}" }`),
    )
  })
})

const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`listen on port ${PORT}`))
