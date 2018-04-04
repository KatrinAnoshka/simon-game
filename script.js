$(document).ready(function() {
	// instructions is appear when user clicks button
	$('.btn').click(function() {
		$('.instructions').css('visibility', 'visible');
	});

	// instructions is disappear when user clicks 'Cross'
	$('.delete').click(function() {
		$('.instructions').css('visibility', 'hidden');
	});

	// main code of game
	var game = {
		count: 0,
		comEntry: ['blue', 'red', 'yellow', 'green'],
		comPlay: [],
		userPlay: [],
		level: 1,
		strict: false,
	}

	var gameInterval, gameCount = 1;
	var switchOn = false;

	//what happens when the user clicks button 'ON/OFF'
	$('label').click(function() {
		if( !switchOn ){
			switchOn = true;
			$('span').css('color', 'red');			
		} else {
			switchOn = false;
			gameCount = 1;
			game.level = 1;
			clearGame();
			clearInterval(gameInterval);
			$('.push').removeClass('clickable');
			$('.push').addClass('unclickable');
			$('span').css('color', '#231f1f');
			$('span').text('--');
			$('.strictIndicator').css('background-color', '#380101');
		}
	})

	// what happens when the user clicks button 'Strict'
	$('.strict').click(function () {
		if(switchOn) {
			if(!game.strict) {
				$('.strictIndicator').css('background-color', 'red');
				game.strict = true;
			}else{
				$('.strictIndicator').css('background-color', '#380101');
				game.strict = false;
			}
		}
	})

	// what happens when the user push button 'Start'
	$('.start').click(function() {
		if(switchOn){
			gameCount = 1;
			game.level = 1;
			clearGame();      // reset old Game
			clearInterval(gameInterval);
			$('.push').removeClass('clickable');
			$('.push').addClass('unclickable');
			startGame();
		}
	})

	//what happens after the win of user
	function newGame() {
		clearGame();
	}

	// reset game
	function clearGame() {
		game.count = 0;
		game.comPlay = [];
		game.userPlay = [];
	}

	// start of game
	function startGame() {
		checkLevel(game.level)
	}

	// write level in Count panel and go on
	function checkLevel(level) {
		$('span').text(level);
		switch(level){
			case 1:
				gameCount = 1;
				addComMove();
				break;
			case 2:
				gameCount = 2;
				addComMove();
				break;
			case 3:
				gameCount = 3;
				addComMove();
				break;		
			case 4:
				gameCount = 4;
				addComMove();
				break;
			case 5:
				gameCount = 5;
				addComMove();
				break;						
			default:
				clearInterval(gameInterval);
				gameCount = 1;
				game.level = 1;
				$('span').html('&#10004;');
				newGame();
		}
	}

	// get a random color 
	function addComMove() {
		gameInterval = setInterval(function() {
			if(game.count != gameCount){
				game.count++;
				var randColor = game.comEntry[Math.floor(Math.random() * 4)]
				game.comPlay.push(randColor);
				displayInput(randColor);
				playSound(game.comEntry.indexOf(randColor) + 1);
			} else {	
				clearInterval(gameInterval);
				game.level += 1;
				$('.push').removeClass('unclickable');
				$('.push').addClass('clickable');
			}
		}, 700)
	}

	// color panel is active
	function displayInput(color) {
		var index = '#' + color;
		$(index).addClass('light');
		setTimeout(function(){
			$(index).removeClass('light');
		}, 300)
	}

	// what happens when the user clicks on Color buttons
	function userPlay(color) {
	displayInput(color);
	game.userPlay.push(color);
	var length = game.userPlay.length;

	switch(color) {
		case 'blue':
			var sound = new Audio(
			    "https://s3.amazonaws.com/freecodecamp/simonSound" + 1 + ".mp3"
			 );
	  		sound.play();
  		break;
  		case 'red':
			var sound = new Audio(
			    "https://s3.amazonaws.com/freecodecamp/simonSound" + 2 + ".mp3"
			 );
	  		sound.play();
  		break;
  		case 'yellow':
			var sound = new Audio(
			    "https://s3.amazonaws.com/freecodecamp/simonSound" + 3 + ".mp3"
			 );
	  		sound.play();
  		break;
  		case 'green':
			var sound = new Audio(
			    "https://s3.amazonaws.com/freecodecamp/simonSound" + 4 + ".mp3"
			 );
	  		sound.play();
  		break;
	}
		
	if(game.userPlay[length - 1] == game.comPlay[length - 1]) {
		if(length == game.comPlay.length) {
			$('.push').removeClass('clickable');
			$('.push').addClass('unclickable');
			setTimeout(checkLevel, 1000, game.level);
			clearGame();	
		}

	} else {
		if(game.strict) {
			clearGame();
			clearInterval(gameInterval)
			game.level = 1;
			gameCount = 1;
			$('span').css('color', 'red');
			$('span').html("&#10006;")
			setTimeout(checkLevel, 1500, game.level);
		} else {
			game.userPlay = [];
			$('span').text('!!');
			setTimeout(function(){
				$('span').text(game.level - 1);
			}, 1000)
		}
	}
	}

 	document.getElementById('blue').onclick = function() {userPlay('blue');}
	document.getElementById('red').onclick = function() {userPlay('red');}
	document.getElementById('green').onclick = function() {userPlay('green');}
	document.getElementById('yellow').onclick = function() {userPlay('yellow');}
    
  	// sound of color buttonss
	function playSound(number) {
	  	var sound = new Audio(
	    "https://s3.amazonaws.com/freecodecamp/simonSound" + number + ".mp3"
	  	);
	  	sound.play();
	}

});	