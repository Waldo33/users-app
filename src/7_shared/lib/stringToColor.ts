/**
 * @function stringToColor
 * @description Преобразует строку в цвет в формате HEX, основываясь на charCode каждого символа
 * @param {string} string
 * @returns {string}
 * @example
 * stringToColor("Hello, world!") // #f5cbf0
 */
export const stringToColor = (string: string): string => {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
};
