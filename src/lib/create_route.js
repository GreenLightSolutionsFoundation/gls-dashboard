export default function(path, def, attr) {
  return {
    path,
    ...def,
    ...attr,
  };
}
