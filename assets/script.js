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

let boardNode = document.getElementById("board")

const Gameboard = ((size) => {

  const board = (() => {
    return Array.apply(null, Array(size)).map(() => {
      return Array.apply(null, Array(size)).map(() => {
        return 0
      })
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

  const victoryCheck = ((x, y) => {
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

  const draw = (() => {
    boardNode.innerHTML = ""

    for (let [rowNumber, row] of board.entries()) {
      let rowNode = document.createElement("div")
      rowNode.id = `row-${rowNumber}`

      for (let [squareNumber, square] of row.entries()) {
        let squareNode = document.createElement("span")
        squareNode.id = `${squareNumber}-${rowNumber}`
        squareNode["data-x"] = squareNumber
        squareNode["data-y"] = rowNumber
        squareNode.addEventListener("click", () => {gameController.playerTurn(squareNumber, rowNumber)})        
        if (square === 1) squareNode.innerHTML = "X"
        if (square === -1) squareNode.innerHTML = "O"
        if (square === 0) squareNode.innerHTML = "-"
        rowNode.append(squareNode)
      }
      boardNode.append(rowNode)
    }
  })

  // Return only public functions
  return {
    size,
    markSquare,
    checkSquare,
    victoryCheck,
    draw
  }
})


const Player = ((number) => {
  const symbol = (number === 1 ? "X" : "O")
  const wins = 0
  const losses = 0

  return {
    symbol,
    wins,
    losses,
    number
  }
})


const gameController = (() => {
  const playerOne = Player(1)
  const playerTwo = Player(-1)
  var currentPlayer = playerOne
  let gameboard

  const startGame = ((boardSize) => {
    gameboard = Gameboard(boardSize)
    currentPlayer = playerOne
    gameboard.draw()
  })

  const playerTurn = ((x, y) => {
    if (gameboard.checkSquare(x, y)) {
      gameboard.markSquare(x, y, currentPlayer.number)
      currentPlayer = (currentPlayer === playerOne ? playerTwo : playerOne)
      gameboard.victoryCheck(x, y)
      gameboard.draw()
    }
  })

  return {
    startGame,
    playerTurn
  }
})()

gameController.startGame(3)