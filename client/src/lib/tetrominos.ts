export const COLORS = [
  '#FF0D0D', // Red
  '#0DFF0D', // Green
  '#0D0DFF', // Blue
  '#FFFF0D', // Yellow
  '#FF0DFF', // Magenta
  '#0DFFFF', // Cyan
  '#FF8C0D', // Orange
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

export function rotateMatrix<T>(matrix: T[][]): T[][] {
  const N = matrix.length;
  const result = matrix.map((row, i) =>
    matrix.map((col) => col[N - 1 - i])
  );
  return result;
}
