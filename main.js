let selectedRow = 'a'
let letter = 1
import WORDS from './words.js'
let word = WORDS[Math.floor(Math.random()*1682)]
console.log(word)
const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
function contains(a, obj) {
    for (let i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true
        }
    }
    return false
}

function findCommonElement(array1, array2) {
     

    for(let i = 0; i < array1.length; i++) {

        for(let j = 0; j < array2.length; j++) {

            if(array1[i] === array2[j]) {

                let yellowLetter = document.getElementById((i+1)+selectedRow)

                if (yellowLetter.style["background-color"] != "#121213" || yellowLetter.style["background-color"] != "#6d9c70") {
                    yellowLetter.style["background-color"] = "#d1c27c";
                }
            }
        }
    };
}
 

function checkWord(attempt) {
    let attLetters = []
    let trueLetters = []

    for (let i = 0; i < attempt.length; i++) {
        attLetters.push(attempt[i])
        trueLetters.push(word[i])
    }

    for (let i = 0; i < attempt.length; i++) {
        if (!(trueLetters.includes(attLetters[i]))) {
            let wrongLetter = document.getElementById((i+1)+selectedRow)
            wrongLetter.style["background-color"] = "#545457"
        }
    }

    findCommonElement(attLetters, trueLetters)
    
    for (let i = 0; i < attempt.length; i++) {


        if (attempt[i] == word[i]) {
            let correctLetter = document.getElementById((i+1)+selectedRow)
            correctLetter.style["background-color"] = "#6d9c70";
        }

    }
}

function wrongLetters(att) {
    for (let i = 0; i < att.length; i++) {


        let wrongLetter = document.getElementById((i+1)+selectedRow)

        if (wrongLetter.style["background-color"] != "#6d9c70" || wrongLetter.style["background-color"] != "#d1c27c") {
            wrongLetter.style["background-color"] = "#545457"
        }
    }
}
    

document.addEventListener('keydown', (event) => {
    let changedBox = document.getElementById(letter + selectedRow);

    if (event.key == 'Backspace') {
        changedBox.innerHTML = ''
        if (letter != 1) {
            letter -= 1
        }
        changedBox = document.getElementById(letter + selectedRow);
        changedBox.innerHTML = ''
    }

    if (contains(alphabet, event.key)) {
        changedBox = document.getElementById(letter + selectedRow);
        changedBox.innerHTML = event.key
        if (letter != 5) {
            letter += 1
        }
    }

    if (event.key == 'Enter') {
        let writtenWord = document.getElementById(1+selectedRow).innerHTML + document.getElementById(2+selectedRow).innerHTML + document.getElementById(3+selectedRow).innerHTML + document.getElementById(4+selectedRow).innerHTML + document.getElementById(5+selectedRow).innerHTML

        if (contains(WORDS, writtenWord)) {
            if (selectedRow == 'a') {
                checkWord(writtenWord);
                selectedRow = 'b'
                letter = 1;

            } else if (selectedRow == 'b') {
                checkWord(writtenWord);
                selectedRow = 'c'
                letter = 1;

            } else if (selectedRow == 'c') {
                checkWord(writtenWord);
                selectedRow = 'd'
                letter = 1;

            } else if (selectedRow == 'd') {
                checkWord(writtenWord);
                selectedRow = 'e'
                letter = 1;

            } else if (selectedRow == 'e') {
                checkWord(writtenWord);
                selectedRow = 'f'
                letter = 1

            } else if (selectedRow == 'f') {
                checkWord(writtenWord);
                
                if (writtenWord == word) {

                }
            }
        }
    }
})
