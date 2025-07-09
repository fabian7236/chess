import { useState } from "react";
import { Board } from "../pieces/Board";
import type { Position } from "../pieces/Piece";

const GameBoard = () => {

  const [board, setBoard] = useState(() => {
    const initialBoard = new Board();
    initialBoard.initBoard();
    return initialBoard;
  });

  const handleSquareClick = (position: Position) => {
    console.log("Clicked on square:", position);
    // TODO: Implement game logic interaction here.
    // 1. Call a method on your board instance to handle the click.
    //    This method should return a *new* board instance with the updated state.
    //    e.g., const newBoardState = board.handleSquareClick(position);
    // 2. Update the React state to trigger a re-render with the new board.
    //    setBoard(newBoardState);
  };

  return (
    <div className="game-container">
      <h1>Chess</h1>
      <div className="board">
        {/* You'll need a method like `getGrid()` on your Board class to render it. */}
        {/* {board.getGrid().map((row, rowIndex) =>
          row.map((piece, colIndex) => <div key={`${rowIndex}-${colIndex}`} className="square"></div>)
        )} */}
      </div>
    </div>
  );
};

export default GameBoard;
