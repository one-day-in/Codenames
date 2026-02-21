// domain/gameRules.js
const oppositeTeam = {
  red: 'blue',
  blue: 'red'
};

export function revealCell(game, index) {
  if (game.gameOver) return game;
  
  const cell = game.cells[index];
  if (cell.revealed) return game;
  
  // Створюємо новий стан
  const updatedCells = game.cells.map((c, i) => 
    i === index ? { ...c, revealed: true } : c
  );
  
  // Перевіряємо чи гра закінчилась
  if (cell.role === 'assassin') {
    return {
      ...game,
      cells: updatedCells,
      gameOver: true,
      winner: oppositeTeam[game.activeTeam]
    };
  }
  
  // Визначаємо наступну команду
  const isOwnTeam = cell.role === game.activeTeam;
  const nextTeam = isOwnTeam ? game.activeTeam : oppositeTeam[game.activeTeam];
  
  return {
    ...game,
    cells: updatedCells,
    activeTeam: nextTeam
  };
}

export function endTurn(game) {
  if (game.gameOver) return game;
  
  return {
    ...game,
    activeTeam: oppositeTeam[game.activeTeam]
  };
}

export function checkWinner(game) {
  if (game.gameOver) return game.winner;
  
  const redRevealed = game.cells.filter(c => c.role === 'red' && c.revealed).length;
  const blueRevealed = game.cells.filter(c => c.role === 'blue' && c.revealed).length;
  
  const redTotal = game.cells.filter(c => c.role === 'red').length;
  const blueTotal = game.cells.filter(c => c.role === 'blue').length;
  
  if (redRevealed === redTotal) return 'red';
  if (blueRevealed === blueTotal) return 'blue';
  
  return null;
}