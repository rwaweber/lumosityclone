// when the user first naviagates to the page, hide everything but a form
// - accomplish this with CSS selectors and manipulation of the DOM
// when they enter information into the form it disappears and the game begins

// restrict input to string elements
// initializing game, should only be called once.
// creates a game state

// ########### model
// used only for persistence purposes, not involved in game logic
var User = function (name, score) {
    this.name = name;
    this.score = score;
}

// essentially the logical module of the game
var Round = function (color) {
    this.correctcolor = color; // the correct color 
    // this is where the below method will be called
    this.displaycolor = displayDetermine(color);
    this.match = ((this.correctcolor === this.displaycolor) ? true : false);
};


function displayDetermine(colorString) {
    var x = Math.floor(Math.random()*10);
    // only generate based on whether or not the random number is greater than 5
    if(x < 5) {
	var listOfColors = ['red', 'green', 'blue', 'purple','yellow', 'gray'];
	// now we must remove the above colorString from the below list of colors.
	for (var y in listOfColors) {
	    if (listOfColors[y] === colorString) {
		var omission = listOfColors.splice(y, 1);
	    }
	}
	// now the dom background as the color of x in listOfColors
	// dom.css.color = listOfColors[x];
	return listOfColors[x];
    }
    else {
	return colorString;
    }
};

// ##################### controller

var name = prompt('Please enter your name');
var x = begin(name);
function begin(name) {
    if (name != null && name != "") {
	var player = new User(name, 0);
	// the name should be retrieved from the controller
	var listofrounds = []; // used for when we repeat the below list
	var listOfColors = ['red', 'green', 'blue', 'purple','yellow', 'gray'];

	// inside of the event listener I need to consider the following:
	// the index of the listOfColors, assuming that I'm not looping
	// the player and the round
	var fail = false;
	var i = 0;
	var input;
	var individualround = new Round(listOfColors[i]);
	console.log(individualround);
	listofrounds.push(individualround);
	document.addEventListener('keydown', function temporaryEventListener(event) {
	    if (event.keyCode != 89 && event.keyCode != 78) {
		console.log('whiff');
	    }
	    else {
		// scaling stub, not being used atm
		// added for debug, to help us cheat :)
		// retrieves user input
		if(event.keyCode == 89) {
		    i++;
		    console.log('yes!');
		    input = true;
		}if (event.keyCode == 78) {
		    console.log('no!');
		    input = false;
		}
		if (i > 5) {
		    i = 0;
		}
		if (input == individualround.match) {
		    console.log('correct');
		}
		if (input != individualround.match) {
		    console.log('wrong');
		}
		individualround = new Round(listOfColors[i]);
		console.log(individualround);
		listofrounds.push(individualround);
	    }
	});		
    }
};
