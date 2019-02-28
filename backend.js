var score, currentScore, activePlayer, gamePlaying, lastDice, winningScore;

init();


function init()
{
  winningScore = document.getElementById('win-score').value;
  //document.getElementById('win-score').disabled = true;
  score = [0,0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  //lastDice = 0;
  winningScore = 100;

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  hideDice();
  document.getElementById('name-0').textContent = 'player 1';
  document.getElementById('name-1').textContent = 'player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}



function changePlayer(){
  //lastDice = 0;
  roundScore = 0;
  document.getElementById('current-' + activePlayer).textContent = roundScore;
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0 ;
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  //hide the dice when it is next player's turn.
  hideDice();
}



function hideDice(){
  document.getElementById('dice1').style.display = 'none';
  document.getElementById('dice2').style.display = 'none';
}


document.getElementById('win-score').addEventListener('keyup',function(event){
  event.preventDefault();
  if(event.keyCode === 13 || event.which === 13){
    var input = document.getElementById('win-score').value;
    if (input) {
        winningScore = input;
        alert(' Winning Score is : '+winningScore);
    }
    else {
      winningScore = 100;
      alert(' Winning Score is : '+winningScore);
    }
  }
});




document.querySelector('.btn-roll').addEventListener('click', function(){
  if(gamePlaying){
    // 1. Random number
    var dice_1 = Math.floor((Math.random()*6)+1);
    var dice_2 = Math.floor((Math.random()*6)+1);

    // 2. Display the result image.
    document.getElementById('dice1').style.display = 'block';
    document.getElementById('dice2').style.display = 'block';
    document.getElementById('dice1').src = 'dice-' + dice_1 + '.png';
    document.getElementById('dice2').src = 'dice-' + dice_2 + '.png';

      //var diceDOM = document.querySelector('.dice');
      //diceDOM.style.display = 'block';
      //diceDOM.src = '/home/nikhil/udemy_js_course/complete-javascript-course-master/4-DOM-pig-game/starter/dice-'+ dice +'.png';

      // 3. update the round score IF the rolled number was NOT a 1.
      /*if(dice === 6 && lastDice == 6){
        score[activePlayer] = 0;
        document.getElementById('score-' + activePlayer).textContent = 0;
        changePlayer();
      }
      else*/ if(dice_1 !== 1 && dice_2 !== 1){
        //  lastDice = dice;
          roundScore += dice_1 + dice_2;
          document.getElementById('current-' + activePlayer).textContent = roundScore;
        }
      else {
        changePlayer();
      }
    }
});



document.querySelector('.btn-hold').addEventListener('click', function(){
  if(gamePlaying){
    // add current score to GLOBAL score.
    score[activePlayer] += roundScore;

    // update the total score UI.
    document.getElementById('score-' + activePlayer).textContent = score[activePlayer];

    //check if player won the game.
    if(score[activePlayer] >= winningScore){
      document.getElementById('name-' + activePlayer).textContent='WINNER!';
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      hideDice();
            gamePlaying = false;
    //  document.querySelector('.btn-roll').disabled = true;
    //  document.querySelector('.btn-hold').disabled = true;
    }else {
        changePlayer();
    }
  }
});



document.querySelector('.btn-new').addEventListener('click', init);
