import { Board } from "./Board";
import type { Piece, Position } from "./Piece";

export class King implements Piece {
    readonly value: number = 5;
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
        this.symbolWhite = "♔";
        this.symbolBlack = "♚";
    }

    public move(newPosition: Position): boolean {
        this.position = newPosition;
        this.positionHistory.push(newPosition);
        return true;
    }

    public getValidMoves(board: Board): Position[] {
        const moves: Position[] = [];
        this.pushMove(board, { x: this.position.x + 1, y: this.position.y + 1 }, moves)
        this.pushMove(board, { x: this.position.x + 1, y: this.position.y - 1 }, moves)
        this.pushMove(board, { x: this.position.x - 1, y: this.position.y + 1 }, moves)
        this.pushMove(board, { x: this.position.x - 1, y: this.position.y - 1 }, moves)
        this.pushMove(board, { x: this.position.x + 1, y: this.position.y }, moves)
        this.pushMove(board, { x: this.position.x - 1, y: this.position.y }, moves)
        this.pushMove(board, { x: this.position.x, y: this.position.y + 1 }, moves)
        this.pushMove(board, { x: this.position.x, y: this.position.y - 1 }, moves)
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