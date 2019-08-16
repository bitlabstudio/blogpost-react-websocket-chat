const WebSocket = require('ws')
const qs = require('qs')

const wss = new WebSocket.Server({ port: 3030 })
const rooms = {}

function addClientToRoom(roomName, client) {
  if (Array.isArray(rooms[roomName])) {
    rooms[roomName].push(client)
  } else {
    rooms[roomName] = [client]
  }
}

function sendMessageToRoom(roomName, data, ws) {
  rooms[roomName].forEach(function each(client) {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send(data)
    }
  })
}

wss.on('connection', function connection(ws, req) {
  // add every connecting client to its own room
  const query = qs.parse(req.url.split('?')[1])
  const roomName = query.room
  ws.userName = query.name
  addClientToRoom(roomName, ws)

  ws.on('close', function() {
    rooms[roomName] = rooms[roomName].filter(function each(client) {
      const data = JSON.stringify({
        message: 'left the room',
        room: roomName,
        name: client.userName,
      })
      sendMessageToRoom(roomName, data, client)
      return client !== ws
    })
  })
  ws.on('message', function incoming(data) {
    // when receiving a message, only send to those who are in the room
    const roomName = JSON.parse(data).room
    sendMessageToRoom(roomName, data, ws)
  })
})
