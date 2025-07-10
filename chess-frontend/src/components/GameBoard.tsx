import { useState } from "react";
import { Board } from "../pieces/Board";
import type { Piece, Position } from "../pieces/Piece";

const GameBoard = () => {
  const [board, setBoard] = useState(() => {
    const initialBoard = new Board();
    initialBoard.initBoard();
    return initialBoard;
  });

  const [selectedPiecePosition, setSelectedPiecePosition] = useState<Position | null>(null);
  const [highlightedMoves, setHighlightedMoves] = useState<Position[]>([]);

  const handleSquareClick = (clickedPosition: Position) => {
    const clickedPiece = board.getPieceAt(clickedPosition);
    const selectedPiece = selectedPiecePosition
      ? board.getPieceAt(selectedPiecePosition)
      : null;

    if (selectedPiece) {
      const isMoveValid = highlightedMoves.some(m => m.x === clickedPosition.x && m.y === clickedPosition.y);
      
      if (isMoveValid) {
        const newBoardState = board.movePiece(selectedPiecePosition!, clickedPosition);
        setBoard(newBoardState);
        setSelectedPiecePosition(null);
        setHighlightedMoves([]);
        return;
      }

      if (clickedPiece && clickedPiece.isWhite === selectedPiece.isWhite) {
        setSelectedPiecePosition(clickedPosition);
        setHighlightedMoves(clickedPiece.getValidMoves(board));
        return;
      }

      setSelectedPiecePosition(null);
      setHighlightedMoves([]);

    } else if (clickedPiece) {
      if (true) {
        setSelectedPiecePosition(clickedPosition);
        const validMoves = clickedPiece.getValidMoves(board);
        setHighlightedMoves(validMoves);
      }
    }
  };

  return (
    <div className="game-container">
      <div className="board grid grid-cols-8 w-max border-2 border-gray-800">
        {board.getGrid().map((row, rowIndex) =>
          row.map((piece, colIndex) => {
            const currentPos = { x: colIndex, y: rowIndex };
            const isHighlighted = highlightedMoves.some(m => m.x === currentPos.x && m.y === currentPos.y);
            return (
              <div key={`${rowIndex}-${colIndex}`}
                   className={`w-16 h-16 flex items-center justify-center text-4xl cursor-pointer ${ (rowIndex + colIndex) % 2 === 0 ? "bg-slate-200" : "bg-green-700" }`}
                   onMouseDown={(e) => e.preventDefault()}
                   onClick={() => handleSquareClick(currentPos)}>
                <div className="absolute">{piece && (piece.isWhite ? piece.symbolWhite : piece.symbolBlack)}</div>
                <div className="absolute">{isHighlighted ? "◯" : ""}</div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default GameBoard;
