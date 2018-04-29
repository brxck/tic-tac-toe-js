"use strict"

const Gameboard = ((size) => {

  const board = (() => {
    return Array.apply(null, Array(size)).map(() => {
      return Array.apply(null, Array(size)).map(() => {return 0})
    })
  })()

  const markSquare = ((x, y, playerNumber) => {
    if (board[y][x] === 0) {
      board[y][x] = playerNumber
    }
  })

  const checkSquare = ((x, y, playerNumber) => {
    return (board[y][x] === playerNumber)
  })

  const victoryCheck= ((x, y) => {
    let row = 0
    let column = 0

    // Check row
    for (let i = 0; i < size; i++) {
      row += board[y][i]
    }
    // Check column
    for (let i = 0; i < size; i++) {
      column += board[i][x]
    }
    // Check diagonal
    let diagonal = 0
    for (let i = 0; i < size; i++) {
      diagonal += board[i][i]
    }
    // Check anti diagonal
    let anti = 0
    for (let i = 0, j = size - 1; i < size; i++, j--) {
      anti += board[i][j]
    }

    if (row === 3 || column === 3 || diagonal === 3 || anti === 3) {
      // player one
    } else if (row === -3 || column === -3 || diagonal === -3 || anti === -3) {
      // player two
    }
  })

  // Return only public functions
  return {board, size, markSquare, checkSquare}
})


const Player = ((number) => {
  const symbol = (number === 1 ? "X" : "O")
  const wins = 0
  const losses = 0

  const takeMove = (() => {

  })
})


const gameController = (() => {
  const playerOne = Player(1)
  const playerTwo = Player(-1)
  let currentPlayer

  const startGame = ((boardSize) => {
    gameboard = Gameboard(boardSize)
    currentPlayer = playerOne
  })

  const playerTurn = (() => {
    // Wait for valid input
    currentPlayer.takeMove()
    currentPlayer = (currentPlayer === playerOne ? playerTwo : playerOne)
    gameboard.victoryCheck()
  })

  const gameLoop = (() => {

  })
})()

gameboard = Gameboard(3)
gameboard.markSquare(2, 2, 1)

console.log(gameboard)