const urlToID = (string) => {
  return string.slice(21, string.length - 1).replace("/", "-")
}

const splitArrayIntoPagination = (array) => {
  let newArr = []
    let length = array.length

    while (length >= 10){
        const spliceArr = array.splice(0, 10)
        length = array.length
        newArr.push(spliceArr)
    }

    if (length !== 0){
      newArr.push(array)
    }

    return newArr
}

const createDummyArray = (start, end) => {
  let arr = []
  for (let i = start; i <= end; i++){
    arr.push(i)
  }

  return arr
}

export { urlToID, splitArrayIntoPagination, createDummyArray };