const POSSIBLE_WORDS = ["obdurate", "verisimilitude", 
    "defenestrate", "obsequious", "dissonant", "toady", "idempotent"];
var word = "";
var guesses = ""; //this will be all the guesses
var guessCount;
var gameEnd = false; //tracks if game finished or not
const MAX_GUESSES = 6;

let newGame = function(){
    gameEnd = false; 
    //Pick a random word
    guessCount = MAX_GUESSES;
    let randomIndex = parseInt(Math.random()*POSSIBLE_WORDS.length);
    word = POSSIBLE_WORDS[randomIndex];
    guesses="";
    updatePage();
}

let updatePage = function(){
    let clueString = "";    
    for(let i = 0; i < word.length; i++){
        var currentLetter = word.charAt(i);
        if(guesses.indexOf(currentLetter) >=0){
            clueString+= currentLetter+" ";
        }else{
            clueString += "_ ";
        }
    }
    let clue = document.getElementById("clue");
    clue.textContent = clueString;

    let guessArea = document.getElementById("guesses");
    guessArea.textContent = "Guesses: " + guesses;

    let image = document.getElementById("hangmanpic");
    image.src = `images/hangman${guessCount}.gif`

    if(guessCount === 0){
        guessArea.textContent = "YOU LOST!!!"; //user lost if guesses are used up
        gameEnd = true;
    }else if(word.length > 0 && clueString.indexOf("_") < 0){
        guessArea.textContent = "YOU WIN!!!"; //user win if blanks are all filled
        gameEnd = true;
    }
}

let guessLetter = function(){
    let input = document.getElementById("guess");
    let letter = input.value;
    letter = letter.toLowerCase();

    if(gameEnd === true || guesses.indexOf(letter) >=0){ 
        //game finished, prevent same letter guess
        letter = "";
    }else if(word ===""){
        //word blank
        return;
    }

    if(word.indexOf(letter) < 0){
        guessCount--;
    }
    guesses += letter;
    input.value = ""; //Guess box is cleared after every guess
    updatePage();
}