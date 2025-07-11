import { Board } from "./Board";
import type { Piece, Position } from "./Piece";
import { Rook } from "./Rook";

export class King implements Piece {
    readonly value: number = 0;
    position: Position;
    isWhite: boolean;
    isAlive: boolean = true;
    positionHistory: Position[];
    symbolWhite: string;
    symbolBlack: string;
    hasMoved: boolean = false;
    castleLeftSquares: Position[] = []
    castleRightSquares: Position[] = []

    constructor(position: Position, isWhite: boolean) {
        this.position = position;
        this.isWhite = isWhite;
        this.positionHistory = [position];
        this.symbolWhite = "♔";
        this.symbolBlack = "♚";
        this.initCastleSquares()
    }

    private initCastleSquares() {
        const x = this.position.x;
        const y = this.position.y;
        for (let i = 1; i < 4; i++) {
            this.castleLeftSquares.push({ x: x - i, y: y })
            this.castleRightSquares.push({ x: x + i, y: y })
        }
        this.castleRightSquares.pop()
    }

    public move(newPosition: Position): boolean {
        this.position = newPosition;
        this.positionHistory.push(newPosition);
        this.hasMoved = true;
        return true;
    }

    public calculateValidMoves(board: Board): Position[] {
        const pseudoMoves: Position[] = this.getAttackedSquares(board)
        if (!this.hasMoved) { // Check if Castling is allowed
            const leftRook = board.getPieceAt({ x: this.position.x + 3, y: this.position.y })
            const rightRook = board.getPieceAt({ x: this.position.x - 4, y: this.position.y })
            if (this.isCastlingAllowed(board, leftRook, this.castleLeftSquares)) {
                pseudoMoves.push({x: this.position.x - 2, y: this.position.y})
            }
            if (this.isCastlingAllowed(board, rightRook, this.castleRightSquares)) {
                pseudoMoves.push({x: this.position.x + 2, y: this.position.y})
            }
        }
        return pseudoMoves.filter(move => board.isMoveLegal(this.position, move));
    }

    private isCastlingAllowed(board: Board, rook: Rook | null | Piece, castlingSquares: Position[]): boolean {
        if (!(rook instanceof Rook)) {
            return false
        } else if (rook.hasMoved) {
            return false

        } else {
            const attackedSquares: Position[] = this.isWhite ? board.attackedByBlack : board.attackedByWhite;
            for (const square of castlingSquares) {
                if (board.getPieceAt(square) != null || attackedSquares.includes(square)) { // Check for each square that no piece is in the way and square isn't attacjed
                    return false
                }
            }
            return true;
        }
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

    public getAttackedSquares(board: Board): Position[] {
        const moves: Position[] = [];
        this.pushMove(board, { x: this.position.x + 1, y: this.position.y + 1 }, moves);
        this.pushMove(board, { x: this.position.x + 1, y: this.position.y - 1 }, moves);
        this.pushMove(board, { x: this.position.x - 1, y: this.position.y + 1 }, moves);
        this.pushMove(board, { x: this.position.x - 1, y: this.position.y - 1 }, moves);
        this.pushMove(board, { x: this.position.x + 1, y: this.position.y }, moves);
        this.pushMove(board, { x: this.position.x - 1, y: this.position.y }, moves);
        this.pushMove(board, { x: this.position.x, y: this.position.y + 1 }, moves);
        this.pushMove(board, { x: this.position.x, y: this.position.y - 1 }, moves);
        return moves;
    }
}