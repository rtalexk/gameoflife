import React from 'react';
import { buildEmptyGen, getNextGen, printGeneration, reviveCell } from './lib/gol';

function App() {
  /** Block. Testing purposes, check browser console */
  const gen0 = buildEmptyGen(50, 50);

  reviveCell(gen0, 0, 1);
  reviveCell(gen0, 1, 2);
  reviveCell(gen0, 2, 0);
  reviveCell(gen0, 2, 1);
  reviveCell(gen0, 2, 2);

  const gen1 = getNextGen(gen0);
  const gen2 = getNextGen(gen1);

  printGeneration(gen0);
  printGeneration(gen1);
  printGeneration(gen2);
  /** Endblock */

  /**
   * @TODO Create header with the following components:
   *  - Grid size
   *  - Next generation
   *  - Start/Stop
   *  - Speed
   */

  /**
   * @TODO Create Grid component to represent current generation
   */

  return (
    <div className="">
      Some content
    </div>
  );
}

export default App;
