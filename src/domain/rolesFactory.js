import { shuffle } from '../utils/random.js';

export function createRoleDistribution(size) {
  const total = size * size;

  // Рандомно визначаємо хто ходить першим
  const startsFirst = Math.random() < 0.5 ? 'red' : 'blue';

  // Команда яка ходить першою отримує 9 карт, інша — 8
  const firstCount = Math.ceil(total / 3);  // 9
  const secondCount = firstCount - 1;       // 8

  const redCount  = startsFirst === 'red'  ? firstCount : secondCount;
  const blueCount = startsFirst === 'blue' ? firstCount : secondCount;

  const assassinCount = 1;
  const neutralCount = total - (redCount + blueCount + assassinCount);

  // Створюємо масив ролей
  const roles = [];

  for (let i = 0; i < redCount; i++)      roles.push('red');
  for (let i = 0; i < blueCount; i++)     roles.push('blue');
  for (let i = 0; i < neutralCount; i++)  roles.push('neutral');
  for (let i = 0; i < assassinCount; i++) roles.push('assassin');

  return {
    roles: shuffle(roles),
    startsFirst
  };
}