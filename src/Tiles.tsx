import React from 'react';
import { Board } from './board';
import './Tiles.css';

interface TileProps {
  cell: number;
  position: number;
  onClick: (position: number) => void
}

const Tile: React.FC<TileProps> = ({ cell, position, onClick }) => {
  const text = cell === 0 
    ? '' 
    : cell === -1
      ? 'X'
      : 'O';
  return cell === 0 
    ? (
      <button type="button" className="tile" onClick={() => onClick(position)}>
        {text}
      </button>
    ) : (
      <span className="tile">{text}</span>
    );
};

interface TilesProps {
  board: Board;
  onClick: (position: number) => void
}

export const Tiles: React.FC<TilesProps> = ({ board, onClick }) => (
  <div className="tiles">
    {board.map((cell, idx) => <Tile cell={cell} position={idx} onClick={onClick}/> )}
  </div>
)
