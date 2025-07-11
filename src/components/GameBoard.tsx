import { useState } from "react";
import { Board } from "../pieces/Board";
import type { Position } from "../pieces/Piece";

const GameBoard = () => {
  const [board, setBoard] = useState(() => {
    const initialBoard = new Board();
    initialBoard.initBoard();
    return initialBoard;
  });

  const [rotated, setRotated] = useState(false);

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

        const isWhiteTurn = newBoardState.isWhiteTurn();
        if (newBoardState.isCheckmate(isWhiteTurn)) {
          alert(`Checkmate! ${isWhiteTurn ? 'Black' : 'White'} wins.`);
        } else if (newBoardState.isStalemate(isWhiteTurn)) {
          alert('Stalemate! The game is a draw.');
        }

        return;
      }

      if (clickedPiece && clickedPiece.isWhite === selectedPiece.isWhite) {
        setSelectedPiecePosition(clickedPosition);
        setHighlightedMoves(clickedPiece.calculateValidMoves(board));
        return;
      }

      setSelectedPiecePosition(null);
      setHighlightedMoves([]);

    } else if (clickedPiece) {
      if (clickedPiece.isWhite === board.isWhiteTurn()) {
        setSelectedPiecePosition(clickedPosition);
        const validMoves = clickedPiece.calculateValidMoves(board);
        setHighlightedMoves(validMoves);
      }
    }
  };

  const rotateBoard = (): void => {
    setRotated(!rotated)
  }


  return (
    <div className="game-container flex justify-center items-center flex-col">
      <div className="hover:cursor-pointer w-24 h-12 m-8 text-2xl border-2 rounded-2xl flex justify-center items-center" onMouseDown={(e) => e.preventDefault()}
        onClick={() => rotateBoard()}>Rotate</div>
      <div className={rotated ? 'rotate-180' : ''}>
        <div id="board" className="board grid grid-cols-8 w-max border-2 border-gray-800">
          {board.getGrid().map((row, rowIndex) =>
            row.map((piece, colIndex) => {
              const currentPos = { x: colIndex, y: rowIndex };
              const isHighlighted = highlightedMoves.some(m => m.x === currentPos.x && m.y === currentPos.y);
              return (
                <div className={rotated ? 'rotate-180' : ''}>
                  <div key={`${rowIndex}-${colIndex}`}
                    className={`w-16 h-16 flex items-center justify-center text-4xl cursor-pointer ${(rowIndex + colIndex) % 2 === 0 ? "bg-white dark:bg-black" : "bg-blue-400 dark:bg-blue-800"}`}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleSquareClick(currentPos)}>
                    <div className="absolute">{piece && (piece.isWhite ? piece.symbolWhite : piece.symbolBlack)}</div>
                    <div className="absolute">{isHighlighted ? "◯" : ""}</div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
