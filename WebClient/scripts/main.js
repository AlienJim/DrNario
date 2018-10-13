const client = new Colyseus.Client("ws://localhost:2657");
const room = client.join("chat");

room.onJoin.add(() => {
  console.log(`${ room.sessionId } joined!`)
})

room.onStateChange.add((state) => {
  console.log("new state:", state)
});

// listen for changes on a path on the state
room.listen("messages/:index", (change) => {
  console.log(change.operation); // ~> "add"
  console.log(change.path.index); // ~> "1"
  console.log(change.value); // ~> "Hello world!"
});

room.send("Hello world!");