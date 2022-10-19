import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

function Restart({ onClick }) {
  return (
    <button className="restart" onClick={onClick}>
      Play Again
    </button>
  );
}

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null)); //[null,null,null,...]
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(squares);

  function getGameStatus() {
    if (winner) {
      return "Winner: " + winner;
    } else if (isBoardFull(squares)) {
      return "No Winner";
    } else {
      return "Next Player: " + (isXNext ? "X" : "0");
    }
  }

  function renderSquare(i) {
    return (
      <Square
        value={squares[i]}
        onClick={() => {
          const nextSquares = squares.slice();
          console.log("nextSquares", nextSquares);
          nextSquares[i] = isXNext ? "X" : "O";
          setSquares(nextSquares);
          setIsXNext(!isXNext);
        }}
      />
    );
  }

  function renderRestartButton() {
    return (
      <Restart
        onClick={() => {
          setSquares(Array(9).fill(null));
          setIsXNext(true);
        }}
      />
    );
  }

  return (
    <div className="container">
      <div className="game">
        <div className="game-board">
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>
        <div className="game-info">{getGameStatus()}</div>
        <div className="restart-button">{renderRestartButton()}</div>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const possibleLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  //check all possible winning lines and check if they have thre in a row of either x or o
  for (let i = 0; i < possibleLines.length; i++) {
    const [a, b, c] = possibleLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function isBoardFull(squares) {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] == null) {
      return false;
    }
  }
  return true;
}

ReactDOM.render(<Game />, document.getElementById("root"));