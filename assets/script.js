const Gameboard = ((size) => {
  const boardSize = size

  const board = ((boardSize) => {
    return Array.apply(null, Array(size)).map(() => {
      return Array.apply(null, Array(size)).map(() => {return 0})
    })
  })()

  const markSquare = ((x, y, playerNumber) => {
    if (board[y][x] == 0) {
      board[y][x] = playerNumber
    }
  })

  const checkSquare = ((x, y, playerNumber) => {
    return (board[y][x] == playerNumber)
  })

  const resetBoard = (() => {
    board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
  })

  // Return only public functions
  return {board, markSquare, checkSquare, resetBoard}
})

const Player = ((number) => {
  const symbol = (number == 1 ? "X" : "O")

  const takeMove = (() => {

  })
})

const gameController = (() => {
  const startGame = (() => {
    gameboard.resetBoard()
    let one = Player(1)
    let two = Player(-1)
  })
})()

gameboard = Gameboard(3)
console.log(gameboard)