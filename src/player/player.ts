import { Board, getMoves, getBoardStatus, BoardStatus, makeMove, Player } from "../board";

export const makeBestMove = (board: Board): Board => {
  if (getMoves(board).length === 0) {
    throw new Error('No moves available to make')
  }
  const [_, bestMove] = minimax(board);
  return makeMove(board, bestMove, Player.COMPUTER);
}

/*
 Minimax based on https://www.youtube.com/watch?v=l-hh51ncgDI
 Modified to add a depth penalty - given two paths valued equally, choose the shortest
 No Alpha-Beta pruning implemented since it's a pretty small state space
*/
const minimax = (board: Board, depth = 0, computerPlayer = true): [number, number] => {
  const status = getBoardStatus(board);
  if (status === BoardStatus.DRAW) {
    return [0, NaN];
  } else if (status === BoardStatus.COMPUTER_WINNER) {
    return [100, NaN];
  } else if (status === BoardStatus.HUMAN_WINNER) {
    return [-100, NaN];
  }
  const player = computerPlayer ? Player.COMPUTER : Player.HUMAN;
  const moves = getMoves(board);
  if (computerPlayer) {
    return moves.reduce((currentMax, move) => {
      const [value, __] = minimax(makeMove(board, move, player), depth + 1, false);
      return (value > currentMax[0]) ? [value - depth, move] : currentMax;
    }, [-Infinity, NaN]);
  } else {
    return moves.reduce((currentMin, move) => {
      const [value, __] = minimax(makeMove(board, move, player), depth + 1, true);
      return (value < currentMin[0]) ? [value + depth, move] : currentMin;
    }, [Infinity, NaN]);
  }
}