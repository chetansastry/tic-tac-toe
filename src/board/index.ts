import { Board } from './board';
export { getEmptyBoard, getMoves, makeMove, getBoardStatus, Player, BoardStatus, } from './board';
export type Board = Board; // babel workaround (https://github.com/Microsoft/TypeScript/issues/28481)