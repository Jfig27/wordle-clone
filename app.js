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