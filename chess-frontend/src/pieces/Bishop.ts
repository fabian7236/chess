import { Board } from "./Board";
import type { Piece, Position } from "./Piece";

export class Bishop implements Piece {
    readonly value: number = 3;
    position: Position;
    isWhite: boolean;
    isAlive: boolean = true;
    positionHistory: Position[];
    symbolWhite: string;
    symbolBlack: string;


    constructor(position: Position, isWhite: boolean) {
        this.position = position;
        this.isWhite = isWhite;
        this.positionHistory = [position];
        this.symbolWhite = "♗";
        this.symbolBlack = "♝";
    }

    public move(newPosition: Position): boolean {
        this.position = newPosition;
        this.positionHistory.push(newPosition);
        return true;
    }

    public getValidMoves(board: Board): Position[] {
        const moves: Position[] = [];
        const modfiers: number[][] = [[1, 1], [-1, 1], [1, -1], [-1, -1]]
        for (let modifier of modfiers) {
            let i = 1;
            while (this.pushMove(board, { x: this.position.x + i * modifier[0], y: this.position.y + i * modifier[1]}, moves)) {
                i++
            }
        }
        return moves;
    }

    private pushMove(board: Board, nextPosition: Position, moves: Position[]) {
        if (!board.squareInBound(nextPosition)) {
            return false
        }
        let nextSquare = board.getPieceAt(nextPosition)
        if (nextSquare != null) {
            if (this.isWhite != nextSquare.isWhite) {
                moves.push(nextPosition)
            }
            return false
        } else {
            moves.push(nextPosition)
            return true
        }
    }

}