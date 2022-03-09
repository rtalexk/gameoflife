import s from './GridSize.module.css';

import React, { useCallback } from 'react'

interface IGridSizeProps {
  rows: number;
  cols: number;
  onChange({ rows, cols}: { rows: number; cols: number; }): void;
}

export default GridSize;

function GridSize(props: IGridSizeProps) {
  const { cols, rows, onChange } = props;

  const onChangeHandler = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    const field = (e.target as HTMLInputElement).name as 'rows' | 'cols';
    const value = (e.target as HTMLInputElement).value;

    const size = {
      rows,
      cols,
    }

    size[field] = Number(value || 1);

    onChange(size);
  }, [cols, rows, onChange]);
  
  return (
    <form className={s.GridSize} onChange={onChangeHandler}>
      <section className={s.FormGroup}>
        <label htmlFor="rows" className={s.Label}>
          Rows:
        </label>
        <input name="rows" id="rows" className={s.Input} type="number" value={rows} />
      </section>

      <section className={s.FormGroup}>
        <label htmlFor="cols" className={s.Label}>
          Cols:
        </label>
        <input name="cols" id="cols" className={s.Input} type="number" value={cols} />
      </section>
    </form>
  );
}
