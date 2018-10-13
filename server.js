var http = require('http');
import { Server, Room } from "colyseus";

// Create HTTP & WebSocket servers
const server = http.createServer();
const gameServer = new Server();

class ChatRoom extends Room {
  // maximum number of clients per active session
  maxClients = 4;

  onInit () {
      this.setState({ messages: [] });
  }
  onJoin (client) {
      this.state.messages.push(`${ client.sessionId } joined.`);
  }
  onMessage (client, data) {
      this.state.messages.push(data);
  }
}

// Register ChatRoom as "chat"
gameServer.register("chat", ChatRoom);
gameServer.listen(2657);