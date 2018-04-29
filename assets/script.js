// Quokka.js config
({
  plugins: "jsdom-quokka-plugin",
  jsdom: {
    config: {
      file: "index.html"
    }
  }
})

"use strict"

let boardDiv = document.getElementById("board")
console.log(document.title)

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

  const checkSquare = ((x, y) => {
    return (board[y][x] === 0)
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
      console.log("player one")
    } else if (row === -3 || column === -3 || diagonal === -3 || anti === -3) {
      // player two
      console.log("player two")
    }
  })

  // Return only public functions
  return {board, size, markSquare, checkSquare, victoryCheck}
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
  let gameboard

  const startGame = ((boardSize) => {
    gameboard = Gameboard(boardSize)
    currentPlayer = playerOne
  })

  const playerTurn = (() => {
    currentPlayer.takeMove()
    currentPlayer = (currentPlayer === playerOne ? playerTwo : playerOne)
    gameboard.victoryCheck()
  })

  const drawBoard = (() => {

  })

  return {startGame, playerTurn, gameboard}
})()

gameController.startGame(3)
gameController.gameboard
