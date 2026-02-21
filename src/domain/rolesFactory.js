import { shuffle } from '../utils/random.js';

export function createRoleDistribution(size) {
  const total = size * size;
  
  // Обчислюємо кількість карток для кожної команди
  // Для 5x5: 9 червоних, 8 синіх, 7 нейтральних, 1 ассасин
  const redCount = Math.ceil(total / 3); // ~9
  const blueCount = redCount - 1; // 8
  const assassinCount = 1;
  const neutralCount = total - (redCount + blueCount + assassinCount); // 7
  
  // Хто починає гру?
  const startsFirst = Math.random() < 0.5 ? 'red' : 'blue';
  
  // Створюємо масив ролей
  const roles = [];
  
  for (let i = 0; i < total; i++) {
    if (i < redCount) roles.push('red');
    else if (i < redCount + blueCount) roles.push('blue');
    else if (i < redCount + blueCount + neutralCount) roles.push('neutral');
    else roles.push('assassin');
  }
  
  return {
    roles: shuffle(roles),
    startsFirst
  };
}