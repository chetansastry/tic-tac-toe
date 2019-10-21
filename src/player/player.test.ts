import { makeBestMove } from './player';
import { parseBoard } from '../board/board';

describe('player', () => {
  test.only('initially starts at first position', () => {
    expect(makeBestMove(parseBoard(`
    ...
    ...
    ...
    `))).toEqual(parseBoard(`
    o..
    ...
    ...
    `));
  })

  test('best second move when player starts at non-center location', () => {
    expect(makeBestMove(parseBoard(`
      x..
      ...
      ...
    `))).toEqual(parseBoard(`
      x..
      .o.
      ...
    `));
  });
    
  test('blocks player win condition', () => {
    expect(makeBestMove(parseBoard(`
      x..
      .o.
      x..
    `))).toEqual(parseBoard(`
      x..
      oo.
      x..
    `));
  });

  test('makes the winning move when available', () => {
    expect(makeBestMove(parseBoard(`
      x.x
      oo.
      x..
    `))).toEqual(parseBoard(`
      x.x
      ooo
      x..
    `));
  });
});