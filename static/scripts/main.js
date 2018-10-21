
function main() {
  const app = new PIXI.Application(getWindowWidth(), getWindowHeight());
  app.renderer.backgroundColor = 0x061639;
	var host = window.document.location.host.replace(/:.*/, '');
	var client = new Colyseus.Client(location.protocol.replace("http", "ws") + host + (location.port ? ':' + location.port : ''));
	var room = client.join("pixi");
	var myTextures = Sprites.loadTextures(app);
	var players = {};

	// listen to patches coming from the server
	room.listen("players/:id", function(change) {
    if (change.operation === "add") {
      myTextures.spriteBg = new PIXI.Sprite(myTextures.bgs[1]);
      myTextures.bottle = new PIXI.Sprite(myTextures.pillBottles[1]);

      myTextures.app.stage.addChild(myTextures.spriteBg);
      myTextures.app.stage.addChild(myTextures.bottle);

      resize()
      
      var nario = new PIXI.Sprite(myTextures.marios[0]);

      nario.x = change.value.x;
      nario.y = change.value.y;

      players[change.path.id] = nario;
      myTextures.app.stage.addChild(nario);
      

    } else if (change.operation === "remove") {
      myTextures.app.stage.removeChild(players[change.path.id]);
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
  window.addEventListener("resize", resize)

  function resize(){
    var width = getWindowWidth();
    var height = getWindowHeight();
    app.renderer.resize(width, height);
  
    var scalex = width/myTextures.spriteBg.width, 
        scaley = height/myTextures.spriteBg.height;
    
    myTextures.app.stage.height = height;
    myTextures.app.stage.width = width;
  
    //myTextures.spriteBg.scale.x = scaley;
    //myTextures.spriteBg.scale.y = scaley;
    //myTextures.bottle.scale.x = scaley;
    //myTextures.bottle.scale.y = scaley;
  }
}

function getWindowWidth() {
    return (window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth) - 25;
}

function getWindowHeight() {
    return (window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight) - 25;
}

PIXI.loader
	.add("images/bgsheet.png")
  .load(main);
  

      //sprite sheet test
    /*
    var z = 0, m = 0;
    myTextures.dubPills.forEach(function(element) {
      var sp = new PIXI.Sprite(element)
      sp.y = z;
      sp.x = m;
      myTextures.app.stage.addChild(sp);
      z += 30;
      console.log(z);
    });
    z = 0;
    m = 50;
    myTextures.sinPills.forEach(function(element) {
      var sp = new PIXI.Sprite(element)
      sp.y = z;
      sp.x = m;
      myTextures.app.stage.addChild(sp);
      z += 30;
      console.log(z);
    });
    z = 0;
    m = 100;
    myTextures.aBlocks.forEach(function(element) {
      var sp = new PIXI.Sprite(element)
      sp.y = z;
      sp.x = m;
      myTextures.app.stage.addChild(sp);
      z += 30;
      console.log(z);
    });
    z = 0;
    m = 150;
    myTextures.marios.forEach(function(element) {
      var sp = new PIXI.Sprite(element)
      sp.y = z;
      sp.x = m;
      myTextures.app.stage.addChild(sp);
      z += 60;
      console.log(z);
    });
    z = 0;
    m = 250;
    myTextures.pillBottles.forEach(function(element) {
      var sp = new PIXI.Sprite(element)
      sp.y = z;
      sp.x = m;
      myTextures.app.stage.addChild(sp);
      z += 200;
      console.log(z);
    });
    z = 0
    m = 350
    myTextures.bgs.forEach(function(element) {
      var sp = new PIXI.Sprite(element)
      sp.y = z;
      sp.x = m;
      myTextures.app.stage.addChild(sp);
      z += 300;
      console.log(z);
    });
    */