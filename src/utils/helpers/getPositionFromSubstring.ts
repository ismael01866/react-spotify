export const getPositionOfSubstring = (
  string: string,
  subString: string,
  index: number
) => {
  return string.split(subString, index).join(subString).length;
};
