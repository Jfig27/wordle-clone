const tileDisplay = $('.tile-container')
const keyboard = $('.key-container')
const messageDisplay = $('.message-container')

const keys = 'QWERTYUIOPASDFGHJKLZXCVBNM'.split("")
keys.splice(19, 0, "ENTER")
keys.splice(27, 0, "<<")

const wordle = 'RADIO'

const guessRows = [
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','','']
]

let currentRow = 0
let currentTile = 0
const isGameOver = false

//creates divs for each letter in each row
guessRows.forEach((guessRow, guessRowIndex) => {
    let newRow = $('<div/>')
    newRow.attr('id', 'guessRow-' + guessRowIndex)
    guessRow.forEach((guess, guessIndex)=>{
        const newTile = $('<div/>')
        newTile.attr('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex)
        newTile.addClass('tile')
        newTile.appendTo(newRow)
    })
    newRow.appendTo(tileDisplay)
})

//creates a button for each letter to make onscreen keyboard
keys.forEach(key => {
    let newKey = $('<button/>')
    newKey.html(key)
    newKey.attr('id', key)
    newKey.on('click', function(){
        console.log('clicked', key)
        if (key == '<<'){
            deleteLetter()
            console.log('guessRows',guessRows)
            return
        }
        if (key == 'ENTER'){
            checkRow()
            return
        }
        addLetter(key)
    })
    newKey.appendTo(keyboard)
})

//adds letter to array/ game square and goes to next tile
const addLetter = (letter) => {
    if (currentTile < 5 && currentRow < 6) {
        const tile = $('#guessRow-' + currentRow + '-tile-' + currentTile)
        tile.html(letter)
        guessRows[currentRow][currentTile] = letter
        tile.attr('data', letter)
        currentTile++;
        console.log('guessRows',guessRows)
    }
}

//deletes letter from array and game square
const deleteLetter = () => {
    if(currentTile>0){
        currentTile--
        const tile = $('#guessRow-' + currentRow + '-tile-' + currentTile)
        tile.html('')
        guessRows[currentRow][currentTile] = ''
        tile.attr('data', '')
    }
}

//checks to see if row is equal to wordle
const checkRow = () => {
    const guess = guessRows[currentRow].join("")
    if(currentTile > 4) {
        console.log('guess is ' + guess, "wordle is " + wordle)
        flipTile()
        if(wordle == guess){
            showMessage('Magnificent!')
            isGameOver == true
            return
        } else {
            if (currentRow >= 5) {
                isGameOver = false
                showMessage('Game Over')
                return
            }
            if (currentRow < 5) {
                currentRow++
                currentTile = 0
            }
        }
    }
}

//timed alert for user
const showMessage = (message) => {
    const newMessage = $('<p/>')

    newMessage.html(message)
    newMessage.appendTo(messageDisplay)
    setTimeout(()=> newMessage.remove(), 2000)
}

//adds colors to keyboard
const addColorToKey = (keyLetter, color) => {
    let key = $(`#${keyLetter}`)
    key.addClass(color)
}

//flips and colors letters with some logic to avoid coloring extra correct characters yellow
// fixed bug example vvv
// correct word: RADIO
// RADER would have a second yellow R when it should be gray
const flipTile = () => {
    const rowTiles = $('#guessRow-' + currentRow).children()
    let checkWordle = wordle
    const guess = []

    rowTiles.each((index, tile) => {
        console.log(`tile: ${tile}`)
        guess.push({letter: tile.getAttribute('data'), color: 'grey-overlay'})
    })

    $(guess).each((index, guess) => {
        if (guess.letter == wordle[index]){
            guess.color = 'green-overlay'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })

    $(guess).each((index, guess) => {
        if(checkWordle.includes(guess.letter)) {
            guess.color = 'yellow-overlay'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })

    rowTiles.each((index, tile) => {
        setTimeout(() => {
            $(tile).addClass('flip')
            $(tile).addClass(guess[index].color)
            addColorToKey(guess[index].letter, guess[index].color)
        }, 500 * index)
    })
}