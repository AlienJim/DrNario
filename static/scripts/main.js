window.onload = function(){
    var host = window.document.location.host.replace(/:.*/, '');
    var client = new Colyseus.Client(location.protocol.replace("http", "ws") + host + (location.port ? ':' + location.port : ''));
    var room = client.join("pixi");

    //Creating pixi canvas and fitting it to screen
    const app = new PIXI.Application((window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth) - 25, 
              (window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight) - 25);
    var ele = document.getElementById('canvas');
    ele.appendChild(app.view);
    
    //payers holds sprite pixi sprite
    var players = {};
    
    // listen to patches coming from the server
    room.listen("players/:id", function(change) {
      if (change.operation === "add") {
        var nario = PIXI.Sprite.fromImage('images/drmario.png');
    
        nario.x = change.value.x;
        nario.y = change.value.y;
    
        players[change.path.id] = nario;
        app.stage.addChild(nario);
    
      } else if (change.operation === "remove") {
        //TODO: FIX SPRITE DELETION
        document.body.removeChild(players[ change.path.id ]);
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
 };
