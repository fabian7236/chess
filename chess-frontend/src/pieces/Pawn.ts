import type { Piece, Position } from "./Piece";

export class Pawn implements Piece {
    value: number;
    position: Position;
    isWhite: boolean;
    isAlive: boolean;
    positionHistory: Position[];
    possibleMoves: Position[];

    constructor(value: number, position: Position, isWhite: boolean, isAlive: boolean) {
        this.value = value;
        this.position = position;
        this.isWhite = isWhite;
        this.isAlive = isAlive;
        this.positionHistory = []
        this.possibleMoves = [{x: position.x, y: position.y+1},{x: position.x, y: position.y+2}];
    }

    public move(newPosition: Position): boolean {
        return true
    }

    private findPossibleMoves(position: Position): Position[] {
        
        return []
    }

    

}