const gridContainer = document.querySelector('.grid-container');
const iconsArray = ["airplane", "car", "doughnut", "earth-globe", "gamepad", "llama", "rocket", "squirrel", "airplane", "car", "doughnut", "earth-globe", "gamepad", "llama", "rocket", "squirrel"];
let count = 0;
let firstCard = '';
let secondCard = '';
let moves = 0;
let matchesFound = 0;
let rating = 3;

const stars = document.querySelectorAll('li');

let movesDisplay = document.getElementById('moves-display');
movesDisplay.textContent = moves;

// randomly sort iconsArray
iconsArray.sort(function(){
    return 0.5 - Math.random();
});

// draw card grid
for(let i = 0; i < iconsArray.length; i++){
    const card = document.createElement('card');
    card.classList.add('card');
    card.dataset.name = iconsArray[i];

    const front = document.createElement('div');
    front.classList.add('front');
    front.style.backgroundImage = `url("media/memory.svg")`

    const back = document.createElement('div');
    back.classList.add('back');
    let img = iconsArray[i];
    back.style.backgroundImage = `url("media/${img}.svg")`

    card.appendChild(front);
    card.appendChild(back);

    gridContainer.appendChild(card);
}

// TIMER
let timerDisplay = document.querySelector('#timerDisplay');
let seconds = 0;
let interval = setInterval(timer, 1000);

function timer(){
    seconds++;
    timerDisplay.innerHTML = seconds;
}

// EVENT LISTENR ON GRID CONTAINER
gridContainer.addEventListener('click', function(e){
    let clicked = e.target;

    if(clicked.classList.contains('grid-container') ||
        clicked.parentNode.classList.contains('selected')){
        return;
    }

    // only 2 cards can be selected at once
    if(count < 2){
        count++;
        movesDisplay.textContent = moves += 1;

        // Check star rating
        starRating();

        let selectedCard = clicked.parentNode;
        selectedCard.classList.toggle('flip');
        selectedCard.classList.toggle('selected');

        if(count === 1){
            firstCard = selectedCard.dataset.name;
        }else{
            secondCard = selectedCard.dataset.name;
        }

        if(firstCard && secondCard){
            if(firstCard === secondCard){
                console.log('MATCH!!!');
                match();
            }else{
                console.log('Sorry, not a match');
            }

            // reset guesses
            setTimeout(resetGuesses, 1000);
        }
    }
     
    function resetGuesses(){
        firstCard = '';
        secondCard = '';
        count = 0;

        // remove the flip class from selected cards
        let selectedCards = document.querySelectorAll('.selected');
        for(let card of selectedCards){
            card.classList.toggle('flip');
            card.classList.remove('selected');
        }
    }

    function match(){
        // replace the selected class with match
        let selectedCards = document.querySelectorAll('.selected');
        for(let card of selectedCards){
            card.classList.remove('selected');
            card.children[1].classList.add('match');
        }

        matchesFound++;

        // check if all matches have been found
        if(matchesFound === 8){
            modal();
            console.log('GAME WON!');
        }
    }

})

function modal(){
    const modal = document.querySelector('.modal');
    const restartBtn = document.querySelector('#restart-btn');
    const totalTime = document.querySelector('#totalTime');
    const totalMoves = document.querySelector('#totalMoves');
    const totalStars = document.querySelector('#totalStars');

    // clear interval and display total time
    clearInterval(interval); 
    totalTime.innerHTML = seconds;
    totalMoves.innerHTML = moves;
    totalStars.innerHTML = rating;



    // display modal
    modal.style.display = 'block';

    restartBtn.addEventListener('click', function(){
        console.log('restart button clicked')
        modal.style.display = 'none';
        window.location.reload(true);
    });
}

// RESTART BUTTON

const restartBtn = document.querySelector('#restartBtn');

restartBtn.addEventListener('click', function(){
    window.location.reload(true);
});


// STAR RATING


function starRating(){
    if(moves > 25 && rating === 3){
        stars[2].classList.add('hide');
        rating = 2;
        console.log('New rating: ' + rating);
    }else if(moves > 35 && rating === 2){
        stars[1].classList.add('hide');
        rating = 1;
        console.log('New rating: ' + rating);
    }
}


