import { Bishop } from "./Bishop";
import { King } from "./King";
import { Knight } from "./Knight";
import { Pawn } from "./Pawn";
import type { Piece, Position } from "./Piece";
import { Queen } from "./Queen";
import { Rook } from "./Rook";

export class Board {

  private grid: (Piece | null)[][];

  public attackedByWhite: Position[] = []
  public attackedByBlack: Position[] = []
  private whiteKing: Piece | undefined;
  private blackKing: Piece | undefined;

  private whiteMoves: boolean = true;

  constructor() {
    this.grid = Array(8)
      .fill(null)
      .map(() => Array(8).fill(null));
  }

  public getGrid(): (Piece | null)[][] {
    return this.grid;
  }

  public initBoard(): void {
    // Pawns
    for (let i = 0; i < 8; i++) {
      this.grid[6][i] = new Pawn({ x: i, y: 6 }, true);
      this.grid[1][i] = new Pawn({ x: i, y: 1 }, false);
    }
    // Rooks
    this.grid[7][0] = new Rook({ x: 0, y: 7 }, true);
    this.grid[7][7] = new Rook({ x: 7, y: 7 }, true);
    this.grid[0][0] = new Rook({ x: 0, y: 0 }, false);
    this.grid[0][7] = new Rook({ x: 7, y: 0 }, false);
    // Knights
    this.grid[7][1] = new Knight({ x: 1, y: 7 }, true);
    this.grid[7][6] = new Knight({ x: 6, y: 7 }, true);
    this.grid[0][1] = new Knight({ x: 1, y: 0 }, false);
    this.grid[0][6] = new Knight({ x: 6, y: 0 }, false);
    // Bishops
    this.grid[7][2] = new Bishop({ x: 2, y: 7 }, true);
    this.grid[7][5] = new Bishop({ x: 5, y: 7 }, true);
    this.grid[0][2] = new Bishop({ x: 2, y: 0 }, false);
    this.grid[0][5] = new Bishop({ x: 5, y: 0 }, false);
    // Queens
    this.grid[7][3] = new Queen({ x: 3, y: 7 }, true);
    this.grid[0][3] = new Queen({ x: 3, y: 0 }, false);
    // Kings
    this.whiteKing = new King({ x: 4, y: 7 }, true);
    this.blackKing = new King({ x: 4, y: 0 }, false);
    this.grid[7][4] = this.whiteKing;
    this.grid[0][4] = this.blackKing;

    this.calculateAttackFields();
  }

  public calculateAttackFields() {
    this.attackedByWhite = []
    this.attackedByBlack = []
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (this.grid[i][j] != null) {
          const piece = this.grid[i][j]
          if (piece?.isWhite) {
            piece.getAttackedSquares(this).forEach(position => this.attackedByWhite.push(position));
          } else {
            piece?.getAttackedSquares(this).forEach(position => this.attackedByBlack.push(position));
          }
        }
      }
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
        if (piece) {
          const newPiece = Object.create(Object.getPrototypeOf(piece));
          Object.assign(newPiece, piece);
          return newPiece;
        }
        return null;
      });
    });
    newBoard.whiteKing = this.whiteKing ? newBoard.getPieceAt(this.whiteKing.position)! : undefined;
    newBoard.blackKing = this.blackKing ? newBoard.getPieceAt(this.blackKing.position)! : undefined;
    newBoard.whiteMoves = this.whiteMoves;
    newBoard.attackedByWhite = this.attackedByWhite.map(p => ({ ...p }));
    newBoard.attackedByBlack = this.attackedByBlack.map(p => ({ ...p }));
    return newBoard;
  }

  public movePiece(from: Position, to: Position): Board {
    const newBoard = this.clone();
    const piece = newBoard.getPieceAt(from);
    if (piece) {
      if (piece instanceof Pawn && (to.y === 0 || to.y === 7)) {
        piece.move(to);
        newBoard.grid[to.y][to.x] = new Queen({ x: to.x, y: to.y }, this.whiteMoves);
        newBoard.grid[from.y][from.x] = null;
        newBoard.calculateAttackFields();
        newBoard.whiteMoves = !this.whiteMoves;
        return newBoard;
      }
      piece.move(to);
      newBoard.grid[to.y][to.x] = piece;
      newBoard.grid[from.y][from.x] = null;
      if (piece instanceof King) {
        this.handleCastling(from, to, newBoard)
      }
    }
    newBoard.calculateAttackFields();
    newBoard.whiteMoves = !this.whiteMoves;
    return newBoard;
  }


  private handleCastling(from: Position, to: Position, newBoard: Board) {
    if (to.x - from.x === -2) { // Castle Left
      const rook = newBoard.getPieceAt({ x: 0, y: from.y });
      if (rook) {
        rook.move({ x: from.x - 1, y: from.y });
        newBoard.grid[from.y][from.x - 1] = rook;
        newBoard.grid[from.y][0] = null;
      }
    } else if (to.x - from.x === 2) { // Castle Right
      const rook = newBoard.getPieceAt({ x: 7, y: from.y });
      if (rook) {
        rook.move({ x: from.x + 1, y: from.y });
        newBoard.grid[from.y][from.x + 1] = rook;
        newBoard.grid[from.y][7] = null;
      }
    }
  }

  public isWhiteTurn() {
    return this.whiteMoves;
  }

  public isKingInCheck(isWhite: boolean): boolean {
    const king = isWhite ? this.whiteKing : this.blackKing;
    if (!king) return false;
    const opponentAttacks = isWhite ? this.attackedByBlack : this.attackedByWhite;
    return opponentAttacks.some(pos => pos.x === king.position.x && pos.y === king.position.y);
  }

  public isMoveLegal(from: Position, to: Position): boolean {
    const piece = this.getPieceAt(from);
    if (!piece) return false;

    const tempBoard = this.clone();
    const pieceOnTemp = tempBoard.getPieceAt(from)!;

    pieceOnTemp.move(to);
    tempBoard.grid[to.y][to.x] = pieceOnTemp;
    tempBoard.grid[from.y][from.x] = null;

    if (pieceOnTemp.value === 0) {
      if (pieceOnTemp.isWhite) tempBoard.whiteKing = pieceOnTemp;
      else tempBoard.blackKing = pieceOnTemp;
    }

    tempBoard.calculateAttackFields();
    return !tempBoard.isKingInCheck(piece.isWhite);
  }

  public squareInBound(position: Position) {
    return position.x >= 0 && position.x < 8 && position.y >= 0 && position.y < 8;
  }

  public isCheckmate(isWhite: boolean): boolean {
    if (!this.isKingInCheck(isWhite)) {
      return false;
    }
    return !this.hasLegalMoves(isWhite);
  }

  public isStalemate(isWhite: boolean): boolean {
    if (this.isKingInCheck(isWhite)) {
      return false;
    }
    return !this.hasLegalMoves(isWhite);
  }

  private hasLegalMoves(isWhite: boolean): boolean {
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        const piece = this.getPieceAt({ x, y });
        if (piece && piece.isWhite === isWhite) {
          const validMoves = piece.calculateValidMoves(this);
          if (validMoves.length > 0) {
            return true;
          }
        }
      }
    }
    return false;
  }


}
