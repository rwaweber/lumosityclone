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
    	var listOfColors = ['red', 'green', 'blue', 'purple','yellow', 'orange'];
    	// now we must remove the above colorString from the below list of colors.
    	for (var y in listOfColors) {
    	    if (listOfColors[y] === colorString) {
    	    var omission = listOfColors.splice(y, 1);
    	    }
    	}
    	// now the dom background as the color of x in listOfColors
    	// dom.css.color = listOfColors[x];
    	return listOfColors[x];
    } else {
    return colorString;
    }
};

// ##################### controller
function begin(name) {
    if (name != null && name != "") {
	var player = new User(name, 0);
	// the name should be retrieved from the controller
	var listofrounds = []; // used for when we repeat the below list
	var listOfColors = ['red', 'green', 'blue', 'purple','yellow', 'orange'];

	// inside of the event listener I need to consider the following:
	// the index of the listOfColors, assuming that I'm not looping
	// the player and the round
	var fail = false;
	var i = 0;
	var input;
    //Selecting HTML divs on the dom with JS
    var circle = document.querySelector('#circle');
    var button = document.querySelectorAll('.smallButton');

	var individualround = new Round(listOfColors[i]);
	console.log(individualround);
	listofrounds.push(individualround);

    circle.innerHTML = individualround.correctcolor;
    circle.style.color = individualround.displaycolor;
    //circle.style.borderColor = individualround.displaycolor;

    document.addEventListener('keydown', function temporaryEventListener(event) {
        	    if (event.keyCode != 89 && event.keyCode != 78 && event.keyCode != 74 && event.keyCode != 75) {
		console.log('whiff');
	    }
	    else {
		// read key code
		if(event.keyCode == 89|| event.keyCode == 74) {
		    i++;
		    console.log('yes!');
		    input = true;
		}if (event.keyCode == 78 || event.keyCode == 75) {
		    i++;
		    console.log('no!');
		    input = false;
		}
		// reset counter for iterator loop
		if (i > 5) {
		    i = 0;
		}
		// if the user addresses the presented problem correctly
		if (input == individualround.match) {
		    player.score++;
		    console.log('correct');
		}
		// incorrect
		if (input != individualround.match) {
		    console.log('wrong');
		    document.removeEventListener('keydown', temporaryEventListener);
		    console.log(player);
            alert("The game is over. You lasted for " + player.score + " rounds.");

		}
		individualround = new Round(listOfColors[i]);

        circle.innerHTML = individualround.correctcolor;
        circle.style.color = individualround.displaycolor;
        //circle.style.borderColor = individualround.displaycolor;

        console.log(individualround);
		listofrounds.push(individualround);
	    }
	});
    }
};

var name = prompt('Please enter your name');
begin(name);
