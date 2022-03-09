import s from './Grid.module.css';

import cn from 'classnames';
import React from 'react'

import { CELL } from '../../constants';
import { Position, Styles } from '../../types';

interface IGridProps {
  gen: CELL[][];
  onClickCell(pos: Position): void;
}

export default Grid;

function Grid(props: IGridProps) {
  const { gen, onClickCell } = props;

  const gridStyles: Styles = {
    '--rows': gen.length,
    '--cols': gen[0].length,
  }

  return (
    <div className={s.Grid} style={gridStyles}>
      {gen.flat().map((cell, idx) => {
        // How many columns there's in a row?
        const rowLen = gen[0].length;

        const row = Math.floor(idx / rowLen);
        const col = idx % rowLen;
        const pos = new Position(row, col);

        return (
          <div
            className={cn(s.Cell, Boolean(cell) && s['Cell--live'])}
            onClick={() => onClickCell(pos)}
          />
        );
      })}
    </div>
  );
}
