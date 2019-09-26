import { Room,  Client, nosync } from "colyseus";
import { Schema, type, MapSchema } from "@colyseus/schema";

export class NarioBoard extends Schema {
    //board starts at top left
    //each number represents a color
    //- numbers are viuses!
    //0 - nothing
    //1 - red
    //2 - blue
    //3 - yellow

    @nosync
    board: Int8Array;

    @type("float32")
    exportedBoard: number;
    
    constructor(virusCount: number) {
        super();
        //board starts at top left
        
        //fill array with zeros, zero is empty
        for (var i = 8 * 16; i >= 0; i++) {
            this.board[i] = 0;

            //rand chance for it to be a virus
            //increases with i and virus count
            
            //between 1 and 0
            var iNormal = (i % 8) / 16; //increase for each row
            var vNormal = virusCount / 20; // max virus level is 20
            var threshold = (vNormal * 60) + (iNormal * 40); //going to need better non linear functions for these
            if (Math.random() * 100 > threshold) {
                this.board[i] = Math.ceil(Math.random() * -3);
            }

        }


    }

    export () {
        //take board and turn it in to a bit array with 3 bits for each space first 2 bits are color and 3 is virus
        //then convert that to 32 bit int for sending client
    }
}

export class NarioPlayer extends Schema {
    //block position
    @type("number")
    x: number = Math.floor(Math.random() * 100);
    @type("number")
    y: number = Math.floor(Math.random() * 100);

    //block list?

    //block list index??
    @type(NarioBoard)
    myBoard: NarioBoard;
}

export class PixiState extends Schema {
    @type({ map: NarioPlayer })
    players = new MapSchema<NarioPlayer>();

    @nosync
    something = "This attribute won't be sent to the client-side";

    createPlayer (id: string) {
        this.players[ id ] = new NarioPlayer();
    }

    removePlayer (id: string) {
        delete this.players[ id ];
    }

    movePlayer (id: string, movement: any) {
        if (movement.x) {
            this.players[ id ].x += movement.x * 10;

        } else if (movement.y) {
            this.players[ id ].y += movement.y * 10;
        }
    }
}

export class NarioGame extends Schema{
    @type({ map: NarioPlayer })
    players = new MapSchema<NarioPlayer>();

    @type("number")
    virusCount: number;

    @type(NarioBoard)
    startBoard: NarioBoard;

    constructor(virusCount: number) {
        super();
        this.virusCount = virusCount;

        this.startBoard = new NarioBoard(this.virusCount);
    }

    
    @nosync
    something = "This attribute won't be sent to the client-side";

    createPlayer (id: string) {
        this.players[ id ] = new NarioPlayer();
    }

    removePlayer (id: string) {
        delete this.players[ id ];
    }

    movePlayer (id: string, movement: any) {
        if (movement.x) {
            this.players[ id ].x += movement.x * 10;

        } else if (movement.y) {
            this.players[ id ].y += movement.y * 10;
        }
    }
}


export class PixiStateHandlerRoom extends Room<PixiState> {
    onCreate (options) {
        console.log("StateHandlerRoom created!", options);

        this.setState(new NarioGame(20));
    }

    onJoin (client: Client) {
        this.state.createPlayer(client.sessionId);
    }

    onLeave (client: Client, consented: boolean) {
        this.state.removePlayer(client.sessionId);
    }

    onMessage (client: Client, data) {
        console.log("StateHandlerRoom received message from", client.sessionId, ":", data);
        this.state.movePlayer(client.sessionId, data);
    }

    onDispose () {
        console.log("Dispose Room");
    }

}

