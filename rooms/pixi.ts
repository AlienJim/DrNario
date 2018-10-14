import { Room, EntityMap, Client, nosync } from "colyseus";

export class PixiState {
    players: EntityMap<PixiPlayer> = {};

    @nosync
    something = "This attribute won't be sent to the client-side";

    createPlayer (id: string) {
        this.players[ id ] = new PixiPlayer();
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

export class PixiPlayer {
    x = Math.floor(Math.random() * 400);
    y = Math.floor(Math.random() * 400);

    myBoard: NarioBoard;
}

class NarioGame {
    players: EntityMap<PixiPlayer>;
    virusCount: number;

    startBoard: NarioBoard;

    constructor(players: EntityMap<PixiPlayer>, virusCount: number) {
        this.players = players;
        this.virusCount = virusCount;

        this.startBoard = new NarioBoard(this.virusCount);
    }
}

export class NarioBoard {
    //board starts at top left
    //each number represents a color
    //- numbers are viuses!
    //0 - nothing
    //1 - red
    //2 - blue
    //3 - yellow

    @nosync
    board: Int8Array;

    exportedBoard: number;
    
    constructor(virusCount: number) {
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

export class PixiStateHandlerRoom extends Room<PixiState> {
    onInit (options) {
        console.log("StateHandlerRoom created!", options);

        this.setState(new PixiState());
    }

    onJoin (client) {
        this.state.createPlayer(client.sessionId);
    }

    onLeave (client) {
        this.state.removePlayer(client.sessionId);
    }

    onMessage (client, data) {
        console.log("StateHandlerRoom received message from", client.sessionId, ":", data);
        this.state.movePlayer(client.sessionId, data);
    }

    onDispose () {
        console.log("Dispose StateHandlerRoom");
    }

}

