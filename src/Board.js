import { useEffect, useState } from "react";
import Box from "./Box";
import { bestMove, winnerOf } from "./tictactoe-ai";

export default function Board() {
  const [board, setBoard] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  const [currentPlayer, setCurrentPlayer] = useState(0);

  useEffect(() => {
    startNewGame();
  }, []);

  useEffect(() => {
    if (currentPlayer === 1) {
      aiMove();
    }
  }, [currentPlayer]);

  function startNewGame() {
    setBoard([null, null, null, null, null, null, null, null, null]);
    const firstPlayer = Math.floor(Math.random() * 2);
    setCurrentPlayer(firstPlayer);
  }

  function aiMove() {
    const bestMoves = bestMove({ player: 1, board });
    const randomMove = bestMoves[Math.floor(Math.random() * bestMoves.length)];
    setBoard((prevBoard) =>
      prevBoard.map((box, index) =>
        randomMove === index ? currentPlayer : box
      )
    );
    setCurrentPlayer(0);
  }

  function handleClick(i) {
    if (currentPlayer === 0 && board[i] === null && !detectWinner()) {
      setBoard((prevBoard) =>
        prevBoard.map((box, index) => (i === index ? currentPlayer : box))
      );
      setCurrentPlayer(1);
    }
    return;
  }

  function detectWinner() {
    const score = winnerOf({ player: currentPlayer, board });
    switch (score) {
      case 1:
        return "You win!";
      case -1:
        return "You lose!";
      case 0:
        return "Draw game";
      case null:
        return null;
      default:
        return null;
    }
  }

  return (
    <>
      <div className="board">
        {board.map((box, i) => (
          <Box key={i} id={i} occupiedBy={box} handleClick={handleClick} />
        ))}
      </div>

      <button style={{ marginTop: 20 }} onClick={() => startNewGame()}>
        New game
      </button>
      <div>{detectWinner()}</div>
    </>
  );
}
