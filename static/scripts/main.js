var host = window.document.location.host.replace(/:.*/, '');
var client = new Colyseus.Client(location.protocol.replace("http", "ws") + host + (location.port ? ':' + location.port : ''));
var room = client.join("pixi");
var players = {};

// listen to patches coming from the server
room.listen("players/:id", function(change) {
  if (change.operation === "add") {
    mySprites.app.stage.addChild(mySprites.marios[0]);

    mySprites.marios[0].x = change.value.x;
    mySprites.marios[0].x = change.value.y;

    players[change.path.id] = mySprites.marios[0];

    //test to display pills
    /*
    var z = 0;
    mySprites.dubPills.forEach(function(element) {
        mySprites.app.stage.addChild(element);
        element.y += z;
        console.log("does this work");
        z += 40;
    });
    */
  } else if (change.operation === "remove") {
    //TODO: FIX SPRITE DELETION
    mySprites.ele.removeChild(players[change.path.id]);
    delete players[change.path.id];
  }
});

room.listen("players/:id/:axis", function(change) {
    //moves player upon arrow key press
    if(change.path.axis === "x"){
        players[change.path.id].x = change.value;
    }if(change.path.axis === "y"){
        players[change.path.id].y = change.value;
    }
});

window.addEventListener("keydown", function (e) {
  console.log("key code: ", e.which);
  if (e.which === 38) {
    up();

  } else if (e.which === 39) {
    right();

  } else if (e.which === 40) {
    down();

  } else if (e.which === 37) {
    left();
  }
});

function up () {
  room.send({ y: -1 });
}

function right () {
  room.send({ x: 1 });
}

function down () {
  room.send({ y: 1 })
}

function left () {
  room.send({ x: -1 })
}
//event listener to auto resize window
window.addEventListener("resize", () => {   
    app.renderer.resize(getWindowX(), getWindowY());
})
