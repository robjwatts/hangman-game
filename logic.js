// Global Variables
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Arrays and variables for holding data
var wordOptions = ["smiths", "depechemode", "cure", "joydivision", "neworder", "bauhaus"];
var selectedWord = "";
var lettersinWord = [];
var numBlanks = 0;
var blanksAndSuccesses = [];//j _ _ _ 
var wrongLetters = [];

//Game Counters
var winCount = 0;
var lossCount = 0;
var guessesLeft = 10;


// Functions (Reusable Blocks of Code that I will call upon when needed)
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function startGame () {
	selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
	lettersinWord = selectedWord.split("");
	numBlanks = lettersinWord.length;

	//Reset
	guessesLeft = 9;
	wrongLetters = [];
	blanksAndSuccesses = [];


	//Populate blanks and successes with the corresponding number of blanks
	for (var i=0; i<numBlanks; i++){
		blanksAndSuccesses.push("_");
	}

	//Change HTML to reflect conditions
	document.getElementById("wordsToGuess").innerHTML = blanksAndSuccesses.join("  ");
	document.getElementById("numGuesses").innerHTML = guessesLeft;
	document.getElementById("winCounter").innerHTML = winCount;
	document.getElementById("lossCounter").innerHTML = lossCount;

	//testing/debugging
	console.log(selectedWord);
	console.log(lettersinWord);
	console.log(numBlanks);
	console.log(blanksAndSuccesses);
}

function checkLetters(letter) {
	//check if letter is anywhere in the word
	var isLetterInWord = false;
	for (var i=0; i<numBlanks; i++){
		if(selectedWord[i] == letter) {
			isLetterInWord = true;

		}
	}
	//check where in word our letter exists and populate blanksandsuccesses array
	if(isLetterInWord) {
	for (var i=0; i<numBlanks; i++) {
		if(selectedWord[i] == letter) {
			blanksAndSuccesses[i] = letter;
		}
	}
}

//letter not found
	else {
		wrongLetters.push(letter);
		guessesLeft--
	}

	console.log(blanksAndSuccesses);

}

function roundComplete(){
	console.log("Win Count: " + winCount + " | Loss Count: " + lossCount + " | Guesses Left: " + guessesLeft);

	//update html to reflect recent count stats
	document.getElementById("numGuesses").innerHTML = guessesLeft;
	document.getElementById("wordsToGuess").innerHTML = blanksAndSuccesses.join(" "); 
	document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");

	//check if user won
		if (lettersinWord.toString() == blanksAndSuccesses.toString()){
			winCount++;
			alert("You are silent and gray. You win!");

			//and update the win counter
			document.getElementById("winCounter").innerHTML = winCount;

			startGame();
		}
	//check user lose
	else if (guessesLeft == 0) {
		lossCount++;
		alert("You are too happy for this music. You lose!")

		//update html
		document.getElementById("lossCounter").innerHTML = lossCount;

		startGame();
	}
}


//Main Process - What we call upon to actually make things happen
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//initiates the code for the very first time
startGame();

//register keyclocks
document.onkeyup = function(event) {
	var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
	checkLetters(letterGuessed);
	roundComplete();
	//console.log debugging
	console.log(letterGuessed);
}