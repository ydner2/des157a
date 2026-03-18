(function(){
    "use strict"
    console.log("reading js");

    //First thing I need to do is to declare variables
    //this variable will not be needed until later
    //const startGame = document.querySelector('#startgame');

    //this controls the game and houses the start and quit buttons. This is not needed until later
    // const gameControl = document.querySelector('#gamecontrol');

    //game houses the dice roll images. I will need another variable that houses the race track and data.
    const game = document.querySelector('#game');

    //score will be housed in data and also in the overlay.
    const score = document.querySelector('#score');

    //actions is another text area.
    const actionArea = document.querySelector('#actions');
    //my variables
    const rolldice = document.querySelector('#rolldicebtn');
    const refuel = document.querySelector('#refuelbtn');
    const dice1 = document.querySelector('#dicebox1');
    const dice2 = document.querySelector('#dicebox2');
    const overlay = document.querySelector('#overlay');

    //this will be done later.
    const player1outline = document.querySelector('#player1');
    const player2outline = document.querySelector('#player2');

    //these are the only important objects for my project.
    const gameData = {
        dice: ['1.png', '2.png', '3.png', 
            '4.png', '5.png', '6.png'],
        players: ['player 1', 'player 2'],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 500, //game ends at 500
        fuel: [100,100], //fuel of car
        penaltyturn: [0,0] //gives a penalty
    };

    if(gameData.penaltyturn[gameData.index]>0){
        rolldice.style.display="none";
        refuel.addEventListener('click', refueling)
    }
    else{
        rolldice.addEventListener('click', throwDice);
        refuel.addEventListener('click', refueling)
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
        dice1.innerHTML = `<img src="images/dice${gameData.dice[gameData.roll1-1]}">`;
        dice2.innerHTML = `<img src="images/dice${gameData.dice[gameData.roll2-1]}">`;
        gameData.rollSum = gameData.roll1 + gameData.roll2; 

        if (gameData.rollSum === 2) {
            overlay.innerHTML = '<p>Oh no! You Rolled 2 ones. You ran out of fuel. Switching to player 2</p>';

            gameData.fuel[gameData.index] = 0;

            handleOverlay();
            //set score for current player

            document.querySelector(`#fuelbar${(gameData.index + 1)}`).style.maxWidth=`1vw`;
            handleFuelColor();
            
            gameData.index ? (gameData.index = 0) : (gameData.index = 1); //switches the player
        } //finished snake eyes section

        else if (gameData.roll1 === 1 || gameData.roll2 === 1 ){
            overlay.innerHTML = `<p>You were cut off. -25% fuel. <br> ${gameData.players[gameData.index]}'s turn.</p>`;

            //handles fuel
            gameData.fuel[gameData.index] = Math.floor((gameData.fuel[gameData.index])*0.75);
            document.querySelector(`#fuelbar${(gameData.index + 1)}`).style.maxWidth = `${gameData.fuel[gameData.index]}px`;
            handleFuelColor();

            handleOverlay();

            gameData.index ? (gameData.index = 0) : (gameData.index = 1);

        } else if(gameData.rollSum === 12){
            overlay.innerHTML = `<p>You hit a slip screen. -0% fuel. +50 laps. <br> take another turn</p>`;
            //score
            gameData.score[gameData.index] = gameData.score[gameData.index]+50;
            document.querySelector(`#lapplayer${gameData.index+1}`).innerHTML = gameData.score;
            //no loss of fuel
            handleOverlay();
            //no skip turn
        }
        else{
            //overlay
            overlay.innerHTML = `<p>You Traveled ${gameData.rollSum*3} laps. -${gameData.rollSum} fuel. <br> ${gameData.players[gameData.index]}'s turn.</p>`;
            //score
            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum*3;
            document.querySelector(`#lapplayer${gameData.index+1}`).innerHTML = gameData.score[gameData.index];
            //handles fuel
            gameData.fuel[gameData.index] = gameData.fuel[gameData.index]-gameData.rollSum;
            document.querySelector(`#fuelbar${(gameData.index + 1)}`).style.maxWidth = `${gameData.fuel[gameData.index]}px`;

            handleFuelColor();

            handleOverlay();

            gameData.index ? (gameData.index = 0) : (gameData.index = 1);

        } //end other fuel */

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

        console.log(gameData.fuel);
        // showCurrentScore();
    } //end ThrowDice Function

    function refueling(){
        if(gameData.penaltyturn[gameData.index]>1){
            gameData.penaltyturn--;
            overlay.innerHTML = `<p>You are still refueling for ${gameData.penaltyturn[gameData.index]} laps</p>`;//sets overlay
            handleOverlay();

            gameData.index ? (gameData.index = 0) : (gameData.index = 1); //switches player
        } else if(gameData.penaltyturn[gameData.index]>0){
            gameData.penaltyturn--;
            overlay.innerHTML = `<p>You are just refueled</p>`;//sets overlay
            gameData.fuel = 100;
            handleOverlay();

            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
        }
    }

    function handleOverlay(){
        overlay.style.display="flex";
        setTimeout(overlayOff, 4000);
    }

    function overlayOff(){
        overlay.style.display= "none"
    }


    //The third thing I need to do is to make the pass work

    //I need to




    //SIDE TASKS IF I HAVE TIME
    //I also need to add a quit button in the HTML and CSS

    //I need to add something that handles the overly

    //I will need a start button and design
})();