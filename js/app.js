const gridContainer = document.querySelector('.grid-container');
const iconsArray = ["airplane", "car", "doughnut", "earth-globe", "gamepad", "llama", "rocket", "squirrel", "airplane", "car", "doughnut", "earth-globe", "gamepad", "llama", "rocket", "squirrel"];
let count = 0;
let firstCard = '';
let secondCard = '';
let moves = 0;

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

    const back = document.createElement('div');
    back.classList.add('back');
    let img = iconsArray[i];
    back.style.backgroundImage = `url("media/${img}.svg")`

    card.appendChild(front);
    card.appendChild(back);

    gridContainer.appendChild(card);
}

gridContainer.addEventListener('click', function(e){
    let clicked = e.target;

    if(clicked.classList.contains('grid-container')){
        return;
    }

    // only 2 cards can be selected at once
    if(count < 2){
        count++;
        movesDisplay.textContent = moves += 1;
        let selectedCard = clicked.parentNode;
        console.log(selectedCard);
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
            console.log(card.children[1]);
        }
    }

})