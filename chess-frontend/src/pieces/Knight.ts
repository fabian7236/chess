import { Board } from "./Board";
import type { Piece, Position } from "./Piece";

export class Knight implements Piece {
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
        this.symbolWhite = "♘";
        this.symbolBlack = "♞";
    }

    public move(newPosition: Position): boolean {
        this.position = newPosition;
        this.positionHistory.push(newPosition);
        return true;
    }

    public getAttackedSquares(board: Board): Position[] {
        return this.calculateMoves(board, true);
    }

    public calculateValidMoves(board: Board): Position[] {
        return this.calculateMoves(board, false).filter(move => board.isMoveLegal(this.position, move));
    }

    private calculateMoves(board: Board, includeOwn: boolean): Position[] {
        const moves: Position[] = [];
        this.pushMove(board, {x: this.position.x+2, y: this.position.y+1}, moves, includeOwn)
        this.pushMove(board, {x: this.position.x+2, y: this.position.y-1}, moves, includeOwn)
        this.pushMove(board, {x: this.position.x+1, y: this.position.y+2}, moves, includeOwn)
        this.pushMove(board, {x: this.position.x+1, y: this.position.y-2}, moves, includeOwn)
        this.pushMove(board, {x: this.position.x-1, y: this.position.y+2}, moves, includeOwn)
        this.pushMove(board, {x: this.position.x-1, y: this.position.y-2}, moves, includeOwn)
        this.pushMove(board, {x: this.position.x-2, y: this.position.y+1}, moves, includeOwn)
        this.pushMove(board, {x: this.position.x-2, y: this.position.y-1}, moves, includeOwn)
        return moves
    }

    private pushMove(board: Board, nextPosition: Position, moves: Position[], includeOwn: boolean) {
        if (!board.squareInBound(nextPosition)) {
            return
        }
        let nextSquare = board.getPieceAt(nextPosition)
        if (nextSquare != null) {
            if (this.isWhite != nextSquare.isWhite || includeOwn) {
                moves.push(nextPosition)
            }
        } else {
            moves.push(nextPosition)
        }
    }
}