let turn
const players = [
    {
        mark: 'X',
        color: '#09C372'
    },
    {
        mark: 'O',
        color: '#c34a09'
    }
]
let gameStarted = false
let gameOver = false
let cells = {
    0: '', 1: '', 2: '',
    3: '', 4: '', 5: '',
    6: '', 7: '', 8: '',
}

// Check cells for a winner
function CheckCells() {
    let foundWinner = false

    // Winning combinations are
    const combs = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    // Check each combination one by one
    combs.forEach((combCells) => {
        // Check combination (Example: combination 0,1,2)

        // Get combination cells indexes
        const cell1 = combCells[0]
        const cell2 = combCells[1]
        const cell3 = combCells[2]

        // Get cells values
        const cell1Value = cells[cell1]
        const cell2Value = cells[cell2]
        const cell3Value = cells[cell3]

        // Return on failure
        if (cell1Value==='' || cell2Value==='' || cell3Value==='') return

        // Check for a winner
        if (cell1Value === cell2Value && cell2Value === cell3Value) {
            // Mark winner cells with a different color
            MarkWinnerCells([cell1, cell2, cell3])

            // Change title
            var title = document.getElementById('title')
            title.innerHTML = `Game Over - Winner Is ${cell1Value}`

            gameOver = true
            foundWinner = true
        }
    })

    // Check each cell value > if empty mark (allCellsFilled) as false
    let allCellsFilled = true
    Object.keys(cells).forEach((key) => {
        const value = cells[key]
        if (value==='') allCellsFilled = false
    })

    // Check if all cells are filled but no winner yet
    if (allCellsFilled && !foundWinner) {
        // Change title
        var title = document.getElementById('title')
        title.innerHTML = `Game Over - No Winner`
    }
}

// Mark winner cells with a different color
function MarkWinnerCells(winnerCells) {
    winnerCells.forEach((cellID) => {
        const cellElm = document.getElementById(cellID)
        cellElm.style.background = '#00000073'
    })
}

// Generate random player
function GenRandPlayer() {
    turn = players[(Math.random() * players.length) | 0]['mark']
}

// On tile click
function clickTile(elm) {

    if (gameOver) return 0

    // Check if tile already clicked
    const tileValue = elm.innerHTML
    if (tileValue) return

    // Get cell id
    const cell = elm.id

    // Update array
    cells[cell] = turn

    // Update tile html
    elm.innerHTML = turn

    // Set turn for next player
    let allPlayers = players.filter(item => item['mark'] !== turn)
    turn = allPlayers[0]['mark']

    // Change turn name
    ShowPlayerTurn()

    // Change background
    SetBG()

    // Set tile color based on player
    SetTileColor(elm)

    CheckCells()
}

// Set tile color based on player
function SetTileColor(elm) {
    if (turn === 'X') elm.style.color = players[1]['color']
    else if (turn === 'O') elm.style.color = players[0]['color']
}

// Set game background
function SetBG() {
    const bg = document.getElementById("MainBG")
    if (turn === 'X') bg.className = 'playerX_BG'
    else if (turn === 'O') bg.className = 'playerY_BG'
}

// // Show current player turn
function ShowPlayerTurn() {
    var player_turn = document.getElementById('player_turn')
    player_turn.innerHTML = turn
}

// Start game
if (!gameStarted) {
    gameStarted = true // Mark as started
    GenRandPlayer() // Random player turn
    ShowPlayerTurn() // Show current player turn
    SetBG() // Set Background
}
