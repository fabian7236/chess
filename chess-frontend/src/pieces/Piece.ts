import { Board } from "./Board";

export interface Piece {
    value: number
    position: Position
    positionHistory: Position[]
    isWhite: boolean
    isAlive: boolean
    symbolWhite: string
    symbolBlack: string
    move(newPosition: Position): boolean
    calculateValidMoves(board: Board): Position[];
}

export interface Position {
    x: number
    y: number
}