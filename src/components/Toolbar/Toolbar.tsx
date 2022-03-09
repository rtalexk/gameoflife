import s from './Toolbar.module.css';
import React from 'react'
import GridSize from '../GridSize';
import NextGenBtn from '../NextGenBtn';
import ClearBtn from '../ClearBtn';

interface IToolbarProps {
  onGridSizeChange({ rows, cols}: { rows: number; cols: number; }): void;
  onNextGen(): void;
  onClear(): void;
  rowSize: number;
  colSize: number;
}

export default Toolbar;

function Toolbar(props: IToolbarProps) {
  const { colSize, rowSize, onGridSizeChange, onNextGen, onClear } = props;
  return (
    <header className={s.Toolbar}>
      <GridSize rows={rowSize} cols={colSize} onChange={onGridSizeChange} />
      <NextGenBtn onClick={onNextGen} />
      <ClearBtn onClick={onClear} />
    </header>
  );
}
