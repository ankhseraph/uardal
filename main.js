// Libraries
import WORDS from './words.js'
const jsConfetti = new JSConfetti()

// Game
let word = WORDS[Math.floor(Math.random()*1682)] // Randomly chosen word.
let selectedRow = 'a' // The current row.
let letter = 0 // The current letter.
let wrongLetters = [] // Letters that cannot be pressed through keyboards.
let hasFinished = false

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


function findCommonElement(array1, array2) { // Used for adding in yellow letters.
     

    for(let i = 0; i < array1.length; i++) {

        for(let j = 0; j < array2.length; j++) {

            if(array1[i] === array2[j]) {

                let yellowLetter = document.getElementById((i+1)+selectedRow)

                if (yellowLetter.style["background-color"] != "#121213" || yellowLetter.style["background-color"] != "#6d9c70") {
                    // Making the letter yellow.
                    yellowLetter.style["background-color"] = "#d1c27c";
                    anim(yellowLetter, 'flipInX')

                    // Making the keyboard key yellow.
                    let yellowKey = document.getElementById(yellowLetter.innerHTML) 
                    yellowKey.style["background-color"] = "#d1c27c"
                    anim(yellowKey, 'fadeIn')
                }
            }
        }
    }
}
 

function checkWord(attempt) { 

    // Right off the bat, we can check if the guess is correct and end the game here.
    if (attempt == word) {
        hasFinished = true
        jsConfetti.addConfetti()
    }


    // Arrays the letters of the words will go in.
    let attLetters = [] // The attempt
    let trueLetters = [] // The randomly chosen word

    for (let i = 0; i < attempt.length; i++) { // Sorting the letters of the words into arrays.
        attLetters.push(attempt[i])
        trueLetters.push(word[i])
    }

    for (let i = 0; i < attempt.length; i++) {
        if (!(trueLetters.includes(attLetters[i]))) { 
            /*
            If the randomly chosen word does not contain the letter of the
            attempt, we remove it from the keyboard and make it gray.
            */

            // Making it gray.
            let wrongLetter = document.getElementById((i+1)+selectedRow)
            wrongLetter.style["background-color"] = "#545457"
            anim(wrongLetter, 'flipInX')

            // Removing from the keyboard.
            let wrongKey = document.getElementById(wrongLetter.innerHTML)
            wrongKey.style["background-color"] = "#0d0d0e"
            anim(wrongKey, 'hinge')

            // Putting into the array of wrong letters so users can't still type it with a real keyboard.
            wrongLetters.push(wrongLetter.innerHTML)
        }
    }

    findCommonElement(attLetters, trueLetters) // Getting yellow letters
    
    for (let i = 0; i < attempt.length; i++) { 

        // Getting correct letters

        if (attempt[i] == word[i]) { 
            // Making the letter green.
            let correctLetter = document.getElementById((i+1)+selectedRow)
            correctLetter.style["background-color"] = "#6d9c70";
            anim(correctLetter, 'fadeInX')

            // Making the key green.
            let correctKey = document.getElementById(correctLetter.innerHTML)
            correctKey.style["background-color"] = "#6d9c70"
            anim(correctKey, 'fadeIn')
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
        if (!(contains(wrongLetters, event))) { 
            /*
            If the letter has been used before, don't let them type it.
            */

            if (letter != 5) {
                letter += 1
                changedBox = document.getElementById(letter + selectedRow)
                changedBox.innerHTML = event  // Setting the box to the letter.
            }
        }
    }

    if (event == 'Enter') {
        let writtenWord = document.getElementById(1+selectedRow).innerHTML + document.getElementById(2+selectedRow).innerHTML + document.getElementById(3+selectedRow).innerHTML + document.getElementById(4+selectedRow).innerHTML + document.getElementById(5+selectedRow).innerHTML
        // ^^^ Getting the typed word.
        if (contains(WORDS, writtenWord)) { // Sorta inefficient code to going to the next row after the user has clicked enter.
            if (selectedRow == 'a') {
                checkWord(writtenWord)
                selectedRow = 'b'
                letter = 0;

            } else if (selectedRow == 'b') {
                checkWord(writtenWord)
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
                answer.style["display"] = "block"
                answer.innerHTML = word.toUpperCase();
                anim(answer, 'fadeIn')
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
