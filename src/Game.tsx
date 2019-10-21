import React, { useState } from 'react';
import './Game.css';
import { getEmptyBoard, makeMove, Player, getBoardStatus, BoardStatus } from './board';
import { makeBestMove } from './player';
import { Tiles } from './Tiles';

const App: React.FC = () => {
  const [board, setBoard] = useState(getEmptyBoard())

  const status = getBoardStatus(board);

  // make the player move followed by computer move if allowed
  const onMove = (position: number) => {
    if (status === BoardStatus.IN_PROGRESS) {
      let nextBoard = makeMove(board, position, Player.HUMAN);
      const nextStatus = getBoardStatus(nextBoard);
      if (nextStatus === BoardStatus.IN_PROGRESS) {
        nextBoard = makeBestMove(nextBoard);
      }
      setBoard(nextBoard);
    }
  }

  // reset the board
  const onReset = () => {
    setBoard(getEmptyBoard());
  }

  return (
    <div className="App">
      <div className="banner">
        { status === BoardStatus.COMPUTER_WINNER &&
          'Computer Wins!'
        }
        { status === BoardStatus.HUMAN_WINNER &&
          'You Win'
        }
        { status === BoardStatus.DRAW &&
          'Draw!'
        }
      </div>

      <Tiles board={board} onClick={onMove} />
      
      <button className="reset-btn" onClick={onReset}>Reset</button>
    </div>
  );
}

export default App;