// Libraries
import WORDS from './words.js'
const jsConfetti = new JSConfetti()

const delay = 500
// Sequential touches must be in close vicinity
const minZoomTouchDelta = 10

// Track state of the last touch
let lastTapAt = 0
let lastClientX = 0
let lastClientY = 0

function confetti() {
  jsConfetti.addConfetti();
}

export default function preventDoubleTapZoom(event) {
  // Exit early if this involves more than one finger (e.g. pinch to zoom)
  if (event.touches.length > 1) {
    return
  }

  const tapAt = new Date().getTime()
  const timeDiff = tapAt - lastTapAt
  const { clientX, clientY } = event.touches[0]
  const xDiff = Math.abs(lastClientX - clientX)
  const yDiff = Math.abs(lastClientY - clientY)
  if (
    xDiff < minZoomTouchDelta &&
    yDiff < minZoomTouchDelta &&
    event.touches.length === 1 &&
    timeDiff < delay
  ) {
    event.preventDefault()
    // Trigger a fake click for the tap we just prevented
    event.target.click()
  }
  lastClientX = clientX
  lastClientY = clientY
  lastTapAt = tapAt
}

// Game
let word = WORDS[Math.floor(Math.random() * WORDS.length)] // Randomly chosen word.
let selectedRow = 'a' // The current row.
let letter = 0 // The current letter.
let wrongLetters = [] // Letters that cannot be pressed through keyboards.
let hasFinished = false
let didWin = false

console.log('NU MAI TRISA :(((');
console.log(`dar cuvantul e ${word} daca tot esti asa`);

// Elements
const answer = document.getElementById("answer") // The answer text if the user didn't guess the answer.


// Alphabet
const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
// So that we can check if input is a letter.

function contains(a, obj) { // Checks if an array contains an element.
    for (let i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true // Function will end if it is true.
        }
    }
    // If the function hasn't ended yet, we are sure the array doesn't contain the desired element.
    return false
}

function anim(element, anim) { // Easier way to use animations using the animate.css library.
    element.classList.add('animate__animated', 'animate__'+anim);
}


function checkWord(attempt) {
    // Check if the guess is correct and end the game here.
    if (attempt == word) {
        hasFinished = true
        didWin = true
        confetti()
    }

    // Count occurrences of each letter in the target word
    let letterCounts = {}
    for (let i = 0; i < word.length; i++) {
        let letter = word[i]
        letterCounts[letter] = (letterCounts[letter] || 0) + 1
    }

    // First pass: mark green letters and reduce counts
    let results = ['gray', 'gray', 'gray', 'gray', 'gray']
    for (let i = 0; i < attempt.length; i++) {
        if (attempt[i] == word[i]) {
            results[i] = 'green'
            letterCounts[attempt[i]]--
        }
    }

    // Second pass: mark yellow letters for remaining positions
    for (let i = 0; i < attempt.length; i++) {
        if (results[i] == 'gray' && letterCounts[attempt[i]] > 0) {
            results[i] = 'yellow'
            letterCounts[attempt[i]]--
        }
    }

    // Apply the visual styles
    for (let i = 0; i < attempt.length; i++) {
        let letterElement = document.getElementById((i+1)+selectedRow)
        let keyElement = document.getElementById(letterElement.innerHTML)

        if (results[i] == 'green') {
            letterElement.style["background-color"] = "#6d9c70"
            anim(letterElement, 'flipInX')
            keyElement.style["background-color"] = "#6d9c70"
            anim(keyElement, 'fadeIn')
        } else if (results[i] == 'yellow') {
            letterElement.style["background-color"] = "#d1c27c"
            anim(letterElement, 'flipInX')
            // Only make key yellow if it's not already green
            if (keyElement.style["background-color"] != "rgb(109, 156, 112)") {
                keyElement.style["background-color"] = "#d1c27c"
                anim(keyElement, 'fadeIn')
            }
        } else {
            letterElement.style["background-color"] = "#545457"
            anim(letterElement, 'flipInX')
            // Only dim key if it's not already green or yellow
            if (keyElement.style["background-color"] != "rgb(109, 156, 112)" &&
                keyElement.style["background-color"] != "rgb(209, 194, 124)") {
                keyElement.style.opacity = "0.5"
            }
        }
    }
}

function type(event) {
    let changedBox = document.getElementById(letter + selectedRow); // The box we are currently typing into.


    if (event == 'Backspace') { // Backspace code. 
        if (letter != 0) {
            changedBox.innerHTML = '' // Remove the text of the current letter.
        }
        if (letter != 0) {
            letter -= 1 // Go one letter back.
        }
    }

    if (contains(alphabet, event)) { // Typing in letters code
        //if (!(contains(wrongLetters, event))) { 
            /*
            If the letter has been used before, don't let them type it.
            */

            if (letter != 5) {
                letter += 1
                changedBox = document.getElementById(letter + selectedRow)
                changedBox.innerHTML = event  // Setting the box to the letter.
            }
        //}
    }

    if (event == 'Enter') {
        let writtenWord = document.getElementById(1+selectedRow).innerHTML + document.getElementById(2+selectedRow).innerHTML + document.getElementById(3+selectedRow).innerHTML + document.getElementById(4+selectedRow).innerHTML + document.getElementById(5+selectedRow).innerHTML
        // ^^^ Getting the typed word.
        if (contains(WORDS, writtenWord)) { // Sorta inefficient code to going to the next row after the user has clicked enter.
            if (selectedRow == 'a') {
                checkWord(writtenWord);
                selectedRow = 'b'
                letter = 0;

            } else if (selectedRow == 'b') {
                checkWord(writtenWord);
                selectedRow = 'c'
                letter = 0;

            } else if (selectedRow == 'c') {
                checkWord(writtenWord);
                selectedRow = 'd'
                letter = 0;

            } else if (selectedRow == 'd') {
                checkWord(writtenWord);
                selectedRow = 'e'
                letter = 0;

            } else if (selectedRow == 'e') {
                checkWord(writtenWord);
                selectedRow = 'f'
                letter = 0;

            } else if (selectedRow == 'f') {
                checkWord(writtenWord)
                if (!didWin) {
                    hasFinished = true
                    answer.style["display"] = "block"
                    answer.innerHTML = `Cuvantul era ${word.toUpperCase()}`
                    anim(answer, 'fadeIn')
                }
            }
        }
    }
}

// Virtual keyboard typing event
document.addEventListener('click' , (event) => {
    if (hasFinished == false) {
        let typed = event.target.id
        type(typed)
    }
})

// Physical keyboard typing event
document.addEventListener('keydown', (event) => {
    if (hasFinished == false) {
        type(event.key)
    }
})
