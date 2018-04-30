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

const Gameboard = ((size) => {
  let turnCounter = 0

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
    turnCounter += 1

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
      return playerOne
    } else if (row === -3 || column === -3 || diagonal === -3 || anti === -3) {
      return playerTwo
    } else if (turnCounter === size * size) {
      return true
    }
  })

  const draw = (() => {
    let boardNode = document.getElementById("board")    
    boardNode.innerHTML = ""

    for (let [rowNumber, row] of board.entries()) {
      let rowNode = document.createElement("div")
      rowNode.className = "row"

      for (let [squareNumber, square] of row.entries()) {
        let squareNode = document.createElement("div")
        squareNode.className = "square"
        squareNode["data-x"] = squareNumber
        squareNode["data-y"] = rowNumber
        squareNode.addEventListener("click", () => {gameController.playerTurn(squareNumber, rowNumber)})        
        if (square === 1) squareNode.innerHTML = "X"
        if (square === -1) squareNode.innerHTML = "O"
        if (square === 0) squareNode.innerHTML = "\xa0" // character code for nonbreaking space
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


const Player = ((number, name) => {
  const symbol = (number === 1 ? "X" : "O")
  const wins = 0
  name = name || `Player ${number === 1 ? "1" : "2"}`

  return {
    symbol,
    wins,
    number,
    name
  }
})

const playerOne = Player(1)
const playerTwo = Player(-1)

const gameController = (() => {

  let started = false
  let boardSize = 3
  var currentPlayer = playerOne
  let gameboard

  let controlsNode = document.getElementById("controls")
  let logNode = document.getElementById("log")

  const setup = (() => {
    let increaseNode = document.getElementById("increase")
    let decreaseNode = document.getElementById("decrease")
    let startNode = document.getElementById("start")
    increaseNode.addEventListener("click", () => {setBoardSize(1, true)})
    decreaseNode.addEventListener("click", () => {setBoardSize(-1, true)})
    startNode.addEventListener("click", startGame)

    log("Adjust the grid size here.")
    window.setTimeout(() => {log("And press play to start!")}, 1000)
    gameController.setBoardSize(3, false)
  })

  const startGame = (() => {
    started = true
    currentPlayer = playerOne
    gameController.setBoardSize(boardSize, false)
    controlsNode.style.visibility = "hidden"
    log(`${boardSize}x${boardSize} game started!`)
    window.setTimeout(() => {log("Get moving!")}, 1000)
  })

  const playerTurn = ((x, y) => {
    if (gameboard.checkSquare(x, y) && started) {
      gameboard.markSquare(x, y, currentPlayer.number)
      gameboard.draw()
      let winner = gameboard.victoryCheck(x, y)
      if (winner) {
        endgame(winner)
      } else {
        currentPlayer = (currentPlayer === playerOne ? playerTwo : playerOne)
      }
    }
  })

  const endgame = ((winner) => {
    if (winner === true) {
      log("It's a draw...")
    } else {
      log(`${winner.name} wins!`)
      winner.wins += 1
    }
    started = false
    controlsNode.style.visibility = "visible"
    window.setTimeout(() => log(`${playerTwo.name}: ${playerTwo.wins}`), 1000)       
    window.setTimeout(() => log(`${playerOne.name}: ${playerOne.wins}`), 2000)   
  })

  const setBoardSize = ((increment, relative) => {
    if (relative == true) {
      let newSize = boardSize + increment
      if (newSize < 3 || newSize > 8) return
      boardSize = newSize
    } else {
      if (increment < 3 || increment > 8) return
      boardSize = increment
    }
    gameboard = Gameboard(boardSize)
    gameboard.draw()
  })

  const log = ((text) => {
    let newText = document.createElement("p")
    newText.textContent = `> ${text}`
    logNode.prepend(newText)
    if (logNode.childElementCount > 5) {
      logNode.lastElementChild.remove()
    }
  })

  return {
    startGame,
    playerTurn,
    setBoardSize,
    setup,
    log
  }
})()

gameController.setup()