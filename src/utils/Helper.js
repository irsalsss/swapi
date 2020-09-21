const urlToID = (string) => {
  return string.slice(21, string.length - 1).replace("/", "-")
}

export { urlToID };