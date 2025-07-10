import { Pawn } from "./Pawn";
import type { Piece, Position } from "./Piece";

export class Board {  

  private grid: (Piece | null)[][];

  constructor() {
    this.grid = Array(8)
      .fill(null)
      .map(() => Array(8).fill(null));
  }

  public getGrid(): (Piece | null)[][] {
    return this.grid;
  }

  public initBoard(): void {
    for (let i = 0; i < 8; i++) {
      this.grid[6][i] = new Pawn({ x: i, y: 6 }, true);
      this.grid[1][i] = new Pawn({ x: i, y: 1 }, false); 
    }
  }

  public getPieceAt(position: Position): Piece | null {
    if (position.y < 0 || position.y >= 8 || position.x < 0 || position.x >= 8) {
      return null; 
    }
    return this.grid[position.y][position.x];
  }

  public isFieldOccupied(position: Position): boolean {
    return this.getPieceAt(position) !== null;
  }

  public clone(): Board {
    const newBoard = new Board();
    newBoard.grid = this.grid.map(row => {
      return row.map(piece => {
        // If there's a piece, create a new instance of it to avoid mutation
        return piece ? Object.create(Object.getPrototypeOf(piece), Object.getOwnPropertyDescriptors(piece)) : null;
      });
    });
    return newBoard;
  }

  public movePiece(from: Position, to: Position): Board {
    const newBoard = this.clone();
    const piece = newBoard.getPieceAt(from);
    if (piece) {
      piece.move(to); // Update the piece's internal state
      newBoard.grid[to.y][to.x] = piece;
      newBoard.grid[from.y][from.x] = null;
    }
    return newBoard;
  }
}
