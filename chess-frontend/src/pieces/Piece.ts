export interface Piece {
    value: number
    position: Position
    positionHistory: Position[]
    isWhite: boolean
    isAlive: boolean
    possibleMoves: Position[]
    move(newPosition: Position): boolean    
}

export interface Position {
    x: number
    y: number
}