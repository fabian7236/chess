import { Board } from "./Board";
import type { Piece, Position } from "./Piece";

export class Pawn implements Piece {
    readonly value: number = 1;
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
        this.symbolWhite = "♙";
        this.symbolBlack = "♟";
    }

    public move(newPosition: Position): boolean {
        this.position = newPosition;
        this.positionHistory.push(newPosition);
        return true;
    }

    public calculateValidMoves(board: Board): Position[] {
        const moves: Position[] = [];
        const direction = this.isWhite ? -1 : 1;
        const oneStep: Position = { x: this.position.x, y: this.position.y + direction };
        if (!board.isFieldOccupied(oneStep)) {
            moves.push(oneStep);
            const isAtStart = (this.isWhite && this.position.y === 6) || (!this.isWhite && this.position.y === 1);
            const twoSteps: Position = { x: this.position.x, y: this.position.y + 2 * direction };
            if (isAtStart && !board.isFieldOccupied(twoSteps)) {
                moves.push(twoSteps);
            }
        }
        const diagonalLeft: Position = { x: this.position.x-1, y: this.position.y + direction }
        const diagonalRight: Position = { x: this.position.x+1, y: this.position.y + direction }

        const checkCapture = (targetPos: Position) => {
            const targetPiece = board.getPieceAt(targetPos);
            if (targetPiece && targetPiece.isWhite !== this.isWhite) {
                moves.push(targetPos);
            }
        };
        checkCapture(diagonalLeft);
        checkCapture(diagonalRight);
        return moves;
    }
}