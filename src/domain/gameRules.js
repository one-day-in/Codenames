// src/domain/gameRules.js

const oppositeTeam = {
  resonant: 'dissonant',
  dissonant: 'resonant',
};

// Відкриває картку, повертає новий стан
export function revealCell(game, index) {
  if (game.gameOver) return game;

  const cell = game.cells[index];
  if (!cell || cell.revealed) return game;

  const updatedCells = game.cells.map((c, i) =>
    i === index ? { ...c, revealed: true } : c
  );

  // Nightmare — миттєва поразка для активної команди
  if (cell.role === 'nightmare') {
    return {
      ...game,
      cells: updatedCells,
      gameOver: true,
      winner: oppositeTeam[game.turn.team],
    };
  }

  // Підрахунок нових moves
  const newMoves = game.turn.dreamwalkerMoves + 1;
  const limitReached = game.turn.guideLimit !== null && newMoves >= game.turn.guideLimit;

  // Якщо натиснув не свою картку або вичерпав ліміт — хід переходить
  const isOwnTeam = cell.role === game.turn.team;
  const turnEnds = !isOwnTeam || limitReached;

  const nextTurn = turnEnds
    ? { team: oppositeTeam[game.turn.team], guideLimit: null, dreamwalkerMoves: 0 }
    : { ...game.turn, dreamwalkerMoves: newMoves };

  return {
    ...game,
    cells: updatedCells,
    turn: nextTurn,
  };
}

// Гравець вручну завершує хід
export function endTurn(game) {
  if (game.gameOver) return game;
  return {
    ...game,
    turn: {
      team: oppositeTeam[game.turn.team],
      guideLimit: null,
      dreamwalkerMoves: 0,
    },
  };
}

// Guide задає ліміт ходів
export function setGuideLimit(game, limit) {
  if (game.gameOver) return game;
  if (game.turn.guideLimit !== null) return game; // вже задано
  return {
    ...game,
    turn: { ...game.turn, guideLimit: limit },
  };
}

// Перевіряє переможця
export function checkWinner(game) {
  if (game.gameOver) return game.winner;

  const resonantTotal = game.cells.filter(c => c.role === 'resonant').length;
  const dissonantTotal = game.cells.filter(c => c.role === 'dissonant').length;
  const resonantRevealed = game.cells.filter(c => c.role === 'resonant' && c.revealed).length;
  const dissonantRevealed = game.cells.filter(c => c.role === 'dissonant' && c.revealed).length;

  if (resonantRevealed === resonantTotal) return 'resonant';
  if (dissonantRevealed === dissonantTotal) return 'dissonant';

  return null;
}
