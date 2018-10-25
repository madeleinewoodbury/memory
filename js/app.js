const gridContainer = document.querySelector('.grid-container');

const iconsArray = ["airplane", "car", "doughnut", "earth-globe", "gamepad", "llama", "rocket", "squirrel", "airplane", "car", "doughnut", "earth-globe", "gamepad", "llama", "rocket", "squirrel"];

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

     clicked.parentNode.classList.toggle('flip');



})