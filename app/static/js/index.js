// SELECT ELEMENTS

const rollBtn = document.getElementById('roll');
const dice = document.getElementsByClassName("dice");
const gameTitle = document.getElementById('game_title')

let count = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0};
let totalPoints = 0;
let roundPoints = 0;

// EVENT LISTENERS

rollBtn.addEventListener('click', roll);

// FUNCTIONS

function roll(){
    gameTitle.innerText = `Good Luck!`
    for (side of dice){
    randInt = Math.floor(Math.random() * (9861 - 9856 + 1) + 9856)
    side.innerHTML = `&#${randInt};`

    switch (randInt){
        case 9856:
            count[1] += 1;
            break;
        case 9857:
            count[2] += 1;
            break;
        case 9858:
            count[3] += 1;
            break;
        case 9859:
            count[4] += 1;
            break;
        case 9860:
            count[5] += 1;
            break;
        case 9861:
            count[6] += 1;
            break;
    }
    }

    if(Object.values(count).every(item => item === 1)){
        roundPoints += 1500;
    }else if(count[1] === 6){
        roundPoints += 2000;
    }
    
    for (let i = 1; i < 6; i++){  
        if(i === 1 && count[i] > 3){
            roundPoints += 1000;
            count[1] -= 3;
        }if(i === 1){
            roundPoints += count[i] * 100;
        }if(count[i] === 6 ){
            roundPoints += i * 200;
            count[i] -= 6;
        }if(count[i] === 3 ){
            roundPoints += i * 100;
            count[i] -= 3;
        }if(i === 5){
            roundPoints += count[i] * 50;
        }

    }

    console.log(count)
    count = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0};   
    console.log('round Points:', roundPoints)
    console.log('--------------')
    console.log(count)
    console.log('--------------')
    totalPoints += roundPoints;
    roundPoints = 0;
    console.log('total points:', totalPoints)
    console.log('round Points:', roundPoints)
    console.log('++++++++++++++')
}
