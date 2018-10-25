const gridContainer = document.querySelector('.grid-container');
const iconsArray = ["airplane", "car", "doughnut", "earth-globe", "gamepad", "llama", "rocket", "squirrel", "airplane", "car", "doughnut", "earth-globe", "gamepad", "llama", "rocket", "squirrel"];
let count = 0;
let firstCard = '';
let secondCard = '';

for(let i = 0; i < iconsArray.length; i++){
    const card = document.createElement('card');
    card.classList.add('card');
    card.dataset.name = iconsArray[i];

    const front = document.createElement('div');
    front.classList.add('front');

    const back = document.createElement('div');
    back.classList.add('back');

    card.appendChild(front);
    card.appendChild(back);

    gridContainer.appendChild(card);
}

gridContainer.addEventListener('click', function(e){
    let clicked = e.target;

    if(clicked.classList.contains('grid-container')){
        console.log('grid clicked');
        return;
    }

    if(count < 2){
        count++;
        clicked.parentNode.classList.toggle('flip');

        if(count === 1){
            firstCard = clicked.parentNode.dataset;
            console.log(firstCard);
        }else{
            secondCard = clicked.parentNode.dataset;
            console.log(secondCard);
        }
    }
     



})