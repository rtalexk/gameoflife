

import React, { useCallback, useEffect, useState } from 'react';
import Grid from './components/Grid';
import Toolbar from './components/Toolbar';
import { buildEmptyGen, getCell, getNextGen, isCellAlive, killCell, printGeneration, reviveCell } from './lib/gol';
import { Position } from './types';

const DEFAULT_ROW_SIZE = 50;
const DEFAULT_COL_SIZE = 50;

function App() {
  const [gridSize, setGridSize] = useState({ rows: DEFAULT_ROW_SIZE, cols: DEFAULT_COL_SIZE });

  const [gen, setGen] = useState(buildEmptyGen(gridSize.rows, gridSize.cols));

  const onCellClickHandler = useCallback((pos: Position) => {
    setGen(gen => {
      if (isCellAlive(getCell(gen, pos.x, pos.y))) {
        return killCell(gen, pos.x, pos.y);
      }

      return reviveCell(gen, pos.x, pos.y);
    });
  }, []);

  const onGridSizeChangeHandler = useCallback((size: { rows: number; cols: number }) => {
    setGridSize(size);
  }, []);

  const onNextGenHandler = useCallback(() => {
    setGen(gen => {
      const newGen = getNextGen(gen);
      return newGen;
    });
  }, []);

  const onClearHandler = useCallback(() => {
    setGen(gen => buildEmptyGen(gen.length, gen[0].length));
  }, []);

  useEffect(() => {
    setGen(buildEmptyGen(gridSize.rows, gridSize.cols));
  }, [gridSize]);

  return (
    <main className="Main">
      <Toolbar
        rowSize={gridSize.rows}
        colSize={gridSize.cols}
        onGridSizeChange={onGridSizeChangeHandler}
        onNextGen={onNextGenHandler}
        onClear={onClearHandler}
      />
      <Grid gen={gen} onClickCell={onCellClickHandler} />
    </main>
  );
}

export default App;
