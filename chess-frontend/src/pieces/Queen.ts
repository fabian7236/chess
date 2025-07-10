import { Board } from "./Board";
import type { Piece, Position } from "./Piece";

export class Queen implements Piece {
    readonly value: number = 9;
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
        this.symbolWhite = "♕";
        this.symbolBlack = "♛";
    }

    public move(newPosition: Position): boolean {
        this.position = newPosition;
        this.positionHistory.push(newPosition);
        return true;
    }

    getAttackedSquares(board: Board): Position[] {
        return this.calculateMoves(board, true)
    }


    public calculateValidMoves(board: Board): Position[] {
        return this.calculateMoves(board, false).filter(move => board.isMoveLegal(this.position, move));
    }

    public calculateMoves(board: Board, includeOwn: boolean): Position[] {
        const moves: Position[] = [];
        let x = this.position.x
        let y = this.position.y
        // Check to right
        while (this.pushMove(board, { x: x + 1, y: y }, moves, includeOwn)) {
            x++
        }
        x = this.position.x
        // Check to left
        while (this.pushMove(board, { x: x + -1, y: y }, moves, includeOwn)) {
            x--
        }
        x = this.position.x
        // Check to Bottom
        while (this.pushMove(board, { x: x, y: y + 1 }, moves, includeOwn)) {
            y++
        }
        y = this.position.y
        // Check to Top
        while (this.pushMove(board, { x: x, y: y - 1 }, moves, includeOwn)) {
            y--
        }
        // Do Bishop Moves
        const modfiers: number[][] = [[1, 1], [-1, 1], [1, -1], [-1, -1]]
        for (let modifier of modfiers) {
            let i = 1;
            while (this.pushMove(board, { x: this.position.x + i * modifier[0], y: this.position.y + i * modifier[1]}, moves, includeOwn)) {
                i++
            }
        }
        return moves;
    }

    private pushMove(board: Board, nextPosition: Position, moves: Position[], includeOwn: boolean) {
        if (!board.squareInBound(nextPosition)) {
            return false
        }
        let nextSquare = board.getPieceAt(nextPosition)
        if (nextSquare != null) {
            if (this.isWhite != nextSquare.isWhite || includeOwn) {
                moves.push(nextPosition)
            } 
            return false
        } else {
            moves.push(nextPosition)
            return true
        }
    }


    
}