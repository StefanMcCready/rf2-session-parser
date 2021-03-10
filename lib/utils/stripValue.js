module.exports = (value) => {
  if (value) {
    return value._text;
  } else {
    return undefined;
  }
}
