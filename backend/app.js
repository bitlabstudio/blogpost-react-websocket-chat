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

wss.on('connection', function connection(ws, req) {
  // add every connecting client to its own room
  const roomName = qs.parse(req.url.split('?')[1])
  addClientToRoom(roomName.room, ws)

  ws.on('message', function incoming(data) {

    // when receiving a message, only send to those who are in the room
    const roomName = JSON.parse(data).room
    rooms[roomName].forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data)
      }
    })
  })
})
