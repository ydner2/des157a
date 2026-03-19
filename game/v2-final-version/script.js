(function(){
    "use strict"
    console.log("reading js");

    //First thing I need to do is to declare variables
    //this variable will not be needed until later
    //const startGame = document.querySelector('#startgame');

    //this controls the game and houses the start and quit buttons. This is not needed until later
    // const gameControl = document.querySelector('#gamecontrol');

    const clicksection = document.querySelector('#clickhere');
    //my variables
    const rolldice = document.querySelector('#rolldicebtn');
    const refuel = document.querySelector('#refuelbtn');
    const dice1 = document.querySelector('#dicebox1');
    const dice2 = document.querySelector('#dicebox2');
    const overlay = document.querySelector('#overlay');

    //audiotracts
    const backgroundmusic = new Audio('audio/background.mp3');
    const crash = new Audio('audio/crash.mp3');
    const cutoff = new Audio('audio/cutoff.mp3');
    const racesounds = new Audio('audio/racecar.mp3');
    const refuelsounds = new Audio('audio/refuel.mp3');


    //these are the only important objects for my project.
    const gameData = {
        dice: ['1', '2', '3', 
            '4', '5', '6'],
        players: ['Player 1', 'Player 2'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 500, //game ends at 500
        fuel: [100,100], //fuel of car
        penaltyturn: [0,0] //gives a penalty
    };
        
        gameData.index=0; //sets game data to player 1 at the start.

        //adds border at the start of player 1s move
        addBorder();
        removeFuelbtn();

        overlay.style.display= "flex";

        clicksection.addEventListener('click', function(){
           setUp();
        })

        rolldice.addEventListener('click', throwDice);
        refuel.addEventListener('click', refueling);

        window.addEventListener('resize', function(){ //chatGPT here helped me do some math and adjustments for making sure the car stays on track
            moveCar(0);
            moveCar(1);
        });

    function setUp(){
         overlay.style.display= "none";
            backgroundmusic.play();

            rolldice.addEventListener('click', throwDice);
            refuel.addEventListener('click', refueling);
    }

    //Creating an if statement to check if penalty is on
    //The second thing I need to do is to roll the dice
    function throwDice(){
        // actionArea.innerHTML = '';
        gameData.roll1 = Math.floor(Math.random()*6) + 1; //using ceil could result in a zero
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;

        //Add or remove a stroke on the data box so that the player understands whose turn it is.
        //instead of adding to the game to make the outline I need to create a figure out which index it is and then highlight that index

        // game.innerHTML = `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`;
        dice1.innerHTML = `<img class="dice" src="images/dice${gameData.dice[gameData.roll1-1]}.png" srcset="images/dice${gameData.dice[gameData.roll1-1]}.png 600w, images/dice${gameData.dice[gameData.roll1-1]}desktop.png 1200w" sizes="60px" alt="dice${gameData.dice[gameData.roll1-1]}">`;
        dice2.innerHTML = `<img class="dice" src="images/dice${gameData.dice[gameData.roll2-1]}.png" srcset="images/dice${gameData.dice[gameData.roll2-1]}.png 600w, images/dice${gameData.dice[gameData.roll2-1]}desktop.png 1200w" sizes="60px" alt="dice${gameData.dice[gameData.roll2-1]}">`;
        gameData.rollSum = gameData.roll1 + gameData.roll2; 

        if (gameData.rollSum === 2) {

            crash.play();
            gameData.fuel[gameData.index] = 0;

            //set score for current player

            document.querySelector(`#fuelbar${(gameData.index + 1)}`).style.maxWidth=`0px`;
            handleFuelColor();
            addPenalty();
            removeBorder();

            gameData.index ? (gameData.index = 0) : (gameData.index = 1); //switches the player
            overlay.innerHTML = `<p>Oh no! You Rolled <span style="color: #ebeb0c;">2 ones</span>. You Crashed. Switching to <span style="color: #ebeb0c;">${gameData.players[gameData.index]}</span></p>`;
            handleOverlay();
            removeRollbtn();
            removeFuelbtn();

        } //finished snake eyes section

        else if (gameData.roll1 === 1 || gameData.roll2 === 1 ){
            
            cutoff.play();

            //handles fuel
            gameData.fuel[gameData.index] = Math.floor((gameData.fuel[gameData.index])*0.75);
            document.querySelector(`#fuelbar${(gameData.index + 1)}`).style.maxWidth = `${gameData.fuel[gameData.index]}px`;

            handleFuelColor();
            addPenalty();
            removeBorder();

            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            overlay.innerHTML = `<p>You were cut off. <span style="color: #ebeb0c;">-25% fuel</span>. <br> <span style="color: #ebeb0c;">${gameData.players[gameData.index]}'s</span> turn.</p>`;
            handleOverlay();
            removeRollbtn();
            removeFuelbtn();
    

        } else if(gameData.rollSum === 12){
            racesounds.play();

            overlay.innerHTML = `<p>You hit a slip screen. <span style="color: #ebeb0c;">-0% fuel</span>. <span style="color: #ebeb0c;">+100 laps</span>. <br> Take another turn</p>`;
            //score
            gameData.score[gameData.index] = gameData.score[gameData.index]+100;
            document.querySelector(`#lapplayer${gameData.index+1}`).innerHTML = gameData.score[gameData.index];
            //no loss of fuel

            if (checkWinningConditions()) {
                return;
            }

            handleOverlay();
            moveCar(gameData.index);
            
            //no skip turn
            removeRollbtn();
            removeFuelbtn();
        }
        else{
            racesounds.play();

            //score
            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum*5;
            document.querySelector(`#lapplayer${gameData.index+1}`).innerHTML = gameData.score[gameData.index];
            //handles fuel
            gameData.fuel[gameData.index] = gameData.fuel[gameData.index]-gameData.rollSum;
            document.querySelector(`#fuelbar${(gameData.index + 1)}`).style.maxWidth = `${gameData.fuel[gameData.index]}px`;

            if (checkWinningConditions()) {
                return;
            }

            handleFuelColor();
            moveCar(gameData.index);
            addPenalty();
            removeBorder();

            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            //overlay
            overlay.innerHTML = `<p>You Traveled <span style="color: #ebeb0c;">${gameData.rollSum*5} laps</span>. <span style="color: #ebeb0c;">-${gameData.rollSum} fuel</span>. <br> <span style="color: #ebeb0c;">${gameData.players[gameData.index]}'s</span> turn.</p>`;
            handleOverlay();
            removeRollbtn();
            removeFuelbtn();

        } //end else stament

        console.log(gameData.fuel);
        // showCurrentScore();
    } //end ThrowDice Function

    function refueling(){
        refuelsounds.play();
        if(gameData.penaltyturn[gameData.index]>=1){
            gameData.penaltyturn[gameData.index]--;

            handleOverlay();
            removeBorder();

            gameData.index ? (gameData.index = 0) : (gameData.index = 1); //switches player
            overlay.innerHTML = `<p>You are still refueling for <span style="color: #ebeb0c;">${gameData.penaltyturn[gameData.index] + 1} laps</span>. Switching to <span style="color: #ebeb0c;">${gameData.players[gameData.index]}</span>.</p>`;
            handleOverlay();
            removeRollbtn();
            removeFuelbtn();

        } else if(gameData.penaltyturn[gameData.index]<1){
            overlay.innerHTML = `<p>You just refueled.</p>`;//sets overlay
            const overlayPara = document.querySelector('#overlay p');

            rolldice.style.display="block";
            if(gameData.fuel[gameData.index]<50){
                gameData.fuel[gameData.index] = gameData.fuel[gameData.index]+50;
                overlayPara.innerHTML += `  <span style="color: #ebeb0c;">+50 fuel.</span>`;
            } else{
                gameData.fuel[gameData.index] =  100;
                overlayPara.innerHTML += ' fuel at  <span style="color: #ebeb0c;">100%</span>.';
            }

            document.querySelector(`#fuelbar${(gameData.index + 1)}`).style.maxWidth = `${gameData.fuel[gameData.index]}px`;

            handleFuelColor();
            removeBorder();

            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            overlayPara.innerHTML += ` Switching to <span style="color: #ebeb0c;">${gameData.players[gameData.index]}</span>`
            handleOverlay();
            removeRollbtn();
            removeFuelbtn();
        }
    }

    function handleFuelColor(){
        /*     if(gameData.index == 0 && gameData.fuel[gameData.index]<20){
                document.querySelector(`#fuelbar1`).style.backgroundColor="#d32222";
            } 
            else if(gameData.index == 0 && gameData.fuel[gameData.index]>=20 && gameData.fuel<50){
                document.querySelector(`#fuelbar1`).style.backgroundColor="#ebeb0c";
            } 
            else if(gameData.index == 0 && gameData.fuel[gameData.index]>=50){
                document.querySelector(`#fuelbar1`).style.backgroundColor="#009d62";
            } 
            else if(gameData.index == 1 && gameData.fuel[gameData.index]<20){
                document.querySelector(`#fuelbar2`).style.backgroundColor="#d32222";
            } 
            else if(gameData.index == 1 && gameData.fuel[gameData.index]>=20 && gameData.fuel<50){
                document.querySelector(`#fuelbar2`).style.backgroundColor="#ebeb0c";
            } 
            else if(gameData.index == 1 && gameData.fuel[gameData.index]>=50){
                document.querySelector(`#fuelbar2`).style.backgroundColor="#009d62";
            } */

            //my code above was not showing the yellow values so ChatGPT helped me write a function where the yellow would show up.  Honestly for the first time in forever ChatGPT came up with a simpler solution by just making a few simple variables.
            const fuelBar = document.querySelector(`#fuelbar${gameData.index + 1}`);
            const fuelValue = gameData.fuel[gameData.index];

            if (fuelValue < 20){
                fuelBar.style.backgroundColor = "#d32222";
            } else if (fuelValue < 50){
                fuelBar.style.backgroundColor = "#ebeb0c";
            } else {
                fuelBar.style.backgroundColor = "#009d62";
            }
        } //end function fuel color

    function handleOverlay(){
        overlay.style.display="flex";
        setTimeout(overlayOff, 4000);
        setTimeout(addBorder, 4000);
    } //ends the overlay timeout

    function overlayOff(){
        overlay.style.display= "none"
    } //end turn off overlay function

    function addPenalty(){
        if(gameData.fuel[gameData.index] <= 0){
            gameData.fuel[gameData.index] = 0;
            gameData.penaltyturn[gameData.index] = 2;
        } 
    } //end add penalty function

    function removeBorder(){
        document.querySelector(`#player${gameData.index + 1}`).style.border="none";
    } //end remove Border function

    function addBorder(){
        document.querySelector(`#player${gameData.index + 1}`).style.border = "5px solid #ebeb0c";
    } //end add Border function

    function removeRollbtn(){
        if (gameData.penaltyturn[gameData.index] > 0 || gameData.fuel[gameData.index] == 0){
            rolldice.style.display="none";
        } else {
            rolldice.style.display="block";
        }
    } //end remove Roll button Function

    function removeFuelbtn(){
        if (gameData.fuel[gameData.index] == 100){
            refuel.style.display="none";
        } else {
            refuel.style.display="block";
        }
    }

    function checkWinningConditions(){
        if(gameData.score[gameData.index] >= gameData.gameEnd){
            overlay.innerHTML = `<p><span style="color: #ebeb0c;">${gameData.players[gameData.index]} Wins! </span></p> <section class="clickanywhere" id="secondclick"><p>Click Here to Play Again</p></section>`
            overlay.style.display = "flex"

            backgroundmusic.pause();
            backgroundmusic.currentTime = 0;
            document.querySelector("#secondclick").addEventListener('click', function(){
                setUp();
            })
            return true;
        }
        return false;
    }

    function moveCar(playerIndex){
    /*     document.querySelector(`#car${gameData.index + 1}`).style.left = `${gameData.score[gameData.index]/gameData.gameEnd}px`; */

        //to get my moveCar thing to work here is a function from CHATGPT so that I do not have to do the exact calculations.
        const car = document.querySelector(`#car${playerIndex + 1}`);
        const race = car.parentElement; // the .race container
        const currentScore = gameData.score[playerIndex];

        const maxTrackDistance = race.offsetWidth - car.offsetWidth;
        const progress = Math.min(currentScore / gameData.gameEnd, 1);
        const carPosition = progress * maxTrackDistance;

        car.style.left = `${carPosition}px`;
    }


    //SIDE TASKS IF I HAVE TIME
    //I also need to add a quit button in the HTML and CSS

    //I will need a start button and design a starting screen.
})();