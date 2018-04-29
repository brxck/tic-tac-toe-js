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

  // Return only public functions
  return {board, markSquare, checkSquare}
})


const Player = ((number) => {
  const symbol = (number == 1 ? "X" : "O")
  const wins = 0
  const losses = 0

  const takeMove = (() => {

  })
})


const gameController = (() => {
  const playerOne = Player(1)
  const playerTwo = Player(-1)

  const startGame = ((boardSize) => {
    gameboard = Gameboard(boardSize)
    gameLoop()
  })

  

  const gameLoop = (() {

  })
})()

gameboard = Gameboard(3)
gameboard.markSquare(2, 2, 1)

console.log(gameboard)