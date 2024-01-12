const capitalize = (str: string) => {
  if (!str) return;
  return str.toLowerCase().replace(/(^|\s)\S/g, (str) => {
    return str.toUpperCase();
  });
};
export default capitalize;
