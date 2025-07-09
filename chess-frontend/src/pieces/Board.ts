import type { Piece, Position } from "./Piece"

export class Board {

    piecePosition: Map<Position, Piece | undefined> = new Map()
    
    // Array of Y coordinates at X position
    public initBoard() {
        for (let xPos = 0; xPos < 8; xPos++) {   
            for (let yPos = 0; yPos < 8; yPos++) {
                this.piecePosition.set({x: xPos, y: yPos}, undefined)
            }
        }    
    }

}
