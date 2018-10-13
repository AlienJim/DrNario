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