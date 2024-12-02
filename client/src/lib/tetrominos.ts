export const COLORS = [
  '#D4A5A5',  // Пыльная роза
  '#96B6C5',  // Приглушенный голубой
  '#ADC4CE',  // Серо-голубой
  '#EEE0C9',  // Бежевый
  '#F1F0E8',  // Светлый беж
  '#967E76',  // Теплый серый
  '#B7C4CF'   // Пастельный голубой
];

export const SHAPES = [
  // I
  [
    [1, 1, 1, 1],
  ],
  // O
  [
    [1, 1],
    [1, 1],
  ],
  // T
  [
    [0, 1, 0],
    [1, 1, 1],
  ],
  // S
  [
    [0, 1, 1],
    [1, 1, 0],
  ],
  // Z
  [
    [1, 1, 0],
    [0, 1, 1],
  ],
  // J
  [
    [1, 0, 0],
    [1, 1, 1],
  ],
  // L
  [
    [0, 0, 1],
    [1, 1, 1],
  ],
];

export function rotateMatrix(matrix: number[][]): number[][] {
  const N = matrix.length;
  const M = matrix[0].length;
  const rotated = Array(M).fill(0).map(() => Array(N).fill(0));
  
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      rotated[j][N - 1 - i] = matrix[i][j];
    }
  }
  
  return rotated;
}

// Adjust shapes to ensure proper rotation
export const rotateShape = (shape: number[][], rotation: number): number[][] => {
  let rotated = [...shape];
  for (let i = 0; i < (rotation % 4); i++) {
    rotated = rotateMatrix(rotated);
  }
  return rotated;
};
