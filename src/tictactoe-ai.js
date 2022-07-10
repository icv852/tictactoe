function boardFull(game) {
  return game.board.every((e) => e !== null);
}

function max(arr) {
  if (arr.length === 1) return arr[0];
  return arr.reduce((a, b) => Math.max(a, b));
}
function min(arr) {
  if (arr.length === 1) return arr[0];
  return arr.reduce((a, b) => Math.min(a, b));
}
function availableMoves(game) {
  return game.board
    .map((box, index) => {
      if (box === null) {
        return index;
      }
      return null;
    })
    .filter((e) => e !== null);
}
function applyMove(game, move) {
  let newBoard = [...game.board];
  newBoard[move] = game.player;
  return {
    board: newBoard,
    player: 1 - game.player,
  };
}
function printBoard(game) {
  const board = game.board;
  console.log(board.slice(0, 3));
  console.log(board.slice(3, 6));
  console.log(board.slice(6, 9));
}
export function winnerOf(game) {
  // you win -> 1
  // you lose -> -1
  // draw -> 0
  // not finished -> null
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const hasWinner = winPatterns.some(
    (p) =>
      game.board[p[0]] !== null &&
      game.board[p[0]] === game.board[p[1]] &&
      game.board[p[1]] === game.board[p[2]]
  );
  if (hasWinner) {
    return game.player === 1 ? 1 : -1;
  } else if (boardFull(game)) {
    return 0;
  }
  return null;
}
function isGameover(game) {
  return winnerOf(game) !== null;
}
function isYourTurn(game) {
  return game.player === 0;
}

function minimax(game) {
  if (isGameover(game)) {
    return winnerOf(game);
  } else {
    const scores = availableMoves(game)
      .map((move) => applyMove(game, move))
      .map(minimax);
    if (isYourTurn(game)) {
      return max(scores);
    } else {
      return min(scores);
    }
  }
}

export function bestMove(game) {
  const possibleMoves = availableMoves(game)
    .map((move) => applyMove(game, move))
    .map(minimax);

  const bestMoves = availableMoves(game).filter((_, i) => {
    return possibleMoves[i] === -1;
  });

  const middleMoves = availableMoves(game).filter((_, i) => {
    return possibleMoves[i] === 0;
  });

  const badMoves = availableMoves(game).filter((_, i) => {
    return possibleMoves[i] === 1;
  });

  if (bestMoves.length > 0) {
    return bestMoves;
  } else if (middleMoves.length > 0) {
    return middleMoves;
  } else {
    return badMoves;
  }
}

/*
minimax_ = minimax
minimax = function (...args) {
  try {

    return minimax_(...args)
  } catch (e) {
    console.error("error on this input", JSON.stringify(args, null, 4), e)
    throw e
  }
}
*/

// function trace(fn) {
//   return (...args) => {
//     console.log("CALL", fn.name, "ARGS", JSON.stringify(args))
//     const ret = fn(...args)
//     console.log("CALL", fn.name, "ARGS", JSON.stringify(args), "RETURNS", JSON.stringify(ret))

//     return ret
//   }
// }

// function fmt(p) {
//   return p === null ? " " : (p ? "o" : "x")
// }

// function debugMove(game) {
//   for (const m of availableMoves(game)) {
//     const g2 = applyMove(game, m)
//     const score = minimax(g2)
//     console.log(`
//     ------ score=${score} move=${m}
//     ${fmt(g2.board[0])} ${fmt(g2.board[1])} ${fmt(g2.board[2])}
//     ${fmt(g2.board[3])} ${fmt(g2.board[4])} ${fmt(g2.board[5])}
//     ${fmt(g2.board[6])} ${fmt(g2.board[7])} ${fmt(g2.board[8])}
//     ------
//     `)
//   }
// }

// minimax = trace(minimax)

// const testcases = [
//   {
//     name: "case 1",
//     input: {"board":[0,null,1,null,0,null,null,1,0],"player":1},
//     output: 1,
//   },
//   {
//     name: "case 2",
//     input: {"board":[0,0,0,1,1,null,null,null,null],"player":1},
//     output: 1,
//   },
//   {
//     name: "case 3",
//     input: {"board":[1,1,1,0,0,null,0,null,null],"player":0},
//     output: -1,
//   }
// ]

// for (const tc of testcases) {
//   if (winnerOf(tc.input) !== tc.output) {
//     throw new Error(tc.name + " failed")
//   }
// }

// game = {player: 0, board: [null, null, null, null, null, null, null, null, null]}
// game = applyMove(game, 4)

// debugMove(game)
