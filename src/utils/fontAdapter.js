// utils/fontAdapter.js
/**
 * Розрахунок розміру шрифту для десктопу
 * @param {string} word - слово для аналізу
 * @returns {string} - розмір шрифту в px
 */
export function getFontSize(word) {
  const length = word.length;
  
  // Для десктопу - великі чіткі розміри
  if (length <= 4) return '52px';   
  if (length <= 8) return '44px';   
  if (length <= 10) return '40px';  
  if (length <= 12) return '36px';  
  return '28px';                  
}