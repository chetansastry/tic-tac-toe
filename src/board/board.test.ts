import {
  ROW_INDICES,
  COL_INDICES,
  DIAGONALS,
  getEmptyBoard,
  getMoves,
  makeMove,
  getBoardStatus,
  parseBoard,
  BoardStatus,
  Player
} from "./board";

describe("board", () => {
  test("ROW_INDICES", () => {
    expect(ROW_INDICES).toEqual([[0, 1, 2], [3, 4, 5], [6, 7, 8]]);
  });

  test("COL_INDICES", () => {
    expect(COL_INDICES).toEqual([[0, 3, 6], [1, 4, 7], [2, 5, 8]]);
  });

  test("DIAGONALS", () => {
    expect(DIAGONALS).toEqual([[0, 4, 8], [2, 4, 6]]);
  });

  test("getEmptyBoard", () => {
    expect(getEmptyBoard()).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  });

  describe("getMoves", () => {
    test("for empty board", () => {
      expect(getMoves(getEmptyBoard())).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    });
    test("for full board", () => {
      expect(
        getMoves(
          parseBoard(`
            oxo
            xox
            xox
          `)
        )
      ).toEqual([]);
    });
    test("when moves remaining", () => {
      expect(
        getMoves(
          parseBoard(`
            .xo
            x.x
            xo.
          `)
        )
      ).toEqual([0, 4, 8]);
    });
  });

  describe("makeMove", () => {
    test("valid move works", () => {
      expect(makeMove(getEmptyBoard(), 0, Player.HUMAN)).toEqual([ -1, 0, 0, 0, 0, 0, 0, 0, 0 ]);
    });
    test("invalid move throws", () => {
      expect(() =>
        makeMove(
          parseBoard(`
            x..
            ...
            ...
          `),
          0,
          Player.HUMAN
        )
      ).toThrowError(
        "Not a valid move for postion: 0, board: -1,0,0,0,0,0,0,0,0"
      );
    });
  });

  describe("getBoardStatus", () => {
    test("no winner yet", () => {
      expect(getBoardStatus(getEmptyBoard())).toBe(BoardStatus.IN_PROGRESS);
    });

    test("draw condition", () => {
      expect(
        getBoardStatus(
          parseBoard(`
            oxo
            xox
            xox
          `)
        )
      ).toEqual(BoardStatus.DRAW);
    });

    test("winning condition", () => {
      expect(
        getBoardStatus(
          parseBoard(`
            oxo
            xox
            xoo
          `)
        )
      ).toEqual(BoardStatus.COMPUTER_WINNER);
    });
  });
});
