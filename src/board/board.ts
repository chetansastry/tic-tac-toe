import { times, range } from "lodash-es";

export const BOARD_SIZE = 3;
export const ROW_INDICES = range(BOARD_SIZE).map(
  (offset) => range(offset * BOARD_SIZE, (offset + 1) * BOARD_SIZE)
);
export const COL_INDICES = range(BOARD_SIZE).map(
  (offset) => range(offset, BOARD_SIZE * BOARD_SIZE, BOARD_SIZE)
);
export const DIAGONALS = [
  range(0, BOARD_SIZE * BOARD_SIZE, BOARD_SIZE + 1),
  range(BOARD_SIZE - 1, BOARD_SIZE * BOARD_SIZE - 1, BOARD_SIZE - 1)
];

const WIN_OFFSETS = [
  ...ROW_INDICES,
  ...COL_INDICES,
  ...DIAGONALS
];

/* 
  A board is represented as a flattened (1-dimensional) array of cell values, which
  can be 0, 1 or -1.
    0 - empty cell
   -1 - a human player move
    1 - a computer player move
*/
export enum Player {
  HUMAN = -1,
  COMPUTER = 1
}

export enum BoardStatus {
  HUMAN_WINNER,
  COMPUTER_WINNER,
  DRAW,
  IN_PROGRESS
}

// the board type alias
export type Board = number[];

// initialize an empty board (of all zeros)
export const getEmptyBoard = (): Board =>
  times(BOARD_SIZE * BOARD_SIZE, () => 0);

// available moves are the offsets that have 0 value
export const getMoves = (board: Board): number[] => 
  board.reduce(
    (acc, val, idx) => val === 0 ? [ ...acc, idx ] : acc, 
    [] as number[]);

// make the given move for the given player and return the new board state
export const makeMove = (board: Board, position: number, player: Player): Board => {
  if (board[position] !== 0) {
    throw new Error(`Not a valid move for postion: ${position}, board: ${board}`);
  }
  const copy = [...board];
  copy[position] = player;
  return copy;
};

export const getBoardStatus = (board: Board): BoardStatus => {
  // if any of the win offset positions add up to the +/-BOARD_SIZE, we have a winner
  for (let offsets of WIN_OFFSETS) {
    const sum = offsets.reduce((acc, offset) => acc + board[offset],0);
    if (sum === BOARD_SIZE) {
      return BoardStatus.COMPUTER_WINNER;
    } else if (sum === -BOARD_SIZE) {
      return BoardStatus.HUMAN_WINNER;
    }
  }
  // no more moves can be made and no winner, hence must be draw
  if (getMoves(board).length === 0) {
    return BoardStatus.DRAW;
  }
  // no winner yet, but still in progress
  return BoardStatus.IN_PROGRESS;
}

// for testing purpose only, parses a 3x3 grid of '.', 'o' and 'x' into a game board
// where , is empty, x is human, o is computer
export const parseBoard = (str: string): Board =>
  str
    .replace(/[^.ox]/g, '')
    .split('')
    .map((char) => char === '.' ? 0 : char === 'o' ? Player.COMPUTER : Player.HUMAN );

export const printBoard = (board: Board): string =>
  board
    .map((cell) => cell === 0 ? '.': cell === Player.COMPUTER? 'o': 'x')
    .join('')
    .replace(new RegExp(`(.{${BOARD_SIZE}})`, 'g'), '$1\n')